/** A helicopter or drone downwash: dust rolling out along the ground, wind lines and rings pulsing outward, leaves and grit spinning away. Loops until stopped. */
export default {
  name: 'vehicle.rotorwash',
  category: 'vehicle',
  whenToUse: 'A helicopter, drone, hovercraft or jet hovers low or lands and its rotor wind blasts the ground: play it on the ground under the rotor, keep it on the ground below the craft while it hovers (not up at the craft itself) and stop it when it lifts away (for one heavy landing use move.land, for a spinning wind attack magic.tornado).',
  duration: 1, loop: true, anchor: 'feet', tint: '#e3d3b4',
  tags: ['helicopter', 'drone', 'downwash', 'hover', 'landing', 'dust', 'wind', 'vehicle'],
  build(c) {
    const col = c.color('#e3d3b4');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // 3D: one ring of particles rolling outward over the floor in every direction.
    // 2D: the same seen from the side, two low sprays out to the left and the right.
    // make() returns fresh options each call (behaviours cannot be shared between systems).
    const outward = (make, lift, rate) => (c.is3d
      ? [c.sys(c.ground(Object.assign(make(), { rate, shape: { type: 'circle', radius: 22, thickness: 0 } })))]
      : [lift, Math.PI - lift].map((d) => c.sys(Object.assign(make(), { rate: rate / 2, dir: d, shape: { type: 'cone', radius: 4, angle: 0.18 } }))));
    return [
      // the dust blowing out along the ground
      ...outward(() => ({ tex: 'puff', blend: 'normal', loop: true, world: true,
        speed: [200, 340], life: [0.6, 0.9], size: [22, 36], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.5, 0.5], [0, 1]]))], order: 1 }), 0.06, 36),
      // fast lines of wind racing out
      ...outward(() => ({ tex: 'glow', blend: 'add', loop: true,
        speed: [380, 520], life: [0.18, 0.28], size: [3, 4], color: c.lighten(col, 0.7), stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 3 }), 0.04, 18),
      // leaves tossed and tumbling away
      ...outward(() => ({ tex: 'leaf', blend: 'normal', loop: true, world: true,
        speed: [180, 300], life: [0.6, 0.9], size: [8, 12], rotation: [0, 6.28], color: ['#8bc34a', '#c9a24a'],
        behaviors: c.is3d
          ? [c.speedOverLife(c.decel(0.3)), c.force(0, 180), c.noise(2, 16), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))]
          : [c.gravity(500), c.noise(2, 16), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 4 }), 0.4, 8),
      // grit skittering over the ground
      ...outward(() => ({ tex: 'disc', blend: 'normal', loop: true, world: true,
        speed: [250, 420], life: [0.3, 0.5], size: [2.5, 4], color: c.darken(col, 0.45),
        behaviors: c.is3d ? [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.6))] : [c.gravity(900), c.colorOverLife(c.fade(0.6))], order: 2 }), 0.2, 14),
      // rings of wind pressed into the dust, three a second
      ring({ blend: 'normal', loop: true, duration: 1, bursts: [{ time: 0, count: 1 }, { time: 0.33, count: 1 }, { time: 0.66, count: 1 }], life: 0.6, size: 230, color: c.lighten(col, 0.3),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0.35, 0.5], [0, 1]]))], order: 0 }),
    ];
  },
};
