# Writing a Pixelfork VFX effect

This is everything the VFX Maker's AI is given before it writes an effect. It is the same
vocabulary the 90 effects in `packs/casual/effects/` are written in (`src/helpers.js`).
Keep it in step with `helpers.js`: an option that is not listed here will not be used.

## What an effect is

One JavaScript module, no imports, exporting one object:

```js
/** One sentence: what it looks like. */
export default {
  name: 'magic.poison',          // lower-case category.thing (letters and digits only)
  category: 'magic',             // MUST equal the first part of the name
  whenToUse: 'One plain sentence a game-building AI can match a game moment to.',
  duration: 1.0,                 // seconds until the last particle is gone (loops: one cycle)
  loop: false,                   // true = runs until the game calls stop()
  tint: '#7ee83a',               // the default main colour; play(name, { tint }) replaces it
  tags: ['poison', 'acid'],      // 4-8 search words
  // optional: ending: 'state.domebreak'  a one-shot the runtime plays where a LOOP was when the game stops it
  // optional: anchor: 'feet'   the effect belongs at the character's feet / on the ground
  build(c) {
    const col = c.color('#7ee83a');          // ALWAYS take the main colour this way, so tint works
    return [ c.sys({ ... }), c.sys({ ... }) ];   // 2-5 particle systems, drawn in `order`
  },
};
```

Categories: `hit` `explosion` `pickup` `reward` `move` `magic` `state` `env` `ui`.
`env.*` effects are weather/ambience that fill the screen (2D) or an area of the world (3D).
`state.*` are loops that sit on a character. Everything else is normally a one-shot.

## Style (the owner approved this; every effect must fit)

Modern mobile casual: chunky, bright, glossy, cartoon. Bold shapes, saturated colours, short
and punchy. Not realistic, not gritty, not cinematic.
- Hits and pickups under 0.7 s. Rewards under 1.5 s. Explosions about 1 s.
- Layer it: a flash or glow (order 0-2), a main body (puffs / shapes), fast accents (sparks,
  discs), and often a ring. One system alone always looks cheap.
- At most about 300 live particles in total; most effects need 30-80.
- Loops must look right for minutes: steady `rate`, no bursts that visibly repeat.

## Units

Every length is in **design pixels at size 1**, on a phone about 400 px wide. The character
is about 85 px tall. A hit is about 100 px wide, an explosion 150 px, a level-up 250 px.
Speeds are px/s, gravity px/s². Typical: sparks 200-500 px/s, smoke 40-140, gravity 600-1400.
x is right, y is UP. Angles are radians, 0 = right, `Math.PI / 2` = up.

## `c.sys({...})`: one particle system

| Option | Meaning | Default |
|---|---|---|
| `tex` | sprite: `glow` (soft blob) `disc` (hard dot) `ring` `star` `spark` (4-point glint) `square` `puff` (smoke cloud) `plus` `heart` `drop` `shard` `leaf` `coin` `flame` `z` `key` `ellipse` (a ground ring seen from the side) `hexshard` / `penttile` (one glowing hexagon / pentagon tile) | `glow` |
| `blend` | `'add'` (light: glows, sparks, fire, magic) or `'normal'` (solid things: smoke, debris, coins, leaves, blood) | `'add'` |
| `bursts` | `[{ count: 12 }, { time: 0.15, count: [4, 6] }]` particles fired at once | none |
| `rate` | particles per second, continuously (needs `duration`, or `loop: true`) | 0 |
| `duration` | seconds the emitter runs | 1 |
| `loop` | `true` on every system of a looping effect | false |
| `prewarm` | loop starts already filled (weather) | false |
| `life` | seconds each particle lives | 1 |
| `speed` | starting speed along the emitter's direction | 0 |
| `size` | starting size in px | 10 |
| `rotation` | starting rotation, radians; `[0, 6.28]` for random | 0 |
| `color` | hex, a colour from `c.color()/c.mix()`, or `[a, b]` = random between | white |
| `shape` | where and which way particles start, see below | point |
| `dir` | radians: turns a cone (or rect) emitter in the screen plane | up |
| `stretch` | `{ speed: 0.02, length: 1.5 }` (typical; speed 0.01-0.03) draws the sprite stretched along its motion (streaks). Use ONLY with `glow` or `disc` | none |
| `offset` | `[x, y]` moves the emitter | none |
| `world` | `true`: particles stay where they were born when the effect moves (trails) | false |
| `behaviors` | list, see below | none |
| `order` | draw order inside the effect, 0 = back. Keep 0-5 | 0 |
| `cut` | `true`: when the game stops a loop, this system's particles vanish at once instead of living out (a standing dome, an aura) | false |

Any number may be written `[min, max]` for a random value per particle.

### Shapes
- `{ type: 'point' }`: no direction, so give no `speed` (use it for single flashes and rings).
- `{ type: 'circle', radius: 14 }`: starts inside a circle and flies **outward** in the screen plane. The standard burst. `thickness: 0` = only on the rim. `arc` = part of the circle (`Math.PI` = the upper half; with `c.vol` that becomes a hemisphere in 3D).
- `{ type: 'sphere', radius }`: the same in every direction.
- `{ type: 'cone', angle: 0.4, radius: 4 }`: a directed spray; `angle` is the half-spread in radians. Aims up unless `dir` is set.
- `{ type: 'rect', w: 400, h: 0 }`: a line or box. **Rect emitters push particles sideways, not forward**: always use `speed: 0` with them and move the particles with `c.gravity` / `c.force` plus `c.limitSpeed`.

### Behaviours (things that change over a particle's life, t = 0..1)
- `c.colorOverLife(gradient)` with
  - `c.fade(from)`: solid, then fades out from t = `from`. The usual one.
  - `c.fadeInOut(inT, outT)`: fades in then out (smoke, loops, weather).
  - `c.grad([[colour, t], ...], [[alpha, t], ...])`: a colour ramp, e.g. `c.grad([['#fff', 0], [col, 0.3], ['#c33', 1]], [[1, 0], [1, 0.5], [0, 1]])`.
  - The start `color` is multiplied by the gradient: with a colour gradient leave `color` white.
- `c.sizeOverLife(curve)` with `c.shrink()` (1→0), `c.grow(from)` (from→1), `c.pop(peakAt, hold)` (0→1→hold→0), or `c.curve([[t, v], ...])` for anything else, e.g. a shockwave ring `c.curve([[0, 0.2], [1, 1]])`.
- `c.speedOverLife(c.decel(to))`: slows to `to` × speed. Makes bursts feel punchy (use 0.05-0.2).
- `c.gravity(g)`: pulls down. `c.force(x, y)`: a steady push (smoke rising: `c.force(0, 60)`).
- `c.limitSpeed(max, dampen)`: terminal speed (rain, snow, bubbles).
- `c.noise(frequency, amount)`: wobble (fireflies, bubbles, magic dust).
- `c.spin(a, b)`: sprite rotation in rad/s, random between a and b (debris, leaves, stars).
- `c.orbit(radPerSec)`: circles the emitter's centre (stun stars, shields). Use with a `circle` shape and `speed: 0`.

### Colours
`c.color('#hex')` the main colour (respects tint). `c.lighten(col, 0.5)`, `c.darken(col, 0.3)`,
`c.mix(a, b, 0.5)`. Literal hex strings are fine for fixed colours (white flash, grey smoke).

### Context values
`c.view.w`, `c.view.h`: the screen in design px (for `env.*` and full-screen `ui.*`).
`c.target.w`, `c.target.h`: the size of the thing it is played on (ui effects around a button).
`c.is3d`: true inside a 3D scene.

## 3D: one file, two worlds

The same file runs in 2D games and inside three.js scenes. By default everything is a flat
picture that turns to face the camera, which is right for flashes, glows and magic sparkles.
Wrap a system's options to make that part truly 3D. **Every wrapper returns its input unchanged
in 2D**, so they are always safe:

- `c.sys(c.vol({...}))`: a burst in every direction (circle → sphere). Use for sparks, smoke, bubbles, debris dots: anything that flies outward.
- `c.sys(c.chunks({...}, 'box'))`: solid tumbling 3D pieces instead of sprites (`'box'` `'shard'` `'plank'` `'ball'` `'hex'` = a flat hexagon tile). Give it `tex: 'square'` (or `'hexshard'`), gravity, and `blend: 'normal'` for solid debris or `'add'` for glowing glass, so 2D still looks right.
- A dome made of tiles (a force field), the same in 2D and 3D: `c.sys({ render: 'mesh', geo: 'hex', tex: 'hexshard', upright: true, in3d: true, blend: 'add', shape: { type: 'tiles', radius: 100, kind: 'hex' }, bursts: [{ count: c.tiles('hex') }], life: 3, ... })` plus the same with `geo: 'pent'`, `tex: 'penttile'`, `kind: 'pent'`, `c.tiles('pent')`. The `tiles` emitter places, turns and sizes every tile of a geodesic hemisphere itself, in forming order from the ground up: use `rate: c.tiles('hex') / 0.55, duration: 0.6` to build it tile by tile, `shape: { ..., until: 0.76 }` to end every tile at one emitter time, `speed` to send tiles flying out along their normals, and leave out `upright` to let them tumble. `state.dome` / `state.domebreak` are the model.
- `c.sys(c.flat({...}))`: the sprite lies flat on the floor (shockwave rings, magic circles, landing dust rings).
- `c.sys(c.ground({...}))`: a circle/rect emitter laid on the ground plane (an aura rising around the feet, a ring of things).
- `c.sys(c.spray({...}))`: a cone aimed along a real world direction (blood, slashes, a confetti cannon). `c.spray(p, 'up')` / `'down'` force it.
- `c.sys(c.env3d({...}, { w: 900, d: 900, y: 500 }))`: weather born over a w × d area at height y, living in the world.
- `c.ribbon({ width: 20, length: 24, color })`: a ribbon trail behind a moving effect. 3D only; it is already a system, do not wrap it in `c.sys`.

When the request is for **3D**, use these wherever they fit. When it is for **2D**, do not use
them at all and design for the flat screen.

## Traps (each of these has broken an effect before)

1. **Comments go on their own line.** A `//` in the middle of a line silently comments out every option after it on that line. The build refuses such files.
2. Stretched particles need `tex: 'glow'` or `'disc'`. Any other texture turns invisible.
3. Rect emitters: `speed: 0`, always.
4. A `point` shape has no direction: particles with `speed` and a point shape do not spread. Use `circle`.
5. Additive white on a bright background burns out: keep flashes short (life 0.1-0.2) and big glows at low alpha through a gradient.
6. `blend: 'add'` cannot draw anything dark. Smoke, blood, dirt and shadows are `blend: 'normal'`.
7. Loop effects: every system needs `loop: true`, and `duration` is one cycle. Feed loops with `rate`, not `bursts`: a burst fires once and the loop then looks empty.
8. No imports, no `THREE`, no DOM, no timers, no randomness at module level. Only `c.*`. (`c.Q` and `c.THREE` exist but you should not need them.)
9. Never invent a `c.` helper or a `sys` option that is not in this document.
