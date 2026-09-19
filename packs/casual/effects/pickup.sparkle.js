/** A twinkle burst when something is collected. Gold by default; tint it. */
export default {
  name: 'pickup.sparkle',
  category: 'pickup',
  whenToUse: 'The player collects a coin, gem, star, key, heart or any small item. Also for a star earned on a result screen.',
  duration: 0.7,
  loop: false,
  tint: '#ffd54a',
  tags: ['pickup', 'collect', 'coin', 'gem', 'star', 'sparkle', 'twinkle'],
  build(c) {
    const col = c.color('#ffd54a');
    const light = c.lighten(col, 0.7);
    return [
      // flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 70, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))] }),
      // stars
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 8 },
        speed: [130, 240], life: [0.4, 0.6], size: [12, 20], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.spin(-5, 5), c.force(0, 180), c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.pop(0.15, 0.6))], order: 1 }),
      // sparkles
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 10 },
        speed: [60, 170], life: [0.3, 0.55], size: [8, 16], color: light,
        behaviors: [c.force(0, 120), c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.2, 0.5))] }),
    ];
  },
};
