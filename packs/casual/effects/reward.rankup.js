/** A rank up: three chevrons stack up one after another over a burst of rays, with sparkles raining down. */
export default {
  name: 'reward.rankup',
  category: 'reward',
  whenToUse: 'The player is promoted: a new rank, league or tier, a higher division, a battle-pass tier, a prestige level, a title earned. Play it at the centre of the rank badge. For a character level-up use reward.levelup.',
  duration: 1.6, loop: false, tint: '#b45cff',
  tags: ['rank up', 'promotion', 'tier', 'league', 'prestige', 'battle pass', 'progress', 'reward'],
  build(c) {
    const col = c.color('#b45cff');
    const light = c.lighten(col, 0.6);
    const chevron = (t, y) => c.sys({ tex: 'arrow', blend: 'add', bursts: [{ time: t, count: 1 }], life: 1.55 - t, size: 80, offset: [0, y], color: light,
      behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.08, 1.3], [0.16, 1], [0.85, 1], [1, 0]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [1, 0.85], [0, 1]]))], order: 4 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 300, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 1.5, size: 340, rotation: [0, 0.8], color: col,
        behaviors: [c.spin(0.4, 0.6), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0.6, 0.7], [0, 1]]))], order: 1 }),
      chevron(0.1, -40), chevron(0.3, 0), chevron(0.5, 40),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.5, count: 1 }], life: 0.5, size: 300, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.5, count: [16, 20] }], shape: { type: 'circle', radius: 30 },
        speed: [150, 320], life: [0.7, 1.0], size: [10, 16], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.gravity(500), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.8, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
