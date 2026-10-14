/** A breach: a huge column of water bursts up, sheets of droplets peel off and fall, foam boils up and it all crashes down again. */
export default {
  name: 'move.breach',
  category: 'move',
  whenToUse: 'A whale, dolphin, shark or big fish leaps out of the sea, or a sea monster, kraken or submarine bursts up through the surface. Play it on the water surface where it comes out. For a diver going in use move.dive; for something falling in use move.splash (small) or explosion.water (big).',
  duration: 1.45, loop: false, tint: '#3fa9f5',
  tags: ['breach', 'whale', 'dolphin', 'shark', 'leap', 'sea', 'ocean', 'splash'],
  build(c) {
    const col = c.color('#3fa9f5');
    const light = c.lighten(col, 0.65);
    // 3D: rings lie on the water (not snapped to the ground: the water is above it)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const drop = (k) => c.sizeOverLife(c.curve([[0, 1], [k, 0.85], [1, 0]]));
    // an upper half-circle burst; in 3D c.vol makes it a hemisphere that domes along +Z, so c.spray turns it to point up
    const up = (p) => c.sys(c.spray(c.vol(p), 'up'));
    return [
      // a burst of bright mist as it breaks through
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [1, 1.2]])), c.colorOverLife(c.fade(0.15))], order: 0 }),
      // foam rings: two as it bursts out, one as it crashes back
      ring({ blend: 'normal', bursts: [{ count: 1 }, { time: 0.15, count: 1 }, { time: 0.72, count: 1 }], life: 0.7, size: 320, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0, 1]]))], order: 1 }),
      // the column of water thrown up
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ count: [22, 26] }, { time: 0.05, count: [8, 10] }], shape: { type: 'cone', radius: 24, angle: 0.2 },
        speed: [520, 900], life: [0.85, 1.2], size: [12, 22], color: [col, light],
        behaviors: [c.gravity(1500), drop(0.85)], order: 3 }, 'up')),
      // sheets of droplets peeling off to the sides (a crown all round in 3D)
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [26, 32] }], shape: { type: 'cone', radius: 40, angle: 0.65, thickness: 0 },
        speed: [340, 560], life: [0.6, 0.9], size: [6, 11], color: ['#ffffff', light], stretch: { speed: 0.004, length: 1.4 },
        behaviors: [c.gravity(1400), c.colorOverLife(c.fade(0.7)), drop(0.8)], order: 4 }, 'up')),
      // white foam boiling up at the base, twice
      up({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 9] }, { time: 0.72, count: [5, 6] }], shape: { type: 'circle', radius: 34, arc: Math.PI },
        speed: [70, 180], life: [0.55, 0.72], size: [44, 70], rotation: [0, 6.28], color: '#f2fbff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.35]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0, 1]]))], order: 2 }),
      // the crash back down: a lower, wider splash
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ time: 0.72, count: [14, 18] }], shape: { type: 'cone', radius: 30, angle: 0.55 },
        speed: [300, 520], life: [0.5, 0.65], size: [9, 15], color: [col, light],
        behaviors: [c.gravity(1500), drop(0.8)], order: 3 }, 'up')),
    ];
  },
};
