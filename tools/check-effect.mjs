#!/usr/bin/env node
/**
 * Check effect files without a browser:   node tools/check-effect.mjs packs/casual/effects/hit.fire.js [more files]
 *
 * For each file: the meta rules the build enforces, then build(c) in a 2D context and in a 3D
 * context, then three seconds of simulation in each. Reports errors, the peak live particle count,
 * how long a one-shot really lasts against its `duration`, and how long its stretched streaks get.
 * Exit code 1 when any file has an ERROR. WARN lines are judgement calls to look at, not failures.
 *
 * It cannot tell whether an effect LOOKS good; only the players can (tools/preview.html, preview3d.html).
 */
import * as THREE from 'three';
import * as Q from 'three.quarks';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { makeContext } from '../src/helpers.js';

const CATEGORIES = ['hit', 'explosion', 'pickup', 'reward', 'move', 'magic', 'state', 'env', 'ui', 'vehicle', 'weapon', 'gather', 'world', 'puzzle'];
const BUDGET = 300;
const material = (() => { const cache = new Map(); return (tex, blend) => { const k = tex + '|' + blend; if (!cache.has(k)) cache.set(k, new THREE.MeshBasicMaterial({ transparent: true })); return cache.get(k); }; })();

function contextFor(mode) {
  const scene = mode === 'scene';
  return makeContext({
    material, u: scene ? 0.02 : 1, tint: null, dir: undefined, mode, lit: scene, soft: false, softDistance: 0.44,
    renderOrder: scene ? 1000 : 0, direction: null, camRight: scene ? new THREE.Vector3(1, 0, 0) : null,
    view: { w: 400, h: 800 }, target: { w: 120, h: 48 },
  });
}

/** Run the systems for `seconds`; returns { peak, lastAlive (s), streak (max design px) }. */
function simulate(systems, seconds, u) {
  // three.quarks disposes a system whose top parent is not a Scene
  const root = new THREE.Scene();
  systems.forEach((s) => root.add(s.emitter));
  root.updateMatrixWorld(true);
  let peak = 0, lastAlive = 0, streak = 0;
  const dt = 1 / 60;
  for (let t = 0; t < seconds; t += dt) {
    let n = 0;
    for (const s of systems) {
      s.update(dt);
      n += s.particleNum;
      if (s.rendererSettings.renderMode === Q.RenderMode.StretchedBillBoard) {
        const es = s.rendererEmitterSettings;
        for (let i = 0; i < s.particleNum; i++) {
          const p = s.particles[i];
          const len = p.size.x * ((es.lengthFactor || 0) + p.velocity.length() * (es.speedFactor || 0));
          if (len / u > streak) streak = len / u;
        }
      }
    }
    if (n > peak) peak = n;
    if (n > 0) lastAlive = t;
  }
  return { peak, lastAlive, streak };
}

function midLineComments(text) {
  const bad = [];
  text.split('\n').forEach((line, i) => {
    const m = line.match(/^(\s*)(.*?)\/\/(.*)$/);
    if (!m || !m[2].trim() || (m[2].match(/'/g) || []).length % 2) return;
    if (/\b[a-zA-Z]+: (\[|c\.|\{|-?\d|')/.test(m[3])) bad.push(i + 1);
  });
  return bad;
}

let failed = false;
for (const file of process.argv.slice(2)) {
  const out = [];
  const err = (m) => { out.push('  ERROR ' + m); failed = true; };
  const warn = (m) => out.push('  WARN  ' + m);
  const info = (m) => out.push('  ok    ' + m);
  let effect;
  try {
    const text = readFileSync(file, 'utf8');
    const lines = midLineComments(text);
    if (lines.length) err('a // comment in the middle of line ' + lines.join(', ') + ' hides the options after it');
    if (/^\s*import\s/m.test(text)) err('effect files may not import anything');
    effect = (await import(pathToFileURL(resolve(file)).href + '?t=' + process.hrtime.bigint())).default;
    if (/tint:\s*'#/.test(text) && !/c\.color\(/.test(text)) err('has a default tint but never calls c.color(), so tint will not work');
  } catch (e) { err('cannot load: ' + e.message); console.log(file + '\n' + out.join('\n')); continue; }

  for (const k of ['name', 'category', 'whenToUse', 'duration']) if (effect[k] === undefined) err('missing "' + k + '"');
  if (!/^[a-z0-9]+(\.[a-z0-9]+)+$/.test(effect.name || '')) err('name must be lower-case category.thing');
  else if (effect.name.split('.')[0] !== effect.category) err('category must be the first part of the name');
  if (!CATEGORIES.includes(effect.category)) warn('unusual category "' + effect.category + '" (known: ' + CATEGORIES.join(' ') + ')');
  if (typeof effect.build !== 'function') err('no build(c)');
  if (!Array.isArray(effect.tags) || effect.tags.length < 3) warn('give 4-8 tags');

  for (const mode of ['overlay', 'scene']) {
    const label = mode === 'scene' ? '3D' : '2D';
    let systems;
    try {
      systems = effect.build(contextFor(mode)).filter(Boolean);
    } catch (e) { err(label + ' build failed: ' + e.message); continue; }
    if (!systems.length) { err(label + ' build returned no systems'); continue; }
    if (effect.loop) {
      const notLooping = systems.filter((s) => !s.looping).length;
      if (notLooping) warn(label + ': ' + notLooping + ' system(s) not looping in a loop effect (fine only for a deliberate intro)');
    }
    try {
      const u = mode === 'scene' ? 0.02 : 1;
      const r = simulate(systems, effect.loop ? 3 : Math.max(3, (effect.duration || 1) + 1.5), u);
      const parts = [systems.length + ' systems', 'peak ' + r.peak + ' particles'];
      if (!effect.loop) parts.push('lasts ' + r.lastAlive.toFixed(2) + ' s (duration ' + effect.duration + ')');
      if (r.streak) parts.push('longest streak ' + Math.round(r.streak) + ' px');
      info(label + ': ' + parts.join(', '));
      if (r.peak === 0) err(label + ': no particle ever appears');
      if (r.peak > BUDGET) warn(label + ': ' + r.peak + ' particles at peak, over the ~' + BUDGET + ' budget');
      if (!effect.loop && effect.duration && Math.abs(r.lastAlive - effect.duration) > Math.max(0.25, effect.duration * 0.4)) warn(label + ': really lasts ' + r.lastAlive.toFixed(2) + ' s; set duration close to that');
      if (r.streak > 700) warn(label + ': a stretched streak reaches ' + Math.round(r.streak) + ' px (streaks trail BACK from the particle; is that meant?)');
    } catch (e) { err(label + ' simulation failed: ' + e.message); }
  }
  console.log(file + '  [' + (effect.name || '?') + ']\n' + out.join('\n'));
}
process.exit(failed ? 1 : 0);
