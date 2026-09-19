/** A summoning circle: a ring on the ground with columns of light rising from it. */
export default {
  name: 'magic.summon',
  category: 'magic',
  whenToUse: 'A creature, ally or boss is summoned; a ritual completes; a big spell is cast from a circle. Play at the feet.',
  duration: 1.6, loop: false, tint: '#b56bff',
  tags: ['summon', 'ritual', 'circle', 'spawn', 'boss', 'columns'],
  build(c) {
    const col = c.color('#b56bff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 1.4, size: 180, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.15], [1, 0.7], [0, 1]]))], order: 1 })),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ time: 0.1, count: 1 }], life: 1.3, size: 120, color: light,
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 1]])), c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 1 })),
      // columns of light on the ring, pointing up
      c.sys(c.ground({ tex: 'glow', blend: 'add', bursts: [{ time: 0.25, count: 12 }], shape: { type: 'circle', radius: 90, thickness: 0, even: true },
        speed: 0, life: [0.9, 1.2], size: [12, 20], color: light,
        stretch: { speed: 0, length: 9 },
        behaviors: [c.force(0, -3), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.7, 1], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 2 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.3, count: 1 }], life: 1.0, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.fadeInOut(0.15, 0.5))], order: 0 }),
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 40, duration: 1.1, shape: { type: 'circle', radius: 80 },
        speed: 0, life: [0.6, 1.0], size: [8, 16], color: light,
        behaviors: [c.force(0, 200), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 })),
    ];
  },
};
