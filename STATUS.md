# STATUS

**Last updated:** 2026-10-14 · by **A (Claude)** · version **v0.13.0-A** · **published**: https://github.com/advme/pixelfork-vfx-library

## Next task
**Finish wave 5 and publish it as v0.14.0-A** (see In progress), then **owner review of the 291 effects
added in v0.13.0-A**: open `tools/gallery.html` (every effect replaying in a 4x3 grid, by group) and the
3D player, and flag anything that reads wrong.
Over the ~300-particle budget in 3D (measured peak): `env.snow` 537 and `reward.clear` 436 (both older,
area / full-screen), `env.storm` 333, `env.blizzard` 323, `env.ash` 301 (weather over a whole area).
The VFX Studio is a separate Claude Code project (`../Pixelfork VFX Studio`); do not build it from here.

## Hexagon force-field dome (2026-09-21, from the owner's reference sheet)
`state.dome` (loop: ring lights up, energy rises, the dome builds itself tile by tile from the ground
up, then stands pulsing three times a cycle) + `state.domebreak` (flicker, every tile lifts off and
tumbles away, sparks, ring fades last). One recipe for both worlds: a geodesic hemisphere of 85 hex +
6 pentagon mesh tiles laid by the new `tiles` emitter (`helpers.TilesEmitter`, `c.tiles(kind)` for the
count); in 2D the overlay's ortho camera sees it from the front. New reusable machinery: textures
`hexshard`, `penttile`, `ellipse`; geometries `hex`, `pent`; `shape: 'hemisphere'`; sys options
`upright`, `cut`, `tex` on a mesh, `blend: 'add'` on chunks; effect meta `ending` and `anchor: 'feet'`.
The owner also added `hit.shieldzap` with the maker. Owner feedback applied: no scaling while forming
(tiles appear one by one), seamless tiling (no pole seam).

## VFX Maker (experiment, step 1 done 2026-09-21)
The owner's test of a standalone "prompt in, effect out" tool. `tools/maker.html`: describe an effect,
pick 2D or 3D, Generate; it plays on the character in the real 2D / 3D player (shown in a frame);
refine it in words; **Add to library** only on confirm. Publishing stays a separate, manual step.
- `tools/serve.mjs` replaces `serve.py` as the preview server (`.claude/launch.json`, `npm run serve`).
  It serves the files and the maker's API: `generate` calls Claude (`claude-sonnet-5`; override with
  `VFX_MAKER_MODEL`) either through the official SDK with a key (`ANTHROPIC_API_KEY` or the git-ignored
  `.anthropic.key`) or, without a key, through the local Claude Code CLI on the owner's subscription, `save` writes the effect file,
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
**Wave 5: 100 more effects being written** (not in the pack yet; their files in `packs/casual/effects/`
are not imported by `packs/casual/index.js` and were left out of the v0.13.0-A commit). Themes: cooking,
toys, slicing / stacking, tower defense, .io games, dungeon loot, casino and board games, ocean, UI,
menu backdrops. To finish: wait for each batch's writer + reviewer, run `node tools/check-effect.mjs` on
the new files, list them in `packs/casual/index.js` within their group, build, play each in both players
(error + peak sweep, frozen grids), then publish v0.14.0-A.

## The pack — 475 effects, all playable (v0.13.0-A)
| Group | Effects |
|---|---|
| `hit.*` (55) | impact, slash, punch, bullet, crit, block, blood, shieldbreak, parry, shieldzap, dirt, ko, flurry, kick, stomp, splat, electric, fire, ice, heavy, metal, arrow, asteroid, backstab, bite, bonk, brick, charge, claw, counter, dunk, elementfire, elementice, elementshock, emp, fur, ghost, glass, golf, homerun, laser, note, paddle, pie, racket, robot, shieldwall, slow, sonic, splashhit, sweep, tackle, thrust, upgradefail, water |
| `explosion.*` (29) | small, big, puff, fireball, firework, nuke, pixel, ice, electric, toxic, magic, water, artillery, balloon, barrel, bass, candy, catapult, chain, dust, glitter, gunpowder, mine, paint, ship, shockwave, smokebomb, soul, supernova |
| `pickup.*` (19) | sparkle, coin, gem, heart, powerup, xp, key, food, star, mana, armor, bomb, fuel, life, multiball, shard, speed, time, treat |
| `reward.*` (34) | confetti, levelup, starburst, combo, chest, coinshower, clear, checkpoint, jackpot, goal, rankup, bigcombo, birthday, cardreveal, cheer, clean, cooked, encore, finish, fireworkshow, gift, good, great, legendary, perfect, rare, record, sticker, streak, summon, trophy, unbox, upgrade, wheel |
| `move.*` (45) | jump, footstep, land, dash, splash, teleport, spawn, doublejump, bounce, blink, blinkstrike, breach, dive, dodge, emerge, feathers, groundpound, hatch, landing, ledge, parachute, pounce, roll, rustle, shadowstep, shake, sweep, swing, wallkick, warp · loops: trail, dust, speed, swim, fly, skid, wallslide, climb, dig, glide, jetpack, orbit, skate, slide, surf |
| `magic.*` (39) | heal, ice, lightning, shield, poison, dark, holy, summon, curse, buff, debuff, meteor, earth, beam, revive, nature, time, barrier, clone, drain, gust, leap, mark, raise, shockwave, starfall, transform, ultimate, warcry, wave · loops: portal, cast, fire, tornado, blackhole, charge, heallaura, missile, rune |
| `state.*` (55) | domebreak, sweat, happy, surprise · loops: stun, poison, burning, frozen, shield, rage, regen, sparkle, smoke, love, sleep, invisible, charged, dome, magnet, rainbow, selected, aura, electrified, wet, bleeding, sad, music, angry, charmed, cloak, cursed, dance, drunk, fear, focus, freezing, glitch, groove, halo, hasted, haunted, invulnerable, levitate, lucky, marked, overheat, possessed, purr, rally, sick, sleepy, slowed, thinking, ultready, zerog |
| `env.*` (42) | loops: snow, rain, leaves, embers, bubbles, fog, stars, fireflies, dust, sandstorm, clouds, hearts, confetti, storm, spirits, petals, blizzard, ash, meteors, wind, aurora, christmas, drizzle, dustdevil, feathers, hail, halloween, heat, lanterns, magic, mist, nebula, ocean, partylights, pollen, rainbowsparkle, smoke, space, spores, sunrays, underground, underwater |
| `vehicle.*` (15) | crash, backfire, explode, jump, puddle · loops: exhaust, nitro, damaged, siren, wake, drift, offroad, rotorwash, scrape, thruster |
| `weapon.*` (24) | muzzle, laser, shell, shotgun, arrowrain, cannon, catapult, launch, musket, plasma, railgun · loops: smoke, rocket, flamethrower, boomerang, chargebow, flamesword, frostblade, holyspear, minigun, poisondagger, thunderhammer, torpedo, tractorbeam |
| `gather.*` (8) | wood, stone, harvest, egg, fish, seed · loops: drill, water |
| `world.*` (59) | build, anvil, bloom, crumble, dooropen, keyhole, pressureplate, secret, spikes, switch, towerup, trap · loops: campfire, beacon, lootbeam, torch, fountain, lava, steam, sparks, crystal, ripple, boostpad, altar, banner, bubblecolumn, burning, capture, cauldron, chestidle, chimney, cooking, datastream, discoball, dripping, enchant, flag, forcefield, grave, grow, hologram, laserfence, planetring, rally, reactor, savepoint, saw, scanner, shore, smelt, spawnportal, speaker, sprinkler, teleporter, volcano, waterfall, wave, whirlpool, wormhole |
| `puzzle.*` (8) | match, line, shatter, merge, blast, wrong, bubble · loops: hint |
| `ui.*` (43) | pop, tap, star, burst, unlock, flash, shine, achievement, carddeal, cardflip, chip, cooldown, correct, countdown, dice, fill, focuslines, gameover, go, hack, healed, hurt, levelstart, lifelost, miss, notify, purchase, tapburst, transition, victory, wrongtry · loops: glow, countup, beat, frozen, hurry, lowhp, new, poisoned, rays, sparkle, speedlines, tapme |

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
- `dist/vfx.js` — IIFE, three.js bundled (1765 KB / 407 KB gz, 475 effects). For 2D games: one script tag.
- `dist/vfx.module.js` — ES module, three.js external (1039 KB / 222 KB gz). For 3D games: an import
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
- Screen-filling `rect` emitters with `thickness: 1` (most 2D `env.*` backdrops) are denser toward the
  middle of the screen: three.quarks' `RectangleEmitter` puts a point on the edge and scales it by
  `1 - thickness × random`, which is uniform in that factor, not in area. A uniform-fill shape in
  `src/helpers.js` would even it out, but it changes how every existing backdrop looks: decide with the owner.
- 3D: every `dir` effect is now aimed in 3D (`c.spray` / `c.heading` + `c.wind`, `direction` option,
  `handle.aim(v)` for loops): blood, slash, parry, confetti, dash, speed, sandstorm. None left flat.
- `VFX.attach()` handles `data-vfx`, kit `star`, `buy`, screen `show` and popup `open`. It could
  also fire `ui.pop` on every kit button by default — decide with the owner.
- No `.d.ts` typings. The ES module build targets import maps; bundler users can import it too.
- Textures are 128px; at `size` 3+ the big glows go soft. Fine for casual, but a 256px option is easy.
