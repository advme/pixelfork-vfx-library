/** An EMP hit on a machine: a cold blue flash, two pulse rings, crackling arcs and little bolts, then grey smoke as it shorts out. */
export default {
  name: 'hit.emp',
  category: 'hit',
  whenToUse: 'An EMP, ion or disruptor shot hits a robot, drone, turret, vehicle or machine and shorts it out (it stops, stalls or is stunned): play it on the target; for a big area EMP blast use explosion.electric, for an electric attack on a living creature use hit.electric.',
  duration: 0.7, loop: false, tint: '#5fd0ff',
  tags: ['emp', 'robot', 'machine', 'electric', 'short circuit', 'disable', 'ion', 'sci-fi'],
  build(c) {
    const col = c.color('#5fd0ff');
    const light = c.lighten(col, 0.6);
    return [
      // grey smoke as the machine shorts out, drawn behind everything so it never dulls the flash
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.06, count: [5, 7] }], shape: { type: 'circle', radius: 12 },
        speed: [30, 80], life: [0.45, 0.6], size: [22, 32], rotation: [0, 6.28], color: ['#858b94', '#5a5f66'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 60), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 0 })),
      // the cold flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // two pulse rings
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.1, count: 1 }], life: 0.32, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 2 }),
      // arcs: jagged streaks crackling out in three snaps
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [9, 12] }, { time: 0.1, count: [5, 7] }, { time: 0.22, count: [3, 4] }], shape: { type: 'circle', radius: 6, thickness: 0 },
        speed: [280, 520], life: [0.08, 0.16], size: [3.5, 5.5], color: ['#ffffff', col], stretch: { speed: 0.025, length: 1.6 },
        behaviors: [c.noise(30, 40), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // the machine keeps crackling for a moment
      c.sys(c.vol({ tex: 'glow', blend: 'add', rate: 30, duration: 0.4, shape: { type: 'circle', radius: 22 },
        speed: [150, 300], life: [0.06, 0.12], size: [2.5, 4], color: light, stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.noise(30, 30)], order: 3 })),
      c.sys(c.vol({ tex: 'bolt', blend: 'add', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 28 },
        speed: [40, 100], life: [0.22, 0.32], size: [18, 26], rotation: [-0.6, 0.6], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.1], [0.3, 0.8], [0.5, 1.05], [1, 0]]))], order: 4 })),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 90, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
    ];
  },
};
