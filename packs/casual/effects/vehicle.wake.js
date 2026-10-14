/** A boat's wake: white foam spreading on the water behind it, and spray thrown up at the bow. Loops until stopped. */
export default {
  name: 'vehicle.wake',
  category: 'vehicle',
  whenToUse: 'A boat, jet ski, surfboard or swimming creature moves through water. Follow the back of the hull at the water line; stop it when it stops. For a single splash use move.splash.',
  duration: 1, loop: true, tint: '#ffffff',
  tags: ['boat', 'wake', 'water', 'foam', 'jetski', 'ship', 'sea', 'island', 'vehicle'],
  build(c) {
    const col = c.color('#ffffff');
    // 3D: foam lies on the water where it was left (not snapped to the ground: the water is above it)
    const foam = (p) => (c.is3d ? c.sys(c.flat(p, { snap: false })) : c.sys(p));
    return [
      foam({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 22, shape: { type: 'circle', radius: 12 },
        speed: [20, 50], life: [1.0, 1.6], size: [22, 34], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(-0.5, 0.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.5, 0.5], [0, 1]]))], order: 1 }),
      foam({ tex: 'ring', blend: 'normal', loop: true, world: true, rate: 4, shape: { type: 'circle', radius: 6 },
        speed: 0, life: [1.0, 1.4], size: [30, 40], color: c.darken(col, 0.05),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [1, 2.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 0 }),
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, world: true, rate: 26, shape: { type: 'cone', radius: 10, angle: 0.5 },
        speed: [160, 300], life: [0.35, 0.55], size: [3, 6], color: [col, '#cfeeff'],
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.6))], order: 2 }, 'up')),
    ];
  },
};
