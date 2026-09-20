/**
 * Pixelfork VFX Library — runtime.
 *
 *   <script src=".../dist/vfx.js"></script>
 *   VFX.play('hit.impact', { x: 120, y: 340 });
 *
 * Two modes, same names, same calls:
 *   overlay (default)  the library draws on its own transparent canvases over
 *                      the whole page: a 'front' layer above everything and an
 *                      optional 'back' layer (play(name, { layer: 'back' }))
 *                      that sits below positioned page content, so an effect
 *                      can go behind a DOM character or the UI. Works over any
 *                      engine (canvas 2D, Phaser, PixiJS, Babylon, DOM).
 *                      Positions are CSS pixels.
 *   scene              VFX.useScene({scene, camera, renderer}) puts world
 *                      effects inside a three.js game at 3D positions, turned
 *                      to face the camera, hidden behind geometry. Screen
 *                      effects (env.*, ui.*) still draw on the overlay.
 *
 * Built on three.js + three.quarks (bundled). Nothing is loaded at runtime:
 * every particle picture is drawn in code when the library starts.
 */
import * as THREE from 'three';
import * as Q from 'three.quarks';
import { makeTextures } from './textures.js';
import { makeContext, makeMaterialCache, hexToRgb } from './helpers.js';
import { EFFECTS } from '../packs/casual/index.js';

const VERSION = typeof __VFX_VERSION__ !== 'undefined' ? __VFX_VERSION__ : 'dev';
const MAX_ACTIVE = 32;          // concurrent effects; oldest one-shot is dropped past this
const MAX_DT = 1 / 20;          // clamp a hitch so effects never explode after a stall

// three.quarks' soft-particle chunk multiplies colour AND alpha by the fade,
// which draws a dark fringe on light smoke where it meets the floor. Fade alpha only.
if (THREE.ShaderChunk.soft_fragment) THREE.ShaderChunk.soft_fragment = THREE.ShaderChunk.soft_fragment.replace('gl_FragColor *= softParticlesFade;', 'gl_FragColor.a *= softParticlesFade;');

const registry = {};
const ALL = EFFECTS.slice();    // the pack, plus anything added with VFX.register()
EFFECTS.forEach((e) => { registry[e.name] = e; (e.aliases || []).forEach((a) => { registry[a] = e; }); });

/**
 * Add (or replace) one effect while the page runs: the same object an effect file exports.
 * The VFX Maker previews generated effects this way; a game can use it for a one-off effect.
 */
function register(effect) {
  if (!effect || typeof effect.name !== 'string' || typeof effect.build !== 'function') throw new Error('VFX.register: an effect needs a name and a build(c) function');
  const i = ALL.findIndex((e) => e.name === effect.name);
  if (i >= 0) ALL[i] = effect; else ALL.push(effect);
  registry[effect.name] = effect;
  (effect.aliases || []).forEach((a) => { registry[a] = effect; });
  delete S.warned['build:' + effect.name];
  return VFX;
}
const describe = (e) => ({ name: e.name, category: e.category, whenToUse: e.whenToUse, duration: e.duration, loop: !!e.loop, tint: e.tint, tags: e.tags || [] });

const S = {
  mode: null,            // null | 'overlay' | 'scene' (a 3D scene is attached; overlays may exist too)
  // Layers can coexist. 'front' and 'back' are fixed 2D canvases over the page
  // ('back' sits below positioned page content). 'scene' is the game's own
  // three.js scene, added by useScene().
  layers: {},
  listening: false,
  zIndex: { front: 2500, back: 1 },
  manual: false,
  unit: 1,               // world units per design pixel (overlay: 1)
  textures: null, material: null,
  active: [],
  raf: 0, last: 0,
  warned: {},
  attached: false,
  ground: null, soft: false, lit: false, depthTarget: null, renderOrder: 1000, debug: false,
  size: 1,               // global size multiplier (VFX.size)
  timeScale: 1,          // 0.25 = slow motion (previews, debugging)
};

/* ------------------------------------------------------------ setup */

function warnOnce(key, msg) {
  if (S.warned[key]) return;
  S.warned[key] = true;
  if (typeof console !== 'undefined') console.warn('[VFX] ' + msg);
}

function ensureAssets() {
  if (S.textures) return;
  S.textures = makeTextures(THREE);
  S.material = makeMaterialCache(S.textures);
}

/** Get (creating on first use) one overlay layer: 'front' or 'back'. */
function overlayLayer(name) {
  if (!S.listening) {
    S.listening = true;
    window.addEventListener('resize', resize);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', resize);
  }
  if (!S.mode) S.mode = 'overlay';
  name = name === 'back' ? 'back' : 'front';
  if (S.layers[name]) return S.layers[name];
  ensureAssets();
  const canvas = document.createElement('canvas');
  canvas.className = 'vfx-overlay vfx-' + name;
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed', left: '0', top: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: String(S.zIndex[name]),
  });
  document.body.appendChild(canvas);
  // premultipliedAlpha must stay true: with it off, additive glows write colour
  // values above their alpha and the browser compositor shows red/green grain.
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // hex in = hex out
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1, 0, -1, 1, 5000);
  // The camera sits well back on +z. Stretched billboards derive their width
  // from cross(viewPosition, velocity); at depth 0 that is zero and they vanish.
  camera.position.z = 1000;
  const batch = new Q.BatchedRenderer();
  scene.add(batch);
  const L = { name, kind: 'overlay', unit: 1, canvas, renderer, scene, camera, batch, count: 0, wasActive: false };
  S.layers[name] = L;
  resizeLayer(L);
  return L;
}

function resizeLayer(L) {
  const w = window.innerWidth, h = window.innerHeight;
  L.renderer.setSize(w, h, false);
  L.camera.left = 0; L.camera.right = w; L.camera.top = 0; L.camera.bottom = -h;
  L.camera.updateProjectionMatrix();
}

function resize() {
  Object.keys(S.layers).forEach((k) => { if (S.layers[k].kind === 'overlay') resizeLayer(S.layers[k]); });
}

/** Change the stacking of the overlay canvases at any time: VFX.setZIndex({ front: 2500, back: 1 }). */
function setZIndex(o) {
  Object.keys(o || {}).forEach((k) => {
    if (S.zIndex[k] === undefined) return;
    S.zIndex[k] = o[k];
    if (S.layers[k]) S.layers[k].canvas.style.zIndex = String(o[k]);
  });
  return VFX;
}

/**
 * Put effects inside a three.js game. After this, everything except ui.*
 * plays in the 3D scene: hits, explosions, magic and states at 3D positions,
 * and weather / ambience (env.*) as a volume in the world that follows where
 * the camera looks. Only ui.* (and anything played on an element) stays on
 * the 2D overlay.
 *
 *   VFX.useScene({ scene, camera, renderer, characterHeight: 1.7 });
 *
 * Scale: effects are authored in design pixels around an ~85px-tall character.
 * Give `characterHeight` (world units) and the library matches them, or give
 * `unit` directly (world units per design pixel; default 0.01).
 * If your loop already runs, pass manual:true and call VFX.update(dt) yourself.
 * ground: the floor height (number). Flat rings and magic circles then lie on the floor.
 * soft:   true to fade particles where they meet geometry; then call VFX.prepass() every frame before rendering.
 * renderOrder: base draw order of all particles (default 1000, so they draw after the game's transparent objects).
 */
function useScene(o) {
  if (!o || !o.scene) throw new Error('VFX.useScene needs { scene, camera }');
  // The scene must come from the SAME copy of three.js this library uses, or its particle
  // shaders will not compile in the game's renderer. A 3D game should load dist/vfx.module.js
  // with an import map (one shared three.js), not the bundled dist/vfx.js next to its own three.
  if (o.scene.isScene && !(o.scene instanceof THREE.Scene)) {
    warnOnce('two-threes', 'this page has TWO copies of three.js: the game\'s and the one bundled in vfx.js. Effects will not render correctly. '
      + 'Load dist/vfx.module.js instead and share three.js through an import map (see AI-GUIDE.md, section 4).');
  }
  ensureAssets();
  S.mode = 'scene';
  S.unit = o.unit || (o.characterHeight ? o.characterHeight / 85 : 0.01);
  S.manual = !!o.manual;
  S.ground = typeof o.ground === 'number' ? o.ground : null;   // floor height: flat rings snap to it
  S.renderOrder = typeof o.renderOrder === 'number' ? o.renderOrder : 1000;   // draw after the game's transparent objects
  S.soft = !!o.soft;                                            // soft particles: needs VFX.prepass() each frame
  let lights = false; o.scene.traverse((n) => { if (n.isLight) lights = true; });
  S.lit = lights;                                               // solid debris is lit only if the game has lights
  const prev = S.layers.scene;
  if (!prev || prev.scene !== o.scene) {
    if (prev) leaveScene();
    const batch = new Q.BatchedRenderer();
    o.scene.add(batch);
    S.layers.scene = { name: 'scene', kind: 'scene', unit: S.unit, scene: o.scene, camera: o.camera || null, renderer: o.renderer || null, batch, count: 0 };
  } else {
    prev.unit = S.unit; prev.camera = o.camera || prev.camera; prev.renderer = o.renderer || prev.renderer;
  }
  return VFX;
}

/**
 * Soft particles (smoke and glows fade out where they meet the floor or a wall
 * instead of being cut by a hard line). Opt in with useScene({ soft: true })
 * and call this once per frame BEFORE your own renderer.render(scene, camera).
 * It draws the scene once into an off-screen target to capture its depth.
 */
function prepass() {
  const L = S.layers.scene;
  if (!L || !S.soft || !L.renderer || !L.camera) return VFX;
  const r = L.renderer, size = r.getDrawingBufferSize(new THREE.Vector2());
  let t = S.depthTarget;
  if (!t || t.width !== size.x || t.height !== size.y) {
    if (t) t.dispose();
    t = S.depthTarget = new THREE.WebGLRenderTarget(size.x, size.y, { depthBuffer: true });
    t.depthTexture = new THREE.DepthTexture(size.x, size.y);
    t.depthTexture.type = THREE.UnsignedIntType;
    L.batch.setDepthTexture(t.depthTexture);
  }
  const was = L.batch.visible;
  L.batch.visible = false;                 // depth of the world only, not of the particles
  r.setRenderTarget(t); r.render(L.scene, L.camera); r.setRenderTarget(null);
  L.batch.visible = was;
  if (L.batch.depthTexture !== t.depthTexture) L.batch.setDepthTexture(t.depthTexture);
  return VFX;
}

function leaveScene() {
  const L = S.layers.scene;
  if (!L) return VFX;
  S.active.slice().forEach((h) => { if (h._L === L) h.kill(); });
  if (L.batch.parent) L.batch.parent.remove(L.batch);
  delete S.layers.scene;
  S.mode = Object.keys(S.layers).length ? 'overlay' : null;
  return VFX;
}

/* ------------------------------------------------------------ positions */

const _v = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _right = new THREE.Vector3();
const _world = new THREE.Vector3();
const _aimV = new THREE.Vector3();
const _aimQ = new THREE.Quaternion();
const _Z = new THREE.Vector3(0, 0, 1);

function viewSize(L) {
  if (L.kind === 'scene') return { w: 400, h: 870 };
  return { w: window.innerWidth, h: window.innerHeight };
}

function elCenter(el) {
  const r = el.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2];
}

function toVec3(p, out) {
  out = out || new THREE.Vector3();
  if (!p) return out.set(0, 0, 0);
  if (p.isVector3) return out.copy(p);
  if (p.isObject3D) return p.getWorldPosition(out);
  if (Array.isArray(p)) return out.set(p[0] || 0, p[1] || 0, p[2] || 0);
  return out.set(p.x || 0, p.y || 0, p.z || 0);
}

/** Project a 3D point of the attached scene to CSS pixels on the page. */
function toScreen(p) {
  const L = S.layers.scene;
  if (!L || !L.camera) return null;
  const v = toVec3(p, _v).project(L.camera);
  const r = L.renderer && L.renderer.domElement ? L.renderer.domElement.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  return [r.left + ((v.x + 1) / 2) * r.width, r.top + ((1 - v.y) / 2) * r.height];
}

/** Screen effects stay on the 2D overlay even when a 3D scene is attached. */
function isScreenSpace(effect, o) {
  if (o.layer === 'front' || o.layer === 'back') return true;
  if (o.space === 'world') return false;
  if (o.space === 'screen' || effect.space === 'screen') return true;
  if (effect.category === 'ui') return true;                 // real UI feedback belongs to the screen
  return !!(o.el || o.event || o.at);                        // weather, ambience and big rewards live in the world
}

/**
 * The spot on the ground the camera is looking at. Area effects (weather,
 * ambience, coin showers) are centred here and follow it, so there is always
 * snow wherever the player looks without filling the whole level with it.
 */
const _fwd = new THREE.Vector3();
function focusPoint(out) {
  out = out || new THREE.Vector3();
  const L = S.layers.scene;
  if (!L || !L.camera) return out.set(0, S.ground || 0, 0);
  const cam = L.camera, g = S.ground || 0, k = L.unit / 0.02;
  cam.getWorldPosition(out); cam.getWorldDirection(_fwd);
  let t = _fwd.y < -0.05 ? (g - out.y) / _fwd.y : 14 * k;
  t = Math.max(0, Math.min(t, 40 * k));
  out.addScaledVector(_fwd, t); out.y = g;
  return out;
}

/** Resolve where an effect goes. Returns {x,y} in CSS px (overlay) or a THREE.Vector3 (scene). */
function resolveTarget(L, effect, o) {
  if (L.kind === 'scene') {
    if (o.position) return toVec3(o.position);
    if (effect.area || effect.category === 'env') return focusPoint();
    return new THREE.Vector3(o.x || 0, o.y || 0, o.z || 0);
  }
  const v = viewSize(L);
  if (o.el) { const c = elCenter(o.el); return { x: c[0], y: c[1] }; }
  if (o.event && typeof o.event.clientX === 'number') return { x: o.event.clientX, y: o.event.clientY };
  if (Array.isArray(o.at)) return { x: o.at[0], y: o.at[1] };
  if (o.position && S.layers.scene) { const c = toScreen(o.position); if (c) return { x: c[0], y: c[1] }; }
  if (typeof o.x === 'number' || typeof o.y === 'number') return { x: o.x === undefined ? v.w / 2 : o.x, y: o.y === undefined ? v.h / 2 : o.y };
  const anchor = o.anchor || effect.anchor || 'center';
  if (anchor === 'top') return { x: v.w / 2, y: 0 };
  if (anchor === 'bottom') return { x: v.w / 2, y: v.h };
  return { x: v.w / 2, y: v.h / 2 };
}

function placeGroup(L, group, t) {
  if (L.kind === 'scene') group.position.copy(t);
  else group.position.set(t.x, -t.y, 0);
}

const _box = new THREE.Box3();
const _sphere = new THREE.Sphere();
const _camP = new THREE.Vector3();
/** How big is the thing an effect is played on? (0 for an empty anchor or a plain point.) */
function objectRadius(obj) {
  if (!obj || !obj.isObject3D) return 0;
  _box.setFromObject(obj);
  if (_box.isEmpty()) return 0;
  const r = _box.getBoundingSphere(_sphere).radius;
  return isFinite(r) ? r : 0;
}

const _ray = new THREE.Raycaster();
const _dir = new THREE.Vector3();
const _p = new THREE.Vector3();
function isShown(o, stopAt) { for (let n = o; n && n !== stopAt; n = n.parent) if (!n.visible) return false; return true; }
function isInside(o, root) { for (let n = o; n; n = n.parent) if (n === root) return true; return false; }

/**
 * Games play effects at `enemy.position`: the CENTRE of a solid model, which then hides the flash
 * inside itself. This measures how far the camera-facing part must come toward the camera to sit
 * just in front of that model's real surface. One ray, camera -> effect point:
 *   - find the model the point is inside of (a visible mesh whose box contains the point, then up
 *     its parents while they stay model-sized, so a hero built from body + arms counts as one);
 *   - the pull clears that model's whole bounding box along the line of sight.
 * A point that is not inside anything gets a hair of pull (avoids z-fighting on surfaces). Floors,
 * walls and other huge meshes never count as "the model", so nothing is dragged through a wall.
 */
function autoPull(L, P, hint) {
  // margin: a one-shot stays where it spawned, but its target keeps moving. An enemy walking toward
  // the camera at 2 m/s covers 0.4 m during a hit flash, and would walk into it with a tight margin.
  const k = L.unit / 0.02, tiny = 0.06 * k, margin = 0.45 * k, maxModel = 3 * 85 * L.unit;
  if (!L.camera) return tiny;
  L.camera.updateMatrixWorld();
  L.camera.getWorldPosition(_camP);
  const d = _dir.copy(P).sub(_camP).length();
  if (d < 1e-4) return tiny;
  _ray.set(_camP, _dir.divideScalar(d)); _ray.near = 0; _ray.far = d;
  let model = hint && objectRadius(hint) > 0 && objectRadius(hint) <= maxModel ? hint : null;
  if (!model) {
    const hits = _ray.intersectObjects(L.scene.children, true);
    for (let i = 0; i < hits.length && !model; i++) {
      const o = hits[i].object;
      if (!o.isMesh || isInside(o, L.batch) || !isShown(o, L.scene) || (o.userData && o.userData.vfxIgnore)) continue;
      _box.setFromObject(o).expandByScalar(0.05 * k);
      if (!_box.containsPoint(P) || _box.getBoundingSphere(_sphere).radius > maxModel) continue;
      model = o;
      while (model.parent && model.parent !== L.scene && objectRadius(model.parent) <= maxModel) model = model.parent;
    }
  }
  if (!model) return tiny;
  // Clear the model's WHOLE box along the line of sight, not just where the ray enters it: with a
  // camera looking down at an angle, a cube's near top edge sticks out closer than the entry point
  // and would slice a band through the flash.
  // The flash is a flat sheet perpendicular to where the camera FACES (n), and it is moved along
  // the line of sight to the point (_dir). Those differ for anything off-centre on screen, so:
  // the sheet clears corner c when  dot(c - P, n) + pull * dot(_dir, n) >= 0.
  _box.setFromObject(model);
  L.camera.getWorldDirection(_fwd);
  const along = Math.max(0.2, _dir.dot(_fwd));
  let pull = 0;
  for (let i = 0; i < 8; i++) {
    _p.set(i & 1 ? _box.max.x : _box.min.x, i & 2 ? _box.max.y : _box.min.y, i & 4 ? _box.max.z : _box.min.z);
    const need = -_p.sub(P).dot(_fwd) / along;
    if (need > pull) pull = need;
  }
  return Math.max(tiny, Math.min(pull + margin, maxModel, d * 0.6));
}

/**
 * 3D only. Effects are authored in a flat plane (x right, y up). Turn that
 * plane to face the camera so a burst reads the same from any angle, then
 * re-aim every force: "up/down" stays the WORLD's up/down (gravity falls to
 * the ground, flames rise) and "sideways" follows the camera's right.
 */
function faceCamera(h) {
  const L = h._L;
  if (!h._face || L.kind !== 'scene' || !L.camera) return;
  L.camera.getWorldQuaternion(_q);
  h.face.quaternion.copy(_q);
  // Games play effects at `enemy.position`: the CENTRE of a solid model, which then hides the
  // flash inside itself. So the camera-facing part is pulled toward the camera, along the line
  // of sight: its place on screen does not move, it just ends up in front of the model.
  if (h._pull) {
    L.camera.getWorldPosition(_camP).sub(h.group.position);
    const d = _camP.length();
    if (d > 1e-4) h.face.position.copy(_camP.multiplyScalar(Math.min(h._pull, d * 0.5) / d));
  }
  h.group.updateMatrixWorld(true);
  _right.set(1, 0, 0).applyQuaternion(_q);
  for (let i = 0; i < h.systems.length; i++) {
    const s = h.systems[i];
    const forces = s._forces;
    if (s._in3d || !forces || !forces.length) continue;      // true-3D systems are already world-aligned
    let inv = null;
    if (!s._world) { inv = s.emitter.getWorldQuaternion(new THREE.Quaternion()).invert(); }
    for (let j = 0; j < forces.length; j++) {
      const b = forces[j], d = b._design;
      _world.set(_right.x * d.x, d.y, _right.z * d.x);
      if (_world.lengthSq() < 1e-8) continue;
      _world.normalize();
      if (inv) _world.applyQuaternion(inv);
      b.direction.set(_world.x, _world.y, _world.z);
    }
  }
}

/** Flat ground sprites sit on the floor, whatever height the effect was played at (if it is near the floor). */
function snapToGround(h) {
  if (!h._snaps) return;
  const g = h._ground;
  if (g === null || g === undefined) return;
  const dy = g + 0.03 - h.group.position.y;
  const y = dy < -3.5 * (h._L.unit / 0.02) ? 0 : dy;          // far above the floor (a mid-air blast): stay put
  for (let i = 0; i < h._snaps.length; i++) h._snaps[i].emitter.position.y = h._snaps[i]._baseY + y;
}

/* ------------------------------------------------------------ play */

function inertHandle(name) {
  return { name, alive: false, stop() {}, kill() {}, moveTo() { return this; }, follow() { return this; }, aim() { return this; } };
}

/**
 * Play an effect by name.
 * opts: x,y (px) · at:[x,y] · el:Element · event:PointerEvent · position (3D: Vector3 | Object3D | [x,y,z])
 *       size (1) · tint ('#ff0000') · dir (degrees, 90 = up) · follow (true | Element | Object3D | fn)
 *       layer ('front' | 'back') · width/height (px, the size of the target for ui.* effects)
 *       space ('world' | 'screen': override where it draws when a 3D scene is attached)
 *       face (3D: 'spawn' | 'always' | false; default: loops 'always', one-shots 'spawn')
 *       debris (false = leave out the chunk / shard particles, for games that spawn real physics debris)
 *       direction (3D: world vector a spray / wind flies along; loops can be re-pointed later with handle.aim(v))
 *       pull (3D: metres the flash is pulled toward the camera so the model it is played on cannot hide it.
 *             Automatic by default: measured with one ray to sit just in front of that model. false = off)
 */
function play(name, o) {
  o = o || {};
  const effect = registry[name];
  if (!effect) {
    warnOnce('unknown:' + name, 'unknown effect "' + name + '". Names: ' + Object.keys(registry).join(', '));
    return inertHandle(name);
  }
  const L = S.layers.scene && !isScreenSpace(effect, o) ? S.layers.scene : overlayLayer(o.layer);

  if (S.active.length >= MAX_ACTIVE) {
    const victim = S.active.find((h) => !h.loop) || S.active[0];
    victim.kill();
  }

  const size = (o.size || 1) * S.size * (effect.size || 1);
  const u = L.unit * size;
  const tint = o.tint ? hexToRgb(o.tint) : null;
  const dir = typeof o.dir === 'number' ? (o.dir * Math.PI) / 180 : undefined;
  const v = viewSize(L);
  // the size of the thing the effect is played on (an element, or opts.width/height), in design px
  let tw = 120, th = 48;
  if (o.el && o.el.getBoundingClientRect) { const r = o.el.getBoundingClientRect(); tw = r.width; th = r.height; }
  if (typeof o.width === 'number') tw = o.width;
  if (typeof o.height === 'number') th = o.height;
  const ctx = makeContext({
    material: S.material, u, tint, dir, mode: L.kind,
    lit: S.lit, soft: L.kind === 'scene' && S.soft, softDistance: 22 * L.unit * size,
    noDebris: o.debris === false,
    // 3D sprays: an explicit world direction, and the camera's right for reading 2D angles
    direction: L.kind === 'scene' && o.direction ? toVec3(o.direction).normalize() : null,
    camRight: L.kind === 'scene' && L.camera ? new THREE.Vector3(1, 0, 0).applyQuaternion(L.camera.getWorldQuaternion(_q)).setY(0).normalize() : null,
    renderOrder: L.kind === 'scene' ? S.renderOrder : 0,
    view: { w: v.w / size, h: v.h / size }, target: { w: tw / size, h: th / size },
  });

  let systems;
  try {
    systems = effect.build(ctx, o).filter(Boolean);        // 3D-only parts are null in 2D
  } catch (err) {
    S.lastError = 'effect "' + name + '" failed to build: ' + (err && err.message);
    warnOnce('build:' + name, S.lastError);
    return inertHandle(name);
  }

  // `group` carries the position and stays world-aligned; `face` is its child
  // and turns to the camera in 3D. Flat-designed systems go in `face`, true-3D
  // systems (in3d) straight into `group`.
  // Where it goes, and how far to pull the camera-facing part toward the camera so the model it
  // is played on cannot hide it (see autoPull / faceCamera). Measured once, when it spawns.
  const where = resolveTarget(L, effect, o);
  let pull = 0;
  if (L.kind === 'scene' && o.pull !== false && !(effect.area || effect.category === 'env')) {
    const hint = o.position && o.position.isObject3D ? o.position : (o.follow && o.follow.isObject3D ? o.follow : null);
    pull = typeof o.pull === 'number' ? o.pull : autoPull(L, where, hint);
  }
  if (S.debug) console.log('[VFX] play', name, 'layer:', L.name, 'pull:', +pull.toFixed(2), o.position && o.position.isObject3D ? 'on object ' + (o.position.name || o.position.type) : (o.position || o.follow || ''));

  const group = new THREE.Group();
  group.name = 'vfx:' + name;
  const face = new THREE.Group();
  group.add(face);
  const handle = {
    name, group, face, systems, layer: L.name, loop: !!effect.loop, alive: true, born: performance.now(),
    _L: L, _follow: null, _left: systems.length, _pull: pull,
    // 3D: one-shots turn to the camera once, when they spawn, so their debris
    // never swings if the camera orbits mid-effect; loops keep turning with it.
    _face: L.kind === 'scene' && o.face !== false && effect.face !== false,
    _faceAlways: o.face === 'always' || (o.face !== 'spawn' && !!effect.loop),
    // three.quarks keeps firing bursts on a looping system after endEmit(),
    // so a loop is switched to one-shot first; its particles then live out.
    stop() {
      systems.forEach((s) => {
        s.looping = false; s.endEmit();
        // a ribbon is one immortal particle: let it die so the trail can shrink away; `cut` parts end now too
        if (s._ribbon || s._cut) for (let i = 0; i < s.particleNum; i++) s.particles[i].life = s.particles[i].age;
      });
      // an effect with an `ending` (a shield's break-up) plays it where the loop was, same size and tint
      if (effect.ending && !handle._ended && handle.alive) {
        handle._ended = true;
        const g = group.position;
        const at = L.kind === 'scene' ? { position: g.clone() } : { x: g.x, y: -g.y };
        play(effect.ending, Object.assign({ size: o.size, tint: o.tint, layer: o.layer, direction: o.direction, ground: handle._ground }, at));
      }
      return handle;
    },
    kill() { systems.forEach((s) => { try { s.dispose(); } catch (e) { /* already gone */ } }); return handle; },
    moveTo(x, y, z) {
      if (L.kind === 'scene') {
        if (x && (x.isVector3 || x.isObject3D || Array.isArray(x))) toVec3(x, group.position); else group.position.set(x || 0, y || 0, z || 0);
      } else group.position.set(x, -y, 0);
      return handle;
    },
    follow(target) { handle._follow = target === undefined ? true : target; return handle; },
    /** 3D: re-point a running spray (speed lines behind a turning character, a swinging hose). */
    aim(dir) {
      if (L.kind !== 'scene') return handle;
      const v = toVec3(dir, _aimV); if (v.lengthSq() < 1e-8) return handle; v.normalize();
      for (let i = 0; i < systems.length; i++) {
        const s = systems[i]; if (!s._aimable) continue;
        s.emitter.quaternion.setFromUnitVectors(_Z, v);
        if (!s._world && s._forces.length) {                 // keep gravity world-down for local-space systems
          const inv = _aimQ.copy(s.emitter.quaternion).invert();
          for (let j = 0; j < s._forces.length; j++) { const b = s._forces[j], d = b._design; _world.set(d.x, d.y, 0).applyQuaternion(inv); b.direction.set(_world.x, _world.y, _world.z); }
        }
      }
      return handle;
    },
  };

  systems.forEach((s) => {
    s.addEventListener('destroy', () => {
      handle._left--;
      if (handle._left <= 0) retire(handle);
    });
    (s._in3d ? group : face).add(s.emitter);
    L.batch.addSystem(s);
  });
  if (L.kind === 'scene') {
    const snaps = systems.filter((s) => s._snap);
    if (snaps.length) { snaps.forEach((s) => { s._baseY = s.emitter.position.y; }); handle._snaps = snaps; handle._ground = typeof o.ground === 'number' ? o.ground : S.ground; }
  }
  L.scene.add(group);
  placeGroup(L, group, where);
  snapToGround(handle);
  faceCamera(handle);

  if (o.follow) {
    handle._follow = o.follow === true ? (o.el || o.position || null) : o.follow;
  } else if (L.kind === 'scene' && effect.loop && !o.position && (effect.area || effect.category === 'env')) {
    handle._follow = 'focus';                              // looping weather follows where the camera looks
  }
  // a big world effect can ask for a companion on the screen (e.g. the nuke's white-out)
  if (L.kind === 'scene' && effect.also && registry[effect.also]) play(effect.also, { space: 'screen', tint: o.tint });
  L.count++;
  S.active.push(handle);
  start();
  return handle;
}

function retire(handle) {
  if (!handle.alive) return;
  handle.alive = false;
  if (handle.group.parent) handle.group.parent.remove(handle.group);
  handle._L.count = Math.max(0, handle._L.count - 1);
  const i = S.active.indexOf(handle);
  if (i >= 0) S.active.splice(i, 1);
}

function stop(what) {
  if (!what) return stopAll();
  if (typeof what === 'string') { S.active.filter((h) => h.name === what).forEach((h) => h.stop()); return VFX; }
  if (what.stop) what.stop();
  return VFX;
}

function stopAll(hard) {
  S.active.slice().forEach((h) => (hard ? h.kill() : h.stop()));
  return VFX;
}

/* ------------------------------------------------------------ loop */

function applyFollow(h) {
  const f = h._follow;
  if (!f) return;
  if (h._L.kind === 'scene') {
    if (f === 'focus') focusPoint(h.group.position);
    else if (f.isObject3D || f.isVector3) toVec3(f, h.group.position);
    else if (typeof f === 'function') { const p = f(); if (p) h.moveTo(p[0] !== undefined ? p[0] : p, p[1], p[2]); }
    return;
  }
  if (typeof f === 'function') { const p = f(); if (p) h.moveTo(p[0], p[1]); }
  else if (f.getBoundingClientRect) { const c = elCenter(f); h.moveTo(c[0], c[1]); }
  else if (f.isObject3D || f.isVector3) { const c = toScreen(f); if (c) h.moveTo(c[0], c[1]); }
}

function update(dt) {
  try {
    step(dt);
  } catch (err) {
    // a broken effect must never stop the game or the effects after it: drop what is playing and carry on
    S.lastError = 'an effect failed while playing: ' + (err && err.message);
    warnOnce('update:' + S.lastError, S.lastError);
    S.active.slice().forEach((h) => { try { h.kill(); } catch (e) { /* already gone */ } retire(h); });
  }
}

function step(dt) {
  if (!S.mode) return;
  if (typeof dt !== 'number') dt = 1 / 60;
  if (dt > MAX_DT) dt = MAX_DT;
  dt *= S.timeScale;
  for (let i = 0; i < S.active.length; i++) { const h = S.active[i]; applyFollow(h); if (h._follow) snapToGround(h); if (h._faceAlways) faceCamera(h); }
  Object.keys(S.layers).forEach((k) => {
    const L = S.layers[k];
    if (L.kind === 'scene') { L.batch.update(dt); return; }
    // an overlay canvas is only redrawn while it shows something (plus once more to wipe it)
    if (L.count > 0 || L.wasActive) {
      L.batch.update(dt);
      L.renderer.render(L.scene, L.camera);
      L.wasActive = L.count > 0;
    }
  });
}

function tick(now) {
  S.raf = 0;
  const dt = S.last ? (now - S.last) / 1000 : 1 / 60;
  S.last = now;
  update(dt);
  if (S.active.length) S.raf = requestAnimationFrame(tick);
  else S.last = 0;
}

function start() {
  if (S.manual || S.raf) return;
  S.last = 0;
  S.raf = requestAnimationFrame(tick);
}

/* ------------------------------------------------------------ UI kit auto-wiring */

/**
 * VFX.attach(): effects fire on their own from the Super Casual UI Kit and
 * from any element with data-vfx="effect.name".
 *   - tap on [data-vfx]                → that effect at the element
 *   - a screen/popup with data-vfx     → that effect when it is shown/opened
 *   - each star earned (kit 'star')    → pickup.sparkle on the star
 *   - shop card bought (kit 'buy')     → pickup.sparkle on the card
 */
function attach(root) {
  if (S.attached) return VFX;
  S.attached = true;
  root = root || document;

  root.addEventListener('pointerdown', (e) => {
    const el = e.target && e.target.closest && e.target.closest('[data-vfx]');
    if (!el) return;
    const name = el.getAttribute('data-vfx');
    if (name && name !== 'none') play(name, { el, event: e, tint: el.getAttribute('data-vfx-tint') || undefined, layer: el.getAttribute('data-vfx-layer') || undefined });
  }, true);

  ['show', 'open'].forEach((type) => root.addEventListener(type, (e) => {
    const el = e.target;
    if (!el || !el.getAttribute) return;
    const name = el.getAttribute('data-vfx');
    if (name && name !== 'none') play(name, { anchor: 'center', tint: el.getAttribute('data-vfx-tint') || undefined, layer: el.getAttribute('data-vfx-layer') || undefined });
  }, true));

  root.addEventListener('star', (e) => {
    const el = e.target;
    if (!el || (el.getAttribute && el.getAttribute('data-vfx') === 'none')) return;
    const idx = e.detail && typeof e.detail.index === 'number' ? e.detail.index : 0;
    const stars = el.querySelectorAll ? el.querySelectorAll('.sc-star, [class*="star"]') : null;
    const target = stars && stars[idx] ? stars[idx] : el;
    play('pickup.sparkle', { el: target, size: 0.8 });
  }, true);

  root.addEventListener('buy', (e) => {
    const el = e.target;
    if (!el || (el.getAttribute && el.getAttribute('data-vfx') === 'none')) return;
    play('pickup.sparkle', { el, size: 1.2 });
  }, true);

  return VFX;
}

/* ------------------------------------------------------------ public */

const VFX = {
  VERSION,
  play, stop, stopAll, update, attach, useScene, leaveScene, toScreen, prepass, focusPoint, register,
  init(o) {
    o = o || {};
    if (typeof o.zIndex === 'number') S.zIndex.front = o.zIndex;
    if (o.zIndex && typeof o.zIndex === 'object') setZIndex(o.zIndex);
    if (o.size !== undefined) S.size = o.size;
    overlayLayer('front');
    if (o.back) overlayLayer('back');
    return VFX;
  },
  setZIndex,
  has: (name) => !!registry[name],
  list: () => ALL.map((e) => e.name),
  get registry() { return ALL.map(describe); },
  /** The last build / playback failure as text, or null. The VFX Maker reads it; set it to null to clear. */
  get lastError() { return S.lastError || null; },
  set lastError(v) { S.lastError = v || null; },
  get active() { return S.active.length; },
  set size(v) { S.size = v; },
  get size() { return S.size; },
  /** true: log every play() with its layer and position, and unknown names. For finding out why an effect is not visible. */
  set debug(v) { S.debug = !!v; },
  get debug() { return S.debug; },
  set timeScale(v) { S.timeScale = v; },
  get timeScale() { return S.timeScale; },
  THREE, Quarks: Q,
  _state: S,
};

export default VFX;
