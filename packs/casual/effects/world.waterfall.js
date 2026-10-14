/** The foot of a waterfall: white foam churns along the base, droplets leap up, ripples spread and a cloud of mist billows up. Loops until stopped. */
export default {
  name: 'world.waterfall',
  category: 'world',
  whenToUse: 'Where a waterfall, a weir, a dam spillway or a pouring pipe crashes into the water or rocks below: a jungle or forest level, a river, a cliff pool, a water park. Play it at the bottom of the falling water and leave it running; size 2 for a big fall. For a jet shooting up use world.fountain; for one splash use move.splash; for calm rings on a pond use world.ripple.',
  duration: 1.5, loop: true, anchor: 'feet', tint: '#8fd3ff',
  tags: ['waterfall', 'water', 'mist', 'river', 'jungle', 'cliff', 'foam', 'spray', 'nature'],
  build(c) {
    const col = c.color('#8fd3ff');
    const light = c.lighten(col, 0.6);
    const foam = c.lighten(col, 0.88);
    const base = () => (c.is3d ? { type: 'circle', radius: 60 } : { type: 'rect', w: 170, h: 0 });
    // rings on the pool: they lie on the water, which may sit above the ground
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'add', loop: true, duration: 1.5, bursts: [{ count: 1 }, { time: 0.5, count: 1 }, { time: 1, count: 1 }], life: 1.5, size: 240, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.35], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0, 1]]))], order: 0 }),
      // the mist cloud billowing up and out
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 9, shape: base(), speed: c.is3d ? [10, 30] : 0, life: [1.6, 2.4], size: [50, 80], rotation: [0, 6.28], color: foam,
        behaviors: [c.force(0, 45), c.limitSpeed(55, 1), c.noise(0.6, 20), c.spin(-0.4, 0.4), c.sizeOverLife(c.curve([[0, 0.5], [1, 2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.42, 0.2], [0.25, 0.6], [0, 1]]))], order: 1 })),
      // foam churning along the base
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 18, shape: base(), speed: c.is3d ? [5, 20] : 0, life: [0.4, 0.7], size: [20, 34], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.force(0, 70), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.8, 0.5], [0, 1]]))], order: 2 })),
      // droplets leaping up out of the foam
      c.sys(c.spray({ tex: 'drop', blend: 'normal', loop: true, world: true, rate: 26, shape: { type: 'cone', radius: 60, angle: 0.55 }, dir: Math.PI / 2,
        speed: [240, 400], life: [0.5, 0.7], size: [6, 10], color: [col, light],
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.7))], order: 3 }, 'up')),
      // white glints in the spray
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 10, shape: { type: 'cone', radius: 50, angle: 0.4 }, dir: Math.PI / 2,
        speed: [220, 340], life: [0.3, 0.4], size: [4, 6], color: '#ffffff', stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.5))], order: 4 }, 'up')),
    ];
  },
};
