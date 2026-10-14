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
import hitElectric from './effects/hit.electric.js';
import hitFire from './effects/hit.fire.js';
import hitIce from './effects/hit.ice.js';
import hitHeavy from './effects/hit.heavy.js';
import hitMetal from './effects/hit.metal.js';
import explosionIce from './effects/explosion.ice.js';
import explosionElectric from './effects/explosion.electric.js';
import explosionToxic from './effects/explosion.toxic.js';
import explosionMagic from './effects/explosion.magic.js';
import explosionWater from './effects/explosion.water.js';
import weaponShotgun from './effects/weapon.shotgun.js';
import weaponFlamethrower from './effects/weapon.flamethrower.js';
import magicMeteor from './effects/magic.meteor.js';
import magicTornado from './effects/magic.tornado.js';
import magicEarth from './effects/magic.earth.js';
import magicBeam from './effects/magic.beam.js';
import magicBlackhole from './effects/magic.blackhole.js';
import magicRevive from './effects/magic.revive.js';
import magicNature from './effects/magic.nature.js';
import magicTime from './effects/magic.time.js';
import stateAura from './effects/state.aura.js';
import stateElectrified from './effects/state.electrified.js';
import stateWet from './effects/state.wet.js';
import stateBleeding from './effects/state.bleeding.js';
import stateSad from './effects/state.sad.js';
import stateMusic from './effects/state.music.js';
import stateSweat from './effects/state.sweat.js';
import stateHappy from './effects/state.happy.js';
import worldTorch from './effects/world.torch.js';
import worldFountain from './effects/world.fountain.js';
import worldLava from './effects/world.lava.js';
import worldSteam from './effects/world.steam.js';
import worldSparks from './effects/world.sparks.js';
import worldCrystal from './effects/world.crystal.js';
import worldRipple from './effects/world.ripple.js';
import worldBoostpad from './effects/world.boostpad.js';
import envPetals from './effects/env.petals.js';
import envBlizzard from './effects/env.blizzard.js';
import envAsh from './effects/env.ash.js';
import envMeteors from './effects/env.meteors.js';
import envWind from './effects/env.wind.js';
import rewardGoal from './effects/reward.goal.js';
import rewardRankup from './effects/reward.rankup.js';
import pickupStar from './effects/pickup.star.js';
import pickupMana from './effects/pickup.mana.js';
import pickupArmor from './effects/pickup.armor.js';
import gatherHarvest from './effects/gather.harvest.js';
import puzzleBubble from './effects/puzzle.bubble.js';
import envAurora from './effects/env.aurora.js';
import envChristmas from './effects/env.christmas.js';
import envDrizzle from './effects/env.drizzle.js';
import envDustdevil from './effects/env.dustdevil.js';
import envFeathers from './effects/env.feathers.js';
import envHail from './effects/env.hail.js';
import envHalloween from './effects/env.halloween.js';
import envHeat from './effects/env.heat.js';
import envLanterns from './effects/env.lanterns.js';
import envMagic from './effects/env.magic.js';
import envMist from './effects/env.mist.js';
import envNebula from './effects/env.nebula.js';
import envOcean from './effects/env.ocean.js';
import envPartylights from './effects/env.partylights.js';
import envPollen from './effects/env.pollen.js';
import envRainbowsparkle from './effects/env.rainbowsparkle.js';
import envSmoke from './effects/env.smoke.js';
import envSpace from './effects/env.space.js';
import envSpores from './effects/env.spores.js';
import envSunrays from './effects/env.sunrays.js';
import envUnderground from './effects/env.underground.js';
import envUnderwater from './effects/env.underwater.js';
import explosionArtillery from './effects/explosion.artillery.js';
import explosionBalloon from './effects/explosion.balloon.js';
import explosionBarrel from './effects/explosion.barrel.js';
import explosionBass from './effects/explosion.bass.js';
import explosionCandy from './effects/explosion.candy.js';
import explosionCatapult from './effects/explosion.catapult.js';
import explosionChain from './effects/explosion.chain.js';
import explosionDust from './effects/explosion.dust.js';
import explosionGlitter from './effects/explosion.glitter.js';
import explosionGunpowder from './effects/explosion.gunpowder.js';
import explosionMine from './effects/explosion.mine.js';
import explosionPaint from './effects/explosion.paint.js';
import explosionShip from './effects/explosion.ship.js';
import explosionShockwave from './effects/explosion.shockwave.js';
import explosionSmokebomb from './effects/explosion.smokebomb.js';
import explosionSoul from './effects/explosion.soul.js';
import explosionSupernova from './effects/explosion.supernova.js';
import gatherDrill from './effects/gather.drill.js';
import gatherEgg from './effects/gather.egg.js';
import gatherFish from './effects/gather.fish.js';
import gatherSeed from './effects/gather.seed.js';
import gatherWater from './effects/gather.water.js';
import hitArrow from './effects/hit.arrow.js';
import hitAsteroid from './effects/hit.asteroid.js';
import hitBackstab from './effects/hit.backstab.js';
import hitBite from './effects/hit.bite.js';
import hitBonk from './effects/hit.bonk.js';
import hitBrick from './effects/hit.brick.js';
import hitCharge from './effects/hit.charge.js';
import hitClaw from './effects/hit.claw.js';
import hitCounter from './effects/hit.counter.js';
import hitDunk from './effects/hit.dunk.js';
import hitElementfire from './effects/hit.elementfire.js';
import hitElementice from './effects/hit.elementice.js';
import hitElementshock from './effects/hit.elementshock.js';
import hitEmp from './effects/hit.emp.js';
import hitFur from './effects/hit.fur.js';
import hitGhost from './effects/hit.ghost.js';
import hitGlass from './effects/hit.glass.js';
import hitGolf from './effects/hit.golf.js';
import hitHomerun from './effects/hit.homerun.js';
import hitLaser from './effects/hit.laser.js';
import hitNote from './effects/hit.note.js';
import hitPaddle from './effects/hit.paddle.js';
import hitPie from './effects/hit.pie.js';
import hitRacket from './effects/hit.racket.js';
import hitRobot from './effects/hit.robot.js';
import hitShieldwall from './effects/hit.shieldwall.js';
import hitSlow from './effects/hit.slow.js';
import hitSonic from './effects/hit.sonic.js';
import hitSplashhit from './effects/hit.splashhit.js';
import hitSweep from './effects/hit.sweep.js';
import hitTackle from './effects/hit.tackle.js';
import hitThrust from './effects/hit.thrust.js';
import hitUpgradefail from './effects/hit.upgradefail.js';
import hitWater from './effects/hit.water.js';
import magicBarrier from './effects/magic.barrier.js';
import magicCharge from './effects/magic.charge.js';
import magicClone from './effects/magic.clone.js';
import magicDrain from './effects/magic.drain.js';
import magicGust from './effects/magic.gust.js';
import magicHeallaura from './effects/magic.heallaura.js';
import magicLeap from './effects/magic.leap.js';
import magicMark from './effects/magic.mark.js';
import magicMissile from './effects/magic.missile.js';
import magicRaise from './effects/magic.raise.js';
import magicRune from './effects/magic.rune.js';
import magicShockwave from './effects/magic.shockwave.js';
import magicStarfall from './effects/magic.starfall.js';
import magicTransform from './effects/magic.transform.js';
import magicUltimate from './effects/magic.ultimate.js';
import magicWarcry from './effects/magic.warcry.js';
import magicWave from './effects/magic.wave.js';
import moveBlink from './effects/move.blink.js';
import moveBlinkstrike from './effects/move.blinkstrike.js';
import moveBreach from './effects/move.breach.js';
import moveClimb from './effects/move.climb.js';
import moveDig from './effects/move.dig.js';
import moveDive from './effects/move.dive.js';
import moveDodge from './effects/move.dodge.js';
import moveEmerge from './effects/move.emerge.js';
import moveFeathers from './effects/move.feathers.js';
import moveGlide from './effects/move.glide.js';
import moveGroundpound from './effects/move.groundpound.js';
import moveHatch from './effects/move.hatch.js';
import moveJetpack from './effects/move.jetpack.js';
import moveLanding from './effects/move.landing.js';
import moveLedge from './effects/move.ledge.js';
import moveOrbit from './effects/move.orbit.js';
import moveParachute from './effects/move.parachute.js';
import movePounce from './effects/move.pounce.js';
import moveRoll from './effects/move.roll.js';
import moveRustle from './effects/move.rustle.js';
import moveShadowstep from './effects/move.shadowstep.js';
import moveShake from './effects/move.shake.js';
import moveSkate from './effects/move.skate.js';
import moveSlide from './effects/move.slide.js';
import moveSurf from './effects/move.surf.js';
import moveSweep from './effects/move.sweep.js';
import moveSwing from './effects/move.swing.js';
import moveWallkick from './effects/move.wallkick.js';
import moveWarp from './effects/move.warp.js';
import pickupBomb from './effects/pickup.bomb.js';
import pickupFuel from './effects/pickup.fuel.js';
import pickupLife from './effects/pickup.life.js';
import pickupMultiball from './effects/pickup.multiball.js';
import pickupShard from './effects/pickup.shard.js';
import pickupSpeed from './effects/pickup.speed.js';
import pickupTime from './effects/pickup.time.js';
import pickupTreat from './effects/pickup.treat.js';
import rewardBigcombo from './effects/reward.bigcombo.js';
import rewardBirthday from './effects/reward.birthday.js';
import rewardCardreveal from './effects/reward.cardreveal.js';
import rewardCheer from './effects/reward.cheer.js';
import rewardClean from './effects/reward.clean.js';
import rewardCooked from './effects/reward.cooked.js';
import rewardEncore from './effects/reward.encore.js';
import rewardFinish from './effects/reward.finish.js';
import rewardFireworkshow from './effects/reward.fireworkshow.js';
import rewardGift from './effects/reward.gift.js';
import rewardGood from './effects/reward.good.js';
import rewardGreat from './effects/reward.great.js';
import rewardLegendary from './effects/reward.legendary.js';
import rewardPerfect from './effects/reward.perfect.js';
import rewardRare from './effects/reward.rare.js';
import rewardRecord from './effects/reward.record.js';
import rewardSticker from './effects/reward.sticker.js';
import rewardStreak from './effects/reward.streak.js';
import rewardSummon from './effects/reward.summon.js';
import rewardTrophy from './effects/reward.trophy.js';
import rewardUnbox from './effects/reward.unbox.js';
import rewardUpgrade from './effects/reward.upgrade.js';
import rewardWheel from './effects/reward.wheel.js';
import stateAngry from './effects/state.angry.js';
import stateCharmed from './effects/state.charmed.js';
import stateCloak from './effects/state.cloak.js';
import stateCursed from './effects/state.cursed.js';
import stateDance from './effects/state.dance.js';
import stateDrunk from './effects/state.drunk.js';
import stateFear from './effects/state.fear.js';
import stateFocus from './effects/state.focus.js';
import stateFreezing from './effects/state.freezing.js';
import stateGlitch from './effects/state.glitch.js';
import stateGroove from './effects/state.groove.js';
import stateHalo from './effects/state.halo.js';
import stateHasted from './effects/state.hasted.js';
import stateHaunted from './effects/state.haunted.js';
import stateInvulnerable from './effects/state.invulnerable.js';
import stateLevitate from './effects/state.levitate.js';
import stateLucky from './effects/state.lucky.js';
import stateMarked from './effects/state.marked.js';
import stateOverheat from './effects/state.overheat.js';
import statePossessed from './effects/state.possessed.js';
import statePurr from './effects/state.purr.js';
import stateRally from './effects/state.rally.js';
import stateSick from './effects/state.sick.js';
import stateSleepy from './effects/state.sleepy.js';
import stateSlowed from './effects/state.slowed.js';
import stateSurprise from './effects/state.surprise.js';
import stateThinking from './effects/state.thinking.js';
import stateUltready from './effects/state.ultready.js';
import stateZerog from './effects/state.zerog.js';
import uiAchievement from './effects/ui.achievement.js';
import uiBeat from './effects/ui.beat.js';
import uiCarddeal from './effects/ui.carddeal.js';
import uiCardflip from './effects/ui.cardflip.js';
import uiChip from './effects/ui.chip.js';
import uiCooldown from './effects/ui.cooldown.js';
import uiCorrect from './effects/ui.correct.js';
import uiCountdown from './effects/ui.countdown.js';
import uiDice from './effects/ui.dice.js';
import uiFill from './effects/ui.fill.js';
import uiFocuslines from './effects/ui.focuslines.js';
import uiFrozen from './effects/ui.frozen.js';
import uiGameover from './effects/ui.gameover.js';
import uiGo from './effects/ui.go.js';
import uiHack from './effects/ui.hack.js';
import uiHealed from './effects/ui.healed.js';
import uiHurry from './effects/ui.hurry.js';
import uiHurt from './effects/ui.hurt.js';
import uiLevelstart from './effects/ui.levelstart.js';
import uiLifelost from './effects/ui.lifelost.js';
import uiLowhp from './effects/ui.lowhp.js';
import uiMiss from './effects/ui.miss.js';
import uiNew from './effects/ui.new.js';
import uiNotify from './effects/ui.notify.js';
import uiPoisoned from './effects/ui.poisoned.js';
import uiPurchase from './effects/ui.purchase.js';
import uiRays from './effects/ui.rays.js';
import uiSparkle from './effects/ui.sparkle.js';
import uiSpeedlines from './effects/ui.speedlines.js';
import uiTapburst from './effects/ui.tapburst.js';
import uiTapme from './effects/ui.tapme.js';
import uiTransition from './effects/ui.transition.js';
import uiVictory from './effects/ui.victory.js';
import uiWrongtry from './effects/ui.wrongtry.js';
import vehicleBackfire from './effects/vehicle.backfire.js';
import vehicleDrift from './effects/vehicle.drift.js';
import vehicleExplode from './effects/vehicle.explode.js';
import vehicleJump from './effects/vehicle.jump.js';
import vehicleOffroad from './effects/vehicle.offroad.js';
import vehiclePuddle from './effects/vehicle.puddle.js';
import vehicleRotorwash from './effects/vehicle.rotorwash.js';
import vehicleScrape from './effects/vehicle.scrape.js';
import vehicleThruster from './effects/vehicle.thruster.js';
import weaponArrowrain from './effects/weapon.arrowrain.js';
import weaponBoomerang from './effects/weapon.boomerang.js';
import weaponCannon from './effects/weapon.cannon.js';
import weaponCatapult from './effects/weapon.catapult.js';
import weaponChargebow from './effects/weapon.chargebow.js';
import weaponFlamesword from './effects/weapon.flamesword.js';
import weaponFrostblade from './effects/weapon.frostblade.js';
import weaponHolyspear from './effects/weapon.holyspear.js';
import weaponLaunch from './effects/weapon.launch.js';
import weaponMinigun from './effects/weapon.minigun.js';
import weaponMusket from './effects/weapon.musket.js';
import weaponPlasma from './effects/weapon.plasma.js';
import weaponPoisondagger from './effects/weapon.poisondagger.js';
import weaponRailgun from './effects/weapon.railgun.js';
import weaponThunderhammer from './effects/weapon.thunderhammer.js';
import weaponTorpedo from './effects/weapon.torpedo.js';
import weaponTractorbeam from './effects/weapon.tractorbeam.js';
import worldAltar from './effects/world.altar.js';
import worldAnvil from './effects/world.anvil.js';
import worldBanner from './effects/world.banner.js';
import worldBloom from './effects/world.bloom.js';
import worldBubblecolumn from './effects/world.bubblecolumn.js';
import worldBurning from './effects/world.burning.js';
import worldCapture from './effects/world.capture.js';
import worldCauldron from './effects/world.cauldron.js';
import worldChestidle from './effects/world.chestidle.js';
import worldChimney from './effects/world.chimney.js';
import worldCooking from './effects/world.cooking.js';
import worldCrumble from './effects/world.crumble.js';
import worldDatastream from './effects/world.datastream.js';
import worldDiscoball from './effects/world.discoball.js';
import worldDooropen from './effects/world.dooropen.js';
import worldDripping from './effects/world.dripping.js';
import worldEnchant from './effects/world.enchant.js';
import worldFlag from './effects/world.flag.js';
import worldForcefield from './effects/world.forcefield.js';
import worldGrave from './effects/world.grave.js';
import worldGrow from './effects/world.grow.js';
import worldHologram from './effects/world.hologram.js';
import worldKeyhole from './effects/world.keyhole.js';
import worldLaserfence from './effects/world.laserfence.js';
import worldPlanetring from './effects/world.planetring.js';
import worldPressureplate from './effects/world.pressureplate.js';
import worldRally from './effects/world.rally.js';
import worldReactor from './effects/world.reactor.js';
import worldSavepoint from './effects/world.savepoint.js';
import worldSaw from './effects/world.saw.js';
import worldScanner from './effects/world.scanner.js';
import worldSecret from './effects/world.secret.js';
import worldShore from './effects/world.shore.js';
import worldSmelt from './effects/world.smelt.js';
import worldSpawnportal from './effects/world.spawnportal.js';
import worldSpeaker from './effects/world.speaker.js';
import worldSpikes from './effects/world.spikes.js';
import worldSprinkler from './effects/world.sprinkler.js';
import worldSwitch from './effects/world.switch.js';
import worldTeleporter from './effects/world.teleporter.js';
import worldTowerup from './effects/world.towerup.js';
import worldTrap from './effects/world.trap.js';
import worldVolcano from './effects/world.volcano.js';
import worldWaterfall from './effects/world.waterfall.js';
import worldWave from './effects/world.wave.js';
import worldWhirlpool from './effects/world.whirlpool.js';
import worldWormhole from './effects/world.wormhole.js';
import envAcidrain from './effects/env.acidrain.js';
import envBokeh from './effects/env.bokeh.js';
import envCandy from './effects/env.candy.js';
import envFireworks from './effects/env.fireworks.js';
import envGlitch from './effects/env.glitch.js';
import envGoldendust from './effects/env.goldendust.js';
import envMatrix from './effects/env.matrix.js';
import envMoonlight from './effects/env.moonlight.js';
import envOldfilm from './effects/env.oldfilm.js';
import envToxic from './effects/env.toxic.js';
import explosionBubblegum from './effects/explosion.bubblegum.js';
import explosionDepthcharge from './effects/explosion.depthcharge.js';
import explosionFlour from './effects/explosion.flour.js';
import explosionFrostnova from './effects/explosion.frostnova.js';
import explosionFruit from './effects/explosion.fruit.js';
import explosionJelly from './effects/explosion.jelly.js';
import explosionPellets from './effects/explosion.pellets.js';
import explosionPinata from './effects/explosion.pinata.js';
import explosionPopcorn from './effects/explosion.popcorn.js';
import explosionSlime from './effects/explosion.slime.js';
import explosionSoda from './effects/explosion.soda.js';
import explosionVirus from './effects/explosion.virus.js';
import hitBasehit from './effects/hit.basehit.js';
import hitBlockland from './effects/hit.blockland.js';
import hitChop from './effects/hit.chop.js';
import hitEat from './effects/hit.eat.js';
import hitInk from './effects/hit.ink.js';
import hitKnife from './effects/hit.knife.js';
import hitPillow from './effects/hit.pillow.js';
import hitPoisoncloud from './effects/hit.poisoncloud.js';
import hitRopecut from './effects/hit.ropecut.js';
import hitSkeleton from './effects/hit.skeleton.js';
import hitSlice from './effects/hit.slice.js';
import hitSplashdown from './effects/hit.splashdown.js';
import hitSqueak from './effects/hit.squeak.js';
import hitTilebreak from './effects/hit.tilebreak.js';
import hitWaterballoon from './effects/hit.waterballoon.js';
import magicBubblewand from './effects/magic.bubblewand.js';
import magicSlowfield from './effects/magic.slowfield.js';
import moveFall from './effects/move.fall.js';
import moveGrow from './effects/move.grow.js';
import moveSplit from './effects/move.split.js';
import moveSquash from './effects/move.squash.js';
import moveStir from './effects/move.stir.js';
import pickupIngredient from './effects/pickup.ingredient.js';
import pickupPearl from './effects/pickup.pearl.js';
import pickupPellet from './effects/pickup.pellet.js';
import pickupPotion from './effects/pickup.potion.js';
import pickupScroll from './effects/pickup.scroll.js';
import pickupVacuum from './effects/pickup.vacuum.js';
import puzzleCapture from './effects/puzzle.capture.js';
import puzzleFlip from './effects/puzzle.flip.js';
import puzzlePair from './effects/puzzle.pair.js';
import puzzlePlace from './effects/puzzle.place.js';
import puzzlePromote from './effects/puzzle.promote.js';
import rewardBalloons from './effects/reward.balloons.js';
import rewardBingo from './effects/reward.bingo.js';
import rewardBullseye from './effects/reward.bullseye.js';
import rewardEquip from './effects/reward.equip.js';
import rewardFirst from './effects/reward.first.js';
import rewardGate from './effects/reward.gate.js';
import rewardLoot from './effects/reward.loot.js';
import rewardPerfectstack from './effects/reward.perfectstack.js';
import rewardSlotwin from './effects/reward.slotwin.js';
import rewardWavecleared from './effects/reward.wavecleared.js';
import rewardYummy from './effects/reward.yummy.js';
import stateBubbled from './effects/state.bubbled.js';
import stateBurnt from './effects/state.burnt.js';
import stateDrowning from './effects/state.drowning.js';
import stateLeader from './effects/state.leader.js';
import stateQuest from './effects/state.quest.js';
import stateSpicy from './effects/state.spicy.js';
import uiBadge from './effects/ui.badge.js';
import uiCardshine from './effects/ui.cardshine.js';
import uiClaim from './effects/ui.claim.js';
import uiEnergy from './effects/ui.energy.js';
import uiLoading from './effects/ui.loading.js';
import uiLocked from './effects/ui.locked.js';
import uiReady from './effects/ui.ready.js';
import uiSale from './effects/ui.sale.js';
import uiScratch from './effects/ui.scratch.js';
import uiStreak from './effects/ui.streak.js';
import uiWarning from './effects/ui.warning.js';
import uiXp from './effects/ui.xp.js';
import weaponMortar from './effects/weapon.mortar.js';
import weaponSniper from './effects/weapon.sniper.js';
import weaponTeslacoil from './effects/weapon.teslacoil.js';
import worldBoil from './effects/world.boil.js';
import worldCrystalball from './effects/world.crystalball.js';
import worldGeyser from './effects/world.geyser.js';
import worldGoldmine from './effects/world.goldmine.js';
import worldJellyfish from './effects/world.jellyfish.js';
import worldLighthouse from './effects/world.lighthouse.js';
import worldPlacement from './effects/world.placement.js';
import worldRoulette from './effects/world.roulette.js';
import worldSeal from './effects/world.seal.js';
import worldSeaweed from './effects/world.seaweed.js';
import worldStormzone from './effects/world.stormzone.js';
import worldSunkenchest from './effects/world.sunkenchest.js';
import worldTrapfire from './effects/world.trapfire.js';

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
  hitElectric,
  hitFire,
  hitIce,
  hitHeavy,
  hitMetal,
  hitArrow,
  hitAsteroid,
  hitBackstab,
  hitBite,
  hitBonk,
  hitBrick,
  hitCharge,
  hitClaw,
  hitCounter,
  hitDunk,
  hitElementfire,
  hitElementice,
  hitElementshock,
  hitEmp,
  hitFur,
  hitGhost,
  hitGlass,
  hitGolf,
  hitHomerun,
  hitLaser,
  hitNote,
  hitPaddle,
  hitPie,
  hitRacket,
  hitRobot,
  hitShieldwall,
  hitSlow,
  hitSonic,
  hitSplashhit,
  hitSweep,
  hitTackle,
  hitThrust,
  hitUpgradefail,
  hitWater,
  hitBasehit,
  hitBlockland,
  hitChop,
  hitEat,
  hitInk,
  hitKnife,
  hitPillow,
  hitPoisoncloud,
  hitRopecut,
  hitSkeleton,
  hitSlice,
  hitSplashdown,
  hitSqueak,
  hitTilebreak,
  hitWaterballoon,
  explosionSmall,
  explosionBig,
  explosionPuff,
  explosionFireball,
  explosionFirework,
  explosionNuke,
  explosionPixel,
  explosionIce,
  explosionElectric,
  explosionToxic,
  explosionMagic,
  explosionWater,
  explosionArtillery,
  explosionBalloon,
  explosionBarrel,
  explosionBass,
  explosionCandy,
  explosionCatapult,
  explosionChain,
  explosionDust,
  explosionGlitter,
  explosionGunpowder,
  explosionMine,
  explosionPaint,
  explosionShip,
  explosionShockwave,
  explosionSmokebomb,
  explosionSoul,
  explosionSupernova,
  explosionBubblegum,
  explosionDepthcharge,
  explosionFlour,
  explosionFrostnova,
  explosionFruit,
  explosionJelly,
  explosionPellets,
  explosionPinata,
  explosionPopcorn,
  explosionSlime,
  explosionSoda,
  explosionVirus,
  pickupSparkle,
  pickupCoin,
  pickupGem,
  pickupHeart,
  pickupPowerup,
  pickupXp,
  pickupKey,
  pickupFood,
  pickupStar,
  pickupMana,
  pickupArmor,
  pickupBomb,
  pickupFuel,
  pickupLife,
  pickupMultiball,
  pickupShard,
  pickupSpeed,
  pickupTime,
  pickupTreat,
  pickupIngredient,
  pickupPearl,
  pickupPellet,
  pickupPotion,
  pickupScroll,
  pickupVacuum,
  rewardConfetti,
  rewardLevelup,
  rewardStarburst,
  rewardCombo,
  rewardChest,
  rewardCoinshower,
  rewardClear,
  rewardCheckpoint,
  rewardJackpot,
  rewardGoal,
  rewardRankup,
  rewardBigcombo,
  rewardBirthday,
  rewardCardreveal,
  rewardCheer,
  rewardClean,
  rewardCooked,
  rewardEncore,
  rewardFinish,
  rewardFireworkshow,
  rewardGift,
  rewardGood,
  rewardGreat,
  rewardLegendary,
  rewardPerfect,
  rewardRare,
  rewardRecord,
  rewardSticker,
  rewardStreak,
  rewardSummon,
  rewardTrophy,
  rewardUnbox,
  rewardUpgrade,
  rewardWheel,
  rewardBalloons,
  rewardBingo,
  rewardBullseye,
  rewardEquip,
  rewardFirst,
  rewardGate,
  rewardLoot,
  rewardPerfectstack,
  rewardSlotwin,
  rewardWavecleared,
  rewardYummy,
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
  moveBlink,
  moveBlinkstrike,
  moveBreach,
  moveClimb,
  moveDig,
  moveDive,
  moveDodge,
  moveEmerge,
  moveFeathers,
  moveGlide,
  moveGroundpound,
  moveHatch,
  moveJetpack,
  moveLanding,
  moveLedge,
  moveOrbit,
  moveParachute,
  movePounce,
  moveRoll,
  moveRustle,
  moveShadowstep,
  moveShake,
  moveSkate,
  moveSlide,
  moveSurf,
  moveSweep,
  moveSwing,
  moveWallkick,
  moveWarp,
  moveFall,
  moveGrow,
  moveSplit,
  moveSquash,
  moveStir,
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
  magicMeteor,
  magicTornado,
  magicEarth,
  magicBeam,
  magicBlackhole,
  magicRevive,
  magicNature,
  magicTime,
  magicBarrier,
  magicCharge,
  magicClone,
  magicDrain,
  magicGust,
  magicHeallaura,
  magicLeap,
  magicMark,
  magicMissile,
  magicRaise,
  magicRune,
  magicShockwave,
  magicStarfall,
  magicTransform,
  magicUltimate,
  magicWarcry,
  magicWave,
  magicBubblewand,
  magicSlowfield,
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
  stateAura,
  stateElectrified,
  stateWet,
  stateBleeding,
  stateSad,
  stateMusic,
  stateSweat,
  stateHappy,
  stateAngry,
  stateCharmed,
  stateCloak,
  stateCursed,
  stateDance,
  stateDrunk,
  stateFear,
  stateFocus,
  stateFreezing,
  stateGlitch,
  stateGroove,
  stateHalo,
  stateHasted,
  stateHaunted,
  stateInvulnerable,
  stateLevitate,
  stateLucky,
  stateMarked,
  stateOverheat,
  statePossessed,
  statePurr,
  stateRally,
  stateSick,
  stateSleepy,
  stateSlowed,
  stateSurprise,
  stateThinking,
  stateUltready,
  stateZerog,
  stateBubbled,
  stateBurnt,
  stateDrowning,
  stateLeader,
  stateQuest,
  stateSpicy,
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
  envPetals,
  envBlizzard,
  envAsh,
  envMeteors,
  envWind,
  envAurora,
  envChristmas,
  envDrizzle,
  envDustdevil,
  envFeathers,
  envHail,
  envHalloween,
  envHeat,
  envLanterns,
  envMagic,
  envMist,
  envNebula,
  envOcean,
  envPartylights,
  envPollen,
  envRainbowsparkle,
  envSmoke,
  envSpace,
  envSpores,
  envSunrays,
  envUnderground,
  envUnderwater,
  envAcidrain,
  envBokeh,
  envCandy,
  envFireworks,
  envGlitch,
  envGoldendust,
  envMatrix,
  envMoonlight,
  envOldfilm,
  envToxic,
  vehicleExhaust,
  vehicleNitro,
  vehicleCrash,
  vehicleDamaged,
  vehicleSiren,
  vehicleWake,
  vehicleBackfire,
  vehicleDrift,
  vehicleExplode,
  vehicleJump,
  vehicleOffroad,
  vehiclePuddle,
  vehicleRotorwash,
  vehicleScrape,
  vehicleThruster,
  weaponMuzzle,
  weaponSmoke,
  weaponLaser,
  weaponRocket,
  weaponShell,
  weaponShotgun,
  weaponFlamethrower,
  weaponArrowrain,
  weaponBoomerang,
  weaponCannon,
  weaponCatapult,
  weaponChargebow,
  weaponFlamesword,
  weaponFrostblade,
  weaponHolyspear,
  weaponLaunch,
  weaponMinigun,
  weaponMusket,
  weaponPlasma,
  weaponPoisondagger,
  weaponRailgun,
  weaponThunderhammer,
  weaponTorpedo,
  weaponTractorbeam,
  weaponMortar,
  weaponSniper,
  weaponTeslacoil,
  gatherWood,
  gatherStone,
  gatherHarvest,
  gatherDrill,
  gatherEgg,
  gatherFish,
  gatherSeed,
  gatherWater,
  worldCampfire,
  worldBeacon,
  worldLootbeam,
  worldBuild,
  worldTorch,
  worldFountain,
  worldLava,
  worldSteam,
  worldSparks,
  worldCrystal,
  worldRipple,
  worldBoostpad,
  worldAltar,
  worldAnvil,
  worldBanner,
  worldBloom,
  worldBubblecolumn,
  worldBurning,
  worldCapture,
  worldCauldron,
  worldChestidle,
  worldChimney,
  worldCooking,
  worldCrumble,
  worldDatastream,
  worldDiscoball,
  worldDooropen,
  worldDripping,
  worldEnchant,
  worldFlag,
  worldForcefield,
  worldGrave,
  worldGrow,
  worldHologram,
  worldKeyhole,
  worldLaserfence,
  worldPlanetring,
  worldPressureplate,
  worldRally,
  worldReactor,
  worldSavepoint,
  worldSaw,
  worldScanner,
  worldSecret,
  worldShore,
  worldSmelt,
  worldSpawnportal,
  worldSpeaker,
  worldSpikes,
  worldSprinkler,
  worldSwitch,
  worldTeleporter,
  worldTowerup,
  worldTrap,
  worldVolcano,
  worldWaterfall,
  worldWave,
  worldWhirlpool,
  worldWormhole,
  worldBoil,
  worldCrystalball,
  worldGeyser,
  worldGoldmine,
  worldJellyfish,
  worldLighthouse,
  worldPlacement,
  worldRoulette,
  worldSeal,
  worldSeaweed,
  worldStormzone,
  worldSunkenchest,
  worldTrapfire,
  puzzleMatch,
  puzzleLine,
  puzzleShatter,
  puzzleMerge,
  puzzleBlast,
  puzzleWrong,
  puzzleHint,
  puzzleBubble,
  puzzleCapture,
  puzzleFlip,
  puzzlePair,
  puzzlePlace,
  puzzlePromote,
  uiPop,
  uiTap,
  uiStar,
  uiBurst,
  uiUnlock,
  uiFlash,
  uiGlow,
  uiShine,
  uiCountup,
  uiAchievement,
  uiBeat,
  uiCarddeal,
  uiCardflip,
  uiChip,
  uiCooldown,
  uiCorrect,
  uiCountdown,
  uiDice,
  uiFill,
  uiFocuslines,
  uiFrozen,
  uiGameover,
  uiGo,
  uiHack,
  uiHealed,
  uiHurry,
  uiHurt,
  uiLevelstart,
  uiLifelost,
  uiLowhp,
  uiMiss,
  uiNew,
  uiNotify,
  uiPoisoned,
  uiPurchase,
  uiRays,
  uiSparkle,
  uiSpeedlines,
  uiTapburst,
  uiTapme,
  uiTransition,
  uiVictory,
  uiWrongtry,
  uiBadge,
  uiCardshine,
  uiClaim,
  uiEnergy,
  uiLoading,
  uiLocked,
  uiReady,
  uiSale,
  uiScratch,
  uiStreak,
  uiWarning,
  uiXp,
];
