# Pixelfork VFX Library — AI guide

Ready-made visual effects (particles) for AI-generated web games. **You never design or draw an effect — you call a name from the list below.**

**117 effects**, all in code: no images, no files to load, one script. Works over any 2D engine (canvas 2D, Phaser, PixiJS, DOM) and **inside three.js 3D games** (section 4).

## 1. Add it (2 lines)

```html
<script src="https://cdn.jsdelivr.net/gh/advme/pixelfork-vfx-library@v0.10.0-A/dist/vfx.js"></script>
<script>VFX.attach();</script>
```
This is the setup for **2D games** (canvas 2D, Phaser, PixiJS, DOM). A **three.js 3D game uses a different build: see section 4.**

`VFX.attach()` is optional but recommended: it makes effects fire on their own from the **Super Casual UI Kit** (stars earned, shop purchases) and from any element with `data-vfx="effect.name"`.

By default the library draws on its own transparent layer over the whole page. You never create a canvas or a render loop.

## 2. Play an effect

```js
VFX.play('hit.impact', { x: 120, y: 340 });          // at a screen position (CSS pixels)
VFX.play('pickup.sparkle', { el: coinElement });      // at the centre of an element
VFX.play('explosion.small', { event: pointerEvent });// where the player tapped
VFX.play('reward.confetti');                          // centre of the screen (env.* start at the top)
VFX.play('hit.impact', { size: 1.5, tint: '#ff4d6d' }); // bigger, recoloured
```

For a **canvas game**, convert your world position to screen pixels with the canvas rect:
```js
const r = canvas.getBoundingClientRect();
VFX.play('hit.impact', { x: r.left + enemy.x * r.width / canvas.width, y: r.top + enemy.y * r.height / canvas.height });
```

Looping effects (`move.trail`, `state.stun`, `env.snow`) run until you stop them:
```js
const stun = VFX.play('state.stun', { follow: () => [enemy.screenX, enemy.screenY - 30] });
// later
stun.stop();                                          // particles finish naturally
```

Every `play` returns a handle: `handle.stop()`, `handle.kill()` (instant), `handle.moveTo(x, y)`, `handle.follow(el | () => [x, y])`.
Some loops have an ending built in: `state.dome` (a hexagon force-field dome) breaks apart on its own when you call `stop()`, so never play `state.domebreak` yourself after it. Play `state.dome` at the feet / on the ground, not at the chest.
`VFX.stopAll()` stops everything (screen change, game over). `VFX.size = 0.8` scales every effect (small screens).

**Options:** `x, y` · `at: [x, y]` · `el` · `event` · `size` (1) · `tint` (`'#hex'`) · `dir` (degrees, 90 = up, for cones like confetti) · `follow` · `layer` · `width, height`.

**Behind or in front.** Effects draw on a layer above the page by default. `layer: 'back'` draws on a second layer that sits **behind positioned page content**, so a portal, aura, shield bubble or summoning circle can go behind a DOM character or behind the UI Kit while hits and pickups stay in front:
```js
VFX.play('magic.portal', { el: door, layer: 'back' });
VFX.play('state.shield', { el: hero, follow: true, layer: 'back' });
```
For this to work the character or UI must be a positioned element with a z-index above 1 (`position: relative; z-index: 2`). A game drawn on one big `<canvas>` cannot put effects "inside" its drawing; use the front layer there. Change the stacking with `VFX.setZIndex({ front: 2500, back: 1 })`. Elements can also declare it: `data-vfx="magic.portal" data-vfx-layer="back"`.

`width` / `height` (px) tell size-aware UI effects (`ui.shine`, `ui.countup`) how big the target is when you do not pass `el`.

## 3. Every effect in the `casual` pack

<!-- EFFECTS:START -->

**`hit.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `hit.impact` | Something gets hit: a punch, a sword slash landing, a ball striking a block, a bullet hitting a wall. | no (0.5s) | yes, default `#ffdd55` |
| `hit.slash` | A sword, claw or blade slash hits. Aim it along the swing: in 2D set dir (degrees, default down-right); in 3D pass direction: [x, y, z]. | no (0.4s) | yes, default `#ffffff` |
| `hit.punch` | A punch, kick, headbutt or blunt hit lands. Bigger and rounder than hit.impact; good for boxing, brawlers, cartoon fights. | no (0.5s) | yes, default `#ffe66d` |
| `hit.bullet` | A bullet, arrow, laser bolt or thrown pebble hits a surface or an enemy. Small and fast; can fire many times a second. | no (0.3s) | yes, default `#ffd580` |
| `hit.crit` | A critical hit, a super move landing, a weak-point strike, a headshot. Louder than hit.impact. | no (0.6s) | yes, default `#ff5a4a` |
| `hit.block` | A crate, brick, wall, rock or block is hit or breaks. Tint it the colour of the material (wood, stone, ice). | no (0.8s) | yes, default `#c68a4b` |
| `hit.blood` | A creature takes a bloody hit in an action game. Aim it: in 2D set dir (degrees, default up); in 3D pass direction: [x, y, z], the way the blood flies (away from the weapon). Tint green for slime or zombies, black for oil or ink, purple for aliens. | no (0.9s) | yes, default `#c8102e` |
| `hit.shieldbreak` | A shield, barrier, bubble or armour breaks. Play where the shield was, then stop its state.shield loop. | no (0.8s) | yes, default `#6fc3ff` |
| `hit.parry` | A parry, a perfect block, a deflected bullet, swords clashing, a counter. Sharp and bright. Aim the spark spray: dir (degrees) in 2D, direction: [x, y, z] in 3D (default up). | no (0.45s) | yes, default `#ffffff` |
| `hit.shieldzap` | A shield, force field or energy barrier takes a hit: an energy bolt striking a shield, a shocking blow blocked, an electric barrier zapped. | no (0.7s) | yes, default `#3fb8ff` |
| `hit.dirt` | A bullet, arrow, shovel, hoof or heavy step hits soil, sand or grass: missed shots in a shooter, digging, a stomp on dirt. Play it on the ground where it hit. Tint it for sand, mud or snow. | no (0.8s) | yes, default `#8a6a48` |
| `hit.ko` | A character is knocked out or defeated: K.O. in a fighting game, the player dies in a platformer, a boss goes down, an enemy is finished off. Play it on the character's body. For an enemy simply vanishing use explosion.puff. | no (1s) | yes, default `#ffe14d` |
| `hit.flurry` | A rapid multi-hit attack: a punch flurry, a fast sword combo, a machine-gun burst on one target, a special move that hits several times. Play it once on the target; it lands four hits in under half a second. | no (0.6s) | yes, default `#ffd23a` |

**`explosion.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `explosion.small` | A small thing blows up: a barrel, an enemy, a car crash, a bomb, a rocket landing. About 150px wide. | no (1s) | yes |
| `explosion.big` | A boss dies, a building or tank blows up, a big bomb goes off, a level-ending blast. Twice the size of explosion.small. | no (1.5s) | yes |
| `explosion.puff` | Something vanishes, pops or gets squashed without fire: an enemy poofing away, a balloon, a magic disappearance, a cartoon collision. | no (0.8s) | yes, default `#ffffff` |
| `explosion.fireball` | A fire spell lands, a fuel can ignites, a dragon breath hits, a torch bursts. Fire without the smoke of an explosion. | no (1s) | yes, default `#ff7a1f` |
| `explosion.firework` | Celebrations and fun blasts: fireworks on a win screen, a party popper, a magic burst. Tint it or leave it multicolour. | no (1.6s) | yes |
| `explosion.nuke` | A bomb power-up clears the board, a super attack wipes every enemy, the final boss dies. Covers the whole screen; play once. | no (2s) | yes |

**`pickup.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `pickup.sparkle` | The player collects a coin, gem, star, key, heart or any small item. Also for a star earned on a result screen. | no (0.7s) | yes, default `#ffd54a` |
| `pickup.coin` | A coin or money is collected. More "coin" than pickup.sparkle: a little coin pops up and fades. Also for a cash reward. | no (0.7s) | yes, default `#ffcf3f` |
| `pickup.gem` | A gem, diamond, crystal or premium currency is collected. Tint it to the gem colour (purple, green, red). | no (0.7s) | yes, default `#4fd1ff` |
| `pickup.heart` | A heart, life or health item is collected, a pet is petted, a character is happy or in love. | no (1s) | yes, default `#ff5c8a` |
| `pickup.powerup` | A power-up, booster, mushroom, shield or weapon upgrade is collected. Bigger and louder than a coin. | no (0.9s) | yes |
| `pickup.xp` | Experience, mana, energy or souls are gained. Soft orbs float up from the point. Tint to the resource colour. | no (0.9s) | yes, default `#a06bff` |
| `pickup.key` | A key, a pass, a ticket or an access card is collected; a door unlocks. | no (0.8s) | yes, default `#ffcf3f` |
| `pickup.food` | A character eats food, a pet is fed, a potion of stamina is drunk, a snack is collected. Tint to the food colour. | no (0.9s) | yes, default `#ffa34d` |

**`reward.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `reward.confetti` | A win: level complete, new record, chest opened, prize claimed. Fire it from the bottom or the middle of the screen; in 3D from the ground or a cannon, with direction: [x, y, z] to aim it (default straight up). | no (3.5s) | yes |
| `reward.levelup` | The player levels up, upgrades an item, unlocks something, or completes a big milestone. Play on the character or the item. | no (1.2s) | yes, default `#ffc93c` |
| `reward.starburst` | A star is earned, a perfect score, a combo milestone, a badge unlocked. Punchier than pickup.sparkle. | no (1s) | yes, default `#ffd23f` |
| `reward.combo` | A combo counter goes up, a chain reaction step, a rapid hit streak. Short enough to fire several times a second. Tint by combo level. | no (0.45s) | yes, default `#ff9f43` |
| `reward.chest` | A chest, crate, gift box, egg or loot bag opens. Play on the box; the rays shine upward. | no (1.4s) | yes, default `#ffc93c` |
| `reward.coinshower` | A big money reward: jackpot, chest of coins, level payout, daily bonus. Covers the whole screen from the top. | no (3s) | yes, default `#ffcf3f` |
| `reward.clear` | Level complete, stage clear, game won. A whole-screen celebration. Play once when the result screen appears. | no (4s) | yes |
| `reward.checkpoint` | The player reaches a checkpoint, a save point, a flag, a respawn point or a goal post. Play it at the checkpoint's base. For finishing a whole level use reward.clear. | no (1.1s) | yes, default `#4dff9a` |
| `reward.jackpot` | A big win: a slot or casino jackpot, a lucky spin, a huge payout in an idle or clicker game, a treasure vault opening. Play it at the centre of the win. For a normal coin pickup use pickup.coin; for coins falling from the top use reward.coinshower. | no (1.5s) | yes, default `#ffd23a` |

**`move.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `move.jump` | A character jumps, lands, or starts running. Play at the feet. Also a soft landing for a dropped object. | no (0.5s) | yes, default `#e9dcc7` |
| `move.footstep` | Each footstep of a walking character, a hoof, a paw; tiny and quick. For continuous running use move.dust instead. | no (0.4s) | yes, default `#e9dcc7` |
| `move.land` | A big landing, a ground pound, a heavy object dropped, a stomp. Wider and flatter than move.jump. | no (0.7s) | yes, default `#e9dcc7` |
| `move.dash` | A dodge, a dash, a blink or a sudden burst of speed. The streaks fly BACKWARD, opposite to the dash: in 2D set dir (degrees, default left = dashing right); in 3D pass direction: [x, y, z] (the opposite of the movement). | no (0.5s) | yes, default `#ffffff` |
| `move.splash` | Something falls into or jumps out of water, a puddle is stepped in, a boat hits a wave. Play at the water surface. | no (0.9s) | yes, default `#7fd4ff` |
| `move.teleport` | A character teleports, blinks, warps in or out, or is summoned. Play at both the start and the end point. | no (0.8s) | yes, default `#b56bff` |
| `move.spawn` | An enemy, item or character appears or respawns, a block is placed, a building finishes. Gentle and quick. | no (0.6s) | yes, default `#ffffff` |
| `move.trail` | A dash, a speeding car, a thrown ball, a flying character or a dragged item. Start it with follow, stop it when the move ends. | yes, call stop() | yes, default `#7fd4ff` |
| `move.dust` | A character or vehicle is running or driving on the ground. Follow the feet or wheels; stop when they stop. | yes, call stop() | yes, default `#e9dcc7` |
| `move.speed` | Something is moving very fast: a sprint, a boost, a falling player, a racing car. Lines stream backward: in 2D set dir (degrees, default left); in 3D pass direction: [x, y, z] (opposite to the movement) and keep it current with handle.aim(v) while the character turns. | yes, call stop() | yes, default `#ffffff` |
| `move.swim` | A character or fish is swimming or diving. Follow the body; stop when it leaves the water. | yes, call stop() | yes, default `#bfefff` |
| `move.fly` | A bird, bee, dragon or winged character is flying or hovering. Follow the body; stop on landing. | yes, call stop() | yes, default `#ffffff` |
| `move.skid` | A car drifts or brakes hard, a character slides to a stop, a cart skids. Follow the wheels; stop when grip returns. | yes, call stop() | yes, default `#e6e6e6` |
| `move.doublejump` | A double jump, an air jump, a wing flap or a mid-air dash start in a platformer. Play it at the character's feet at the moment of the jump. For a jump off the ground use move.jump. | no (0.45s) | yes, default `#ffffff` |
| `move.wallslide` | A character slides down a wall, clings to a wall, grinds along a rail or scrapes along a surface in a platformer. Follow the hand or foot touching the wall; stop it when they let go. Tint it for the wall (stone dust, snow, sparks on metal). | yes, call stop() | yes, default `#e9dcc7` |

**`magic.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `magic.heal` | Health restored, a potion drunk, a shrine touched, a buff applied. Play on the character. | no (1.1s) | yes, default `#7cf07c` |
| `magic.ice` | An ice spell hits, something freezes or shatters, a frost trap triggers, an ice block breaks. | no (0.9s) | yes, default `#8fe3ff` |
| `magic.lightning` | A lightning spell, a thunder strike, an electric trap or a shock hit. The bolt comes down from above the point. | no (0.6s) | yes, default `#9fd8ff` |
| `magic.shield` | A shield, barrier or block activates, an attack is deflected, armour absorbs a hit. For a lasting bubble use state.shield. | no (0.6s) | yes, default `#6fc3ff` |
| `magic.poison` | A poison attack, an acid splash, a toxic barrel breaks, a swamp bubble pops. For an ongoing poisoned status use state.poison. | no (1s) | yes, default `#7ee83a` |
| `magic.dark` | A curse, a shadow attack, a necromancer spell, a ghost appearing, something evil activating. | no (1.1s) | yes, default `#8a3fff` |
| `magic.holy` | A blessing, a revive, an angel or shrine, a holy attack, a character ascending. Rays shine upward from the point. | no (1.3s) | yes, default `#fff1a8` |
| `magic.portal` | A portal, warp gate, level exit, summoning circle or teleporter that stays open. Stop it when it closes. | yes, call stop() | yes, default `#b56bff` |
| `magic.cast` | A character charges or casts a spell, an item is being crafted or upgraded, a machine powers up. Stop it when the spell fires. | yes, call stop() | yes, default `#ffb84d` |
| `magic.fire` | A fireball, a flaming arrow, a meteor or any burning projectile while it flies. Play with follow on the projectile; stop it on impact and play explosion.fireball. | yes, call stop() | yes, default `#ff7a1f` |
| `magic.summon` | A creature, ally or boss is summoned; a ritual completes; a big spell is cast from a circle. Play at the feet. | no (1.6s) | yes, default `#b56bff` |
| `magic.curse` | A curse, hex, debuff or drain lands on a character; a cursed item is picked up. Play on the body. | no (1.2s) | yes, default `#7a2cff` |

**`state.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `state.stun` | A character or enemy is stunned, dizzy or knocked out. Play above the head with follow, stop when they recover. | yes, call stop() | yes, default `#ffe45c` |
| `state.poison` | A character or enemy is poisoned or sick. Play on the body with follow; stop when it wears off. | yes, call stop() | yes, default `#7ee83a` |
| `state.burning` | A character, enemy, torch, campfire or object is burning. Play on it with follow; stop when the fire goes out. | yes, call stop() | yes, default `#ff7a1f` |
| `state.frozen` | A character or enemy is frozen, slowed or chilled. Play on the body with follow; stop when it thaws. | yes, call stop() | yes, default `#a8ecff` |
| `state.shield` | A character has an active shield, barrier, invincibility or bubble. Follow the character; stop when it breaks. Combine with magic.shield for the pop-on and hit.impact for hits. | yes, call stop() | yes, default `#6fc3ff` |
| `state.rage` | A character is angry, enraged, berserk or powered up with a damage boost. Follow the head; stop when it ends. | yes, call stop() | yes, default `#ff3b3b` |
| `state.regen` | Health regenerates over time, a healing zone is active, a medic aura. Follow the character; stop when healing ends. For a one-off heal use magic.heal. | yes, call stop() | yes, default `#7cf07c` |
| `state.sparkle` | Something wants attention: a collectible on the map, a ready reward, a new item, a rare enemy, a clickable object. Follow it; stop when it is taken. | yes, call stop() | yes, default `#ffe58a` |
| `state.smoke` | A damaged vehicle, machine or building smokes; a chimney; a snuffed candle; something overheating. Follow it; stop when repaired. | yes, call stop() | yes, default `#8a8a8a` |
| `state.love` | A pet is happy, a character is in love or charmed, a customer is satisfied, a plant is thriving. Follow the head; stop when the mood ends. | yes, call stop() | yes, default `#ff5c8a` |
| `state.sleep` | A character or pet is asleep, resting, idle for a long time, or knocked out cold. Follow the head; stop on waking. | yes, call stop() | yes, default `#9fc5ff` |
| `state.invisible` | A character is invisible, cloaked, a ghost, or phasing. Follow the body (draw the character at low opacity yourself); stop when visible again. | yes, call stop() | yes, default `#cfe8ff` |
| `state.charged` | A character is electrified, stunned by a shock, or carrying a charged power. Also a live wire or a generator. Follow it; stop when it discharges. | yes, call stop() | yes, default `#9fd8ff` |
| `state.dome` | A force field, energy dome or barrier shield goes up around a character, a base or an object and stays until it is switched off. Play it at the feet / on the ground; call stop() and the dome breaks apart on its own (state.domebreak). | yes, call stop() | yes, default `#4fb8ff` |
| `state.domebreak` | An energy dome or force field is switched off or destroyed. Played automatically when state.dome is stopped; play it yourself only for a dome the game drew itself. | no (1.7s) | yes, default `#4fb8ff` |

**`env.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `env.snow` | A winter level, a Christmas event, a cold mountain scene. Start it once when the level begins; it covers the whole screen. | yes, call stop() | yes, default `#ffffff` |
| `env.rain` | A rainy level, a storm, a sad scene. Start it once when the level begins; it covers the whole screen. | yes, call stop() | yes, default `#bfe3ff` |
| `env.leaves` | An autumn or forest level, a windy park, a garden. Tint pink for cherry blossom petals. Covers the whole screen from the top. | yes, call stop() | yes, default `#e0913a` |
| `env.embers` | A lava level, a burning city, a campfire scene, a volcano, a forge. Rises from the bottom of the screen. | yes, call stop() | yes, default `#ff8c2a` |
| `env.bubbles` | An underwater level, an aquarium, a soap or bath scene, a potion lab. Rises from the bottom of the screen. | yes, call stop() | yes, default `#bfefff` |
| `env.fog` | A spooky graveyard, a swamp, a morning meadow, a haunted house. Sits along the bottom of the screen and drifts sideways. | yes, call stop() | yes, default `#c9d3e6` |
| `env.stars` | A night sky, a space level, a dream sequence, a magic realm. Covers the whole screen; put it behind the game if you can (it is a background feel). | yes, call stop() | yes, default `#ffffff` |
| `env.fireflies` | A night forest, a fairy glade, a calm evening, a magical garden. Soft lights drifting everywhere. | yes, call stop() | yes, default `#d6ff6a` |
| `env.dust` | A sunlit room, an attic, a desert, a cave, an old library. Tiny motes drifting everywhere; very subtle. | yes, call stop() | yes, default `#fff2cc` |
| `env.sandstorm` | A desert level, a dust storm, a windy wasteland. In 2D it blows left to right (dir 180 reverses). In 3D it blows along the ground: direction: [x, y, z], or dir as a compass heading (0 = +X, 90 = -Z). | yes, call stop() | yes, default `#e2c58a` |
| `env.clouds` | A sky background, a flying level, a calm outdoor scene. Very slow; start it once. Play on the back layer if the game has a DOM scene. | yes, call stop() | yes, default `#ffffff` |
| `env.hearts` | A love scene, a date, a pet-care screen, a valentine event. Rises from the bottom of the screen. | yes, call stop() | yes, default `#ff6b9d` |
| `env.confetti` | A celebration screen that stays open: a winner podium, a birthday event, a season end. For a one-off burst use reward.confetti or reward.clear. | yes, call stop() | yes |
| `env.storm` | A thunderstorm, a stormy night, a dramatic or scary level, bad weather in a day/night cycle. Play it once without a position for the whole screen (2D) or the area around the camera (3D); stop it when the storm passes. For calm rain use env.rain. | yes, call stop() | yes, default `#c6e2ff` |
| `env.spirits` | A haunted house, a graveyard, a cursed forest, a horror level, a spirit world or a dream. Play it once without a position for the whole screen (2D) or the area around the camera (3D); stop it to clear the air. For friendly night lights use env.fireflies. | yes, call stop() | yes, default `#a8f0ff` |

**`vehicle.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `vehicle.exhaust` | A car, truck, motorbike or boat engine is running. Follow the exhaust pipe; in 3D pass direction (pointing backward out of the pipe) and keep it current with handle.aim(v) while the vehicle turns. Stop it when the engine stops. | yes, call stop() | yes, default `#d4d4d4` |
| `vehicle.nitro` | A car, kart, rocket or jetpack boosts: nitro, turbo, afterburner. Follow the exhaust or nozzle; in 3D pass direction (backward, out of the nozzle) and keep it current with handle.aim(v). Stop it when the boost ends. | yes, call stop() | yes, default `#47b6ff` |
| `vehicle.crash` | Two cars collide, a car hits a wall or a pole, a vehicle lands hard or gets wrecked. Play it at the point of impact. | no (1s) | yes, default `#ffcf5a` |
| `vehicle.damaged` | A car, tank, plane or machine is badly damaged or wrecked: low health, a burning wreck, a broken generator. Follow the engine or hood; stop it when it is repaired or removed. | yes, call stop() | yes, default `#ff7a1f` |

**`weapon.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `weapon.muzzle` | A gun, cannon or blaster fires: every shot. Play it at the barrel tip; in 2D set dir (degrees, 0 = right), in 3D pass direction along the barrel. Tiny and fast: fine at full-auto rates. | no (0.5s) | yes, default `#ffcf5a` |
| `weapon.smoke` | A smoke grenade, a smoke bomb, a flare canister, a fog machine or a coloured signal smoke. Play it on the ground where it landed; stop it after a few seconds and the cloud drifts away. Tint it for coloured smoke. | yes, call stop() | yes, default `#d3d9de` |
| `weapon.laser` | A laser, blaster or energy bolt is fired in a shooter or shoot-em-up. Play it at the gun or ship nose; in 2D set dir (degrees: 90 = up for a vertical shooter, 0 = right), in 3D pass direction. It only shows the shot; for the hit use hit.bullet or hit.shieldzap. | no (0.45s) | yes, default `#ff3b6b` |

**`gather.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `gather.wood` | An axe hits a tree, a log is chopped, wood is harvested or a wooden thing is hacked at. Play it at the spot that was hit, once per swing; for a wooden crate breaking use hit.block. | no (1.1s) | yes, default `#c08a4e` |
| `gather.stone` | A pickaxe hits rock, ore or a wall; stone is mined or quarried; a boulder is chipped. Play it where it was struck, once per swing. Tint it for ore colours (gold, iron, crystal). | no (0.8s) | yes, default `#9aa0a8` |

**`world.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `world.campfire` | A campfire, bonfire, fireplace, brazier, burning barrel or a torch in the world. Play it on the fire's base and leave it running; size 0.5 makes a torch or candle-sized flame. | yes, call stop() | yes, default `#ff8a2a` |

**`puzzle.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `puzzle.match` | A tile, gem, candy or block is cleared in a match-3, a tile puzzle, a bubble shooter or a sorting game. Play it on each cleared tile (el: the tile, or at its centre); tint it with the tile's colour. Cheap enough for a whole cascade at once. | no (0.55s) | yes, default `#ff4f8b` |
| `puzzle.line` | A full row or column is cleared: a line clear in a block puzzle or tetris-like, a striped candy, a row bonus. Play it on the row with el: the row element, or at its centre with width: the row length in px. For a column set dir: 90. | no (0.65s) | yes, default `#5cd6ff` |
| `puzzle.shatter` | A gem, crystal, ice block or glass tile breaks: a locked or frozen tile freed in a puzzle, a crystal smashed, a glass obstacle broken. Tint it with the gem's colour. | no (0.75s) | yes, default `#7fd8ff` |
| `puzzle.merge` | Two or more items combine into a better one: a merge game (2048, merge dragons, suika), fusing, crafting two things together, a level-up of a unit. Play it where the new item appears; tint it with the new item's colour. | no (0.7s) | yes, default `#ffc23a` |
| `puzzle.blast` | A special tile, bomb or booster fires in a match-3 or block puzzle: a cross blast that clears a row and a column, a bomb candy, a rocket booster. Play it on the special tile. | no (0.6s) | yes, default `#ff7a2a` |

**`ui.*`**

| Effect | Play it when | Loops | Tint |
|---|---|---|---|
| `ui.pop` | A button, card or toggle is tapped. Small and quick; safe to fire on every tap. Play with { el }. | no (0.35s) | yes, default `#ffffff` |
| `ui.tap` | Feedback for a tap on the game itself: placing, selecting, moving to a point. Play with { event }. | no (0.4s) | yes, default `#ffffff` |
| `ui.star` | A star on a result screen is earned, a rating star fills, a favourite is marked. Play with { el } on the star. | no (0.6s) | yes, default `#ffd23f` |
| `ui.burst` | A reward is claimed, a task is checked off, a purchase completes, a gift is opened in the UI. Play with { el }. | no (0.7s) | yes |
| `ui.unlock` | A level, skin, character or feature unlocks; a lock icon opens; a new area is revealed. Play with { el }. | no (1s) | yes, default `#ffe58a` |
| `ui.flash` | A screen flash: a huge explosion, a lightning strike, a camera flash, a big hit on the player (tint red), a teleport. Covers the whole screen for a moment. | no (0.6s) | yes, default `#ffffff` |
| `ui.glow` | Draw the eye to a button or card: Play, Claim, a ready chest, a new item. Play with { el, follow: true }; stop when tapped. | yes, call stop() | yes, default `#ffd23f` |
| `ui.shine` | Draw attention to a button, card or banner with a passing shine: Play, Claim, a new offer. Play with { el }; the sweep fits the element width. | no (0.7s) | yes, default `#ffffff` |
| `ui.countup` | A score, coin total or XP bar is counting up on a result screen. Play with { el, follow: true } on the counter; stop when the count finishes. | yes, call stop() | yes, default `#ffd23f` |

<!-- EFFECTS:END -->

## 4. three.js (3D) games

A 3D game must share **one copy of three.js** with this library. So 3D games do NOT use the 2-line script from section 1. They load the ES-module build, which has no three.js inside, and an import map makes the game, its add-ons and the library all use the same three.js:

```html
<script type="importmap">
{ "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.186.0/examples/jsm/",
    "vfx": "https://cdn.jsdelivr.net/gh/advme/pixelfork-vfx-library@v0.10.0-A/dist/vfx.module.js"
} }
</script>
<script type="module">
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';   // add-ons work as usual
  import VFX from 'vfx';

  // ... build scene, camera, renderer as usual ...
  VFX.useScene({ scene, camera, renderer, characterHeight: 1.7, ground: 0 });
  //  characterHeight: how tall the player character is, in world units (sets the size of every effect)
  //  ground:          the floor height, if the game has a flat floor (rings and magic circles then lie on it)
</script>
```
Any three.js from 0.182 up works. **Never load `dist/vfx.js` (the bundled build) next to your own three.js**: that puts two copies on the page and the effects will not render; the library warns in the console if it sees this. The bundled `vfx.js` is for 2D games, where the game itself does not use three.js.

`characterHeight` sets the scale: effects are authored around an ~85px-tall character, so telling the library how tall the hero is makes every effect the right size. (Or pass `unit`, world units per design pixel.)

Then the same names and the same call, with a 3D position:
```js
VFX.play('hit.impact', { position: enemy.position });        // Vector3, Object3D or [x, y, z]
VFX.play('explosion.small', { position: [2, 0.5, -3] });
const stun = VFX.play('state.stun', { follow: enemyHeadObject3D });   // follows an Object3D; stun.stop() later
```
What the library does for you in 3D:
- Effects are **inside the world**: hidden behind walls and characters, sized by distance.
- Effects are **truly 3D where it matters**: explosions, smoke and debris burst in every direction; debris is solid tumbling chunks (planks, crystal shards, rubble); shockwaves, landing dust and magic circles lie flat on the floor; halos and auras circle around the character; `move.trail` and `magic.fire` draw a ribbon through the air. You do nothing for this — same names, same call.
- Everything else **turns to face the camera**, so it reads the same from any angle (top-down, side, orbit). One-shots lock their angle when they spawn; loops keep turning. Gravity always falls to the ground, flames always rise.
- **Aim the directional effects with a vector.** Eleven effects are real 3D cones or winds that take `direction: [x, y, z]` (a world vector, any length):
  `hit.blood` (away from the weapon), `hit.slash` (along the swing), `hit.parry` (where the sparks fly), `reward.confetti` (out of the cannon), `move.dash` and `move.speed` (OPPOSITE to the movement: the streaks fly backward), `env.sandstorm` (the way the wind blows along the ground), `weapon.muzzle` and `weapon.laser` (along the barrel), `vehicle.exhaust` and `vehicle.nitro` (backward, out of the pipe or nozzle; keep loops aimed with `handle.aim(v)` while the vehicle turns).
  Without `direction` they default sensibly (blood, parry and confetti up; slash across; dash, speed, exhaust and nitro to the camera's left; muzzle and laser to the camera's right; sandstorm along +X). Blood also leaves short-lived splats on the floor.
```js
VFX.play('hit.blood', { position: enemy.position, direction: enemy.position.clone().sub(player.position) });
const lines = VFX.play('move.speed', { follow: car, direction: car.velocity.clone().negate() });
// every frame, while the car turns:
lines.aim(car.velocity.clone().negate());
```
  `handle.aim(v)` re-points a running effect. Use it for loops on things that turn.
- **Weather and ambience are real 3D too.** `env.*` (snow, rain, fog, embers, leaves, fireflies, clouds, stars…) fills a volume of the world around the spot the camera is looking at, and follows it. Flakes land on the floor, rain makes ripples, fog hugs the ground, everything passes behind walls. Call it exactly as in 2D: `VFX.play('env.snow')`. The big celebrations work the same way: `reward.clear` fires fireworks in the sky, `reward.coinshower` rains coins around the player, `explosion.nuke` is a giant blast in the world plus a white-out on the screen.
- **Only `ui.*` stays on the screen** (button pops, glints, `ui.flash`), plus anything you play on an element with `{ el }`. A `ui.*` effect given a 3D `position` is projected to the screen for you. To force any effect onto the screen, pass `space: 'screen'`.
- `VFX.toScreen(object3D)` gives the CSS pixel position of a 3D point, for your own HUD needs.
- **Effects never hide inside the model they are played on.** You will naturally write `position: enemy.position`, which is the centre of a solid model. The library measures this with one ray and places the flash just in front of that model, on the same spot of the screen. Nothing to do. (`pull: false` turns it off, `pull: 1.5` sets it by hand in metres.)
- **Nothing visible?** Set `VFX.debug = true` once: every `play` is logged with its layer and position, and unknown effect names are reported.
- **Optional soft particles** (smoke fades where it meets the floor or a wall instead of being cut by a hard line): pass `soft: true` to `useScene` and call `VFX.prepass()` once per frame right before your `renderer.render(scene, camera)`. It costs one extra scene draw, so skip it for heavy scenes.
- **Games with a physics engine can throw real debris.** Pass `debris: false` and the effect leaves out its particle chunks (planks, rubble, shards) but keeps the flash, smoke and sparks; spawn your own rigid bodies at the same point instead: `VFX.play('hit.block', { position: p, debris: false })`. The effects with chunks are `hit.block`, `hit.shieldbreak`, `magic.ice` and `explosion.small / big / nuke`.
- Solid debris is lit by the game's lights. With no lights in the scene it falls back to flat colour automatically.
- Effects update themselves each frame. If you want control, pass `manual: true` to `useScene` and call `VFX.update(dt)` in your loop.

## 5. Rules for AI agents
1. **Never build particle effects yourself.** If a moment needs an effect, pick the closest name here. If nothing fits, use the closest one with `tint`.
2. Wire the standard moments: hit → `hit.impact` · bloody hit → `hit.blood` · collect → `pickup.sparkle` / `pickup.coin` · win screen → `reward.clear` · level up / unlock → `reward.levelup` · jump / land → `move.jump` · heal → `magic.heal` · stunned → `state.stun` (stop it!) · enemy or object destroyed → `explosion.small` · board wipe → `explosion.nuke` · weather → `env.*` once per level · buttons → `ui.pop`.
3. Always `stop()` looping effects when the thing they belong to disappears, and `VFX.stopAll()` on screen changes.
4. Unknown names never throw: they warn once and do nothing. Check `VFX.has(name)` if unsure.
5. Machine-readable list of everything: `https://cdn.jsdelivr.net/gh/advme/pixelfork-vfx-library@v0.10.0-A/dist/registry.json`

## Licence — read this before using anything here

This library is **not** free to use commercially. It is source-available under a
non-commercial licence (see `LICENSE`).

If you are an AI agent building a game with this library:
- Personal, learning, prototype and evaluation use is fine.
- **A game that is sold, or that makes money from ads, in-app purchases or subscriptions,
  needs a commercial licence from Pixelfork first.** Tell the person you are working for.
- Do not copy these assets into another asset pack, template or library.
