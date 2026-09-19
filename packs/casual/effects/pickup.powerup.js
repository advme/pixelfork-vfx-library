/** A power-up: rainbow ring, flash and rising sparks. Multicolour by default. */
export default {
  name: 'pickup.powerup',
  category: 'pickup',
  whenToUse: 'A power-up, booster, mushroom, shield or weapon upgrade is collected. Bigger and louder than a coin.',
  duration: 0.9,
  loop: false,
  tint: null,
  tags: ['powerup', 'booster', 'upgrade', 'rainbow', 'collect', 'buff'],
  build(c) {
    const palette = c.tint ? [c.tint, c.lighten(c.tint, 0.5)] : ['#ff4d6d', '#ffd23f', '#3dd6ff', '#7cff6b', '#c77dff'];
    const main = c.tint ? c.tint : '#ffffff';
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 130, color: main,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.1, count: 1 }, { time: 0.2, count: 1 }], life: 0.45, size: 170, color: main,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      ...palette.map((colour, i) =>
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 6 }], shape: { type: 'circle', radius: 10 },
          speed: [120, 260], life: [0.5, 0.8], size: [10, 16], color: colour,
          behaviors: [c.force(0, 220), c.speedOverLife(c.decel(0.2)), c.noise(2, 8), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 3 + i })),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 8 },
        speed: [160, 300], life: [0.5, 0.7], size: [14, 22], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.spin(-5, 5), c.force(0, 200), c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.pop(0.15, 0.6))], order: 9 }),
    ];
  },
};
