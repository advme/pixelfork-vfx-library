/** Energy refills: a bright head races along the bar from left to right trailing electric blue-green streaks, crackling glints flicker in behind it, then the bar flashes and a lightning-bolt pops at its end. */
export default {
  name: 'ui.energy',
  category: 'ui',
  whenToUse: 'The player energy, stamina or battery in the HUD is refilled: the energy bar tops back up, energy is bought or restored by a timer, stamina recovers after a rest, a battery meter is recharged. Play with { el } on the energy bar or counter (without one pass width and height, the bar size in px); the sparks run along its width. For mana or energy picked up by the character in play use pickup.mana; for a progress bar reaching full use ui.fill; for XP added to a bar use ui.xp.',
  duration: 0.85, loop: false, tint: '#2ef0c8',
  tags: ['ui', 'energy', 'stamina', 'refill', 'battery', 'recharge', 'bar', 'electric'],
  build(c) {
    const col = c.color('#2ef0c8');
    const light = c.lighten(col, 0.6);
    const w = Math.max(40, Math.min(420, c.target.w)), h = Math.max(10, Math.min(60, c.target.h));
    const left = [-w / 2, 0], right = [w / 2, 0];
    // the head crosses the bar in `sweep` seconds; the flash and the bolt come when it arrives
    const sweep = 0.36, done = sweep - 0.02;
    const run = w / sweep;
    // the electric streaks race at the head's speed, and a streak's length grows with its speed (trap 10): on a long bar
    // they got 90 px long and their tails poked out of the bar's left end. The stretch speed is eased off on fast runs so
    // a streak stays at most about 5 times its size, and the stream starts that far inside the bar
    const zap = Math.min(0.01, 3.8 / run);
    const inset = Math.min(36, w * 0.2);
    const head = { type: 'cone', radius: 0, angle: 0 };
    // crackle glints all leave the left end together with spread-out speeds and stop dead at `stop` of their life, so they
    // fill the bar evenly from its left end up to the head (the fastest rides with it)
    const life = 0.6, stop = sweep / life;
    const reach = w / (life * (stop + 0.015));
    const n = Math.round(Math.max(8, Math.min(30, w / 9)));
    const bolt = Math.max(22, Math.min(48, h * 1.7));
    // the bar flash: an even burst on a flat rect runs along the line and back, so an even count 2m puts the glows on
    // m + 1 evenly spaced points from end to end (an odd count skipped the right end). Spaced closer than their size,
    // so the flash reads as one bar instead of a row of beads
    const m = Math.round(Math.max(2, Math.min(24, w / h)));
    const flash = Math.max(h * 2.4, (w / m) * 2);
    const springIn = () => c.sizeOverLife(c.curve([[0, 0], [0.16, 1.3], [0.3, 0.92], [0.42, 1.04], [0.8, 1], [1, 0]]));
    return [
      // the flash along the whole bar as it fills
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: done, count: m * 2 }], shape: { type: 'rect', w, h: 0, even: true },
        speed: 0, life: 0.4, size: flash, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.42, 0.2], [0, 1]]))], order: 0 }),
      // electric streaks racing along the bar: a stream that leaves near the left end at the head's speed and jitters as it goes.
      // A streak trails BACK from its particle, so the stream starts a little inside the bar and fades in, or the first
      // streaks would poke out of its left end
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 3, cycle: 8, interval: 0.035 }], shape: { type: 'cone', radius: h * 0.22, angle: 0.05 }, dir: 0,
        offset: [-w / 2 + inset, 0], speed: [run * 0.85, run * 1.05], life: [sweep * 0.45, sweep * 0.9], size: [4, 7], color: [light, col],
        stretch: { speed: zap, length: 1.2 },
        behaviors: [c.noise(8, Math.max(6, h * 0.25)), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 1 }),
      // crackle glints flickering on and off behind the head
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: n }], shape: { type: 'cone', radius: h * 0.32, angle: 0 }, dir: 0, offset: left,
        speed: [reach * 0.03, reach], life, size: [h * 0.4, h * 0.75], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.curve([[0, 1], [stop, 1], [stop + 0.03, 0], [1, 0]])), c.spin(-3, 3),
          c.sizeOverLife(c.curve([[0, 0.3], [0.08, 1], [0.18, 0.35], [0.3, 1], [0.45, 0.4], [0.62, 1], [0.78, 0.5], [1, 0]]))], order: 2 }),
      // the bright head and the glint riding on it (plain glows: a stretched head would trail back out of the bar's left end)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: head, dir: 0, offset: left,
        speed: run, life: sweep, size: h * 1.9, color: light,
        behaviors: [c.colorOverLife(c.fadeInOut(0.12, 0.85))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], shape: head, dir: 0, offset: left,
        speed: run, life: sweep, size: h * 1.3, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(9), c.colorOverLife(c.fadeInOut(0.1, 0.85))], order: 4 }),
      // the finish: a flash, a small ring and the bolt popping at the right end
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: done, count: 1 }], life: 0.3, size: bolt * 3, color: light, offset: right,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: done, count: 1 }], life: 0.35, size: bolt * 3, color: col, offset: right,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 5 }),
      // a solid bolt with a glossy light one on top, springing in together
      c.sys({ tex: 'bolt', blend: 'normal', bursts: [{ time: done, count: 1 }], life: 0.48, size: bolt, rotation: -0.12, color: col, offset: right,
        behaviors: [springIn(), c.colorOverLife(c.fade(0.7))], order: 6 }),
      c.sys({ tex: 'bolt', blend: 'add', bursts: [{ time: done, count: 1 }], life: 0.48, size: bolt * 0.8, rotation: -0.12, color: light, offset: right,
        behaviors: [springIn(), c.colorOverLife(c.fade(0.6))], order: 7 }),
    ];
  },
};
