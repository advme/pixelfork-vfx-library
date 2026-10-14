/** An exhaust backfire: a bang of light and a pop ring at the pipe, a ball of flame shooting out, sparks and a puff of black smoke. */
export default {
  name: 'vehicle.backfire',
  category: 'vehicle',
  whenToUse: 'A car, motorbike or hot rod backfires with a bang out of its exhaust (revving, shifting gear, a tuned engine, a cartoon car sputtering): play it once at the tailpipe, in 2D with dir (degrees, default 180 = left) and in 3D with direction pointing backward out of the pipe (for the steady smoke of a running engine use vehicle.exhaust, for a gun shot weapon.muzzle).',
  duration: 0.7, loop: false, tint: '#ff8a2a',
  tags: ['backfire', 'exhaust', 'bang', 'pop', 'engine', 'car', 'flame', 'vehicle'],
  build(c) {
    const col = c.color('#ff8a2a');
    const light = c.lighten(col, 0.55);
    const dir = c.dir === undefined ? Math.PI : c.dir;
    // 2D: start the flame just past the pipe, so its streaks do not reach back into the car
    const at = (d) => (c.is3d ? undefined : [Math.cos(dir) * d, Math.sin(dir) * d]);
    return [
      // the bang: a white star, a hot glow and a pop ring just out of the pipe
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.07, size: [56, 70], rotation: [0, 0.8], color: '#fff6dc', offset: at(14),
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 5 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 90, color: col, offset: at(14),
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 70, color: light, offset: at(16),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 3 }),
      // the ball of flame popping out of the pipe
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: [5, 7] }], dir, shape: { type: 'cone', radius: 3, angle: 0.35 }, offset: at(10),
        speed: [180, 360], life: [0.1, 0.16], size: [26, 40], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 4 })),
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [3, 4] }], dir, shape: { type: 'cone', radius: 2, angle: 0.12 }, offset: at(10),
        speed: [380, 600], life: [0.06, 0.1], size: [20, 28], color: '#fff2c4', stretch: { speed: 0.004, length: 0.6 },
        behaviors: [c.sizeOverLife(c.shrink())], order: 4 })),
      // sparks spat out with it
      c.sys(c.spray({ tex: 'glow', blend: 'add', world: true, bursts: [{ count: [8, 12] }], dir, shape: { type: 'cone', radius: 3, angle: 0.5 }, offset: at(10),
        speed: [280, 600], life: [0.18, 0.35], size: [3, 5], color: ['#ffffff', light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1100), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.5))], order: 5 })),
      // a puff of black smoke left hanging behind the car
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ time: 0.03, count: [4, 6] }], dir, shape: { type: 'cone', radius: 3, angle: 0.4 }, offset: at(8),
        speed: [90, 200], life: [0.45, 0.65], size: [16, 26], rotation: [0, 6.28], color: ['#3a3a3a', '#555555'],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.force(0, 45), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
    ];
  },
};
