/** Fireworks in the sky: now and then a shell streaks up a short way and bursts into a ball of colourful trailing sparks with a bright flash and twinkling crackle, some with a ring, all over the upper sky in different colours. Loops until stopped. */
export default {
  name: 'env.fireworks',
  category: 'env',
  whenToUse: 'Fireworks going off in the sky the whole time a scene lasts: a festival or fair night, a New Year, national-day or Diwali level, a celebration menu, map or lobby, a theme-park night: play it once without a position (upper part of the screen in 2D, in 3D on a sheet facing the camera above the spot it looks at) and stop it when the party ends (tint null keeps many colours, a tint gives shades of one); for a one-off show use reward.fireworkshow, for a single firework explosion.firework, for floating sky lanterns env.lanterns, for falling confetti env.confetti.',
  duration: 7, loop: true, anchor: 'top', tint: null,
  tags: ['fireworks', 'festival', 'new year', 'celebration', 'night', 'sky', 'party', 'holiday'],
  build(c) {
    const palette = c.tint
      ? [c.tint, c.lighten(c.tint, 0.45), c.darken(c.tint, 0.15)]
      : ['#ff4d6d', '#3dd6ff', '#7cff6b', '#c77dff', '#ffd23f', '#ff9f43'].map(c.rgb);
    const rnd = (a, b) => a + Math.random() * (b - a);
    const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    // 3D: the shells burst on a sheet facing the camera, in the upper part of the picture (the env.aurora pattern).
    // Real heights in the world (7-11 m) are above the view of the usual game camera, which looks down at the
    // player, so no burst would be seen. A little bigger there, as the sheet is as far away as the spot the camera looks at
    const K = c.is3d ? 1.25 : 1;
    // a shell climbs this far, for this long, before it bursts
    const climb = 120 * K, rise = 0.32;
    const out = [];
    // one shell at one spot of the sky. Every shell has its own cycle length, so the bursts never fall into a
    // pattern: with five or six of them the sky goes off every second or so, never twice the same way in a row
    const shell = (at, below, D, t, colour, m, ring) => {
      const light = c.lighten(colour, 0.6);
      const base = { loop: true, duration: D, blend: 'add' };
      out.push(
        // the shell streaking up: it fades in, so its tail never shows where it starts
        c.sys(Object.assign({}, base, { tex: 'glow', bursts: [{ time: t - rise, count: 1 }], shape: { type: 'cone', radius: 1, angle: 0.02 }, dir: Math.PI / 2, offset: below,
          speed: climb / rise, life: rise, size: 6 * K, color: '#fff3c4', stretch: { speed: 0.012, length: 2 },
          behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.35], [1, 1]]))], order: 3 })),
        // the flash
        c.sys(Object.assign({}, base, { tex: 'glow', bursts: [{ time: t, count: 1 }], offset: at, life: 0.25, size: 160 * m * K, color: light,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
        // the burst: an even ball of trailing sparks that slow, droop and fade
        c.sys(Object.assign({}, base, { tex: 'glow', bursts: [{ time: t, count: Math.round(26 * m) }], shape: { type: 'circle', radius: 4, thickness: 0, even: true }, offset: at,
          speed: [280 * m * K, 360 * m * K], life: [0.85, 1.1], size: [6 * K, 9 * K], color: [light, colour], stretch: { speed: 0.02, length: 1.4 },
          behaviors: [c.gravity(260 * K), c.speedOverLife(c.curve([[0, 1], [0.4, 0.3], [1, 0.1]])), c.colorOverLife(c.fade(0.55)), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]]))], order: 2 })),
        // the crackle: twinkling glints that hang a moment longer
        c.sys(Object.assign({}, base, { tex: 'spark', bursts: [{ time: t + 0.05, count: Math.round(8 * m) }], shape: { type: 'circle', radius: 4 }, offset: at,
          speed: [120 * m * K, 280 * m * K], life: [0.8, 1.1], size: [8 * K, 13 * K], color: light,
          behaviors: [c.gravity(220 * K), c.speedOverLife(c.curve([[0, 1], [0.4, 0.2], [1, 0.05]])), c.sizeOverLife(c.curve([[0, 0], [0.5, 1], [0.7, 0.2], [0.85, 1], [1, 0]]))], order: 4 })),
      );
      if (ring) {
        out.push(c.sys(Object.assign({}, base, { tex: 'ring', bursts: [{ time: t, count: 1 }], offset: at, life: 0.42, size: 260 * m * K, color: light,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })));
      }
    };
    const n = c.is3d ? 6 : 5;
    const cycles = shuffle([5.2, 5.9, 6.7, 7.4, 8.3, 9.1]);
    const slots = shuffle(Array.from({ length: n }, (_, i) => i));
    const colours = shuffle(palette.slice());
    for (let i = 0; i < n; i++) {
      const D = cycles[i];
      // the first shell goes off almost at once, the rest somewhere in their cycle
      const t = i === 0 ? rise + 0.15 : rnd(rise + 0.1, D - 1.2);
      const m = rnd(0.85, 1.15);
      const colour = colours[i % colours.length];
      if (c.is3d) {
        // 3D: spread across the upper part of the sheet facing the camera (y is up the picture from the spot it looks at)
        const x = -500 + ((slots[i] + rnd(0.2, 0.8)) * 1000) / n, y = rnd(130, 290);
        shell([x, y], [x, y - climb], D, t, colour, m, i % 2 === 0);
      } else {
        // 2D: spread across the upper half of the screen
        const x = c.view.w * (-0.4 + ((slots[i] + rnd(0.2, 0.8)) * 0.8) / n), y = -c.view.h * rnd(0.12, 0.45);
        shell([x, y], [x, y - climb], D, t, colour, m, i % 2 === 0);
      }
    }
    return out;
  },
};
