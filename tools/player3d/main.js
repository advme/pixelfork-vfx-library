/**
 * Pixelfork VFX — 3D player.
 * A small three.js arena to try every effect inside a real 3D game situation:
 * walls, colliders, a physics character, pushable crates (crashcat physics),
 * and see-through walls when the character walks behind them.
 *
 * Bundled by tools/build.mjs into tools/player3d.js (an ES module; crashcat is bundled in,
 * `three`, `three/addons/*` and `vfx` are resolved by the import map in preview3d.html).
 */
import {
  addBroadphaseLayer, addObjectLayer, box, capsule, cylinder, sphere, createWorld, createWorldSettings,
  enableCollision, MotionType, registerAll, rigidBody, updateWorld, DOF_TRANSLATION_ONLY,
} from 'crashcat';

// Exactly what a real 3D game does: its own `three` import and a three.js add-on, with the VFX
// library as an ES module. The page's import map makes all three share ONE copy of three.js.
import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import VFX from 'vfx';

window.VFX = VFX;                                   // for the console and for testing
if (VFX.THREE.Scene !== T.Scene) console.error('[player3d] three.js is NOT shared between the game and the VFX library');
const $ = (id) => document.getElementById(id);

/* =====================================================================
   three.js scene
   ===================================================================== */
const canvas = $('view');
const renderer = new T.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new T.Scene();
scene.background = new T.Color('#1d2740');
scene.fog = new T.Fog('#1d2740', 30, 70);
const camera = new T.PerspectiveCamera(50, 1, 0.1, 120);

scene.add(new T.HemisphereLight('#cfe0ff', '#2a3350', 2.0));
const sun = new T.DirectionalLight('#fff4dd', 2.2); sun.position.set(6, 10, 5); scene.add(sun);

const ARENA = 12;            // half size of the floor
const WALL_H = 3.2, WALL_T = 0.6;

/* ---------- see-through walls ----------
   ONLY the walls (and their caps) get this material patch; blocks, trees and
   crates inside the arena stay solid (owner's call, 2026-09-19). In the
   fragment shader, pixels that are IN FRONT of the character and close to
   them on screen fade out with a soft gradient, opening a round window. */
const hole = { uHero: { value: new T.Vector3(-9999, -9999, 0) }, uHoleR: { value: 1 } };
function seeThrough(material) {
  material.transparent = true;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uHero = hole.uHero;
    shader.uniforms.uHoleR = hole.uHoleR;
    shader.fragmentShader = shader.fragmentShader
      .replace('void main() {', 'uniform vec3 uHero;\nuniform float uHoleR;\nvoid main() {')
      .replace('#include <dithering_fragment>', `#include <dithering_fragment>
        {
          float d = distance(gl_FragCoord.xy, uHero.xy);
          float inFront = step(vViewPosition.z, uHero.z - 0.45);
          float a = mix(1.0, smoothstep(uHoleR * 0.5, uHoleR, d), inFront);
          if (a < 0.04) discard;               // the clear centre also lets effects show through
          gl_FragColor.a *= a;
        }`);
  };
  return material;
}

/* =====================================================================
   crashcat physics world
   ===================================================================== */
registerAll();
const settings = createWorldSettings();
const BP_MOVING = addBroadphaseLayer(settings);
const BP_STATIC = addBroadphaseLayer(settings);
const L_MOVING = addObjectLayer(settings, BP_MOVING);
const L_STATIC = addObjectLayer(settings, BP_STATIC);
enableCollision(settings, L_MOVING, L_STATIC);
enableCollision(settings, L_MOVING, L_MOVING);
settings.gravity = [0, -20, 0];
const world = createWorld(settings);

const dynamics = [];          // { body, mesh, home:[x,y,z], lastV:[..] }

function staticBox(x, y, z, hx, hy, hz) {
  rigidBody.create(world, { motionType: MotionType.STATIC, objectLayer: L_STATIC, shape: box.create({ halfExtents: [hx, hy, hz] }), position: [x, y, z], friction: 0.8 });
}
function staticCylinder(x, y, z, r, hh) {
  rigidBody.create(world, { motionType: MotionType.STATIC, objectLayer: L_STATIC, shape: cylinder.create({ halfHeight: hh, radius: r }), position: [x, y, z], friction: 0.8 });
}

/* ---------- floor ---------- */
const floor = new T.Mesh(new T.PlaneGeometry(ARENA * 2, ARENA * 2), new T.MeshStandardMaterial({ color: '#34406a', roughness: 1 }));
floor.rotation.x = -Math.PI / 2; scene.add(floor);
const grid = new T.GridHelper(ARENA * 2, ARENA * 2, '#4a5a90', '#3a4675'); grid.position.y = 0.003; grid.material.transparent = true; grid.material.opacity = 0.5; scene.add(grid);
staticBox(0, -0.5, 0, ARENA + 2, 0.5, ARENA + 2);

/* ---------- walls around the arena ---------- */
const clickable = [floor];
const wallMat = () => seeThrough(new T.MeshStandardMaterial({ color: '#5a6796', roughness: 0.95 }));
function wall(x, z, w, d) {
  const m = new T.Mesh(new T.BoxGeometry(w, WALL_H, d), wallMat());
  m.position.set(x, WALL_H / 2, z); scene.add(m); clickable.push(m);
  // a lighter cap so the wall reads as a wall
  const cap = new T.Mesh(new T.BoxGeometry(w + 0.12, 0.18, d + 0.12), seeThrough(new T.MeshStandardMaterial({ color: '#8492c4', roughness: 0.8 })));
  cap.position.set(x, WALL_H + 0.09, z); scene.add(cap);
  staticBox(x, WALL_H / 2, z, w / 2, WALL_H / 2, d / 2);
}
const span = ARENA * 2 + WALL_T;
wall(0, -ARENA, span, WALL_T); wall(0, ARENA, span, WALL_T);
wall(-ARENA, 0, WALL_T, span); wall(ARENA, 0, WALL_T, span);
// an inner wall to hide behind
wall(-2.5, -5, 6, WALL_T);

/* ---------- static props (all colliders) ---------- */
function block(x, z, w, h, d, color) {
  const m = new T.Mesh(new T.BoxGeometry(w, h, d), new T.MeshStandardMaterial({ color, roughness: 0.9 }));
  m.position.set(x, h / 2, z); scene.add(m); clickable.push(m);
  staticBox(x, h / 2, z, w / 2, h / 2, d / 2);
}
function tree(x, z) {
  const trunk = new T.Mesh(new T.CylinderGeometry(0.16, 0.22, 1.0, 8), new T.MeshStandardMaterial({ color: '#7a5a3a' }));
  trunk.position.set(x, 0.5, z);
  const top = new T.Mesh(new T.ConeGeometry(1.0, 2.4, 10), new T.MeshStandardMaterial({ color: '#3f9d6b', roughness: 1 }));
  top.position.set(x, 2.1, z);
  scene.add(trunk, top); clickable.push(trunk, top);
  staticCylinder(x, 0.5, z, 0.24, 0.5);          // trunk
  staticCylinder(x, 1.5, z, 0.6, 0.55);          // lower branches, so the hero cannot walk through the leaves
}
block(4, -2, 1.4, 2.6, 1.4, '#6b7aa8'); block(-5, 2.5, 2.0, 1.0, 2.0, '#a8786b'); block(6.5, 5.5, 3.0, 0.6, 1.6, '#a8786b');
tree(7.5, -6.5); tree(-8, -7.5); tree(-7.5, 7); tree(2.5, 8);

/* ---------- small dynamic objects ---------- */
const CRATE = ['#e0a458', '#d98c45', '#c97b3a', '#e8b96a'];
function crate(x, y, z, s, colorIndex) {
  // a three.js ADD-ON geometry: proof that add-ons and the VFX library share one three.js
  const mesh = new T.Mesh(new RoundedBoxGeometry(s, s, s, 3, s * 0.08), new T.MeshStandardMaterial({ color: CRATE[colorIndex % CRATE.length], roughness: 0.85 }));
  scene.add(mesh); clickable.push(mesh);
  const body = rigidBody.create(world, { motionType: MotionType.DYNAMIC, objectLayer: L_MOVING, shape: box.create({ halfExtents: [s / 2, s / 2, s / 2], convexRadius: 0.02 }), position: [x, y, z], mass: 4 * s * s * s / 0.125, friction: 0.6, restitution: 0.1, linearDamping: 0.1, angularDamping: 0.2 });
  const d = { body, mesh, home: [x, y, z], lastV: [0, 0, 0], kind: 'crate', cool: 0 }; mesh.userData.dyn = d; dynamics.push(d); return d;
}
function ball(x, y, z, r, color) {
  const mesh = new T.Mesh(new T.SphereGeometry(r, 20, 16), new T.MeshStandardMaterial({ color, roughness: 0.4 }));
  scene.add(mesh); clickable.push(mesh);
  const body = rigidBody.create(world, { motionType: MotionType.DYNAMIC, objectLayer: L_MOVING, shape: sphere.create({ radius: r }), position: [x, y, z], mass: 1.5, friction: 0.5, restitution: 0.6, linearDamping: 0.15, angularDamping: 0.3 });
  const d = { body, mesh, home: [x, y, z], lastV: [0, 0, 0], kind: 'ball', cool: 0 }; mesh.userData.dyn = d; dynamics.push(d); return d;
}
// a stack to knock over
for (let row = 0; row < 3; row++) for (let i = 0; i < 3 - row; i++) crate(-1 + i * 0.62 + row * 0.31, 0.3 + row * 0.6, 3.5, 0.6, row + i);
// loose crates and balls
crate(2.5, 0.25, 1.5, 0.5, 1); crate(3.2, 0.2, 2.4, 0.4, 2); crate(-3, 0.35, -1.5, 0.7, 3); crate(1, 0.2, -3, 0.4, 0); crate(5.5, 0.25, -5.5, 0.5, 2);
ball(0.5, 0.35, 5.5, 0.35, '#ff5c8a'); ball(-4.5, 0.3, 5, 0.3, '#4fd1ff'); ball(4.5, 0.4, 3.5, 0.4, '#7cf07c');

/* ---------- real physics debris ----------
   Effects that throw chunks are played with { debris: false } (no particle
   chunks) and the player spawns crashcat bodies instead: they collide, tumble,
   settle on the floor, can be pushed, and fade away after a few seconds. */
const DEBRIS = {
  'hit.block':         { n: [8, 12],  size: [0.12, 0.30], shape: 'plank', color: ['#c68a4b', '#8f5e2c'], speed: [2.5, 5.5],  tintable: true },
  'explosion.small':   { n: [8, 11],  size: [0.12, 0.26], shape: 'box',   color: ['#5a3a2a', '#2e1d15'], speed: [3, 6.5] },
  'explosion.big':     { n: [16, 22], size: [0.14, 0.34], shape: 'box',   color: ['#5a3a2a', '#2e1d15'], speed: [4, 8.5] },
  'explosion.fireball':{ n: [5, 8],   size: [0.10, 0.22], shape: 'box',   color: ['#3a2a22', '#1e1511'], speed: [3, 7] },
  'explosion.nuke':    { n: [34, 40], size: [0.18, 0.44], shape: 'box',   color: ['#5a3a2a', '#2e1d15'], speed: [6, 13] },
  'magic.ice':         { n: [9, 13],  size: [0.12, 0.28], shape: 'shard', color: ['#d8f5ff', '#8fe3ff'], speed: [3, 8],  tintable: true, emissive: 0.35 },
  'hit.shieldbreak':   { n: [10, 14], size: [0.12, 0.30], shape: 'shard', color: ['#cfe9ff', '#6fc3ff'], speed: [3, 8],  tintable: true, emissive: 0.35 },
};
const MAX_DEBRIS = 90;
const debris = [];            // { body, mesh, age, life }
const debrisGeo = { box: new T.BoxGeometry(1, 1, 1), plank: new T.BoxGeometry(1.8, 0.4, 0.8), shard: new T.BoxGeometry(0.45, 1.5, 0.3) };
const debrisHalf = { box: [0.5, 0.5, 0.5], plank: [0.9, 0.2, 0.4], shard: [0.225, 0.75, 0.15] };
const debrisMats = new Map();
function debrisMat(hex, emissive) {
  const key = hex + '|' + (emissive || 0);
  if (!debrisMats.has(key)) debrisMats.set(key, new T.MeshStandardMaterial({ color: hex, roughness: 0.85, emissive: emissive ? hex : '#000', emissiveIntensity: emissive || 0 }));
  return debrisMats.get(key);
}
const rnd = (a, b) => a + Math.random() * (b - a);
function removeDebris(d) { rigidBody.remove(world, d.body); scene.remove(d.mesh); }
function spawnDebris(name, p, size, tint) {
  const spec = DEBRIS[name]; if (!spec) return;
  const count = Math.round(rnd(spec.n[0], spec.n[1]));
  for (let i = 0; i < count; i++) {
    if (debris.length >= MAX_DEBRIS) removeDebris(debris.shift());
    const s = rnd(spec.size[0], spec.size[1]) * size, h = debrisHalf[spec.shape];
    const hex = spec.tintable && tint ? tint : spec.color[i % spec.color.length];
    const mesh = new T.Mesh(debrisGeo[spec.shape], debrisMat(hex, spec.emissive));
    mesh.scale.setScalar(s); scene.add(mesh);
    // born in a small ball around the point, flying outward and up
    const a = Math.random() * Math.PI * 2, up = rnd(0.35, 1), v = rnd(spec.speed[0], spec.speed[1]), r = 0.25 * size;
    const dx = Math.cos(a) * Math.sqrt(1 - up * up * 0.6), dz = Math.sin(a) * Math.sqrt(1 - up * up * 0.6);
    const q = new T.Quaternion().setFromEuler(new T.Euler(rnd(0, 6.28), rnd(0, 6.28), rnd(0, 6.28)));
    const body = rigidBody.create(world, {
      motionType: MotionType.DYNAMIC, objectLayer: L_MOVING,
      shape: box.create({ halfExtents: [h[0] * s, h[1] * s, h[2] * s], convexRadius: Math.min(0.02, h[2] * s * 0.5) }),
      position: [p.x + dx * r, Math.max(0.15, p.y + rnd(-0.1, 0.3) * size), p.z + dz * r], quaternion: [q.x, q.y, q.z, q.w],
      mass: 0.4, friction: 0.7, restitution: 0.25, linearDamping: 0.05, angularDamping: 0.15,
    });
    rigidBody.setLinearVelocity(world, body, [dx * v, up * v, dz * v]);
    rigidBody.setAngularVelocity(world, body, [rnd(-12, 12), rnd(-12, 12), rnd(-12, 12)]);
    debris.push({ body, mesh, age: 0, life: rnd(4, 6.5), s });
  }
}
function updateDebris(dt) {
  for (let i = debris.length - 1; i >= 0; i--) {
    const d = debris[i]; d.age += dt;
    const p = d.body.position, q = d.body.quaternion;
    d.mesh.position.set(p[0], p[1], p[2]); d.mesh.quaternion.set(q[0], q[1], q[2], q[3]);
    const left = d.life - d.age;
    if (left < 0.6) d.mesh.scale.setScalar(d.s * Math.max(0.001, left / 0.6));     // shrink away
    if (left <= 0 || p[1] < -5) { removeDebris(d); debris.splice(i, 1); }
  }
}

/* ---------- the character: a dynamic capsule that cannot tip over ---------- */
const HERO_R = 0.42, HERO_HH = 0.43, HERO_C = HERO_R + HERO_HH;       // capsule centre height when standing
const heroBody = rigidBody.create(world, {
  motionType: MotionType.DYNAMIC, objectLayer: L_MOVING,
  shape: capsule.create({ halfHeightOfCylinder: HERO_HH, radius: HERO_R }),
  position: [0, HERO_C + 0.02, 0], mass: 60, friction: 0, restitution: 0,
  allowedDegreesOfFreedom: DOF_TRANSLATION_ONLY, allowSleeping: false, linearDamping: 0,
});
const hero = new T.Group();
const bodyMesh = new T.Mesh(new T.CapsuleGeometry(HERO_R, HERO_HH * 2, 8, 20), new T.MeshStandardMaterial({ color: '#ff8c42', roughness: 0.6 }));
bodyMesh.position.y = HERO_C; hero.add(bodyMesh);
const eyeM = new T.MeshStandardMaterial({ color: '#222' });
[-0.16, 0.16].forEach((x) => { const e = new T.Mesh(new T.SphereGeometry(0.07, 12, 12), eyeM); e.position.set(x, 1.25, 0.38); hero.add(e); });
scene.add(hero);
const blob = new T.Mesh(new T.CircleGeometry(0.55, 24), new T.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.28, depthWrite: false }));
blob.rotation.x = -Math.PI / 2; blob.position.y = 0.01; scene.add(blob);
const aHead = new T.Object3D(); aHead.position.y = 2.05; hero.add(aHead);
const aChest = new T.Object3D(); aChest.position.y = 0.95; hero.add(aChest);
const aFeet = new T.Object3D(); aFeet.position.y = 0.06; hero.add(aFeet);

// ground: flat rings and magic circles lie on the floor. soft: smoke fades where it meets geometry (needs VFX.prepass() each frame).
VFX.useScene({ scene, camera, renderer, characterHeight: 1.7, ground: 0, soft: true });

/* =====================================================================
   camera
   ===================================================================== */
const cam = { theta: 0.6, phi: 1.0, dist: 11, target: new T.Vector3(0, 1, 0), auto: false };
function placeCamera() {
  const sp = Math.sin(cam.phi), cp = Math.cos(cam.phi);
  camera.position.set(cam.target.x + cam.dist * sp * Math.sin(cam.theta), cam.target.y + cam.dist * cp, cam.target.z + cam.dist * sp * Math.cos(cam.theta));
  camera.lookAt(cam.target);
}
function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  const off = $('panel').offsetWidth || 0;       // keep the action centred right of the panel
  camera.setViewOffset(innerWidth + off, innerHeight, 0, 0, innerWidth, innerHeight);
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

let drag = null;
canvas.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY, moved: 0 }; canvas.setPointerCapture(e.pointerId); canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
  if (drag.moved > 5) { cam.theta -= dx * 0.006; cam.phi = Math.max(0.12, Math.min(1.5, cam.phi - dy * 0.005)); setAuto(false); }
});
canvas.addEventListener('pointerup', (e) => { canvas.classList.remove('drag'); const d = drag; drag = null; if (d && d.moved <= 5) clickAt(e); });
canvas.addEventListener('wheel', (e) => { e.preventDefault(); cam.dist = Math.max(4, Math.min(30, cam.dist * (1 + e.deltaY * 0.001))); }, { passive: false });
function setAuto(v) { cam.auto = v; $('spin').classList.toggle('on', v); }

/* =====================================================================
   input + character control
   ===================================================================== */
const keys = {};
const H = { face: 0, grounded: 0, wasAir: false, airVy: 0 };
addEventListener('keydown', (e) => {
  if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
  keys[e.key.toLowerCase()] = true;
  if (e.key === ' ' && H.grounded >= 3) {
    const v = heroBody.motionProperties.linearVelocity;
    rigidBody.setLinearVelocity(world, heroBody, [v[0], 8.2, v[2]]);
    H.grounded = 0;
    VFX.play('move.jump', { position: aFeet, size: 0.9 });
  }
  if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault();
});
addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });

const fwd = new T.Vector3(), right = new T.Vector3();
function driveHero(dt) {
  const ix = (keys['arrowright'] || keys['d'] ? 1 : 0) - (keys['arrowleft'] || keys['a'] ? 1 : 0);
  const iz = (keys['arrowup'] || keys['w'] ? 1 : 0) - (keys['arrowdown'] || keys['s'] ? 1 : 0);
  fwd.set(-Math.sin(cam.theta), 0, -Math.cos(cam.theta)); right.set(-fwd.z, 0, fwd.x);
  let tx = right.x * ix + fwd.x * iz, tz = right.z * ix + fwd.z * iz;
  const len = Math.hypot(tx, tz) || 1, speed = (ix || iz) ? 5.2 : 0;
  tx = (tx / len) * speed; tz = (tz / len) * speed;
  const v = heroBody.motionProperties.linearVelocity;
  const k = Math.min(1, dt * (H.grounded >= 3 ? 12 : 5));          // less control in the air
  rigidBody.setLinearVelocity(world, heroBody, [v[0] + (tx - v[0]) * k, v[1], v[2] + (tz - v[2]) * k]);
}

/* =====================================================================
   panel
   ===================================================================== */
const list = $('list');
const sizeEl = $('size'), sizeVal = $('sizeVal'), tintEl = $('tint'), tintOn = $('tintOn');
let useTint = false, realDebris = true, selected = VFX.list()[0];
const loops = {};
const SCREEN = (e) => e.category === 'ui';                       // only real UI feedback stays on the screen
const AREA = (e) => e.category === 'env' || ['reward.coinshower', 'reward.clear'].includes(e.name);   // world volumes that follow the camera's focus
const HEAD = ['state.stun', 'state.sleep', 'state.love', 'state.rage'];
const FEET = ['move.jump', 'move.footstep', 'move.land', 'move.dust', 'move.skid', 'move.splash', 'magic.summon', 'move.spawn', 'move.teleport', 'state.dome', 'state.domebreak', 'hit.dirt', 'world.campfire', 'weapon.smoke', 'move.doublejump', 'reward.checkpoint'];

$('ver').textContent = 'v' + VFX.VERSION;
sizeEl.oninput = () => (sizeVal.textContent = Number(sizeEl.value).toFixed(1));
tintOn.onclick = () => { useTint = !useTint; tintOn.classList.toggle('on', useTint); };
$('stopAll').onclick = () => { VFX.stopAll(); Object.keys(loops).forEach((k) => delete loops[k]); refresh(); };
$('slow').onclick = (e) => { VFX.timeScale = VFX.timeScale === 1 ? 0.2 : 1; e.target.classList.toggle('on', VFX.timeScale !== 1); };
$('spin').onclick = () => setAuto(!cam.auto);
$('topdown').onclick = () => { cam.phi = 0.14; setAuto(false); };
$('side').onclick = () => { cam.phi = 1.35; setAuto(false); };
$('reset').onclick = resetObjects;
$('debris').onclick = (e) => { realDebris = !realDebris; e.target.classList.toggle('on', realDebris); };

function opts(extra) { const o = Object.assign({ size: Number(sizeEl.value) }, extra || {}); if (useTint) o.tint = tintEl.value; return o; }
function anchorFor(name) { if (HEAD.includes(name)) return aHead; if (FEET.includes(name)) return aFeet; return aChest; }

/** Opposite of where the character is facing: the way speed lines and dash streaks fly. */
function backward() { return new T.Vector3(-Math.sin(H.face), 0, -Math.cos(H.face)); }

function playSelected(point, normal) {
  const meta = VFX.registry.find((e) => e.name === selected);
  if (meta.loop) {
    if (loops[selected]) { loops[selected].stop(); delete loops[selected]; refresh(); return; }
    if (SCREEN(meta)) loops[selected] = VFX.play(selected, opts({ follow: aChest, width: 140, height: 60 }));
    else if (AREA(meta)) loops[selected] = VFX.play(selected, opts());          // weather: a volume in the world, centred where the camera looks
    else loops[selected] = VFX.play(selected, opts({ follow: anchorFor(selected), direction: selected === 'move.speed' ? backward() : undefined }));
    refresh(); return;
  }
  if (SCREEN(meta)) { VFX.play(selected, opts(selected === 'ui.flash' ? {} : { position: point || aChest, width: 140, height: 60 })); return; }
  if (AREA(meta)) { VFX.play(selected, opts(point ? { position: new T.Vector3(point.x, 0, point.z) } : {})); return; }
  const at = point || (selected === 'explosion.nuke' ? aFeet : anchorFor(selected));
  const p = at.isObject3D ? at.getWorldPosition(new T.Vector3()) : at;
  const s = Number(sizeEl.value);
  // effects that throw chunks: the particles stay, the chunks become real physics bodies
  const real = !!DEBRIS[selected] && realDebris;
  // sprays fly away from the surface that was clicked (blood off a wall, confetti off the floor)
  let direction;
  if (normal && ['hit.blood', 'reward.confetti', 'hit.parry'].includes(selected)) direction = normal.clone().multiplyScalar(0.7).add(new T.Vector3(0, 0.8, 0));
  if (selected === 'move.dash') direction = backward();          // streaks fly opposite to where the character faces
  VFX.play(selected, opts({ position: at, debris: real ? false : undefined, direction }));
  if (real) spawnDebris(selected, p, s, useTint ? tintEl.value : null);
  // explosions and heavy hits really push things
  if (selected === 'explosion.nuke') blast(p, 30, 12);
  else if (selected === 'explosion.big') blast(p, 6 * s, 9);
  else if (selected.startsWith('explosion.')) blast(p, 3.5 * s, 5.5);
  else if (['hit.punch', 'hit.crit', 'move.land', 'magic.lightning'].includes(selected)) blast(p, 2 * s, 3);
}

function refresh() {
  list.innerHTML = ''; let lastCat = null;
  VFX.registry.forEach((e) => {
    if (e.category !== lastCat) { lastCat = e.category; const h = document.createElement('div'); h.className = 'muted'; h.style.margin = '12px 0 4px'; h.textContent = e.category + '.*'; list.appendChild(h); }
    const row = document.createElement('div');
    row.className = 'fx' + (e.name === selected ? ' sel' : '');
    row.innerHTML = `<code>${e.name}</code>${SCREEN(e) ? '<span class="tag scr">SCREEN</span>' : ''}${e.loop ? '<span class="tag loop">LOOP</span>' : ''}<button>${e.loop ? (loops[e.name] ? 'Stop' : 'Start') : 'Play'}</button>`;
    row.title = e.whenToUse;
    row.onclick = () => { selected = e.name; refresh(); };
    row.querySelector('button').onclick = (ev) => { ev.stopPropagation(); selected = e.name; playSelected(); refresh(); };
    list.appendChild(row);
  });
}
refresh();

$('playAll').onclick = async () => {
  for (const e of VFX.registry.filter((x) => !x.loop)) { selected = e.name; refresh(); playSelected(); await new Promise((r) => setTimeout(r, ((e.duration + 0.4) * 1000) / VFX.timeScale)); }
};

/* =====================================================================
   physics helpers
   ===================================================================== */
/** Push every dynamic object away from a point. */
function blast(p, radius, power) {
  dynamics.concat(debris).forEach((d) => {
    const bp = d.body.position, dx = bp[0] - p.x, dy = bp[1] - p.y + 0.4, dz = bp[2] - p.z;
    const dist = Math.hypot(dx, dy, dz);
    if (dist > radius) return;
    const f = (1 - dist / radius) * power / (dist || 1), m = 1 / d.body.motionProperties.invMass;
    rigidBody.addImpulse(world, d.body, [dx * f * m, (dy * f + power * 0.35 * (1 - dist / radius)) * m, dz * f * m]);
    rigidBody.setAngularVelocity(world, d.body, [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8]);
  });
}
function resetObjects() {
  while (debris.length) removeDebris(debris.pop());
  dynamics.forEach((d) => { rigidBody.setTransform(world, d.body, d.home, [0, 0, 0, 1], true); rigidBody.setLinearVelocity(world, d.body, [0, 0, 0]); rigidBody.setAngularVelocity(world, d.body, [0, 0, 0]); });
  rigidBody.setPosition(world, heroBody, [0, HERO_C + 0.02, 0], true); rigidBody.setLinearVelocity(world, heroBody, [0, 0, 0]);
}

/* ---------- click: place an effect, or kick a crate ---------- */
const ray = new T.Raycaster(), ndc = new T.Vector2();
function clickAt(e) {
  const r = canvas.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hits = ray.intersectObjects([bodyMesh, ...clickable], false);
  if (!hits.length) return;
  const hit = hits[0];
  if (hit.object === bodyMesh) { playSelected(); return; }
  const n = hit.face ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld) : new T.Vector3(0, 1, 0);
  const p = hit.point.clone().addScaledVector(n, 0.06);
  const dyn = hit.object.userData.dyn;
  if (dyn) {   // kick it away from the camera
    const dir = ray.ray.direction, m = 1 / dyn.body.motionProperties.invMass;
    rigidBody.addImpulseAtPosition(world, dyn.body, [dir.x * 7 * m, (dir.y * 7 + 3.5) * m, dir.z * 7 * m], [hit.point.x, hit.point.y, hit.point.z]);
  }
  playSelected(p, n);
}

/* =====================================================================
   main loop
   ===================================================================== */
const PHYS_DT = 1 / 60;
let acc = 0, last = performance.now(), frames = 0, fpsT = last, fps = 0;
const tmp = new T.Vector3(), tmp2 = new T.Vector3();

function physicsStep() {
  driveHero(PHYS_DT);
  updateWorld(world, undefined, PHYS_DT);
  // grounded = vertical speed has been ~0 for a few steps (works on crates too)
  const vy = heroBody.motionProperties.linearVelocity[1];
  if (Math.abs(vy) < 0.25) H.grounded++; else { H.grounded = 0; H.wasAir = true; H.airVy = vy; }
  updateDebris(PHYS_DT);
  if (H.grounded === 3 && H.wasAir) { H.wasAir = false; if (H.airVy < -4) VFX.play('move.land', { position: aFeet, size: 0.8 }); }
  // a crate or ball that stops suddenly has hit something: a little dust + thump
  dynamics.forEach((d) => {
    const v = d.body.motionProperties.linearVelocity, lv = d.lastV;
    const dv = Math.hypot(v[0] - lv[0], v[1] - lv[1], v[2] - lv[2]);
    d.cool -= PHYS_DT;
    if (dv > 3.2 && d.cool <= 0) { d.cool = 0.25; VFX.play(d.kind === 'ball' ? 'ui.tap' : 'move.footstep', { position: d.mesh.position, size: Math.min(1.6, 0.5 + dv * 0.08), space: 'world' }); }
    lv[0] = v[0]; lv[1] = v[1]; lv[2] = v[2];
    if (d.body.position[1] < -5) { rigidBody.setTransform(world, d.body, d.home, [0, 0, 0, 1], true); rigidBody.setLinearVelocity(world, d.body, [0, 0, 0]); }
  });
}

function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.1); last = now;
  acc += dt; let steps = 0;
  while (acc >= PHYS_DT && steps < 5) { physicsStep(); acc -= PHYS_DT; steps++; }
  if (steps === 5) acc = 0;
  draw(dt, now);
  requestAnimationFrame(frame);
}

function draw(dt, now) {

  // meshes follow bodies
  const hp = heroBody.position;
  hero.position.set(hp[0], hp[1] - HERO_C, hp[2]);
  const hv = heroBody.motionProperties.linearVelocity;
  if (Math.hypot(hv[0], hv[2]) > 0.4) { const want = Math.atan2(hv[0], hv[2]); let d = want - H.face; d = Math.atan2(Math.sin(d), Math.cos(d)); H.face += d * Math.min(1, dt * 12); hero.rotation.y = H.face; }
  dynamics.forEach((d) => { const p = d.body.position, q = d.body.quaternion; d.mesh.position.set(p[0], p[1], p[2]); d.mesh.quaternion.set(q[0], q[1], q[2], q[3]); });
  blob.position.set(hero.position.x, 0.012, hero.position.z); blob.scale.setScalar(1 / (1 + Math.max(0, hero.position.y) * 0.35));

  // speed lines keep streaming behind the character as they turn
  if (loops['move.speed'] && Math.hypot(hv[0], hv[2]) > 0.5) loops['move.speed'].aim(tmp.set(-hv[0], 0, -hv[2]));

  if (cam.auto) cam.theta += dt * 0.35;
  tmp.set(hero.position.x, 1 + Math.max(0, hero.position.y) * 0.5, hero.position.z);
  cam.target.lerp(tmp, Math.min(1, dt * 5));
  placeCamera();
  camera.updateMatrixWorld();

  // where the character is on screen (drawing-buffer pixels) and how far away,
  // for the see-through window in walls and props
  aChest.getWorldPosition(tmp); tmp2.copy(tmp).applyMatrix4(camera.matrixWorldInverse);
  const depth = -tmp2.z;
  tmp.project(camera);
  const bw = renderer.domElement.width, bh = renderer.domElement.height;
  hole.uHero.value.set((tmp.x * 0.5 + 0.5) * bw, (tmp.y * 0.5 + 0.5) * bh, depth);
  // the window is about 1.6 character heights wide on screen
  const pxPerUnit = bh / (2 * Math.tan((camera.fov * Math.PI) / 360) * Math.max(0.5, depth));
  hole.uHoleR.value = pxPerUnit * 1.7;

  VFX.prepass();                        // depth of the world, for soft particles
  renderer.render(scene, camera);

  frames++; if (now - fpsT > 500) { fps = Math.round((frames * 1000) / (now - fpsT)); frames = 0; fpsT = now; }
  let particles = 0; VFX._state.active.forEach((h) => h.systems.forEach((s) => (particles += s.particleNum)));
  $('stats').textContent = `${fps} fps · ${VFX.active} effects · ${particles} particles · ${dynamics.length + debris.length} physics objects`;
}
requestAnimationFrame(frame);

/** Testing hook: advance the whole player by `sec` seconds without waiting for animation frames. */
function advance(sec) {
  for (let t = 0; t < sec; t += PHYS_DT) { physicsStep(); VFX.update(PHYS_DT); draw(PHYS_DT, performance.now()); }
}

// for debugging from the console
function teleport(x, z) { rigidBody.setPosition(world, heroBody, [x, HERO_C + 0.02, z], true); rigidBody.setLinearVelocity(world, heroBody, [0, 0, 0]); }
// the VFX Maker drives this page when it is shown inside it (tools/maker/hook.js)
if (window.vfxMakerHook) window.vfxMakerHook({
  VFX,
  select: (name) => { selected = name; refresh(); },
  play: () => playSelected(),
  stopAll: () => { VFX.stopAll(); Object.keys(loops).forEach((k) => delete loops[k]); },
  onCategory: (e) => { if (e.category === 'move' && !FEET.includes(e.name)) FEET.push(e.name); },
});

window.player3d = { world, heroBody, hero, cam, dynamics, scene, camera, renderer, anchors: { aHead, aChest, aFeet }, blast, resetObjects, placeCamera, hole, teleport, rigidBody, advance, keys, debris, spawnDebris, playAt: (name, pt, n) => { selected = name; playSelected(pt, n); }, loops, select: (name) => { selected = name; }, playSelected };
