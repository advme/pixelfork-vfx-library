/**
 * The recipe context: the small vocabulary effect files are written in.
 * An effect's build(ctx) returns an array of three.quarks ParticleSystems made
 * with ctx.sys({...}). Every length in a recipe (speed, size, radius, forces)
 * is in design pixels at size 1 and is multiplied by ctx.u so the same recipe
 * works at any size and inside a 3D scene.
 */
import * as THREE from 'three';
import * as Q from 'three.quarks';

const TAU = Math.PI * 2;

const geometries = {};
/** Shared unit-sized geometries for solid (mesh) particles. */
export function geometry(name) {
  if (geometries[name]) return geometries[name];
  let g;
  if (name === 'shard') { g = new THREE.OctahedronGeometry(0.5, 0); g.scale(0.55, 1.3, 0.35); }
  else if (name === 'ball') g = new THREE.IcosahedronGeometry(0.5, 1);
  else if (name === 'plank') g = new THREE.BoxGeometry(1.4, 0.35, 0.6);
  // flat tiles for energy domes (see TilesEmitter); their top caps take a whole texture, vertex at +z = texture right
  else if (name === 'shaft') {
    // a light shaft: two crossed planes (so it reads from any side), 1 long and 0.2 wide, hanging DOWN from
    // the particle and slanted a little; wears the 'shaft' texture (bright at the top, fading out at the bottom)
    const w = 0.1, tilt = 0.32, pos = [], uv = [], idx = [];
    [0, Math.PI / 2].forEach((a, k) => {
      const ca = Math.cos(a) * w, sa = Math.sin(a) * w;
      [[-1, 0], [1, 0], [-1, -1], [1, -1]].forEach(([s, y]) => {
        const x0 = s * ca, z0 = s * sa;
        pos.push(x0 + Math.sin(tilt) * -y, y * Math.cos(tilt), z0);
        uv.push((s + 1) / 2, y + 1);
      });
      const o = k * 4;
      idx.push(o, o + 2, o + 1, o + 1, o + 2, o + 3);
    });
    g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
  }
  else if (name === 'hex') g = new THREE.CylinderGeometry(0.5, 0.5, 0.06, 6);
  else if (name === 'pent') g = new THREE.CylinderGeometry(0.5, 0.5, 0.06, 5);
  else g = new THREE.BoxGeometry(0.8, 0.8, 0.8);            // 'box'
  geometries[name] = g;
  return g;
}

/* ---------- the geodesic dome: a hemisphere paved with hexagons (and a few pentagons) ---------- */

const tileTables = {};
/**
 * Tiles of a geodesic dome: the vertices of an icosahedron subdivided `f` times, one tile per
 * vertex (a pentagon at the 12 original corners, a hexagon everywhere else), each turned so a flat
 * side faces its nearest neighbour. Unit radius, only the half above the ground (a little below
 * it too, so the floor cuts the bottom row cleanly). Sorted bottom-up with a little scatter, which
 * is the order the dome forms in.
 */
export function domeTiles(f) {
  if (tileTables[f]) return tileTables[f];
  const V = new THREE.Vector3;
  const top = new THREE.Vector3(0, 1, 0), bottom = new THREE.Vector3(0, -1, 0);
  const ring = (y, r, off) => Array.from({ length: 5 }, (_, k) => new THREE.Vector3(r * Math.cos(off + (k * 2 * Math.PI) / 5), y, r * Math.sin(off + (k * 2 * Math.PI) / 5)));
  const up = ring(1 / Math.sqrt(5), 2 / Math.sqrt(5), 0), lo = ring(-1 / Math.sqrt(5), 2 / Math.sqrt(5), Math.PI / 5);
  const faces = [];
  for (let k = 0; k < 5; k++) {
    const k1 = (k + 1) % 5;
    faces.push([top, up[k], up[k1]], [up[k], lo[k], up[k1]], [up[k1], lo[k], lo[k1]], [lo[k], bottom, lo[k1]]);
  }
  const seen = new Map(), pts = [];
  const key = (v) => v.x.toFixed(4) + ',' + v.y.toFixed(4) + ',' + v.z.toFixed(4);
  faces.forEach(([a, b, c]) => {
    for (let i = 0; i <= f; i++) for (let j = 0; j <= f - i; j++) {
      const v = new THREE.Vector3().addScaledVector(a, i / f).addScaledVector(b, j / f).addScaledVector(c, (f - i - j) / f).normalize();
      const k = key(v);
      if (!seen.has(k)) { seen.set(k, pts.length); pts.push(v); }
    }
  });
  const tiles = [];
  pts.forEach((n, i) => {
    if (n.y < -0.14) return;
    let near = null, d = 9;
    pts.forEach((m, j) => { if (j !== i) { const e = m.distanceTo(n); if (e < d) { d = e; near = m; } } });
    const sides = pts.filter((m) => Math.abs(m.distanceTo(n) - d) < d * 0.12).length === 5 ? 5 : 6;
    // circumradius so that flat sides just touch the neighbours' (then shrunk a little for the seams)
    const size = (d / 2 / Math.cos(Math.PI / sides)) * 0.985;
    // rotation: local +y -> the normal, then spin about it so a flat side points at the neighbour
    const q = new THREE.Quaternion().setFromUnitVectors(top, n);
    const mid = Math.PI / sides;
    const e = new THREE.Vector3(Math.sin(mid), 0, Math.cos(mid)).applyQuaternion(q);
    const t = V.copy(near).sub(n).addScaledVector(n, -V.dot(n)).normalize();
    const ang = Math.atan2(new THREE.Vector3().crossVectors(e, t).dot(n), e.dot(t));
    q.premultiply(new THREE.Quaternion().setFromAxisAngle(n, ang));
    const jitter = ((i * 9301 + 49297) % 233280) / 233280;           // deterministic scatter
    tiles.push({ n, q, sides, size, order: n.y + (jitter - 0.5) * 0.18 });
  });
  tiles.sort((a, b) => a.order - b.order);
  const table = { hex: tiles.filter((t) => t.sides === 6), pent: tiles.filter((t) => t.sides === 5) };
  tileTables[f] = table;
  return table;
}

/**
 * An emitter that places one particle per dome tile, in forming order. Use it with a mesh system
 * (geo 'hex' or 'pent', matching `kind`). Sets position, orientation and size itself; a `speed`
 * sends the tile straight out along its normal (the break-up). `until`: every particle dies at
 * that emitter time, however early or late it was born (a forming dome hands over to the standing one).
 */
class TilesEmitter {
  constructor(p) {
    this.type = 'tiles';
    this.radius = p.radius; this.kind = p.kind === 'pent' ? 'pent' : 'hex'; this.until = p.until; this.f = p.f || 4; this.minY = p.minY;
    this.tiles = domeTiles(this.f)[this.kind].filter((t) => t.n.y >= this.minY);
    this.i = 0;
  }
  initialize(p, es) {
    const t = this.tiles[this.i++ % this.tiles.length];
    p.position.set(t.n.x * this.radius, t.n.y * this.radius, t.n.z * this.radius);
    p.velocity.set(t.n.x * p.startSpeed, t.n.y * p.startSpeed, t.n.z * p.startSpeed);
    if (p.rotation && p.rotation.copy) p.rotation.copy(t.q);
    const s = t.size * this.radius * 2;
    p.size.set(s, s, s); p.startSize.set(s, s, s);
    if (this.until !== undefined) p.life = Math.max(0.05, this.until - es.time);
  }
  update() { /* nothing moves */ }
  toJSON() { return { type: 'tiles', radius: this.radius }; }
  clone() { return new TilesEmitter(this); }
}
/** The bottom row of tiles sits on the ground: a 3D floor cuts it in half, so it is kept; in 2D it would hang below the ring, so it is dropped. */
function tileFloor(is3d) { return is3d ? -0.14 : 0.02;
}

export function makeMaterialCache(textures) {
  const cache = new Map();
  return function material(tex, blend) {
    const key = tex + '|' + blend;
    let m = cache.get(key);
    if (!m && tex === '#solid') {
      // lit, for mesh debris; falls back to unlit when the game has no lights; 'add' = glowing glass chunks
      m = blend === 'lit' ? new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85, metalness: 0 })
        : blend === 'add' ? new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
                          : new THREE.MeshBasicMaterial({ color: 0xffffff });
      cache.set(key, m);
    }
    if (!m) {
      const map = textures[tex];
      if (!map) throw new Error('VFX: unknown texture "' + tex + '"');
      m = new THREE.MeshBasicMaterial({
        map,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: blend === 'add' ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      cache.set(key, m);
    }
    return m;
  };
}

export function hexToRgb(hex) {
  if (hex && typeof hex === 'object') return hex; // already a vector
  let h = String(hex).trim().replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return new Q.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export function makeContext(opts) {
  const { material, u, tint, dir, view, mode } = opts;
  const target = opts.target || { w: 120, h: 48 };

  /* ---------- colours ---------- */
  // Colours are used exactly as written (sRGB). three.quarks' sprite and trail
  // shaders write colour raw, in 2D and in 3D. The one exception is LIT mesh
  // debris, whose shader converts linear -> sRGB on output; colorGen() feeds
  // that case linear values (see `linearOut`).
  const toLin = (x) => (x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4));
  const rgb = hexToRgb;
  const white = () => new Q.Vector3(1, 1, 1);
  function mix(a, b, k) {
    a = rgb(a); b = rgb(b);
    return new Q.Vector3(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, a.z + (b.z - a.z) * k);
  }
  const lighten = (c, k) => mix(c, '#ffffff', k);
  const darken = (c, k) => mix(c, '#000000', k);
  function v4(c, a) { const v = rgb(c); return new Q.Vector4(v.x, v.y, v.z, a === undefined ? 1 : a); }

  function v4lin(c) { const v = rgb(c); return new Q.Vector4(toLin(v.x), toLin(v.y), toLin(v.z), 1); }
  function colorGen(c, linearOut) {
    const mk = linearOut ? v4lin : v4;
    if (c === undefined || c === null) return new Q.ConstantColor(new Q.Vector4(1, 1, 1, 1));
    if (c.genColor) return c;                                  // already a generator
    if (Array.isArray(c)) return new Q.RandomColor(mk(c[0]), mk(c[1]));
    return new Q.ConstantColor(mk(c));
  }
  /** Gradient over life. stops: [[colour, t], ...]  alpha: [[a, t], ...] (default solid). */
  function grad(stops, alpha) {
    return new Q.Gradient(
      stops.map(([c, t]) => [rgb(c), t]),
      alpha || [[1, 0], [1, 1]]
    );
  }
  /** Alpha-only gradient: solid until `from`, then fades to 0 at t=1. */
  const fade = (from, colour) => grad([[colour || '#fff', 0], [colour || '#fff', 1]], [[1, 0], [1, from === undefined ? 0.5 : from], [0, 1]]);
  /** Alpha in then out. */
  const fadeInOut = (inT, outT, colour) => grad([[colour || '#fff', 0], [colour || '#fff', 1]], [[0, 0], [1, inT === undefined ? 0.1 : inT], [1, outT === undefined ? 0.6 : outT], [0, 1]]);

  /* ---------- numbers ---------- */
  function val(x, scale) {
    scale = scale === undefined ? 1 : scale;
    if (x === undefined || x === null) return new Q.ConstantValue(0);
    if (typeof x === 'number') return new Q.ConstantValue(x * scale);
    if (Array.isArray(x)) return new Q.IntervalValue(x[0] * scale, x[1] * scale);
    return x; // generator
  }
  /** Piecewise-linear curve from [[t, value], ...]; t runs 0..1. */
  function curve(keys) {
    const segs = [];
    for (let i = 0; i < keys.length - 1; i++) {
      const [t0, a] = keys[i], [, b] = keys[i + 1];
      segs.push([new Q.Bezier(a, a + (b - a) / 3, a + (2 * (b - a)) / 3, b), t0]);
    }
    return new Q.PiecewiseBezier(segs);
  }
  const shrink = () => curve([[0, 1], [1, 0]]);
  const grow = (from) => curve([[0, from === undefined ? 0.2 : from], [1, 1]]);
  const pop = (peakAt, hold) => curve([[0, 0], [peakAt || 0.15, 1], [hold || 0.6, 1], [1, 0]]);
  const decel = (to) => curve([[0, 1], [1, to === undefined ? 0.1 : to]]);

  /* ---------- behaviours ---------- */
  const colorOverLife = (g) => new Q.ColorOverLife(g);
  const sizeOverLife = (c) => new Q.SizeOverLife(c);
  const speedOverLife = (c) => new Q.SpeedOverLife(c);
  const gravity = (g) => new Q.ApplyForce(new Q.Vector3(0, -1, 0), new Q.ConstantValue(g * u));
  const force = (x, y) => new Q.ApplyForce(new Q.Vector3(x, y, 0).normalize(), new Q.ConstantValue(Math.hypot(x, y) * u));
  const spin = (a, b) => new Q.RotationOverLife(b === undefined ? new Q.ConstantValue(a) : new Q.IntervalValue(a, b));
  const orbit = (radPerSec) => new Q.OrbitOverLife(new Q.ConstantValue(radPerSec), new Q.Vector3(0, 0, 1));
  /** Terminal speed. `max` is a number, or [[t, max], ...] to change it over life. */
  const limitSpeed = (max, dampen) => new Q.LimitSpeedOverLife(
    Array.isArray(max) ? curve(max.map(([t, v]) => [t, v * u])) : curve([[0, max * u], [1, max * u]]),
    dampen === undefined ? 1 : dampen);
  const noise = (frequency, amount) => new Q.Noise(new Q.ConstantValue(frequency), new Q.ConstantValue(amount * u), new Q.ConstantValue(1));

  /* ---------- emitter shapes ---------- */
  function shape(s) {
    s = s || { type: 'point' };
    const mode = s.even ? Q.EmitterMode.Burst : Q.EmitterMode.Random;
    switch (s.type) {
      case 'point': return new Q.PointEmitter();
      case 'circle': return new Q.CircleEmitter({ radius: (s.radius === undefined ? 1 : s.radius) * u, arc: s.arc === undefined ? TAU : s.arc, thickness: s.thickness === undefined ? 1 : s.thickness, mode, spread: 0 });
      case 'hemisphere': return new Q.HemisphereEmitter({ radius: (s.radius === undefined ? 1 : s.radius) * u, arc: s.arc === undefined ? TAU : s.arc, thickness: s.thickness === undefined ? 1 : s.thickness, mode, spread: 0 });
      case 'sphere': return new Q.SphereEmitter({ radius: (s.radius === undefined ? 1 : s.radius) * u, arc: s.arc === undefined ? TAU : s.arc, thickness: s.thickness === undefined ? 1 : s.thickness, mode, spread: 0 });
      case 'cone': return new Q.ConeEmitter({ radius: (s.radius === undefined ? 1 : s.radius) * u, arc: s.arc === undefined ? TAU : s.arc, thickness: s.thickness === undefined ? 1 : s.thickness, angle: s.angle === undefined ? 0.3 : s.angle, mode, spread: 0 });
      case 'tiles': return new TilesEmitter({ radius: (s.radius === undefined ? 100 : s.radius) * u, kind: s.kind, until: s.until, f: s.f, minY: tileFloor(mode === 'scene') });
      case 'rect': return new Q.RectangleEmitter({ width: (s.w === undefined ? 10 : s.w) * u, height: (s.h === undefined ? 0 : s.h) * u, thickness: s.thickness === undefined ? 0 : s.thickness, mode, spread: 0 });
      default: throw new Error('VFX: unknown shape "' + s.type + '"');
    }
  }

  /* ---------- 2D -> 3D upgrades (all are no-ops outside a 3D scene) ---------- */
  const is3d = mode === 'scene';
  /** A burst in every direction: a circle emitter becomes a sphere (an upper half-circle a hemisphere), in world space. */
  function vol(p) {
    if (!is3d) return p;
    const q = Object.assign({}, p, { in3d: true });
    if (q.shape && q.shape.type === 'circle') {
      if (q.shape.arc === undefined) q.shape = Object.assign({}, q.shape, { type: 'sphere' });
      else if (Math.abs(q.shape.arc - Math.PI) < 1e-6) q.shape = Object.assign({}, q.shape, { type: 'hemisphere', arc: undefined });
    }
    return q;
  }
  /** Lay a circle / rect emitter down on the ground plane (auras, halos, rings of things). */
  const ground = (p) => (is3d ? Object.assign({}, p, { in3d: true, plane: 'ground' }) : p);
  /** A sprite that lies flat on the floor (shockwaves, magic circles). Snaps to the ground height when the game gave one. */
  const flat = (p, o) => (is3d ? Object.assign({}, p, { in3d: true, render: 'flat', snap: !(o && o.snap === false) }) : p);
  /** Solid tumbling chunks instead of flat squares. geo: 'box' | 'shard' | 'plank' | 'ball'. */
  function chunks(p, geo) {
    if (opts.noDebris) return null;           // the game spawns real physics debris instead (play(name, { debris: false }))
    if (!is3d) return p;
    return vol(Object.assign({}, p, { render: 'mesh', geo: geo || 'box' }));
  }
  /**
   * A directional spray as a real 3D cone (blood, a slash, a confetti cannon). In 2D this is a
   * no-op and the system's `dir` (a screen angle) applies as always. In 3D the cone is aimed
   * along a world direction:
   *   - `play(name, { direction: [x, y, z] })` if the game gave one ("away from the sword");
   *   - otherwise the 2D angle, read in the upright plane facing the camera
   *     (0° = the camera's right, 90° = world up), so the default look matches 2D;
   *   - `which`: 'down' / 'up' force a world direction for that one system (drips, fountains).
   */
  function spray(p, which) {
    if (!is3d) return p;
    let v;
    if (which === 'down') v = new THREE.Vector3(0, -1, 0);
    else if (which === 'up') v = new THREE.Vector3(0, 1, 0);
    else if (opts.direction) v = opts.direction.clone();
    else {
      const a = p.dir !== undefined ? p.dir : (dir !== undefined ? dir : Math.PI / 2);
      const r = opts.camRight || new THREE.Vector3(1, 0, 0);
      v = new THREE.Vector3(r.x * Math.cos(a), Math.sin(a), r.z * Math.cos(a));
    }
    if (v.lengthSq() < 1e-8) v.set(0, 1, 0);
    return Object.assign({}, p, { in3d: true, dir3: v.normalize(), aimable: !which });
  }

  /**
   * 3D: a flat compass direction on the ground, for wind-like effects. `direction` from the game
   * if given (flattened), else the `dir` angle read as a heading: 0° = +X, 90° = -Z (away from a
   * default camera). `fallback` is the effect's default angle in radians.
   */
  function heading(fallback) {
    if (opts.direction) { const v = new THREE.Vector3(opts.direction.x, 0, opts.direction.z); if (v.lengthSq() > 1e-8) return v.normalize(); }
    const a = dir !== undefined ? dir : (fallback || 0);
    return new THREE.Vector3(Math.cos(a), 0, -Math.sin(a));
  }
  /** 3D: a steady push along a world vector (use with heading()). Magnitude in design px/s². */
  const wind = (v, magnitude) => new Q.ApplyForce(new Q.Vector3(v.x, v.y, v.z), new Q.ConstantValue(magnitude * u));

  /**
   * A world-space area for weather and ambience in 3D: particles are born all
   * over a w × d rectangle lying flat at height y above the effect's origin
   * (the runtime keeps that origin on the ground where the camera looks), and
   * then live in the world, so they parallax, land and hide behind things.
   */
  const env3d = (p, a) => Object.assign({}, p, { in3d: true, world: true, plane: 'ground', dir: undefined,
    shape: { type: 'rect', w: a.w, h: a.d === undefined ? a.w : a.d, thickness: 1 }, offset: [a.x || 0, a.y || 0, a.z || 0] });

  /**
   * A ribbon drawn behind a moving effect. 3D only: returns null in 2D (the runtime skips it).
   * `width` is in design px like everything else. Two three.quarks facts this relies on:
   *  - WidthOverLength REPLACES the width with the curve's raw value in world units (it does
   *    not scale `size`), so the curve is built from the real width here;
   *  - its curve runs from the NEWEST point (t = 0, at the mover) to the OLDEST (t = 1, the
   *    tail end), so full width comes first and it tapers to zero.
   * The `ribbon` texture also fades along its length, so the tail dissolves instead of ending.
   */
  function ribbon(p) {
    if (!is3d) return null;
    const w = (p.width === undefined ? 20 : p.width) * u;
    return sys({ render: 'trail', in3d: true, world: true, loop: true, duration: 99999, bursts: [{ count: 1 }], life: 99999, speed: 0,
      size: p.width === undefined ? 20 : p.width, trail: { length: p.length === undefined ? 24 : p.length }, color: p.color, blend: p.blend || 'add',
      behaviors: [new Q.WidthOverLength(curve([[0, w], [0.12, w], [1, 0]]))].concat(p.behaviors || []), order: p.order || 0 });
  }

  /* ---------- the system builder ---------- */
  function sys(p) {
    if (!p) return null;                      // a helper opted this part out
    const render = p.render || (p.stretch ? 'stretch' : 'billboard');
    // A mesh is solid debris: lit, or glowing with blend 'add'. Its `tex` is only the 2D picture and is
    // ignored, EXCEPT on the flat dome tiles (geo 'hex' / 'pent'), whose caps are made to wear one.
    const tiled = render === 'mesh' && (p.geo === 'hex' || p.geo === 'pent' || p.geo === 'shaft');
    const solid = render === 'mesh' && !tiled;
    const lit = solid && p.blend !== 'add' && !!opts.lit;
    const mat = solid ? material('#solid', p.blend === 'add' ? 'add' : (lit ? 'lit' : 'unlit'))
      : material(render === 'trail' ? 'ribbon' : (p.tex || 'glow'), p.blend || 'add');
    const renderMode = { billboard: Q.RenderMode.BillBoard, stretch: Q.RenderMode.StretchedBillBoard, flat: Q.RenderMode.HorizontalBillBoard, mesh: Q.RenderMode.Mesh, trail: Q.RenderMode.Trail }[render];
    let emitterSettings = {};
    if (render === 'stretch') emitterSettings = { speedFactor: (p.stretch.speed || 0) / (u || 1), lengthFactor: p.stretch.length === undefined ? 2 : p.stretch.length };
    if (render === 'trail') emitterSettings = { startLength: val((p.trail && p.trail.length) || 24), followLocalOrigin: true };
    const behaviors = (p.behaviors || []).slice();
    if (render === 'mesh' && !p.upright) behaviors.push(new Q.Rotation3DOverLife(new Q.AxisAngleGenerator(new Q.Vector3(0.62, 0.7, 0.35).normalize(), new Q.IntervalValue(-9, 9))));
    // soft particles fade a sprite where it nears the scene's depth: right for smoke against a wall, but a
    // sprite lying flat on the floor sits 3 cm above it and would fade to almost nothing, so flat ones never are
    const soft = !!opts.soft && render !== 'mesh' && render !== 'trail' && render !== 'flat' && p.soft !== false;
    const system = new Q.ParticleSystem({
      duration: p.duration === undefined ? 1 : p.duration,
      looping: !!p.loop,
      prewarm: !!p.prewarm,
      autoDestroy: true,
      shape: shape(p.shape),
      startLife: val(p.life === undefined ? 1 : p.life),
      startSpeed: val(p.speed || 0, u),
      startSize: val(p.size === undefined ? 10 : p.size, u),
      // upright meshes stand up in the world; on a ground emitter (tipped -90 deg about X) that needs the opposite tip
      startRotation: render === 'mesh' ? (p.upright ? new Q.AxisAngleGenerator(new Q.Vector3(1, 0, 0), new Q.ConstantValue(p.plane === 'ground' ? Math.PI / 2 : 0)) : new Q.RandomQuatGenerator()) : val(p.rotation || 0),
      startColor: colorGen(p.color, lit),
      emissionOverTime: val(p.rate || 0),
      // three.quarks 0.17 ignores a burst's cycle / interval, so repeats are expanded here into separate
      // bursts; it also walks bursts in order, so they are sorted by time
      emissionBursts: (p.bursts || []).flatMap((b) => {
        const n = Math.max(1, Math.round(b.cycle || 1)), gap = b.interval === undefined ? 0.01 : b.interval;
        return Array.from({ length: n }, (_, k) => ({
          time: (b.time || 0) + k * gap,
          count: val(b.count === undefined ? 1 : b.count),
          cycle: 1,
          interval: gap,
          probability: b.probability === undefined ? 1 : b.probability,
        }));
      }).sort((a, b) => a.time - b.time),
      behaviors,
      renderMode,
      rendererEmitterSettings: emitterSettings,
      instancingGeometry: render === 'mesh' ? geometry(p.geo || 'box') : undefined,
      softParticles: soft, softNearFade: 0, softFarFade: soft ? opts.softDistance : 0,
      material: mat,
      // In a game's scene, particles must draw AFTER the game's own transparent
      // things (glass, water, fading walls). They do not write depth, so a
      // transparent object behind them that happens to be drawn later would
      // paint over them and slice glows into hard-edged shapes.
      renderOrder: (p.order || 0) + (opts.renderOrder || 0),
      worldSpace: !!p.world,
    });
    // Remember every force as designed (x right, y up). In a 3D scene the
    // runtime re-aims them each frame so gravity stays world-down.
    system._world = !!p.world;
    system._in3d = !!p.in3d;          // lives in the world-aligned group, not the camera-facing one
    system._snap = !!p.snap;          // flat sprite that should sit on the ground
    system._ribbon = render === 'trail';
    system._cut = !!p.cut;             // handle.stop() removes its particles at once instead of letting them live out
    system._aimable = !!p.dir3 && p.aimable !== false;   // handle.aim(v) can re-point it while it runs
    system._forces = (p.behaviors || []).filter((b) => b && b.type === 'ApplyForce' && b.direction);
    system._forces.forEach((b) => { if (!b._design) b._design = { x: b.direction.x, y: b.direction.y }; });
    // Cone emitters shoot along their local +z. Turn them so they shoot along
    // `dir` in the screen plane (radians, 0 = right, PI/2 = up). Rect emitters
    // lie flat in the screen plane and are only turned when `dir` is given
    // (a turned rect becomes a line: the way env.* effects emit along an edge).
    const wantsDir = p.plane !== 'ground' && (p.dir !== undefined || (p.shape && p.shape.type === 'cone'));
    // three.quarks' hemisphere opens along its local +z (toward the camera); vol() makes one from an
    // upper half-circle, which means "up", so it is tipped over to open along world +y
    const opensUp = !!p.in3d && !wantsDir && !p.dir3 && p.plane !== 'ground' && !!p.shape && p.shape.type === 'hemisphere';
    if (p.plane === 'ground' || wantsDir || p.dir3 || opensUp) {
      const q = system.emitter.quaternion;
      if (p.dir3) {
        // aimed along a world direction (see spray())
        q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.dir3);
      } else if (p.plane === 'ground' || opensUp) {
        // circle / rect emitters live in their local XY plane: tip it over onto XZ (local +z becomes world +y)
        q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
      } else {
        const d = p.dir === undefined ? (dir === undefined ? Math.PI / 2 : dir) : p.dir;
        q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(Math.cos(d), Math.sin(d), 0));
      }
      // Particles in local space feel forces in local space, so a rotated
      // emitter would rotate gravity too. Counter-rotate every force direction.
      if (!p.world) {
        const inv = new Q.Quaternion(q.x, q.y, q.z, q.w).invert();
        (p.behaviors || []).forEach((b) => { if (b.direction && b.direction.applyQuaternion) b.direction.applyQuaternion(inv); });
      }
    }
    if (p.offset) system.emitter.position.set(p.offset[0] * u, p.offset[1] * u, (p.offset[2] || 0) * u);
    return system;
  }

  return {
    THREE, Q, u, tint: tint || null, dir, view, target, mode, TAU,
    rgb, white, mix, lighten, darken, v4, colorGen, grad, fade, fadeInOut,
    val, curve, shrink, grow, pop, decel,
    colorOverLife, sizeOverLife, speedOverLife, gravity, force, spin, orbit, limitSpeed, noise,
    shape, sys, is3d, vol, ground, flat, chunks, ribbon, env3d, spray, heading, wind,
    /** How many tiles a dome has of one kind ('hex' | 'pent'): the burst count that shows the whole dome. */
    tiles: (kind) => domeTiles(4)[kind === 'pent' ? 'pent' : 'hex'].filter((t) => t.n.y >= tileFloor(is3d)).length,
    hasDirection: !!opts.direction,
    /** The tint the player asked for, or the effect's default. */
    color: (fallback) => (tint ? tint : rgb(fallback)),
  };
}
