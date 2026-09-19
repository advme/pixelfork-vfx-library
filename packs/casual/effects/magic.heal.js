/** Soft green crosses and sparkles floating up: healing, a potion, a buff. */
export default {
  name: 'magic.heal',
  category: 'magic',
  whenToUse: 'Health restored, a potion drunk, a shrine touched, a buff applied. Play on the character.',
  duration: 1.1,
  loop: false,
  tint: '#7cf07c',
  tags: ['heal', 'health', 'potion', 'buff', 'restore', 'plus'],
  build(c) {
    const col = c.color('#7cf07c');
    const light = c.lighten(col, 0.6);
    return [
      // soft glow at the base
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.fadeInOut(0.1, 0.4))] }),
      // a clean ring instead of a haze
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))] })),
      // rising crosses
      c.sys(c.ground({ tex: 'plus', blend: 'add', rate: 22, duration: 0.7, shape: { type: 'circle', radius: 30 },
        speed: 0, life: [0.7, 1.0], size: [12, 20], color: [light, col],
        behaviors: [c.force(0, 160), c.limitSpeed(150, 1), c.noise(1.5, 6), c.sizeOverLife(c.pop(0.2, 0.6)), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 1 })),
      // sparkles
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 30, duration: 0.7, shape: { type: 'circle', radius: 36 },
        speed: 0, life: [0.5, 0.8], size: [6, 12], color: light,
        behaviors: [c.force(0, 220), c.limitSpeed(170, 1), c.sizeOverLife(c.pop(0.2, 0.5))], order: 1 })),
    ];
  },
};
