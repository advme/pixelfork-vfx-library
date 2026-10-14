/** Time slows: a clock face of light ticks around the spot, rays sweep slowly and a wave of blue rolls out. */
export default {
  name: 'magic.time',
  category: 'magic',
  whenToUse: 'Time is bent: a slow-motion power, a time stop, a rewind, a haste or slow spell, a clock power-up, extra time added in a timed level. Play it on the caster or the centre of the screen.',
  duration: 1.3, loop: false, tint: '#7fb6ff',
  tags: ['time', 'slow motion', 'clock', 'rewind', 'freeze time', 'haste', 'chrono', 'spell'],
  build(c) {
    const col = c.color('#7fb6ff');
    const light = c.lighten(col, 0.65);
    return [
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 1.2, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [0.85, 1], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.15], [0.8, 0.8], [0, 1]]))], order: 1 }),
      // the twelve marks of a clock face, lighting up and turning slowly
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 12 }], shape: { type: 'circle', radius: 104, thickness: 0, even: true },
        speed: 0, life: 1.2, size: 14, color: light,
        behaviors: [c.orbit(0.8), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.85, 1], [1, 0]]))], order: 2 }),
      // two clock hands sweeping
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 1.2, size: 200, rotation: 0.3, color: light,
        behaviors: [c.spin(-2.2, -2.2), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.15], [0.6, 0.8], [0, 1]]))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.15, count: 1 }], life: 0.9, size: 520, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 0 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 60 },
        speed: [10, 40], life: [0.8, 1.2], size: [4, 7], color: light,
        behaviors: [c.orbit(-1), c.sizeOverLife(c.pop(0.2, 0.7))], order: 4 })),
    ];
  },
};
