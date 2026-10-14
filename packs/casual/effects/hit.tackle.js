/** A big sports tackle: a white flash, an impact ring, a burst of field dust and cartoon stars flying off the collision. */
export default {
  name: 'hit.tackle',
  category: 'hit',
  whenToUse: 'Two players crash into each other in a sports game: an American football tackle, a rugby hit, a hockey body check, a slide tackle, a sumo or bumper shove, a dodgeball player knocked down. Play it where the bodies meet. For a punch use hit.punch; for slamming into the ground use hit.heavy; for cars colliding use vehicle.crash.',
  duration: 0.6, loop: false, tint: '#ffd84a',
  tags: ['tackle', 'collision', 'football', 'rugby', 'hockey', 'body check', 'sports', 'hit'],
  build(c) {
    const col = c.color('#ffd84a');
    const light = c.lighten(col, 0.6);
    const dust = '#e9dcc7';
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 170, color: '#fff6dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.18, size: 150, rotation: [0, 1.6], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 180, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // the dust of the field knocked up
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 14 },
        speed: [140, 280], life: [0.4, 0.6], size: [30, 46], rotation: [0, 6.28], color: [dust, '#cdbfa8'],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.35, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // cartoon stars knocked loose
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 14, thickness: 0, even: true },
        speed: [220, 340], life: [0.4, 0.55], size: [15, 22], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(500), c.spin(-7, 7), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.75, 1], [1, 0]]))], order: 5 })),
      // little white impact streaks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [380, 560], life: [0.12, 0.2], size: [4, 6], color: '#ffffff', stretch: { speed: 0.02, length: 1.2 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 4 })),
    ];
  },
};
