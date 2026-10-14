/** A glitter bomb: a bright pop and ring, then glitter squares in party colours and little gold stars burst out, twinkle and flutter down. */
export default {
  name: 'explosion.glitter',
  category: 'explosion',
  whenToUse: 'A party popper or glitter bomb goes off at a spot: a gift or surprise box bursting, a birthday or party moment, a cute enemy popping into glitter, a prize or booster bursting open in a casual game. Tint it for one colour or leave it multicolour. For fireworks in the sky use explosion.firework; for a big win confetti cannon use reward.confetti.',
  duration: 1.3, loop: false, tint: null,
  tags: ['glitter', 'party', 'popper', 'sparkle', 'confetti', 'celebrate', 'surprise', 'burst'],
  build(c) {
    const palette = c.tint
      ? [c.tint, c.lighten(c.tint, 0.45), c.darken(c.tint, 0.2), c.lighten(c.tint, 0.75)]
      : ['#ff4f9a', '#ffd23f', '#3dd6ff', '#9b6bff'].map(c.rgb);
    const gold = c.tint ? c.lighten(c.tint, 0.6) : c.rgb('#fff1a8');
    const pale = c.tint ? c.lighten(c.tint, 0.8) : c.rgb('#ffe6f4');
    // fast pop out, then a slow glittering flutter down
    const flutter = () => [c.gravity(420), c.limitSpeed([[0, 900], [0.25, 150], [1, 110]], 1.5), c.noise(3, 18), c.spin(-10, 10),
      c.sizeOverLife(c.curve([[0, 0.6], [0.1, 1], [0.8, 0.9], [1, 0]]))];
    const glitter = palette.map((colour, i) => c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 8 },
      speed: [240, 560], life: [0.9, 1.25], size: [7, 12], rotation: [0, 6.28], color: [colour, c.lighten(colour, 0.35)],
      behaviors: flutter(), order: 2 + (i % 2) })));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 170, color: pale,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 200, color: pale,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      ...glitter,
      // little gold stars
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 10 },
        speed: [180, 380], life: [0.6, 0.9], size: [12, 18], rotation: [0, 6.28], color: gold,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.gravity(200), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.6))], order: 4 })),
      // sparkle streaks shooting out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 6, thickness: 0 },
        speed: [350, 650], life: [0.25, 0.4], size: [3, 6], color: ['#ffffff', gold], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 5 })),
      // twinkles hanging in the cloud of glitter
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.08, count: [10, 12] }], shape: { type: 'circle', radius: 70 },
        speed: [10, 50], life: [0.5, 0.9], size: [10, 18], color: '#ffffff',
        behaviors: [c.gravity(60), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.35, 0.2], [0.5, 1], [0.7, 0.2], [0.85, 0.8], [1, 0]]))], order: 5 })),
    ];
  },
};
