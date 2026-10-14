/** A home-run crack of the bat: a big white flash, a ring, a fan of golden streaks blasting off with the ball and stars tumbling after it. */
export default {
  name: 'hit.homerun',
  category: 'hit',
  whenToUse: 'A bat smashes the ball as hard as it can: a baseball or cricket home run, a perfect power hit, a launch in a ball-hitting or slugger game. Play it on the ball at the moment of contact; in 2D set dir (degrees, default 45 up to the right) and in 3D pass direction the way the ball flies. Bigger than hit.kick; for a tennis or ping-pong hit use hit.racket.',
  duration: 0.6, loop: false, tint: '#ffd84a',
  tags: ['home run', 'baseball', 'bat', 'cricket', 'power hit', 'crack', 'sports', 'hit'],
  build(c) {
    const col = c.color('#ffd84a');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? Math.PI / 4 : c.dir;
    const fwd = c.is3d ? undefined : [Math.cos(dir) * 24, Math.sin(dir) * 24];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 220, color: '#fffbea',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.2, size: 190, rotation: [0, 1.6], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.26, size: 180, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // the fan of streaks blasting off with the ball
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [11, 13] }], dir, offset: fwd, shape: { type: 'cone', radius: 16, angle: 0.22 },
        speed: [800, 1150], life: [0.14, 0.22], size: [5, 8], color: [col, '#ffffff'], stretch: { speed: 0.018, length: 1 },
        behaviors: [c.sizeOverLife(c.grow(0.15)), c.colorOverLife(c.fade(0.4))], order: 4 })),
      // a crack of small sparks in every direction
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [300, 520], life: [0.15, 0.25], size: [3, 5], color: '#ffffff', stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 4 })),
      // stars tumbling after the ball
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ time: 0.03, count: [8, 10] }], dir, shape: { type: 'cone', radius: 10, angle: 0.6 },
        speed: [240, 460], life: [0.4, 0.58], size: [12, 20], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.gravity(450), c.speedOverLife(c.decel(0.25)), c.spin(-7, 7), c.sizeOverLife(c.curve([[0, 0.6], [0.15, 1], [0.75, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
