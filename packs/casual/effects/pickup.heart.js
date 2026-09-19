/** Hearts floating up: love, life, a friend. */
export default {
  name: 'pickup.heart',
  category: 'pickup',
  whenToUse: 'A heart, life or health item is collected, a pet is petted, a character is happy or in love.',
  duration: 1.0,
  loop: false,
  tint: '#ff5c8a',
  tags: ['heart', 'love', 'life', 'health', 'happy', 'pet'],
  build(c) {
    const col = c.color('#ff5c8a');
    const light = c.lighten(col, 0.5);
    return [
      c.sys({ tex: 'heart', blend: 'normal', bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 16, angle: 0.5 },
        speed: [80, 180], life: [0.7, 1.0], size: [16, 28], color: [light, col],
        behaviors: [c.force(0, 140), c.limitSpeed(160, 1), c.noise(1.5, 10), c.spin(-1.5, 1.5), c.sizeOverLife(c.pop(0.15, 0.7)), c.colorOverLife(c.fade(0.7))], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 70, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [6, 9] }], shape: { type: 'circle', radius: 10 },
        speed: [40, 120], life: [0.4, 0.7], size: [6, 12], color: light,
        behaviors: [c.force(0, 120), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 }),
    ];
  },
};
