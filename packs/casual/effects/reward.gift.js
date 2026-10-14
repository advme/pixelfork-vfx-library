/** A gift is unwrapped: a pop of light and a ring, ribbon-coloured paper squares bursting up and tumbling down, stars and rising sparkles. */
export default {
  name: 'reward.gift',
  category: 'reward',
  whenToUse: 'A present is unwrapped: a daily or login gift, a birthday or holiday present, a surprise box, a free reward in gift wrap. Play it on the box; tint it the ribbon colour. For a treasure chest or loot crate use reward.chest; for a gift claimed on a UI button use ui.burst.',
  duration: 1.2, loop: false, tint: '#ff4f7b',
  tags: ['gift', 'present', 'unwrap', 'surprise', 'birthday', 'christmas', 'daily reward', 'box'],
  build(c) {
    const col = c.color('#ff4f7b');
    const light = c.lighten(col, 0.6);
    const gold = c.rgb('#ffd23a');
    // paper flies up fast, then flutters down at a slow terminal speed
    const flutter = () => [c.gravity(1100), c.limitSpeed([[0, 1200], [0.4, 1200], [0.55, 220], [1, 220]], 1.5), c.noise(2.5, 20), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))];
    return [
      // the pop of light as the lid comes off
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 230, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // soft golden rays turning behind it
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.9, size: 300, rotation: [0, 0.8], color: gold,
        behaviors: [c.spin(0.6, 0.9), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.15], [0.5, 0.6], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 220, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // ribbon-coloured paper
      c.sys(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [16, 20] }], shape: { type: 'cone', radius: 12, angle: 0.75 },
        speed: [320, 600], life: [0.85, 1.1], size: [9, 15], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
        behaviors: flutter(), order: 3 }, 'up')),
      // gold and white wrapping paper
      c.sys(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'cone', radius: 12, angle: 0.75 },
        speed: [300, 560], life: [0.85, 1.1], size: [8, 13], rotation: [0, 6.28], color: [gold, '#ffffff'],
        behaviors: flutter(), order: 3 }, 'up')),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: [5, 6] }], shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [220, 380], life: [0.6, 0.8], size: [14, 22], rotation: [0, 6.28], color: [light, gold],
        behaviors: [c.gravity(800), c.speedOverLife(c.decel(0.4)), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [0.75, 1], [1, 0]]))], order: 4 })),
      // sparkles rising off the open box
      c.sys({ tex: 'spark', blend: 'add', rate: 30, duration: 0.6, shape: { type: 'circle', radius: 40 },
        speed: [20, 70], life: [0.4, 0.6], size: [10, 18], color: '#ffffff',
        behaviors: [c.force(0, 160), c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 }),
    ];
  },
};
