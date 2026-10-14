/** A cute squeak: a tiny soft pop, little cartoon rings rippling out one after another, small stars hopping up and a pair of tiny bubbles. */
export default {
  name: 'hit.squeak',
  category: 'hit',
  whenToUse: 'A squeaky toy is squeezed or a cute soft thing gets a gentle, harmless hit: a rubber duck bopped, a squeaky dog toy bitten, a bath toy or plush squished in a toddler, pet or toy game, a tiny playful poke. Play it on the toy; tint it the toy\'s colour. For a slapstick bonk on the head use hit.bonk; for a furry creature hit use hit.fur; for a plain UI tap use ui.pop.',
  duration: 0.5, loop: false, tint: '#ffd23a',
  tags: ['squeak', 'toy', 'rubber duck', 'cute', 'squeeze', 'kids', 'soft', 'hit'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.55);
    // stars hop up: the upper half-circle in 2D, a wide cone aimed up in 3D
    const up = (p) => c.sys(c.is3d ? c.spray(Object.assign({}, p, { shape: { type: 'cone', radius: p.shape.radius, angle: 1.0 } }), 'up') : p);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 70, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // three little squeak rings rippling out
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.07, count: 1 }, { time: 0.14, count: 1 }], life: 0.22, size: 84, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // tiny squeak lines fanning across the upper half (5 even lines: an arc of 5/4 PI puts the last one at PI)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 5 }], shape: { type: 'circle', radius: 30, thickness: 0, arc: Math.PI * 5 / 4, even: true },
        speed: [200, 230], life: 0.14, size: 4, color: '#ffffff', stretch: { speed: 0.01, length: 3 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 4 }),
      // little stars hopping up, solid so they read on any background
      up({ tex: 'star', blend: 'normal', bursts: [{ time: 0.02, count: [4, 5] }], shape: { type: 'circle', radius: 8, arc: Math.PI },
        speed: [140, 230], life: [0.34, 0.44], size: [11, 16], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(320), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.2], [0.3, 1], [0.8, 1], [1, 0]]))], order: 3 }),
      c.sys(c.vol({ tex: 'ring', blend: 'normal', bursts: [{ time: 0.04, count: 2 }], shape: { type: 'circle', radius: 16 },
        speed: [30, 60], life: [0.38, 0.46], size: [8, 12], color: light,
        behaviors: [c.force(0, 160), c.sizeOverLife(c.curve([[0, 0.3], [0.75, 1], [0.88, 1.25], [1, 0]]))], order: 2 })),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], shape: { type: 'circle', radius: 26 },
        speed: [20, 40], life: [0.2, 0.26], size: [10, 13], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 }),
    ];
  },
};
