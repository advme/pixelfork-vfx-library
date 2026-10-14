/** An underground cave: thin streams of grit trickle down from the ceiling, a pebble drops now and then, dust hangs in the air and faint glowing motes drift. Loops until stopped. */
export default {
  name: 'env.underground',
  category: 'env',
  whenToUse: 'Under the earth (a cave, a mine shaft, a dungeon, a tunnel, a crypt, an ant nest, a creaky old ruin); play it once without a position (falling from the top of the screen in 2D, from above the area around the camera in 3D) and use env.dust for a calm sunlit room or env.spores for glowing mushroom spores.',
  duration: 6, loop: true, anchor: 'top', tint: '#c8a578',
  tags: ['cave', 'underground', 'mine', 'dungeon', 'dust', 'pebbles', 'tunnel', 'ruins'],
  build(c) {
    const col = c.color('#c8a578');
    const dark = c.darken(col, 0.35);
    const glow = c.mix(col, '#9fe8ff', 0.65);
    // seconds to fall h px: speeding up at g until the terminal speed v, then steady
    const fallTime = (h, v, g) => v / g + (h - (v * v) / (2 * g)) / v;
    // a trickle of grit from a crack in the ceiling: starts, pours for a couple of seconds and thins out, once a cycle.
    // Dense, with a small sideways scatter, so it reads as a pouring stream that fans out a little and not as a dotted line
    const trickle = (at, t0, h) => {
      const t = fallTime(h, 520, 1100);
      return c.sys(c.vol({ tex: 'disc', blend: 'normal', loop: true, prewarm: true, duration: 6, world: c.is3d,
        bursts: [
          { time: t0, count: 1, cycle: 12, interval: 0.04 },
          { time: t0 + 0.5, count: 1, cycle: 75, interval: 0.02 },
          { time: t0 + 2, count: 1, cycle: 10, interval: 0.07 },
        ],
        shape: { type: 'circle', radius: 3 }, offset: at, speed: [0, 14], life: [t * 0.97, t * 1.02], size: c.is3d ? [3, 5.5] : [2, 4], color: [col, dark],
        stretch: { speed: c.is3d ? 0.006 : 0.008, length: 1.3 },
        behaviors: [c.gravity(1100), c.limitSpeed(520, 2), c.noise(2, 3), c.colorOverLife(c.fade(0.85))], order: 2 }));
    };
    const pebbles = (life) => ({ tex: 'square', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 1,
      bursts: [{ time: 2.2, count: [2, 3] }, { time: 4.8, count: 2 }],
      speed: 0, life, size: [5, 8], rotation: [0, 6.28], color: [c.darken(col, 0.15), c.darken(col, 0.5)],
      behaviors: [c.gravity(1300), c.spin(-8, 8), c.colorOverLife(c.fade(0.9))], order: 3 });
    const dust = (rate, size) => ({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 6, rate,
      speed: 0, life: [6, 8], size, rotation: [0, 6.28], color: col,
      behaviors: [c.gravity(20), c.limitSpeed(16, 1), c.noise(0.4, 22), c.spin(-0.2, 0.2), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.14, 0.3], [0.14, 0.7], [0, 1]]))], order: 0 });
    const motes = (rate) => ({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate,
      speed: [2, 8], life: [4, 6], size: c.is3d ? [4, 8] : [3, 6], color: [glow, c.lighten(glow, 0.5)],
      behaviors: [c.noise(0.5, 30), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.5], [0.65, 1], [1, 0]]))], order: 1 });
    if (c.is3d) {
      const y = 450;
      const t = Math.sqrt((2 * y) / 1300);
      return [
        c.sys(c.env3d(dust(3, [140, 220]), { w: 1200, y: 160 })),
        c.sys(c.env3d(motes(10), { w: 1100, y: 100 })),
        trickle([-220, 420, -120], 0.3, 420),
        trickle([160, 420, 180], 2.3, 420),
        trickle([330, 420, -260], 4.3, 420),
        // tumbling stones in 3D
        c.sys(c.chunks(c.env3d(pebbles([t * 0.95, t * 1.02]), { w: 900, y }), 'box')),
      ];
    }
    const w = c.view.w, h = c.view.h;
    const t = Math.sqrt((2 * (h + 10)) / 1300);
    return [
      c.sys(Object.assign(dust(1.4, [110, 180]), { shape: { type: 'rect', w: w + 80, h: h * 0.95, thickness: 1 }, offset: [0, -h * 0.5] })),
      c.sys(Object.assign(motes(4), { shape: { type: 'rect', w, h: h * 0.9, thickness: 1 }, offset: [0, -h * 0.5] })),
      trickle([-w * 0.26, 4], 0.3, h + 4),
      trickle([w * 0.31, 4], 2.3, h + 4),
      trickle([w * 0.04, 4], 4.3, h + 4),
      c.sys(Object.assign(pebbles([t * 0.95, t * 1.02]), { shape: { type: 'rect', w: w - 40, h: 0 }, offset: [0, 10] })),
    ];
  },
};
