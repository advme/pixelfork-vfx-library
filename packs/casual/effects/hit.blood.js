/** A blood hit: a directional spray of droplets, a wet splat, mist and drips. In 3D the spray is a real cone and drops leave splats on the floor. */
export default {
  name: 'hit.blood',
  category: 'hit',
  whenToUse: 'A creature takes a bloody hit in an action game. Aim it: in 2D set dir (degrees, default up); in 3D pass direction: [x, y, z], the way the blood flies (away from the weapon). Tint green for slime or zombies, black for oil or ink, purple for aliens.',
  duration: 0.9,
  loop: false,
  tint: '#c8102e',
  tags: ['blood', 'splat', 'gore', 'damage', 'slime', 'ink', 'squish', 'spray'],
  build(c) {
    const col = c.color('#c8102e');
    const dark = c.darken(col, 0.45);
    const deep = c.darken(col, 0.25);
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    const wet = c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [1, 0.55], [0, 1]]);
    return [
      // main spray: a fan (3D: a cone) of droplets that stretch with speed and arc down
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [20, 28] }], shape: { type: 'cone', radius: 6, angle: 0.8 }, dir,
        speed: [320, 760], life: [0.55, 0.85], size: [5, 12], color: [col, deep],
        stretch: { speed: 0.0032, length: 1.25 },
        behaviors: [c.gravity(2000), c.colorOverLife(wet), c.sizeOverLife(c.curve([[0, 0.8], [0.15, 1], [0.85, 0.9], [1, 0]]))], order: 3 })),
      // bigger slow globs in the same direction
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [5, 8] }], shape: { type: 'cone', radius: 8, angle: 0.6 }, dir,
        speed: [160, 380], life: [0.5, 0.75], size: [12, 20], color: [deep, dark],
        stretch: { speed: 0.003, length: 1.3 },
        behaviors: [c.gravity(1800), c.colorOverLife(wet), c.sizeOverLife(c.curve([[0, 0.9], [0.2, 1], [1, 0.5]]))], order: 4 })),
      // the wet splat at the impact: overlapping blobs that swell and stay
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [6, 9] }], shape: { type: 'circle', radius: 12 },
        speed: [20, 90], life: [0.45, 0.7], size: [22, 42], color: [deep, dark],
        behaviors: [c.speedOverLife(c.decel(0.05)), c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1], [0.8, 1.05], [1, 0.7]])), c.colorOverLife(c.fade(0.6))], order: 2 })),
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 0.5, size: 44, color: dark,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.1, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.5))], order: 1 }),
      // fine mist
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [20, 30] }], shape: { type: 'cone', radius: 6, angle: 1.0 }, dir,
        speed: [200, 520], life: [0.3, 0.5], size: [2, 4], color: [col, dark],
        behaviors: [c.gravity(1500), c.colorOverLife(c.fade(0.5))], order: 5 })),
      // heavy drips falling straight down from the wound
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ time: 0.08, count: [3, 5] }], shape: { type: 'cone', radius: 12, angle: 0.15 }, dir: -Math.PI / 2,
        speed: [20, 80], life: [0.55, 0.8], size: [7, 12], color: [deep, dark],
        stretch: { speed: 0.003, length: 1.5 },
        behaviors: [c.gravity(1300), c.colorOverLife(wet)], order: 4 }, 'down')),
      // 3D only: splats appear on the floor where the drops land, and linger a moment
      c.is3d ? c.sys(Object.assign(c.flat({ tex: 'disc', blend: 'normal', bursts: [{ time: 0.3, count: [3, 4] }, { time: 0.45, count: [3, 5] }],
        shape: { type: 'circle', radius: 55 }, speed: 0, life: [1.4, 2.0], size: [14, 34], color: [deep, dark],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.08, 1], [1, 1.05]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.85, 0.6], [0, 1]]))], order: 0 }), { plane: 'ground' })) : null,
    ];
  },
};
