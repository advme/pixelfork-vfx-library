/** Holy light: white-gold rays, a rising glow and gentle sparkles. */
export default {
  name: 'magic.holy',
  category: 'magic',
  whenToUse: 'A blessing, a revive, an angel or shrine, a holy attack, a character ascending. Rays shine upward from the point.',
  duration: 1.3,
  loop: false,
  tint: '#fff1a8',
  tags: ['holy', 'light', 'bless', 'revive', 'angel', 'divine', 'rays'],
  build(c) {
    const col = c.color('#fff1a8');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 12 }], shape: { type: 'cone', radius: 6, angle: 1.1, even: true }, dir: -Math.PI / 2,
        speed: [2, 4], life: [0.9, 1.2], size: [14, 24], color: col,
        stretch: { speed: 0, length: 12 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.7, 1], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 1.0, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.7]])), c.colorOverLife(c.fadeInOut(0.15, 0.5))], order: 0 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.2, count: 1 }], life: 0.7, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 })),
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 45, duration: 0.9, shape: { type: 'circle', radius: 50 },
        speed: [10, 50], life: [0.6, 1.0], size: [8, 16], color: light,
        behaviors: [c.force(0, 180), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 })),
    ];
  },
};
