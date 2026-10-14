/** BINGO: a bright pop, a ring, glossy bingo balls in five colours bursting out and bouncing down, a pop of confetti fluttering and white sparkles. */
export default {
  name: 'reward.bingo',
  category: 'reward',
  whenToUse: 'BINGO is called or a line, row or whole card is completed in a bingo, lotto, keno or tombola game: play it once on the winning card or line (tint it to use one colour family instead of the five ball colours); for a slot machine line win use reward.slotwin, for a whole-screen level win use reward.clear.',
  duration: 1.3, loop: false, tint: null,
  tags: ['bingo', 'lotto', 'keno', 'line', 'balls', 'confetti', 'win', 'reward'],
  build(c) {
    const palette = c.tint
      ? [c.tint, c.lighten(c.tint, 0.45), c.darken(c.tint, 0.25), c.lighten(c.tint, 0.75)]
      : ['#ff4d6d', '#ffd23f', '#3dd6ff', '#7cff6b', '#c77dff'];
    const main = c.tint || c.rgb('#ffd23f');
    const n = palette.length;
    // one ball system and one confetti system per colour, so the colours stay clean (a random mix of two would muddy)
    const balls = (colour) => c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: Math.round(15 / n) }], shape: { type: 'circle', radius: 18 },
      speed: [240, 440], life: [0.6, 0.8], size: [20, 28], color: [colour, c.lighten(colour, 0.25)],
      behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(900), c.sizeOverLife(c.curve([[0, 0.4], [0.12, 1.1], [0.25, 1], [0.8, 1], [1, 0]]))], order: 3 }));
    // confetti pops out over the upper half, then flutters down at a slow terminal speed
    const confetti = (colour) => c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ time: 0.04, count: Math.round(36 / n) }], shape: { type: 'circle', radius: 14, arc: Math.PI },
      speed: [300, 620], life: [1.0, 1.25], size: [8, 12], rotation: [0, 6.28], color: colour,
      behaviors: [c.gravity(800), c.limitSpeed([[0, 1400], [0.15, 1400], [0.3, 160], [1, 160]], 1.5), c.noise(2.5, 18), c.spin(-9, 9), c.colorOverLife(c.fade(0.75))], order: 2 }));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 220, color: c.lighten(main, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 260, color: c.lighten(main, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      ...palette.map(confetti),
      ...palette.map(balls),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [8, 10] }, { time: 0.25, count: [4, 5] }], shape: { type: 'circle', radius: 30 },
        speed: [120, 260], life: [0.4, 0.55], size: [12, 20], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-3, 3), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
