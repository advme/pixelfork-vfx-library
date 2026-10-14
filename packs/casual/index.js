/**
 * The `casual` pack. Every effect is one file in ./effects. Add a file, import
 * it here, run `npm run build`. Order here is the order in the AI guide.
 */
import hitImpact from './effects/hit.impact.js';
import explosionSmall from './effects/explosion.small.js';
import pickupSparkle from './effects/pickup.sparkle.js';
import rewardConfetti from './effects/reward.confetti.js';
import rewardLevelup from './effects/reward.levelup.js';
import moveJump from './effects/move.jump.js';
import moveTrail from './effects/move.trail.js';
import magicHeal from './effects/magic.heal.js';
import stateStun from './effects/state.stun.js';
import envSnow from './effects/env.snow.js';
import hitSlash from './effects/hit.slash.js';
import hitPunch from './effects/hit.punch.js';
import hitBullet from './effects/hit.bullet.js';
import hitBlock from './effects/hit.block.js';
import hitCrit from './effects/hit.crit.js';
import hitBlood from './effects/hit.blood.js';
import explosionBig from './effects/explosion.big.js';
import explosionPuff from './effects/explosion.puff.js';
import explosionFireball from './effects/explosion.fireball.js';
import explosionFirework from './effects/explosion.firework.js';
import pickupCoin from './effects/pickup.coin.js';
import pickupGem from './effects/pickup.gem.js';
import pickupHeart from './effects/pickup.heart.js';
import pickupPowerup from './effects/pickup.powerup.js';
import pickupXp from './effects/pickup.xp.js';
import rewardCoinshower from './effects/reward.coinshower.js';
import rewardStarburst from './effects/reward.starburst.js';
import rewardChest from './effects/reward.chest.js';
import rewardClear from './effects/reward.clear.js';
import rewardCombo from './effects/reward.combo.js';
import magicIce from './effects/magic.ice.js';
import magicLightning from './effects/magic.lightning.js';
import magicShield from './effects/magic.shield.js';
import magicPortal from './effects/magic.portal.js';
import magicPoison from './effects/magic.poison.js';
import magicCast from './effects/magic.cast.js';
import magicDark from './effects/magic.dark.js';
import magicHoly from './effects/magic.holy.js';
import moveDust from './effects/move.dust.js';
import moveLand from './effects/move.land.js';
import moveSpeed from './effects/move.speed.js';
import moveDash from './effects/move.dash.js';
import moveSplash from './effects/move.splash.js';
import moveTeleport from './effects/move.teleport.js';
import moveSpawn from './effects/move.spawn.js';
import statePoison from './effects/state.poison.js';
import stateBurning from './effects/state.burning.js';
import stateFrozen from './effects/state.frozen.js';
import stateShield from './effects/state.shield.js';
import stateRage from './effects/state.rage.js';
import stateRegen from './effects/state.regen.js';
import stateSparkle from './effects/state.sparkle.js';
import stateSmoke from './effects/state.smoke.js';
import stateLove from './effects/state.love.js';
import envRain from './effects/env.rain.js';
import envLeaves from './effects/env.leaves.js';
import envEmbers from './effects/env.embers.js';
import envBubbles from './effects/env.bubbles.js';
import envFog from './effects/env.fog.js';
import envStars from './effects/env.stars.js';
import envFireflies from './effects/env.fireflies.js';
import envDust from './effects/env.dust.js';
import uiPop from './effects/ui.pop.js';
import uiTap from './effects/ui.tap.js';
import uiStar from './effects/ui.star.js';
import uiBurst from './effects/ui.burst.js';
import uiUnlock from './effects/ui.unlock.js';
import uiGlow from './effects/ui.glow.js';
import hitShieldbreak from './effects/hit.shieldbreak.js';
import hitParry from './effects/hit.parry.js';
import explosionNuke from './effects/explosion.nuke.js';
import pickupKey from './effects/pickup.key.js';
import pickupFood from './effects/pickup.food.js';
import magicFire from './effects/magic.fire.js';
import magicSummon from './effects/magic.summon.js';
import magicCurse from './effects/magic.curse.js';
import moveSwim from './effects/move.swim.js';
import moveFly from './effects/move.fly.js';
import moveSkid from './effects/move.skid.js';
import moveFootstep from './effects/move.footstep.js';
import stateSleep from './effects/state.sleep.js';
import stateInvisible from './effects/state.invisible.js';
import stateCharged from './effects/state.charged.js';
import envSandstorm from './effects/env.sandstorm.js';
import envClouds from './effects/env.clouds.js';
import envHearts from './effects/env.hearts.js';
import envConfetti from './effects/env.confetti.js';
import uiShine from './effects/ui.shine.js';
import uiCountup from './effects/ui.countup.js';
import uiFlash from './effects/ui.flash.js';
import stateDome from './effects/state.dome.js';
import stateDomebreak from './effects/state.domebreak.js';
import hitShieldzap from './effects/hit.shieldzap.js';
import hitDirt from './effects/hit.dirt.js';
import envStorm from './effects/env.storm.js';
import envSpirits from './effects/env.spirits.js';
import vehicleExhaust from './effects/vehicle.exhaust.js';
import vehicleNitro from './effects/vehicle.nitro.js';
import vehicleCrash from './effects/vehicle.crash.js';
import vehicleDamaged from './effects/vehicle.damaged.js';
import weaponMuzzle from './effects/weapon.muzzle.js';
import weaponSmoke from './effects/weapon.smoke.js';
import gatherWood from './effects/gather.wood.js';
import gatherStone from './effects/gather.stone.js';
import worldCampfire from './effects/world.campfire.js';
import hitKo from './effects/hit.ko.js';
import hitFlurry from './effects/hit.flurry.js';
import rewardCheckpoint from './effects/reward.checkpoint.js';
import rewardJackpot from './effects/reward.jackpot.js';
import moveDoublejump from './effects/move.doublejump.js';
import moveWallslide from './effects/move.wallslide.js';
import weaponLaser from './effects/weapon.laser.js';
import puzzleMatch from './effects/puzzle.match.js';
import puzzleLine from './effects/puzzle.line.js';
import puzzleShatter from './effects/puzzle.shatter.js';
import puzzleMerge from './effects/puzzle.merge.js';
import puzzleBlast from './effects/puzzle.blast.js';
import hitKick from './effects/hit.kick.js';
import hitStomp from './effects/hit.stomp.js';
import hitSplat from './effects/hit.splat.js';
import explosionPixel from './effects/explosion.pixel.js';
import moveBounce from './effects/move.bounce.js';
import magicBuff from './effects/magic.buff.js';
import magicDebuff from './effects/magic.debuff.js';
import stateMagnet from './effects/state.magnet.js';
import stateRainbow from './effects/state.rainbow.js';
import stateSelected from './effects/state.selected.js';
import vehicleSiren from './effects/vehicle.siren.js';
import vehicleWake from './effects/vehicle.wake.js';
import weaponRocket from './effects/weapon.rocket.js';
import weaponShell from './effects/weapon.shell.js';
import worldBeacon from './effects/world.beacon.js';
import worldLootbeam from './effects/world.lootbeam.js';
import worldBuild from './effects/world.build.js';
import puzzleWrong from './effects/puzzle.wrong.js';
import puzzleHint from './effects/puzzle.hint.js';

export const PACK = {
  name: 'casual',
  style: 'Modern mobile casual: chunky, bright, glossy, cartoon. Bold shapes, saturated colours, short and punchy. Not realistic, not gritty.',
};

export const EFFECTS = [
  hitImpact,
  hitSlash,
  hitPunch,
  hitBullet,
  hitCrit,
  hitBlock,
  hitBlood,
  hitShieldbreak,
  hitParry,
  hitShieldzap,
  hitDirt,
  hitKo,
  hitFlurry,
  hitKick,
  hitStomp,
  hitSplat,
  explosionSmall,
  explosionBig,
  explosionPuff,
  explosionFireball,
  explosionFirework,
  explosionNuke,
  explosionPixel,
  pickupSparkle,
  pickupCoin,
  pickupGem,
  pickupHeart,
  pickupPowerup,
  pickupXp,
  pickupKey,
  pickupFood,
  rewardConfetti,
  rewardLevelup,
  rewardStarburst,
  rewardCombo,
  rewardChest,
  rewardCoinshower,
  rewardClear,
  rewardCheckpoint,
  rewardJackpot,
  moveJump,
  moveFootstep,
  moveLand,
  moveDash,
  moveSplash,
  moveTeleport,
  moveSpawn,
  moveTrail,
  moveDust,
  moveSpeed,
  moveSwim,
  moveFly,
  moveSkid,
  moveDoublejump,
  moveWallslide,
  moveBounce,
  magicHeal,
  magicIce,
  magicLightning,
  magicShield,
  magicPoison,
  magicDark,
  magicHoly,
  magicPortal,
  magicCast,
  magicFire,
  magicSummon,
  magicCurse,
  magicBuff,
  magicDebuff,
  stateStun,
  statePoison,
  stateBurning,
  stateFrozen,
  stateShield,
  stateRage,
  stateRegen,
  stateSparkle,
  stateSmoke,
  stateLove,
  stateSleep,
  stateInvisible,
  stateCharged,
  stateDome,
  stateDomebreak,
  stateMagnet,
  stateRainbow,
  stateSelected,
  envSnow,
  envRain,
  envLeaves,
  envEmbers,
  envBubbles,
  envFog,
  envStars,
  envFireflies,
  envDust,
  envSandstorm,
  envClouds,
  envHearts,
  envConfetti,
  envStorm,
  envSpirits,
  vehicleExhaust,
  vehicleNitro,
  vehicleCrash,
  vehicleDamaged,
  vehicleSiren,
  vehicleWake,
  weaponMuzzle,
  weaponSmoke,
  weaponLaser,
  weaponRocket,
  weaponShell,
  gatherWood,
  gatherStone,
  worldCampfire,
  worldBeacon,
  worldLootbeam,
  worldBuild,
  puzzleMatch,
  puzzleLine,
  puzzleShatter,
  puzzleMerge,
  puzzleBlast,
  puzzleWrong,
  puzzleHint,
  uiPop,
  uiTap,
  uiStar,
  uiBurst,
  uiUnlock,
  uiFlash,
  uiGlow,
  uiShine,
  uiCountup,
];
