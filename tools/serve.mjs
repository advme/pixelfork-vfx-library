#!/usr/bin/env node
/**
 * Local preview server (no caching) + the VFX Maker's back end.   node tools/serve.mjs 8767
 *
 *   /tools/preview.html, /tools/preview3d.html, /tools/maker.html, /demo/...   static files
 *   GET  /api/maker/status     is there an API key, which model
 *   POST /api/maker/generate   { prompt, mode: '2d'|'3d', code?, feedback? } -> { code, note }
 *   POST /api/maker/save       { code } -> writes packs/casual/effects/<name>.js, adds it to the
 *                              pack index and rebuilds. Rolls everything back if the build fails.
 *
 * The API key never reaches the browser and never reaches git: it is read from the
 * ANTHROPIC_API_KEY environment variable or from the git-ignored file `.anthropic.key`.
 * The /api routes only answer this computer (loopback) and only same-origin requests.
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, statSync, unlinkSync, createReadStream } from 'node:fs';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize, extname, sep } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PORT = Number(process.argv[2]) || 8767;
const MODEL = process.env.VFX_MAKER_MODEL || 'claude-opus-5';
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
  const key = apiKey();
  if (!key) throw Object.assign(new Error('No API key yet. Put your Anthropic API key in the file .anthropic.key in the project folder.'), { status: 401 });
  const client = new Anthropic({ apiKey: key });
  const request = {
    model: MODEL,
    max_tokens: 32000,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'high' },
    // the reference and examples are identical on every request: cache them
    system: [{ type: 'text', text: systemPrompt(), cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: userMessage(body, takenNames()) }],
  };
  let message;
  try {
    // if a safety classifier declines, let the API re-run it on its recommended fallback model
    message = await client.beta.messages.stream({ ...request, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' }).finalMessage();
  } catch (err) {
    if (!(err instanceof Anthropic.BadRequestError)) throw err;
    message = await client.messages.stream(request).finalMessage();
  }
  if (message.stop_reason === 'refusal') throw Object.assign(new Error('The AI declined this request. Try describing the effect differently.'), { status: 422 });
  if (message.stop_reason === 'max_tokens') throw Object.assign(new Error('The AI ran out of room before finishing. Try a simpler description.'), { status: 422 });
  const text = message.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
  const m = text.match(/```(?:js|javascript)?\s*\n([\s\S]*?)```/);
  if (!m) throw Object.assign(new Error('The AI did not return an effect file. Try again.'), { status: 502 });
  const code = m[1].trim() + '\n';
  inspect(code);
  const note = text.slice(m.index + m[0].length).trim().split('\n')[0] || '';
  const u = message.usage || {};
  return { code, note, model: message.model, usage: { input: (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0), cached: u.cache_read_input_tokens || 0, output: u.output_tokens || 0 } };
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
  if (err instanceof Anthropic.AuthenticationError) return [401, 'The API key was not accepted. Check the key in .anthropic.key.'];
  if (err instanceof Anthropic.PermissionDeniedError) return [403, 'This API key is not allowed to use ' + MODEL + '.'];
  if (err instanceof Anthropic.RateLimitError) return [429, 'The AI is busy (rate limit). Wait a minute and try again.'];
  if (err instanceof Anthropic.APIConnectionError) return [503, 'Could not reach the AI. Check the internet connection.'];
  if (err instanceof Anthropic.APIError) return [err.status || 502, 'The AI service answered with an error: ' + err.message];
  return [err.status || 500, err.message || 'Something went wrong.'];
}

async function api(req, res, path) {
  if (!loopback(req) || !sameOrigin(req)) return json(res, 403, { error: 'The maker only answers this computer.' });
  try {
    if (path === '/api/maker/status' && req.method === 'GET') return json(res, 200, { key: !!apiKey(), model: MODEL, keyFile: '.anthropic.key' });
    if (req.method !== 'POST' || !/^application\/json/.test(req.headers['content-type'] || '')) return json(res, 405, { error: 'Not allowed.' });
    const body = await readBody(req);
    if (path === '/api/maker/generate') {
      if (!String(body.prompt || '').trim()) return json(res, 400, { error: 'Describe the effect first.' });
      return json(res, 200, await generate(body));
    }
    if (path === '/api/maker/save') return json(res, 200, await save(body));
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
  console.log(`Maker:    http://localhost:${PORT}/tools/maker.html   (${apiKey() ? 'API key found' : 'no API key yet: put it in .anthropic.key'})`);
  console.log(`Demo:     http://localhost:${PORT}/demo/game.html`);
  console.log('Ctrl+C to stop.');
});
