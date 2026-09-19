/** A firework: a bright pop, then colourful trailing sparks that fall. */
export default {
  name: 'explosion.firework',
  category: 'explosion',
  whenToUse: 'Celebrations and fun blasts: fireworks on a win screen, a party popper, a magic burst. Tint it or leave it multicolour.',
  duration: 1.6,
  loop: false,
  tint: null,
  tags: ['firework', 'celebrate', 'sparks', 'party', 'burst', 'colour'],
  build(c) {
    const palette = c.tint
      ? [c.tint, c.lighten(c.tint, 0.5)]
      : ['#ff4d6d', '#ffd23f', '#3dd6ff', '#7cff6b', '#c77dff'];
    const pick = palette[Math.floor(Math.random() * palette.length)];
    const light = c.lighten(pick, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 160, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // sparks with trails, even spread
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: 36 }], shape: { type: 'circle', radius: 4, thickness: 0, even: true },
        speed: [420, 520], life: [0.9, 1.3], size: [8, 12], color: [light, pick],
        stretch: { speed: 0.03, length: 1.5 },
        behaviors: [c.gravity(350), c.speedOverLife(c.curve([[0, 1], [0.4, 0.3], [1, 0.1]])), c.colorOverLife(c.fade(0.6)), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]]))], order: 1 })),
      // twinkles that linger
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: 20 }], shape: { type: 'circle', radius: 4 },
        speed: [200, 480], life: [1.0, 1.5], size: [8, 14], color: light,
        behaviors: [c.gravity(300), c.speedOverLife(c.curve([[0, 1], [0.4, 0.2], [1, 0.05]])), c.sizeOverLife(c.curve([[0, 0], [0.5, 1], [0.7, 0.2], [0.85, 1], [1, 0]]))], order: 3 })),
    ];
  },
};
