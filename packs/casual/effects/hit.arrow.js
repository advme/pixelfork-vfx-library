/** An arrow thunks in: a sharp glint, a quick ring, wooden splinters and a feather or two flying back out, with a puff of dust. */
export default {
  name: 'hit.arrow',
  category: 'hit',
  whenToUse: 'An arrow, crossbow bolt, dart or throwing knife thunks into something: an archery target hit, a bolt sticking in a wooden wall or shield, an arrow striking an enemy, a dart on a board; play it where it struck, in 2D set dir (degrees, default 90 = up) toward the side it came from and in 3D pass direction (for a bullet use hit.bullet, for an arrow into soil use hit.dirt, for a fire or ice arrow add hit.fire or hit.ice).',
  duration: 0.55, loop: false, tint: '#ffe2a0',
  tags: ['arrow', 'bolt', 'crossbow', 'archery', 'dart', 'thunk', 'splinter', 'hit'],
  build(c) {
    const col = c.color('#ffe2a0');
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    return [
      // dust puffed off the surface
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 8 },
        speed: [30, 80], life: [0.35, 0.5], size: [20, 30], rotation: [0, 6.28], color: '#e6d6bd',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.4, 0.5], [0, 1]]))], order: 0 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 80, color: c.lighten(col, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 74, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0))], order: 2 }),
      // splinters of the shaft flying back out
      c.sys(c.chunks(c.spray({ tex: 'shard', blend: 'normal', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 4, angle: 0.7 },
        speed: [180, 380], life: [0.35, 0.5], size: [7, 12], rotation: [0, 6.28], color: ['#c8935a', '#7a4a26'],
        behaviors: [c.gravity(1400), c.spin(-14, 14), c.colorOverLife(c.fade(0.7))], order: 4 }), 'plank')),
      // grit
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 6, angle: 0.8 },
        speed: [120, 280], life: [0.25, 0.4], size: [3, 5], color: '#bfa27c',
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.6))], order: 3 })),
      // a feather or two from the fletching, fluttering down
      c.sys(c.vol({ tex: 'leaf', blend: 'normal', bursts: [{ count: [1, 2] }], shape: { type: 'circle', radius: 6 },
        speed: [60, 120], life: [0.45, 0.55], size: [9, 12], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(200), c.noise(3, 20), c.spin(-6, 6), c.colorOverLife(c.fade(0.6))], order: 3 })),
      // the sharp glint of the thunk
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 64, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0]]))], order: 5 }),
    ];
  },
};
