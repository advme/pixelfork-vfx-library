/** A robot takes a hit: a hard white-orange flash, a burst of hot orange-yellow sparks and glowing bits, a small puff of oil smoke and a few loose bolts tumbling away. */
export default {
  name: 'hit.robot',
  category: 'hit',
  whenToUse: 'A robot, drone, mech, turret or machine enemy takes a hit and loses bits (metal sparks, black oil smoke, loose bolts): play it on the robot at each hit; for a plain metal clang without debris use hit.metal, for an EMP that shorts it out use hit.emp, for a robot destroyed use explosion.small or explosion.electric.',
  duration: 0.6, loop: false, tint: '#ffd25a',
  tags: ['robot', 'mech', 'drone', 'machine', 'metal', 'sparks', 'oil', 'bolts'],
  build(c) {
    const col = c.color('#ffd25a');
    const hot = c.mix(col, '#ff7a1a', 0.45);
    const light = c.lighten(col, 0.5);
    return [
      // the flash, drawn over the smoke: white-hot at the core, cooling to orange as it swells
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 130, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 1.1]])),
          c.colorOverLife(c.grad([['#ffffff', 0], [hot, 0.45], [hot, 1]], [[1, 0], [0.75, 0.35], [0, 1]]))], order: 1 }),
      // a small puff of black oil smoke
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.03, count: [3, 4] }], shape: { type: 'circle', radius: 8 },
        speed: [40, 80], life: [0.4, 0.55], size: [14, 22], rotation: [0, 6.28], color: ['#34343b', '#55555e'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 70), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.4], [0, 1]]))], order: 0 })),
      // the shock ring
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 100, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // loose bolts and nuts: solid tumbling pieces in 3D
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 6 },
        speed: [200, 340], life: [0.5, 0.6], size: [6, 9], rotation: [0, 6.28], color: ['#c4ccd6', '#7b838d'],
        behaviors: [c.gravity(1300), c.spin(-12, 12), c.sizeOverLife(c.curve([[0, 1], [0.8, 1], [1, 0]]))], order: 3 }, 'box')),
      // glowing hot bits, chunkier and slower than the sparks
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 6 },
        speed: [140, 300], life: [0.3, 0.45], size: [5, 8], color: [light, hot],
        behaviors: [c.gravity(1100), c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.5))], order: 3 })),
      // hot orange-yellow metal sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [18, 24] }], shape: { type: 'circle', radius: 4, thickness: 0 },
        speed: [350, 700], life: [0.18, 0.34], size: [4, 7], color: ['#ffffff', hot], stretch: { speed: 0.014, length: 1.5 },
        behaviors: [c.gravity(1400), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.45))], order: 4 })),
      // the hard white star of the impact
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 115, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
    ];
  },
};
