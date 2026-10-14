/** A goal! A blinding flash, golden rays, two confetti cannons firing and fireworks popping overhead. */
export default {
  name: 'reward.goal',
  category: 'reward',
  whenToUse: 'A big scoring moment in a sports or party game: a goal, a touchdown, a basket, a hole-in-one, a strike, a finish-line win. Play it at the goal or the centre of the screen. For a plain level win use reward.clear.',
  duration: 1.5, loop: false, tint: null,
  tags: ['goal', 'score', 'touchdown', 'sports', 'soccer', 'celebration', 'win', 'confetti', 'reward'],
  build(c) {
    const gold = c.tint || c.rgb('#ffd23a');
    const confetti = ['#ff4f6b', '#ffd23a', '#47b6ff', '#4dff9a', '#b45cff'];
    const cannon = (dir, x) => c.sys(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [24, 28] }], shape: { type: 'cone', radius: 6, angle: 0.3 }, dir, offset: [x, -40],
      speed: [500, 820], life: [1.1, 1.4], size: [6, 10], rotation: [0, 6.28], color: confetti.map(c.rgb).slice(0, 2),
      behaviors: [c.gravity(900), c.limitSpeed([[0, 900], [0.3, 260], [1, 160]], 1.5), c.noise(2, 30), c.spin(-10, 10), c.colorOverLife(c.fade(0.8))], order: 3 }));
    const cannon2 = (dir, x) => c.sys(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [24, 28] }], shape: { type: 'cone', radius: 6, angle: 0.3 }, dir, offset: [x, -40],
      speed: [500, 820], life: [1.1, 1.4], size: [6, 10], rotation: [0, 6.28], color: confetti.map(c.rgb).slice(2, 4),
      behaviors: [c.gravity(900), c.limitSpeed([[0, 900], [0.3, 260], [1, 160]], 1.5), c.noise(2, 30), c.spin(-10, 10), c.colorOverLife(c.fade(0.8))], order: 3 }));
    const pop = (t, x, y, colour) => [
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: [18, 22] }], shape: { type: 'circle', radius: 4, thickness: 0 }, offset: [x, y],
        speed: [180, 300], life: [0.5, 0.7], size: [4, 7], color: colour, stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(300), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 4 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: 1 }], life: 0.2, size: 90, offset: [x, y], color: colour,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 2 }),
    ];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 320, color: '#fff6dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 1.2, size: 380, rotation: [0, 0.8], color: gold,
        behaviors: [c.spin(0.5, 0.7), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0.6, 0.6], [0, 1]]))], order: 1 }),
      cannon(Math.PI * 0.66, -70), cannon2(Math.PI * 0.34, 70),
      ...pop(0.3, -120, 170, c.rgb('#ff4f6b')), ...pop(0.55, 130, 200, c.rgb('#47b6ff')), ...pop(0.8, 0, 240, gold),
    ];
  },
};
