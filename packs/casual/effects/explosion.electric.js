/** An electric blast: an EMP ring sweeps out, arcs crackle through it and sparks scatter. */
export default {
  name: 'explosion.electric',
  category: 'explosion',
  whenToUse: 'An EMP, a shock bomb, a tesla coil discharge, an overloaded generator blowing, a lightning spell exploding, a robot shorting out. Play it at the centre.',
  duration: 0.8, loop: false, tint: '#6fd6ff',
  tags: ['emp', 'electric', 'shock', 'tesla', 'lightning', 'explosion', 'sci-fi', 'discharge'],
  build(c) {
    const col = c.color('#6fd6ff');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }, { time: 0.1, count: 1 }], life: 0.16, size: 260, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 380, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.06, count: 1 }], life: 0.35, size: 300, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 2 }),
      // arcs: long jagged streaks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }, { time: 0.12, count: [6, 8] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [600, 1000], life: [0.12, 0.2], size: [5, 8], color: ['#ffffff', col], stretch: { speed: 0.03, length: 2 },
        behaviors: [c.noise(30, 40), c.colorOverLife(c.fade(0.4))], order: 3 })),
      c.sys(c.vol({ tex: 'bolt', blend: 'add', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 40 },
        speed: [100, 220], life: [0.35, 0.5], size: [24, 34], rotation: [-0.6, 0.6], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.1], [0.3, 0.85], [0.5, 1.05], [1, 0]]))], order: 4 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: 0.05, count: [14, 18] }], shape: { type: 'circle', radius: 20 },
        speed: [150, 400], life: [0.4, 0.65], size: [3, 6], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.noise(8, 20), c.colorOverLife(c.fade(0.5))], order: 3 })),
    ];
  },
};
