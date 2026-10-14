/** A landmine: a flash at the ground, a tall column of fire and dirt blasting straight up, clods and sparks raining down, a ring and dust rolling out along the ground. */
export default {
  name: 'explosion.mine',
  category: 'explosion',
  whenToUse: 'A landmine, a buried trap or pressure plate, a hidden ground bomb, a fire geyser bursting from below: anything that blows up out of the ground in a tall column. Play it on the ground. For a shell, cannonball or bomb landing from above use explosion.artillery; for a blast in the air use explosion.small; for a meteor falling from the sky use magic.meteor.',
  duration: 1.15, loop: false, anchor: 'feet', tint: null,
  tags: ['mine', 'landmine', 'trap', 'buried', 'geyser', 'ground', 'column', 'explosion'],
  build(c) {
    const fire = () => c.colorOverLife(c.tint
      ? c.grad([[c.lighten(c.tint, 0.8), 0], [c.tint, 0.3], [c.darken(c.tint, 0.6), 1]], [[1, 0], [1, 0.6], [0, 1]])
      : c.grad([['#fff4b0', 0], ['#ffb330', 0.3], ['#ff5a1f', 0.65], ['#4a2418', 1]], [[1, 0], [1, 0.6], [0, 1]]));
    const hot = c.tint ? c.lighten(c.tint, 0.4) : c.rgb('#ffc56a');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const up = Math.PI / 2;
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 220, offset: [0, 20], color: '#fff3c4',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.25))], order: 4 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 320, color: hot,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the fire column: fast balls reach the top, slow ones stay low, so it strings out tall
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [14, 16] }], shape: { type: 'cone', radius: 10, angle: 0.12 }, dir: up,
        speed: [150, 760], life: [0.4, 0.6], size: [44, 74], rotation: [0, 6.28],
        behaviors: [fire(), c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.2]])), c.speedOverLife(c.decel(0.12)), c.spin(-2, 2)], order: 3 }, 'up')),
      // a bright flame core running up the column
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: [7, 9] }], shape: { type: 'cone', radius: 6, angle: 0.08 }, dir: up,
        speed: [200, 620], life: [0.3, 0.45], size: [40, 62], color: ['#fff2b0', hot],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.4))], order: 4 }, 'up')),
      // dirt thrown up with it, hanging and sagging back
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [10, 12] }, { time: 0.06, count: [4, 5] }], shape: { type: 'cone', radius: 14, angle: 0.22 }, dir: up,
        speed: [120, 620], life: [0.8, 1.1], size: [40, 70], rotation: [0, 6.28], color: ['#7a5a40', '#4a3426'],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.gravity(150), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.35]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.8, 0.55], [0, 1]]))], order: 2 }, 'up')),
      // clods of earth
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [12, 14] }], shape: { type: 'cone', radius: 12, angle: 0.4 }, dir: up,
        speed: [380, 780], life: [0.8, 1.1], size: [7, 14], rotation: [0, 6.28], color: ['#6a4a34', '#3a2a1f'],
        behaviors: [c.gravity(1800), c.spin(-10, 10), c.colorOverLife(c.fade(0.8))], order: 4 }, 'up'), 'box')),
      // sparks, born above the ground with shorter tails, because a streak trails back toward where it came from (into the floor)
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 16] }], shape: { type: 'cone', radius: 8, angle: 0.5 }, dir: up, offset: [0, 44],
        speed: [350, 750], life: [0.4, 0.7], size: [4, 7], color: ['#fff2a8', hot], stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.5))], order: 5 }, 'up')),
      // dust rolling out along the ground
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [10, 12] }],
        shape: c.is3d ? { type: 'circle', radius: 16, thickness: 0, even: true } : { type: 'circle', radius: 16, thickness: 0, arc: Math.PI, even: true }, offset: c.is3d ? [0, 18] : undefined,
        speed: [180, 280], life: [0.5, 0.7], size: [30, 48], rotation: [0, 6.28], color: '#a08a72',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
    ];
  },
};
