/** Digging underground: a churning mound of dirt with clods and specks spraying up out of it, dust rolling off and the ground rumbling in rings. Loops until stopped. */
export default {
  name: 'move.dig',
  category: 'move',
  whenToUse: 'Something burrows or tunnels under the ground while it moves: a mole, a worm or sandworm, a tunnelling machine, a buried monster sneaking up, a dog digging for a bone, treasure being dug up. Follow the spot on the ground above it; stop it when it surfaces (then play move.emerge). For a single shovel hit use hit.dirt; for a drill boring into rock use gather.drill. Tint it for sand or snow.',
  duration: 1, loop: true, anchor: 'feet', tint: '#8a6a48',
  tags: ['dig', 'burrow', 'tunnel', 'underground', 'mole', 'worm', 'dirt', 'sandworm'],
  build(c) {
    const col = c.color('#8a6a48');
    const dark = c.darken(col, 0.35);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'normal', loop: true, bursts: [{ time: 0, count: 1 }, { time: 0.5, count: 1 }], life: 0.45, size: 90, color: c.lighten(col, 0.3),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 0 }),
      // the mound: dirt blobs re-made all the time, so it churns but always stands there
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 20, shape: c.is3d ? { type: 'circle', radius: 14 } : { type: 'rect', w: 34, h: 0 }, offset: [0, 9],
        speed: 0, life: [0.35, 0.5], size: [20, 30], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
        behaviors: [c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 1 })),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 12, shape: c.is3d ? { type: 'circle', radius: 12, thickness: 0.4 } : { type: 'circle', radius: 12, arc: Math.PI, thickness: 0.5 },
        speed: [30, 80], life: [0.5, 0.75], size: [18, 30], rotation: [0, 6.28], color: c.lighten(col, 0.45),
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 50), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.5, 0.5], [0, 1]]))], order: 2 })),
      // clods thrown up, landing back about when they die
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', loop: true, world: true, rate: 16, shape: { type: 'cone', radius: 10, angle: 0.55 }, dir: Math.PI / 2,
        speed: [260, 430], life: [0.42, 0.58], size: [7, 12], rotation: [0, 6.28], color: [col, dark],
        behaviors: [c.gravity(1600), c.spin(-10, 10), c.colorOverLife(c.fade(0.6))], order: 3 }, 'up'), 'box')),
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, world: true, rate: 30, shape: { type: 'cone', radius: 8, angle: 0.6 }, dir: Math.PI / 2,
        speed: [200, 420], life: [0.3, 0.45], size: [2, 4], color: dark,
        behaviors: [c.gravity(1700), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
    ];
  },
};
