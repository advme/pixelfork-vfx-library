/** Waves crashing: every couple of seconds a wave bursts into a fan of spray and white foam, mist hangs, and foam spreads on the water. Loops until stopped. */
export default {
  name: 'world.wave',
  category: 'world',
  whenToUse: 'Waves keep crashing against rocks, a cliff, a pier, a breakwater or a beach: a coastal level, a lighthouse, a harbour, a pirate island, a stormy sea. Play it where the water hits and leave it running. For calm foam lapping along a beach use world.shore; for one big splash use explosion.water.',
  duration: 2.2, loop: true, anchor: 'feet', tint: '#4fb8ff',
  tags: ['wave', 'surf', 'crash', 'spray', 'rocks', 'coast', 'sea', 'ocean'],
  build(c) {
    const col = c.color('#4fb8ff');
    const light = c.lighten(col, 0.65);
    const D = 2.2;
    // 3D: the foam sheet lies on the water (not snapped to the ground: the water is above it)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // each cycle: one big crash, and sometimes a smaller wave after it
    const crash = (big, small) => [{ time: 0.1, count: big }, { time: 1.25, count: small, probability: 0.5 }];
    // an upper half-circle burst; in 3D c.vol makes it a hemisphere that domes along +Z, so c.spray turns it to point up
    const up = (p) => c.sys(c.spray(c.vol(p), 'up'));
    return [
      // a soft flash of white as the wave hits
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: D, bursts: [{ time: 0.1, count: 1 }], life: 0.18, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [1, 1.1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 0 }),
      // foam spreading out over the water after each crash
      ring({ blend: 'normal', loop: true, duration: D, bursts: [{ time: 0.1, count: 1 }], life: 0.9, size: 250, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 1 }),
      // the fan of water thrown up the rocks
      c.sys(c.spray({ tex: 'drop', blend: 'normal', loop: true, duration: D, bursts: crash([14, 20], [5, 8]), shape: { type: 'cone', radius: 30, angle: 0.4 },
        speed: [320, 600], life: [0.65, 0.95], size: [9, 16], color: [col, light],
        behaviors: [c.gravity(1400), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.85], [1, 0]]))], order: 4 }, 'up')),
      // fine white spray
      up({ tex: 'disc', blend: 'normal', loop: true, duration: D, bursts: crash([14, 18], [4, 6]), shape: { type: 'circle', radius: 30, arc: Math.PI },
        speed: [220, 460], life: [0.45, 0.7], size: [3, 6], color: '#ffffff',
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 5 }),
      // white foam bursting up and rolling out
      up({ tex: 'puff', blend: 'normal', loop: true, duration: D, bursts: crash([6, 8], [2, 3]), shape: { type: 'circle', radius: 40, arc: Math.PI },
        speed: [60, 170], life: [0.9, 1.3], size: [40, 66], rotation: [0, 6.28], color: '#f4fbff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 3 }),
      // mist that hangs a moment after the crash
      up({ tex: 'puff', blend: 'normal', loop: true, duration: D, bursts: [{ time: 0.18, count: [3, 4] }], shape: { type: 'circle', radius: 30, arc: Math.PI }, offset: [0, 40],
        speed: [30, 70], life: [1.3, 1.7], size: [60, 90], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.3)), c.force(0, 30), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.15], [0, 1]]))], order: 2 }),
    ];
  },
};
