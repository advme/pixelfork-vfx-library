/** A car blows up: a hard flash and shockwave, a tall fireball boiling upward, a black smoke column, metal chunks and burning debris arcing out. */
export default {
  name: 'vehicle.explode',
  category: 'vehicle',
  whenToUse: 'A car, truck, tank, plane or other vehicle blows up and is destroyed: play it at the middle of the vehicle (for a crash without fire use vehicle.crash, for a fuel barrel explosion.barrel, for a bomb explosion.small, for a burning wreck afterwards use vehicle.damaged).',
  duration: 1.6, loop: false, tint: '#ff7a1f',
  tags: ['car', 'explode', 'explosion', 'destroyed', 'wreck', 'fireball', 'smoke', 'vehicle'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.55);
    const up = Math.PI / 2;
    // fresh each call: behaviours cannot be shared between systems
    const fire = () => c.colorOverLife(c.grad([['#fff6c8', 0], [light, 0.2], [col, 0.5], [c.darken(col, 0.7), 1]], [[1, 0], [1, 0.55], [0, 1]]));
    // an upward half-burst: the upper half-circle in 2D, a wide cone pointed straight up in 3D
    // (c.vol turns a half-circle into a hemisphere that opens sideways in 3D, not upward)
    const upward = (p) => c.sys(c.is3d ? c.spray(Object.assign({}, p, { shape: { type: 'cone', radius: p.shape.radius, angle: 1.2 } }), 'up') : p);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 280, color: '#fff4d0',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 340, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the fireball: a round blast...
      upward({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 18, arc: Math.PI },
        speed: [80, 200], life: [0.45, 0.65], size: [60, 95], rotation: [0, 6.28],
        behaviors: [fire(), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.15]])), c.speedOverLife(c.decel(0.1)), c.force(0, 220), c.spin(-2, 2)], order: 3 }),
      // ...that boils up into a tall column
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ time: 0.04, count: [8, 10] }], dir: up, shape: { type: 'cone', radius: 14, angle: 0.22 },
        speed: [260, 420], life: [0.5, 0.7], size: [50, 80], rotation: [0, 6.28],
        behaviors: [fire(), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.2]])), c.speedOverLife(c.decel(0.2)), c.spin(-2, 2)], order: 3 }, 'up')),
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ time: 0.02, count: [7, 9] }], dir: up, shape: { type: 'cone', radius: 20, angle: 0.35 },
        speed: [150, 300], life: [0.35, 0.5], size: [40, 60], rotation: [-0.3, 0.3], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 4 }, 'up')),
      // the black smoke column rising behind the fire
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.1, count: [8, 10] }, { time: 0.25, count: [6, 8] }], dir: up, shape: { type: 'cone', radius: 18, angle: 0.28 },
        speed: [140, 300], life: [1.0, 1.35], size: [55, 90], rotation: [0, 6.28], color: ['#3a3a3a', '#262626'],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.force(0, 70), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.7]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.12], [0.6, 0.6], [0, 1]]))], order: 2 }, 'up')),
      // metal chunks and panels
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 10] }], dir: up, shape: { type: 'cone', radius: 12, angle: 0.75 },
        speed: [380, 720], life: [0.8, 1.15], size: [9, 16], rotation: [0, 6.28], color: ['#7a828e', '#3c4048'],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.75))], order: 4 }, 'up'), 'box')),
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [3, 5] }], dir: up, shape: { type: 'cone', radius: 12, angle: 0.6 },
        speed: [320, 600], life: [0.8, 1.1], size: [13, 20], rotation: [0, 6.28], color: ['#9aa3ad', '#5c636d'],
        behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 4 }, 'up'), 'plank')),
      // burning debris tumbling out in arcs
      upward({ tex: 'flame', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 12, arc: Math.PI },
        speed: [300, 560], life: [0.7, 1.0], size: [16, 24], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.gravity(1100), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.6], [0.2, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.6))], order: 4 }),
      // sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [22, 28] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [380, 820], life: [0.35, 0.65], size: [4, 7], color: ['#fff2a8', light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1100), c.speedOverLife(c.decel(0.35)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 5 })),
    ];
  },
};
