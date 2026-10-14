/** A mortar thump: a white-hot flash at the tube's mouth, a short tongue of fire and sparks shooting up, a blast ring and a column of smoke puffing up out of the tube. */
export default {
  name: 'weapon.mortar',
  category: 'weapon',
  whenToUse: 'A mortar, howitzer or artillery tower lobs a shell high into the air: a mortar tower in tower defense, a siege mortar on a castle wall, a trench mortar, a fireworks launch tube. Play it at the mouth of the tube; it fires straight up by default, in 2D set dir (degrees, 90 = up) for a tilted tube and in 3D pass direction. For a cannon firing flat use weapon.cannon, for a catapult arm use weapon.catapult, and where the shell lands use explosion.artillery.',
  duration: 0.85, loop: false, tint: '#ffa83a',
  tags: ['mortar', 'artillery', 'tower defense', 'howitzer', 'siege', 'shell', 'launch', 'weapon'],
  build(c) {
    const col = c.color('#ffa83a');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    // a streak trails back from its particle, as long as size x speed (braking does not shorten it): the sparks start
    // small and, in 2D, a little past the mouth, so their tails stay out of the tube
    const out = c.is3d ? undefined : [Math.cos(dir) * 16, Math.sin(dir) * 16];
    return [
      // the flash at the mouth
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.09, size: 130, rotation: [0, 0.8], color: '#fff8e0',
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 6 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      // the blast ring round the mouth: a ring seen side-on across the tube in 2D, lying level at the mouth in 3D
      c.is3d
        ? c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 110, color: light,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }, { snap: false }))
        : c.sys({ tex: 'ellipse', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 110, rotation: dir - Math.PI / 2, color: light,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // the short tongue of fire out of the tube
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: [5, 7] }], dir, shape: { type: 'cone', radius: 5, angle: 0.18 },
        speed: [320, 520], life: [0.08, 0.13], size: [34, 48], color: [col, '#ff7a1f'],
        behaviors: [c.sizeOverLife(c.shrink())], order: 5 })),
      // sparks shooting up with the shell and dropping back
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], dir, offset: out, shape: { type: 'cone', radius: 4, angle: 0.3 },
        speed: [300, 650], life: [0.18, 0.35], size: [4, 7], color: ['#fff2c4', col], stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.gravity(900), c.sizeOverLife(c.curve([[0, 0.3], [0.35, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.5))], order: 7 })),
      // the column of smoke puffing up out of the tube and hanging where it was fired
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ time: 0.02, count: [8, 10] }], dir, shape: { type: 'cone', radius: 6, angle: 0.22 },
        speed: [90, 320], life: [0.6, 0.85], size: [30, 48], rotation: [0, 6.28], color: ['#f4f4f4', '#cfcfcf'],
        behaviors: [c.speedOverLife(c.decel(0.06)), c.force(0, 30), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1.1], [1, 1.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.75, 0.5], [0, 1]]))], order: 3 })),
      // a puff bursting out round the rim of the tube
      c.sys(c.vol({ tex: 'puff', blend: 'normal', world: true, bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [60, 120], life: [0.45, 0.65], size: [24, 36], rotation: [0, 6.28], color: '#e2e2e2',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0, 1]]))], order: 4 })),
    ];
  },
};
