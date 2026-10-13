#!/usr/bin/env node
/**
 * Local preview server (no caching) + the VFX Maker's back end.   node tools/serve.mjs 8767
 *
 *   /tools/preview.html, /tools/preview3d.html, /tools/maker.html, /demo/...   static files
 *   GET  /api/maker/status     is there an API key, which model
 *   POST /api/maker/generate   { prompt, mode: '2d'|'3d', code?, feedback? } -> { code, note }
 *   POST /api/maker/key        { key } | { remove: true } -> checks the key with Anthropic, then saves it
 *   POST /api/maker/save       { code } -> writes packs/casual/effects/<name>.js, adds it to the
 *                              pack index and rebuilds. Rolls everything back if the build fails.
 *
 * The API key never reaches the browser and never reaches git: it is read from the
 * ANTHROPIC_API_KEY environment variable or from the git-ignored file `.anthropic.key`.
 * The /api routes only answer this computer (loopback) and only same-origin requests.
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, statSync, unlinkSync, createReadStream, mkdtempSync, rmSync, chmodSync } from 'node:fs';
import { execFile, spawn } from 'node:child_process';
import { tmpdir, homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, extname, sep } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PORT = Number(process.argv[2]) || 8767;
// the owner asked for Opus 5.5 on their own API key (2026-10-14). Any model id works: VFX_MAKER_MODEL=claude-sonnet-5 node tools/serve.mjs
const MODEL = process.env.VFX_MAKER_MODEL || 'claude-opus-5-5';
const KEY_FILE = join(ROOT, '.anthropic.key');
const EFFECTS_DIR = join(ROOT, 'packs/casual/effects');
const INDEX = join(ROOT, 'packs/casual/index.js');

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.css': 'text/css; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8' };

/* ------------------------------------------------------------ the AI */

function apiKey() {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY.trim();
  if (existsSync(KEY_FILE)) { const k = readFileSync(KEY_FILE, 'utf8').trim(); if (k) return k; }
  return null;
}

/**
 * Two ways to reach Claude:
 *  - 'api':          an Anthropic API key (pay per use), through the official SDK;
 *  - 'subscription': the Claude Code command-line tool installed on this computer, which runs on
 *                    the owner's own Claude subscription login. No key, no extra bill.
 * A key wins when there is one; VFX_MAKER_BACKEND=subscription|api forces a choice.
 */
function claudeCli() {
  const names = [process.env.CLAUDE_CLI, join(homedir(), '.local/bin/claude'), join(homedir(), '.claude/local/claude'), '/opt/homebrew/bin/claude', '/usr/local/bin/claude'];
  return names.find((f) => f && existsSync(f)) || null;
}
function backend() {
  const want = process.env.VFX_MAKER_BACKEND;
  if (want === 'api') return apiKey() ? 'api' : null;
  if (want === 'subscription') return claudeCli() ? 'subscription' : null;
  return apiKey() ? 'api' : (claudeCli() ? 'subscription' : null);
}

/** One request through Claude Code in print mode: no tools, no project files, just text in and text out. */
function askClaudeCode(system, user) {
  return new Promise((resolve, reject) => {
    const dir = mkdtempSync(join(tmpdir(), 'vfx-maker-'));
    const sysFile = join(dir, 'system.md');
    writeFileSync(sysFile, system);
    const env = Object.assign({}, process.env);
    delete env.ANTHROPIC_API_KEY;                     // make sure it is the subscription that answers
    const child = spawn(claudeCli(), ['-p', '--model', MODEL, '--tools', '', '--strict-mcp-config', '--system-prompt-file', sysFile, '--output-format', 'json'], { cwd: dir, env });
    let out = '', errOut = '';
    const timer = setTimeout(() => child.kill(), 300000);
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { errOut += d; });
    child.on('error', (e) => { clearTimeout(timer); rmSync(dir, { recursive: true, force: true }); reject(e); });
    child.on('close', () => {
      clearTimeout(timer);
      rmSync(dir, { recursive: true, force: true });
      let r = null;
      try { r = JSON.parse(out); } catch (e) { /* not json */ }
      if (Array.isArray(r)) r = r.find((x) => x && x.type === 'result') || null;
      if (!r) return reject(Object.assign(new Error('Claude Code did not answer: ' + (errOut || out).trim().slice(0, 300)), { status: 502 }));
      if (r.is_error) {
        const msg = String(r.result || '');
        if (/authenticat|OAuth|log ?in/i.test(msg)) return reject(Object.assign(new Error('Claude Code on this computer is not logged in. Open the Terminal app, type  claude  and press Enter, then type  /login  and sign in with your Claude account. Then try again.'), { status: 401 }));
        if (/limit/i.test(msg)) return reject(Object.assign(new Error('Your Claude subscription limit is used up for now: ' + msg), { status: 429 }));
        return reject(Object.assign(new Error('Claude Code answered with an error: ' + msg.slice(0, 300)), { status: 502 }));
      }
      // Claude Code makes small side calls to Haiku; the model that wrote the answer is the one with the most output
      const mu = r.modelUsage || {};
      const model = Object.keys(mu).sort((a, b) => (mu[b].outputTokens || 0) - (mu[a].outputTokens || 0))[0] || MODEL;
      resolve({ text: String(r.result || ''), model });
    });
    child.stdin.end(user);
  });
}

// The examples the AI learns the house style from: one per technique.
const EXAMPLES = ['hit.impact', 'explosion.small', 'magic.poison', 'pickup.coin', 'magic.heal', 'state.stun', 'hit.block', 'hit.blood', 'move.trail', 'env.snow'];

function systemPrompt() {
  const ref = readFileSync(join(ROOT, 'tools/maker/REFERENCE.md'), 'utf8');
  const examples = EXAMPLES.filter((n) => existsSync(join(EFFECTS_DIR, n + '.js')))
    .map((n) => '### ' + n + '.js\n```js\n' + readFileSync(join(EFFECTS_DIR, n + '.js'), 'utf8').trim() + '\n```').join('\n\n');
  return [
    'You write particle effects for the Pixelfork VFX Library, a library of ready-made effects for casual mobile web games. A game designer describes an effect in plain words; you write the one effect file that makes it.',
    'The designer is not a programmer and judges the result only by watching it play on a character, so what matters is that it looks great at first sight: layered, readable, punchy, in the library\'s style. The effect is previewed at once and may later be added to the shipped library, so it has to follow the library\'s rules exactly.',
    ref,
    '## Effects from the library (the house style; study how they layer systems, sizes and timing)\n\n' + examples,
    '## Your reply\n\nReply with exactly one ```js code block containing the complete effect file, then one short plain-language sentence (no code words) saying what you made or changed. Nothing else.',
  ].join('\n\n');
}

function userMessage(body, taken) {
  const mode = body.mode === '3d' ? '3D' : '2D';
  const parts = [];
  if (body.code && body.feedback) {
    parts.push('This is the effect as it is now:\n\n```js\n' + String(body.code).trim() + '\n```');
    parts.push('It was made from this request: ' + JSON.stringify(String(body.prompt || '')));
    parts.push('The designer watched it and wants this changed: ' + JSON.stringify(String(body.feedback)));
    parts.push('Rewrite the whole file with that change. Keep the name and everything they did not ask to change.');
  } else {
    parts.push('Make this effect: ' + JSON.stringify(String(body.prompt || '')));
    parts.push('Pick the category that fits and a short new name. These names are taken, do not reuse them: ' + taken.join(', ') + '.');
  }
  parts.push(mode === '3D'
    ? 'Target: 3D (a three.js game). Use the 3D wrappers wherever they fit so it has real depth; it must still look right in 2D, which the wrappers guarantee.'
    : 'Target: 2D. Design for the flat screen and do not use the 3D wrappers.');
  return parts.join('\n\n');
}

function takenNames() {
  try { return JSON.parse(readFileSync(join(ROOT, 'dist/registry.json'), 'utf8')).effects.map((e) => e.name); } catch (e) { return []; }
}

async function generate(body) {
  const how = backend();
  if (!how) throw Object.assign(new Error('The maker has no way to reach Claude yet. See the box at the top.'), { status: 401 });
  const system = systemPrompt(), user = userMessage(body, takenNames());
  let text, model, usage = null;
  if (how === 'subscription') {
    ({ text, model } = await askClaudeCode(system, user));
  } else {
    const client = new Anthropic({ apiKey: apiKey() });
    const request = {
      model: MODEL,
      max_tokens: 32000,
      thinking: { type: 'adaptive' },
      output_config: { effort: 'high' },
      // the reference and examples are identical on every request: cache them
      system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: user }],
    };
    // Newest first: refusal fallbacks + adaptive thinking + effort. If the model rejects one of those
    // options (a 400), drop them step by step instead of failing; the server console says which.
    const attempts = [
      () => client.beta.messages.stream({ ...request, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' }).finalMessage(),
      () => client.messages.stream(request).finalMessage(),
      () => client.messages.stream({ model: request.model, max_tokens: request.max_tokens, system: request.system, messages: request.messages }).finalMessage(),
    ];
    let message, firstError;
    for (const attempt of attempts) {
      try { message = await attempt(); break; } catch (err) {
        if (!(err instanceof Anthropic.BadRequestError)) throw err;
        console.warn('[maker] ' + MODEL + ' rejected a request option, retrying simpler: ' + err.message);
        firstError = firstError || err;
      }
    }
    if (!message) throw firstError;
    if (message.stop_reason === 'refusal') throw Object.assign(new Error('The AI declined this request. Try describing the effect differently.'), { status: 422 });
    if (message.stop_reason === 'max_tokens') throw Object.assign(new Error('The AI ran out of room before finishing. Try a simpler description.'), { status: 422 });
    text = message.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
    model = message.model;
    const u = message.usage || {};
    usage = { input: (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0), cached: u.cache_read_input_tokens || 0, output: u.output_tokens || 0 };
  }
  const m = text.match(/```(?:js|javascript)?\s*\n([\s\S]*?)```/);
  if (!m) throw Object.assign(new Error('The AI did not return an effect file. Try again.'), { status: 502 });
  const code = m[1].trim() + '\n';
  inspect(code);
  const note = text.slice(m.index + m[0].length).trim().split('\n')[0] || '';
  return { code, note, model, backend: how, usage };
}

/* ------------------------------------------------------------ the API key */

/**
 * The owner pastes their key into the maker page (never into a chat). It is checked against
 * Anthropic first (a free model lookup, which also proves this key may use MODEL), and only then
 * written to the git-ignored .anthropic.key, readable by this user only. It is never sent back.
 */
async function saveKey(body) {
  if (body.remove) { if (existsSync(KEY_FILE)) unlinkSync(KEY_FILE); return { ok: true, removed: true }; }
  const key = String(body.key || '').trim();
  if (!/^sk-ant-[A-Za-z0-9_-]{20,}$/.test(key)) throw Object.assign(new Error('That does not look like an Anthropic API key. It starts with sk-ant-'), { status: 400 });
  let info;
  try {
    info = await new Anthropic({ apiKey: key }).models.retrieve(MODEL);
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) throw Object.assign(new Error('Anthropic did not accept this key. Copy it again from console.anthropic.com.'), { status: 401 });
    if (err instanceof Anthropic.NotFoundError || err instanceof Anthropic.PermissionDeniedError) throw Object.assign(new Error('The key works, but it cannot use ' + MODEL + '. Check the key\'s workspace and plan in console.anthropic.com.'), { status: 403 });
    throw err;
  }
  writeFileSync(KEY_FILE, key + '\n', { mode: 0o600 });
  chmodSync(KEY_FILE, 0o600);
  return { ok: true, model: info.id, name: info.display_name || info.id };
}

/* ------------------------------------------------------------ saving to the library */

/** Reads the meta out of an effect file's text without running it. Throws a plain-language error. */
function inspect(code) {
  if (typeof code !== 'string' || code.length > 40000) throw new Error('That is not an effect file.');
  // look at the code only: words inside strings and comments ("a window breaks") are fine
  const bare = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/'(?:[^'\\\n]|\\.)*'/g, "''").replace(/\/\/.*$/gm, '');
  if (/^\s*import\s/m.test(bare) || /\bimport\s*\(/.test(bare) || /\brequire\s*\(/.test(bare)) throw new Error('Effect files may not import anything.');
  if (/\b(fetch|XMLHttpRequest|WebSocket|eval|Function|document|window|globalThis|localStorage|process)\b/.test(bare)) throw new Error('Effect files may only use the recipe context (c.*).');
  if (!/export\s+default\s*\{/.test(code)) throw new Error('The file must `export default { ... }`.');
  const name = (code.match(/\bname:\s*'([^']+)'/) || [])[1];
  const category = (code.match(/\bcategory:\s*'([^']+)'/) || [])[1];
  if (!name || !/^[a-z0-9]+(\.[a-z0-9]+)+$/.test(name)) throw new Error('The effect needs a lower-case name like magic.poison.');
  if (category !== name.split('.')[0]) throw new Error('The category must be the first part of the name.');
  return { name, category };
}

const ident = (name) => name.split('.').map((p, i) => (i ? p[0].toUpperCase() + p.slice(1) : p)).join('').replace(/^(\d)/, '_$1');

function run(cmd, args) {
  return new Promise((resolve) => execFile(cmd, args, { cwd: ROOT, timeout: 120000 }, (err, stdout, stderr) => resolve({ ok: !err, out: String(stdout || '') + String(stderr || '') + (err && !stderr ? String(err.message) : '') })));
}

let saving = false;
async function save(body) {
  if (saving) throw Object.assign(new Error('Another save is still running.'), { status: 409 });
  const { name } = inspect(body.code);
  const file = join(EFFECTS_DIR, name + '.js');
  const index = readFileSync(INDEX, 'utf8');
  const existed = existsSync(file);
  if (existed && !body.replace) throw Object.assign(new Error('An effect called ' + name + ' is already in the library.'), { status: 409, exists: true });
  const before = existed ? readFileSync(file, 'utf8') : null;
  saving = true;
  try {
    writeFileSync(file, body.code.endsWith('\n') ? body.code : body.code + '\n');
    if (!existed) {
      const id = ident(name);
      const lastImport = index.lastIndexOf('\nimport ');
      const lineEnd = index.indexOf('\n', lastImport + 1);
      const withImport = index.slice(0, lineEnd + 1) + `import ${id} from './effects/${name}.js';\n` + index.slice(lineEnd + 1);
      // list it after the last effect of its own group, so the players and the guide keep groups together
      const byId = {};
      withImport.replace(/^import (\w+) from '\.\/effects\/([a-z0-9.]+)\.js';$/gm, (all, i, n) => { byId[i] = n; return all; });
      const open = withImport.indexOf('export const EFFECTS = [');
      const close = withImport.indexOf('];', open);
      if (lastImport < 0 || open < 0 || close < 0) throw new Error('Could not read the pack index.');
      const category = name.split('.')[0];
      let at = close;
      const entry = /^ {2}(\w+),\n/gm;
      entry.lastIndex = open;
      for (let m; (m = entry.exec(withImport)) && m.index < close;) if (byId[m[1]] && byId[m[1]].split('.')[0] === category) at = m.index + m[0].length;
      writeFileSync(INDEX, withImport.slice(0, at) + `  ${id},\n` + withImport.slice(at));
    }
    const built = await run(process.execPath, [join(ROOT, 'tools/build.mjs')]);
    if (!built.ok) {
      if (before === null) unlinkSync(file); else writeFileSync(file, before);
      writeFileSync(INDEX, index);
      await run(process.execPath, [join(ROOT, 'tools/build.mjs')]);
      throw Object.assign(new Error('The library build refused this effect, so nothing was changed: ' + ((built.out.match(/Error: (.*)/) || [])[1] || built.out.trim().split('\n').filter(Boolean).pop())), { status: 422 });
    }
    return { name, replaced: existed, build: built.out.trim().split('\n').pop() };
  } finally { saving = false; }
}

/* ------------------------------------------------------------ http */

const loopback = (req) => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress);
function sameOrigin(req) {
  const o = req.headers.origin;
  if (!o) return req.method === 'GET';
  try { const h = new URL(o).hostname; return h === 'localhost' || h === '127.0.0.1' || h === '[::1]'; } catch (e) { return false; }
}
function json(res, status, data) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); }
function readBody(req) {
  return new Promise((resolve, reject) => {
    let s = '';
    req.on('data', (d) => { s += d; if (s.length > 200000) { reject(Object.assign(new Error('Too large.'), { status: 413 })); req.destroy(); } });
    req.on('end', () => { try { resolve(s ? JSON.parse(s) : {}); } catch (e) { reject(Object.assign(new Error('Bad request.'), { status: 400 })); } });
    req.on('error', reject);
  });
}

function friendly(err) {
  if (err instanceof Anthropic.AuthenticationError) return [401, 'The API key was not accepted. Paste it again in the key box at the top.'];
  if (err instanceof Anthropic.PermissionDeniedError) return [403, 'This API key is not allowed to use ' + MODEL + '.'];
  if (err instanceof Anthropic.RateLimitError) return [429, 'The AI is busy (rate limit). Wait a minute and try again.'];
  if (err instanceof Anthropic.APIConnectionError) return [503, 'Could not reach the AI. Check the internet connection.'];
  if (err instanceof Anthropic.APIError) return [err.status || 502, 'The AI service answered with an error: ' + err.message];
  return [err.status || 500, err.message || 'Something went wrong.'];
}

async function api(req, res, path) {
  if (!loopback(req) || !sameOrigin(req)) return json(res, 403, { error: 'The maker only answers this computer.' });
  try {
    if (path === '/api/maker/status' && req.method === 'GET') return json(res, 200, { backend: backend(), key: !!apiKey(), cli: !!claudeCli(), model: MODEL, keyFile: '.anthropic.key' });
    if (req.method !== 'POST' || !/^application\/json/.test(req.headers['content-type'] || '')) return json(res, 405, { error: 'Not allowed.' });
    const body = await readBody(req);
    if (path === '/api/maker/generate') {
      if (!String(body.prompt || '').trim()) return json(res, 400, { error: 'Describe the effect first.' });
      return json(res, 200, await generate(body));
    }
    if (path === '/api/maker/save') return json(res, 200, await save(body));
    if (path === '/api/maker/key') return json(res, 200, await saveKey(body));
    return json(res, 404, { error: 'Unknown.' });
  } catch (err) {
    const [status, message] = friendly(err);
    return json(res, status, { error: message, exists: !!err.exists });
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) return void api(req, res, url.pathname);
  let rel = decodeURIComponent(url.pathname);
  // redirect (not serve) so the page's relative links resolve from /tools/
  if (rel === '/') { res.writeHead(302, { Location: '/tools/preview.html' }); return res.end(); }
  const file = normalize(join(ROOT, rel));
  // never outside the project, never a dot-file (the key lives in one)
  if (file !== ROOT && !file.startsWith(ROOT + sep)) { res.writeHead(403); return res.end(); }
  if (rel.split('/').some((p) => p.startsWith('.'))) { res.writeHead(404); return res.end(); }
  let target = file;
  try { if (statSync(target).isDirectory()) target = join(target, 'index.html'); statSync(target); } catch (e) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
  res.writeHead(200, { 'Content-Type': TYPES[extname(target).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store, must-revalidate' });
  createReadStream(target).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Preview:  http://localhost:${PORT}/tools/preview.html`);
  console.log(`3D:       http://localhost:${PORT}/tools/preview3d.html`);
  console.log(`Maker:    http://localhost:${PORT}/tools/maker.html   (${{ api: 'API key', subscription: 'Claude subscription through Claude Code' }[backend()] || 'no way to reach Claude yet'}, ${MODEL})`);
  console.log(`Demo:     http://localhost:${PORT}/demo/game.html`);
  console.log('Ctrl+C to stop.');
});
