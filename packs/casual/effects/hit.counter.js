/** A counter-attack: a sharp white ring snaps out, a blue-white star flares and sparks burst all around. */
export default {
  name: 'hit.counter',
  category: 'hit',
  whenToUse: 'A counter-attack lands right after a block, parry or dodge: a riposte, a reversal, a perfect-timing strike back in a fighting or action game; play it on the enemy being hit, and for the block or parry itself use hit.parry instead.',
  duration: 0.35, loop: false, tint: '#6cc8ff',
  tags: ['counter', 'riposte', 'reversal', 'perfect', 'strike back', 'fighting', 'timing', 'hit'],
  build(c) {
    const col = c.color('#6cc8ff');
    const light = c.lighten(col, 0.75);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 150, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the white ring snaps out first, a blue one follows
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 190, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [0.35, 0.85], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.5, 0.5], [0, 1]]))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.06, count: 1 }], life: 0.24, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [0.35, 0.85], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.5, 0.5], [0, 1]]))], order: 1 }),
      // the blue-white star: a big upright glint and a smaller turning one across it
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.28, size: 190, rotation: 0, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.15, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.24, size: 120, rotation: Math.PI / 4, color: col,
        behaviors: [c.spin(3), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [18, 22] }], shape: { type: 'circle', radius: 6, thickness: 0 },
        speed: [450, 900], life: [0.2, 0.34], size: [5, 8], color: [light, col],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 })),
    ];
  },
};
