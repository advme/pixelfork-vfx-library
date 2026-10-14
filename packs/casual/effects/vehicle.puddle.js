/** A wheel tears through a puddle: two big sheets of water thrown up to both sides, a spray of drops and a ripple on the ground. */
export default {
  name: 'vehicle.puddle',
  category: 'vehicle',
  whenToUse: 'A car, bike or kart drives through a puddle, a ford or a shallow stream, or a runner splashes through one at speed: play it once on the ground where the wheel hits the water, and tint it brown for a mud puddle (for something falling into water use move.splash, for a boat moving use vehicle.wake).',
  duration: 0.75, loop: false, anchor: 'feet', tint: '#7fd4ff',
  tags: ['puddle', 'splash', 'water', 'mud', 'wheel', 'car', 'rain', 'vehicle'],
  build(c) {
    const col = c.color('#7fd4ff');
    const light = c.lighten(col, 0.65);
    // an upward half-burst: the upper half-circle in 2D, a wide cone pointed straight up in 3D
    // (c.vol turns a half-circle into a hemisphere that opens sideways in 3D, not upward)
    const upward = (p) => c.sys(c.is3d ? c.spray(Object.assign({}, p, { shape: { type: 'cone', radius: p.shape.radius, angle: 1.2 } }), 'up') : p);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the two sheets go up-left and up-right of the wheel; in 3D they stay on either side as seen by the camera.
    // make() returns fresh options each call (behaviours cannot be shared between systems).
    const sides = (make) => [0.95, Math.PI - 0.95].map((d) => c.sys(Object.assign(make(), { dir: d })));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'normal', bursts: [{ count: 1 }, { time: 0.12, count: 1 }], life: 0.5, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the sheets of water
      ...sides(() => ({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 8, angle: 0.28 },
        speed: [280, 480], life: [0.4, 0.6], size: [26, 42], rotation: [0, 6.28], color: [light, c.lighten(col, 0.35)],
        behaviors: [c.gravity(1100), c.speedOverLife(c.decel(0.35)), c.sizeOverLife(c.curve([[0, 0.5], [0.35, 1], [1, 0.85]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))], order: 2 })),
      // drops flung out of the sheets
      ...sides(() => ({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 13] }], shape: { type: 'cone', radius: 8, angle: 0.38 },
        speed: [380, 700], life: [0.5, 0.75], size: [5, 10], color: [light, col], stretch: { speed: 0.004, length: 1.4 },
        behaviors: [c.gravity(1600), c.colorOverLife(c.fade(0.7)), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 3 })),
      // a few drops straight up off the wheel
      upward({ tex: 'disc', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [180, 360], life: [0.4, 0.6], size: [4, 7], color: [light, col],
        behaviors: [c.gravity(1500), c.colorOverLife(c.fade(0.7))], order: 3 }),
    ];
  },
};
