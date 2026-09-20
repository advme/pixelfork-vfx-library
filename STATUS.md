# STATUS

**Last updated:** 2026-09-21 · by **A (Claude)** · version **v0.8.1-A** published (https://github.com/advme/pixelfork-vfx-library) · the VFX Maker is committed locally, NOT published yet

## Next task
**Owner tries the VFX Maker with a real API key** (http://localhost:8767/tools/maker.html). Everything
around the AI call is tested (preview in 2D and 3D, broken-effect handling, add to library, rollback);
the AI call itself has never run because no key was on the machine. If the first request fails with an
"AI service answered with an error" message, read it: the request shape is in `generate()` in
`tools/serve.mjs`. Then **step 2**: send a snapshot of the playing effect back to the AI so it can
correct itself.

## VFX Maker (experiment, step 1 done 2026-09-21)
The owner's test of a standalone "prompt in, effect out" tool. `tools/maker.html`: describe an effect,
pick 2D or 3D, Generate; it plays on the character in the real 2D / 3D player (shown in a frame);
refine it in words; **Add to library** only on confirm. Publishing stays a separate, manual step.
- `tools/serve.mjs` replaces `serve.py` as the preview server (`.claude/launch.json`, `npm run serve`).
  It serves the files and the maker's API: `generate` calls Claude (`claude-opus-5`, official SDK,
  key from `ANTHROPIC_API_KEY` or the git-ignored `.anthropic.key`), `save` writes the effect file,
  lists it in `packs/casual/index.js` after the last effect of its group, runs the build and rolls
  everything back if the build refuses it. The API answers only this computer and only this origin.
- `tools/maker/REFERENCE.md` is what the AI is taught (the `c.*` vocabulary, style, traps) plus ten
  real effects as examples. **Keep it in step with `src/helpers.js`.**
- `tools/maker/hook.js` lets the maker drive either player (`?maker=1`): load code, replay, slow motion.
- Runtime: new `VFX.register(effect)`, `VFX.lastError`; `VFX.update()` no longer dies when one effect
  throws while playing (it drops the playing effects and carries on). `VFX.registry` is now live.
- `serve.py` is kept as a no-Node fallback for the players only.

## Earlier next task (still open)
**Owner review of the 3D effects** in http://localhost:8767/tools/preview3d.html — play through the
list from the front, Side view and Top-down, in Slow motion. Flag anything that reads wrong.
The two-copies-of-three.js question is settled (two builds, see below).

**Published** on 2026-09-19 at the owner's request (this replaced their earlier "don't push yet"):
`advme/pixelfork-vfx-library`, public, first tag `v0.8.0-A`, served by jsDelivr. After every release:
commit, tag `vX.Y.Z-<letter>`, push with tags, and check the jsDelivr URLs in `AI-GUIDE.md`,
`llms.txt`, `README.md` and `dist/registry.json` load.
Note: the sibling UI Kit now lives under a different GitHub account (`pixelfork-v1`); this repo is
under `advme` because that is the account logged in on the owner's Mac. Moving it is the owner's call.

## In progress
_Nothing._

## The pack — 90 effects, all playable
| Group | Effects |
|---|---|
| `hit.*` (9) | impact, slash, punch, bullet, crit, block, blood, shieldbreak, parry |
| `explosion.*` (6) | small, big, puff, fireball, firework, nuke (full screen) |
| `pickup.*` (8) | sparkle, coin, gem, heart, powerup, xp, key, food |
| `reward.*` (7) | confetti, levelup, starburst, combo, chest, coinshower (top), clear (full screen) |
| `move.*` (13) | jump, footstep, land, dash, splash, teleport, spawn · loops: trail, dust, speed, swim, fly, skid |
| `magic.*` (12) | heal, ice, lightning, shield, poison, dark, holy, summon, curse · loops: portal, cast, fire (projectile) |
| `state.*` (13, all loops) | stun, poison, burning, frozen, shield, rage, regen, sparkle, smoke, love, sleep, invisible, charged |
| `env.*` (13, all loops, full screen) | snow, rain, leaves, confetti, clouds (top) · embers, bubbles, fog, hearts (bottom) · stars, fireflies, dust, sandstorm (everywhere) |
| `ui.*` (9) | pop, tap, star, burst, unlock, flash (full-screen), shine · loops: glow, countup |

## 3D (three.js) mode — steps 1 and 2 done
`VFX.useScene({ scene, camera, renderer, characterHeight, ground, soft })` attaches a game's scene.
- **Step 1:** world effects play inside the scene, depth-tested; flat-designed parts turn to face the
  camera (one-shots at spawn, loops always) with forces re-aimed so gravity stays world-down. Screen
  Only `ui.*` (and `space: 'screen'`, or anything played on an element) stays on the 2D overlay.
- **Step 2:** 49 effects have true-3D parts through helper wrappers that are no-ops in 2D:
  `c.vol` (burst in all directions), `c.chunks` (solid lit mesh debris: box / plank / shard / ball),
  `c.flat` (sprite lying on the floor, snaps to `ground`), `c.ground` (emitter laid on the ground
  plane: auras, halos, rings of things), `c.ribbon` (trail ribbon, 3D only), `c.spray` (a cone aimed along a world `direction`). Optional soft particles
  via `soft: true` + `VFX.prepass()`.
- **Step 3 (owner's correction, 2026-09-19: "screen stuff is stuck to the screen, in a 3D world it
  should be 3D"):** all 13 `env.*` effects plus `reward.clear`, `reward.coinshower` and
  `explosion.nuke` have world versions built with `c.env3d(p, { w, d, y })`: a world-space area
  lying flat at height y. The runtime centres them on `VFX.focusPoint()` (where the camera's view
  hits the ground) and looping ones follow it. An effect can name a screen companion with
  `also: 'ui.flash'` (the nuke's white-out).
3D player: http://localhost:8767/tools/preview3d.html — a walled arena with crashcat physics: a
character that pushes crates and balls, explosions that blast them, click-to-kick, and walls
(walls only, not the objects inside) that turn see-through with a soft gradient when the
character walks behind them. Source: `tools/player3d/main.js` (bundled to `tools/player3d.js`).
Real physics debris (toggle **Physics debris**, on by default): `hit.block`, `hit.shieldbreak`,
`magic.ice` and the explosions are played with `debris: false` and the player spawns crashcat
bodies (planks / rubble / shards) that collide, settle, can be pushed, and shrink away after 4–6.5 s
(cap 90 bodies, oldest removed first).

## Two builds (owner's decision, 2026-09-19)
- `dist/vfx.js` — IIFE, three.js bundled (1020 KB / 254 KB gz). For 2D games: one script tag.
- `dist/vfx.module.js` — ES module, three.js external (294 KB / 69 KB gz). For 3D games: an import
  map shares ONE three.js (>= 0.182) between the game, its add-ons and the library.
Two copies of three.js break rendering, not just size: three.quarks registers its shader chunks in
the copy it imported, and the game's renderer looks them up in its own. `useScene` warns if the
scene is not an instance of the library's `THREE.Scene`. The 3D player runs on the module build
through an import map and imports a three.js add-on (`RoundedBoxGeometry`), so that path is tested.

## Layers
Every `play` takes `layer: 'front' | 'back'`. The back layer is a second overlay canvas at
z-index 1, below positioned page content, so effects can sit behind a DOM character or the UI.
The preview page has a **Behind character** toggle that uses it.

## Known gaps
- 3D: every `dir` effect is now aimed in 3D (`c.spray` / `c.heading` + `c.wind`, `direction` option,
  `handle.aim(v)` for loops): blood, slash, parry, confetti, dash, speed, sandstorm. None left flat.
- `VFX.attach()` handles `data-vfx`, kit `star`, `buy`, screen `show` and popup `open`. It could
  also fire `ui.pop` on every kit button by default — decide with the owner.
- No `.d.ts` typings. The ES module build targets import maps; bundler users can import it too.
- Textures are 128px; at `size` 3+ the big glows go soft. Fine for casual, but a 256px option is easy.
