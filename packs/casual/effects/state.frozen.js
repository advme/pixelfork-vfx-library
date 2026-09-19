/** Frozen: cold glints and drifting frost around the body. Loops until stopped. */
export default {
  name: 'state.frozen',
  category: 'state',
  whenToUse: 'A character or enemy is frozen, slowed or chilled. Play on the body with follow; stop when it thaws.',
  duration: 1, loop: true, tint: '#a8ecff',
  tags: ['frozen', 'ice', 'slow', 'chill', 'status', 'cold'],
  build(c) {
    const col = c.color('#a8ecff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 8, shape: { type: 'circle', radius: 30 },
        speed: 0, life: [0.6, 1.0], size: [8, 16], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.4, 1], [0.6, 0.6], [0.8, 1], [1, 0]]))], order: 2 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 12, shape: { type: 'circle', radius: 32 },
        speed: [5, 15], life: [1.0, 1.6], size: [4, 8], color: col,
        behaviors: [c.gravity(20), c.noise(1, 6), c.colorOverLife(c.fadeInOut(0.2, 0.7))], order: 1 })),
      c.sys(c.vol({ tex: 'shard', blend: 'add', loop: true, rate: 2, shape: { type: 'circle', radius: 26 },
        speed: 0, life: [1.2, 1.8], size: [10, 16], rotation: [0, 6.28], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]))], order: 3 })),
    ];
  },
};
