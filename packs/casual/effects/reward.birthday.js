/** A birthday pop: a pink flash and ring, then party confetti, gold stars and pink hearts bursting out and up, with sparkles. */
export default {
  name: 'reward.birthday',
  category: 'reward',
  whenToUse: 'A birthday or party moment: a birthday reward or login gift, a cake is served or candles blown out, a party starts, an anniversary, a friend or pet celebrating in a social or life-sim game. Play it on the character, the cake or the centre of the screen. For a plain win use reward.confetti; for a party popper or glitter bomb going off at a spot use explosion.glitter; for a whole fireworks show use reward.fireworkshow.',
  duration: 1.4, loop: false, tint: null,
  tags: ['birthday', 'party', 'celebration', 'confetti', 'hearts', 'stars', 'anniversary', 'cake'],
  build(c) {
    const confetti = c.tint
      ? [c.tint, c.lighten(c.tint, 0.5), c.darken(c.tint, 0.25)]
      : ['#ff4d8d', '#ffd23f', '#3dd6ff', '#7cff6b', '#b45cff'];
    const pink = c.tint || c.rgb('#ff5c9a');
    const gold = c.tint ? c.lighten(c.tint, 0.6) : c.rgb('#ffd23f');
    // fast pop up and out, then a slow flutter down; a fresh list per system
    const flutter = () => [c.gravity(900), c.limitSpeed([[0, 1200], [0.3, 1200], [0.45, 170], [1, 170]], 1.5), c.noise(2.5, 24), c.spin(-9, 9), c.colorOverLife(c.fade(0.75))];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 260, color: c.lighten(pink, 0.6),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 240, color: c.lighten(pink, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      ...confetti.map((colour) => c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: Math.round(40 / confetti.length) }], shape: { type: 'circle', radius: 14, arc: Math.PI },
        speed: [300, 560], life: [1.0, 1.35], size: [8, 13], rotation: [0, 6.28], color: colour,
        behaviors: flutter(), order: 2 }))),
      c.sys(c.vol({ tex: 'heart', blend: 'normal', bursts: [{ time: 0.04, count: [6, 8] }], shape: { type: 'circle', radius: 12, arc: Math.PI },
        speed: [160, 300], life: [1.0, 1.3], size: [16, 24], rotation: [-0.3, 0.3], color: [pink, c.lighten(pink, 0.3)],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 60), c.noise(1.2, 20), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.1], [0.25, 1], [0.8, 1], [1, 0]]))], order: 3 })),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.04, count: [8, 10] }], shape: { type: 'circle', radius: 12 },
        speed: [220, 420], life: [0.8, 1.1], size: [14, 22], rotation: [0, 6.28], color: [gold, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(400), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [0.75, 1], [1, 0]]))], order: 4 })),
      c.sys({ tex: 'spark', blend: 'add', rate: 24, duration: 0.7, shape: { type: 'circle', radius: 70 },
        speed: [10, 40], life: [0.4, 0.6], size: [10, 16], color: '#ffffff',
        behaviors: [c.force(0, 80), c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 }),
    ];
  },
};
