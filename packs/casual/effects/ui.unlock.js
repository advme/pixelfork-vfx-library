/** Something unlocks: a bright flash, rings and rising sparkles. */
export default {
  name: 'ui.unlock',
  category: 'ui',
  whenToUse: 'A level, skin, character or feature unlocks; a lock icon opens; a new area is revealed. Play with { el }.',
  duration: 1.0, loop: false, tint: '#ffe58a',
  tags: ['ui', 'unlock', 'reveal', 'new', 'open', 'available'],
  build(c) {
    const col = c.color('#ffe58a');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 220, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.12, count: 1 }, { time: 0.24, count: 1 }], life: 0.5, size: 240, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.5, size: 200, color: light, rotation: [0, 1],
        behaviors: [c.spin(1), c.sizeOverLife(c.curve([[0, 0.2], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', rate: 50, duration: 0.6, shape: { type: 'circle', radius: 60 },
        speed: [20, 60], life: [0.5, 0.8], size: [8, 16], color: light,
        behaviors: [c.force(0, 220), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 }),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 20 },
        speed: [180, 320], life: [0.5, 0.7], size: [12, 20], rotation: [0, 6.28], color: light,
        behaviors: [c.spin(-6, 6), c.gravity(600), c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.15, 0.6))], order: 4 }),
    ];
  },
};
