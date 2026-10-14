/** GO! A bright flash, rays shooting out all round, two rings bursting wide and confetti squares flying off. Multicolour confetti by default. */
export default {
  name: 'ui.go',
  category: 'ui',
  whenToUse: 'The race, round or match starts: the GO! after a 3-2-1 countdown, a "Start!" or "Fight!" banner, the first moment of a hypercasual level. Play with { el } on the GO text or at the centre of the screen. For the 3-2-1 ticks use ui.countdown; for a win use reward.confetti.',
  duration: 1.0, loop: false, tint: null,
  tags: ['ui', 'go', 'start', 'race', 'countdown', 'fight', 'confetti', 'begin'],
  build(c) {
    const main = c.tint || c.rgb('#4dff7a');
    const light = c.lighten(main, 0.6);
    const palette = c.tint ? [c.tint, c.lighten(c.tint, 0.5)] : ['#ff4d6d', '#ffd23f', '#3dd6ff', '#7cff6b', '#c77dff'];
    const per = Math.round(30 / palette.length);
    const rays = (turn) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: 340, rotation: turn, color: main,
      behaviors: [c.spin(0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 0.9]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.65, 0.1], [0.35, 0.5], [0, 1]]))], order: 1 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 300, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.15))], order: 0 }),
      // big rays turning behind: two crosses, a quarter-turn apart, make an eight-point burst
      rays(0), rays(Math.PI / 4),
      // rays shooting out all round
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 14 }], shape: { type: 'circle', radius: 45, thickness: 0, even: true },
        speed: [650, 850], life: [0.25, 0.32], size: [9, 12], color: light, stretch: { speed: 0.008, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 300, color: main,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.25))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.06, count: 1 }], life: 0.4, size: 220, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      // confetti squares flying off and fluttering down
      ...palette.map((colour, i) => c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: per }], shape: { type: 'circle', radius: 20 },
        speed: [280, 520], life: [0.8, 1.0], size: [8, 13], rotation: [0, 6.28], color: colour,
        behaviors: [c.gravity(900), c.limitSpeed([[0, 900], [0.3, 260], [1, 160]], 1.5), c.noise(2, 30), c.spin(-10, 10), c.colorOverLife(c.fade(0.8))], order: 4 + i }))),
    ];
  },
};
