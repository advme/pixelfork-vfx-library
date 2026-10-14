/** A knockout: a big flash, a star burst, a ring of dust, and three stars floating up. */
export default {
  name: 'hit.ko',
  category: 'hit',
  whenToUse: 'A character is knocked out or defeated: K.O. in a fighting game, the player dies in a platformer, a boss goes down, an enemy is finished off. Play it on the character\'s body. For an enemy simply vanishing use explosion.puff.',
  duration: 1.0, loop: false, tint: '#ffe14d',
  tags: ['ko', 'knockout', 'defeat', 'death', 'die', 'fighting', 'finish', 'boss'],
  build(c) {
    const col = c.color('#ffe14d');
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 240, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.35, size: 260, rotation: [0, 1.6], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [9, 11] }], shape: { type: 'circle', radius: 12, thickness: 0, even: true },
        speed: [320, 460], life: [0.55, 0.75], size: [20, 30], rotation: [0, 6.28], color: [col, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.gravity(380), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [0.7, 1], [1, 0]]))], order: 3 })),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 9] }], shape: { type: 'circle', radius: 14, thickness: 0, even: true },
        speed: [150, 230], life: [0.45, 0.6], size: [30, 46], rotation: [0, 6.28], color: '#f2f2f2',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      // three stars float up and fade
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ time: 0.12, count: 3 }], shape: { type: 'cone', radius: 20, angle: 0.4 },
        speed: [110, 170], life: [0.75, 0.88], size: [30, 40], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.3)), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.7, 1], [1, 0]]))], order: 4 }, 'up')),
    ];
  },
};
