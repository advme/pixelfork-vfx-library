#!/usr/bin/env node
/**
 * Build: bundles src + pack into dist/vfx.js, writes dist/registry.json and
 * refreshes the effect table inside AI-GUIDE.md.   node tools/build.mjs
 */
import { build } from 'esbuild';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const { EFFECTS, PACK } = await import(join(ROOT, 'packs/casual/index.js'));

/* ---- validate the pack ---- */
const seen = new Set();
for (const e of EFFECTS) {
  for (const k of ['name', 'category', 'whenToUse', 'duration']) if (e[k] === undefined) throw new Error(`${e.name || '?'}: missing "${k}"`);
  if (!/^[a-z0-9]+(\.[a-z0-9]+)+$/.test(e.name)) throw new Error(`${e.name}: names are lower-case category.thing`);
  if (e.name.split('.')[0] !== e.category) throw new Error(`${e.name}: category must be the first part of the name`);
  if (seen.has(e.name)) throw new Error(`${e.name}: duplicate`);
  seen.add(e.name);
  if (typeof e.build !== 'function') throw new Error(`${e.name}: no build()`);
}

/* ---- guard: a `//` comment in the MIDDLE of an effect line silently comments out the
   options after it (it happened: confetti lost its colours, rain its streaks) ---- */
{
  const { readdirSync } = await import('node:fs');
  const dir = join(ROOT, 'packs/casual/effects');
  const bad = [];
  for (const f of readdirSync(dir)) {
    readFileSync(join(dir, f), 'utf8').split('\n').forEach((line, i) => {
      const m = line.match(/^(\s*)(.*?)\/\/(.*)$/);
      if (!m || !m[2].trim()) return;                                   // no comment, or a whole-line comment
      if ((m[2].match(/'/g) || []).length % 2) return;                   // the // is inside a string
      if (/\b[a-zA-Z]+: (\[|c\.|\{|-?\d|')/.test(m[3])) bad.push(`${f}:${i + 1}`);
    });
  }
  if (bad.length) throw new Error('code hidden behind a mid-line // comment: ' + bad.join(', '));
}

/* ---- bundle ---- */
const banner = `/*! Pixelfork VFX Library v${pkg.version} · ${new Date().toISOString().slice(0, 10)} · three.js + three.quarks (MIT) · https://github.com/advme/pixelfork-vfx-library */`;
await build({
  entryPoints: [join(ROOT, 'src/vfx.js')],
  bundle: true,
  minify: true,
  format: 'iife',
  globalName: 'VFX',
  footer: { js: 'VFX=VFX.default;' },
  target: ['es2019'],
  define: { __VFX_VERSION__: JSON.stringify(pkg.version) },
  banner: { js: banner },
  outfile: join(ROOT, 'dist/vfx.js'),
  logLevel: 'warning',
});

/* ---- second build for 3D games: an ES module with three.js left OUT. The game and the
   library then share ONE copy of three through an import map. (Two copies do not just waste
   a download: three.quarks registers its shader chunks in the copy it imported, the game's
   renderer looks in its own, and the particle shaders fail to compile.) ---- */
await build({
  entryPoints: [join(ROOT, 'src/vfx.js')],
  bundle: true, minify: true, format: 'esm', target: ['es2020'],
  external: ['three'],
  define: { __VFX_VERSION__: JSON.stringify(pkg.version) },
  banner: { js: banner.replace('three.js + three.quarks (MIT)', 'ES module, three.js NOT included (import map) · three.quarks (MIT)') },
  outfile: join(ROOT, 'dist/vfx.module.js'),
  logLevel: 'warning',
});

/* ---- the 3D player (a tool, not part of the library): bundles crashcat physics ---- */
await build({
  entryPoints: [join(ROOT, 'tools/player3d/main.js')],
  // an ES module that shares three.js with the library through the page's import map,
  // exactly the way a real 3D game would
  bundle: true, minify: true, format: 'esm', target: ['es2020'],
  external: ['three', 'three/addons/*', 'vfx'],
  outfile: join(ROOT, 'tools/player3d.js'),
  logLevel: 'warning',
});

/* ---- registry ---- */
const registry = {
  name: PACK.name,
  version: pkg.version,
  style: PACK.style,
  script: `https://cdn.jsdelivr.net/gh/advme/pixelfork-vfx-library@v${pkg.version}-A/dist/vfx.js`,
  module: `https://cdn.jsdelivr.net/gh/advme/pixelfork-vfx-library@v${pkg.version}-A/dist/vfx.module.js`,
  moduleNeeds: 'three >= 0.182 provided by the page through an import map',
  effects: EFFECTS.map((e) => ({
    name: e.name, category: e.category, whenToUse: e.whenToUse, duration: e.duration,
    loop: !!e.loop, tint: e.tint || null, anchor: e.anchor || 'center', tags: e.tags || [], aliases: e.aliases || [],
  })),
};
writeFileSync(join(ROOT, 'dist/registry.json'), JSON.stringify(registry, null, 2) + '\n');

/* ---- AI guide table ---- */
const guidePath = join(ROOT, 'AI-GUIDE.md');
let guide = readFileSync(guidePath, 'utf8');
const groups = {};
for (const e of EFFECTS) (groups[e.category] = groups[e.category] || []).push(e);
let table = '';
for (const cat of Object.keys(groups)) {
  table += `\n**\`${cat}.*\`**\n\n| Effect | Play it when | Runs | Tint |\n|---|---|---|---|\n`;
  for (const e of groups[cat]) {
    // Runs: a one-shot's length, or "loop" (call stop()); plus where it goes when that matters
    const runs = (e.loop ? 'loop' : `${e.duration} s`) + (e.anchor === 'feet' ? ', at feet' : e.anchor === 'head' ? ', over head' : '');
    table += `| \`${e.name}\` | ${e.whenToUse} | ${runs} | ${e.tint ? `\`${e.tint}\`` : e.tint === null ? 'any' : '-'} |\n`;
  }
}
const legend = '\nRuns: how long a one-shot lasts, or `loop` (it runs until you call `stop()`), and where it belongs when that matters. Tint: its default colour (`tint` replaces it), `any` = its own palette unless you pass a tint, `-` = no tint.\n';
guide = guide.replace(/<!-- EFFECTS:START -->[\s\S]*<!-- EFFECTS:END -->/, `<!-- EFFECTS:START -->\n${legend}${table}\n<!-- EFFECTS:END -->`);
guide = guide.replace(/(\*\*)(\d+) effects(\*\*)/, `$1${EFFECTS.length} effects$3`);
writeFileSync(guidePath, guide);

{
  const m = readFileSync(join(ROOT, 'dist/vfx.module.js'));
  console.log(`dist/vfx.module.js  ${(m.length / 1024).toFixed(0)} KB  (${(gzipSync(m).length / 1024).toFixed(0)} KB gzipped)  ·  three.js not included`);
}
const size = statSync(join(ROOT, 'dist/vfx.js')).size;
const gz = gzipSync(readFileSync(join(ROOT, 'dist/vfx.js'))).length;
console.log(`dist/vfx.js  ${(size / 1024).toFixed(0)} KB  (${(gz / 1024).toFixed(0)} KB gzipped)  ·  ${EFFECTS.length} effects  ·  v${pkg.version}`);
