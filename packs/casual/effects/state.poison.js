/** Poisoned: green bubbles keep rising from the character. Loops until stopped. */
export default {
  name: 'state.poison',
  category: 'state',
  whenToUse: 'A character or enemy is poisoned or sick. Play on the body with follow; stop when it wears off.',
  duration: 1, loop: true, tint: '#7ee83a',
  tags: ['poison', 'status', 'sick', 'toxic', 'bubbles', 'debuff'],
  build(c) {
    const col = c.color('#7ee83a');
    const light = c.lighten(col, 0.5);
    return [
      c.sys(c.ground({ tex: 'ring', blend: 'normal', loop: true, rate: 9, shape: { type: 'circle', radius: 22 },
        speed: [10, 30], life: [0.7, 1.1], size: [8, 16], color: light,
        behaviors: [c.force(0, 120), c.limitSpeed(90, 1), c.noise(2, 8), c.sizeOverLife(c.curve([[0, 0.3], [0.8, 1], [0.92, 1.3], [1, 0]])), c.colorOverLife(c.fade(0.8))], order: 2 })),
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 6, shape: { type: 'circle', radius: 20 },
        speed: [5, 20], life: [0.6, 1.0], size: [6, 12], color: col,
        behaviors: [c.force(0, 100), c.limitSpeed(80, 1), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 1 })),
    ];
  },
};
