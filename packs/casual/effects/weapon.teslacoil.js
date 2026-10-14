/** A charged tesla coil: a pulsing blue glow round its top, little lightning bolts and arcs crackling out of it, charge sparks circling and a ring of energy sent out every second. Loops until stopped. */
export default {
  name: 'weapon.teslacoil',
  category: 'weapon',
  whenToUse: 'A tesla tower, lightning tower, shock turret or electric pylon in tower defense stands charged and crackling between shots: play it on the top of the tower (the coil ball) and leave it running while the tower is powered; for the zap that hits an enemy use hit.electric, for the tower firing a big discharge use explosion.electric, for a character being shocked use state.electrified and for a sparking broken machine use world.sparks.',
  duration: 1.0, loop: true, tint: '#6cd3ff',
  tags: ['tesla', 'coil', 'lightning tower', 'tower defense', 'electric', 'charged', 'arc', 'turret'],
  build(c) {
    const col = c.color('#6cd3ff');
    const light = c.lighten(col, 0.65);
    const breathe = (lo, hi) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[lo, 0], [hi, 0.5], [lo, 1]]));
    return [
      // the big soft glow round the top, breathing once a second
      // (cut: it goes the moment the game stops the loop instead of hanging on for up to a second)
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.0, bursts: [{ count: 1 }], life: 1.0, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.08], [1, 0.9]])), breathe(0.3, 0.55)], order: 0 }),
      // the hot core of the coil, flickering fast
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.25, bursts: [{ count: 1 }, { time: 0.12, count: 1 }], life: 0.14, size: [48, 62], color: light,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.3, 1]]))], order: 1 }),
      // a ring of energy sent out every second as the charge peaks
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.0, bursts: [{ time: 0.5, count: 1 }], life: 0.4, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // charge sparks circling the coil
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 14, shape: { type: 'circle', radius: 34, thickness: 0 },
        speed: 0, life: [0.4, 0.6], size: [6, 10], color: [light, col],
        behaviors: [c.orbit(5), c.sizeOverLife(c.pop(0.2, 0.6))], order: 3 }),
      // little lightning bolts flickering all round the top
      c.sys(c.vol({ tex: 'bolt', blend: 'add', loop: true, rate: 18, shape: { type: 'circle', radius: 38, thickness: 0.4 },
        speed: 0, life: [0.07, 0.13], size: [20, 32], rotation: [0, 6.28], color: [light, col], order: 4 })),
      // arcs: fast jagged streaks jumping out of the coil now and then. A streak trails BACK from its particle,
      // size x (1.5 + speed x 0.01) = up to 51 px: they start on the coil's surface small and grow, so the tail
      // reaches the centre at most and never pokes out of the far side of the ball
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, duration: 1.0,
        bursts: [{ time: 0.1, count: 2, probability: 0.8 }, { time: 0.45, count: 2 }, { time: 0.78, count: 2, probability: 0.8 }],
        shape: { type: 'circle', radius: 22, thickness: 0 },
        speed: [450, 700], life: [0.06, 0.1], size: [4, 6], color: ['#ffffff', light], stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.noise(40, 40), c.sizeOverLife(c.curve([[0, 0.3], [0.4, 1], [1, 0.8]]))], order: 5 })),
      // crackle: tiny sparks spitting off the surface (born on it and small, so their tails stay on the coil)
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 40, shape: { type: 'circle', radius: 22, thickness: 0 },
        speed: [200, 380], life: [0.05, 0.1], size: [3, 5], color: ['#ffffff', col], stretch: { speed: 0.012, length: 1.2 },
        behaviors: [c.noise(40, 30), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 0.8]]))], order: 5 })),
    ];
  },
};
