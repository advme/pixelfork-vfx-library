/** A trap springs: a sharp metal snap glint, a puff of dust bursting off the ground, a few rocks kicked up and hot sparks flying. */
export default {
  name: 'world.trap',
  category: 'world',
  whenToUse: 'A hidden trap is triggered in a dungeon, platformer or adventure level (a bear trap snaps shut, a tripwire or floor trap fires, a pit trap or snare springs); play it on the ground where it fires and tint it for the floor (sand, snow, stone), and use world.spikes for spikes shooting out of the floor or explosion.mine for a mine that explodes.',
  duration: 0.75, loop: false, anchor: 'feet', tint: '#cdb592',
  tags: ['trap', 'snap', 'bear trap', 'tripwire', 'dungeon', 'hazard', 'platformer', 'triggered'],
  build(c) {
    const col = c.color('#cdb592');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // a burst up off the floor: the upper half circle on screen in 2D, a wide cone aimed at world up in 3D
    // (c.vol turns a half circle into a hemisphere facing along z, which would throw it sideways)
    const upward = (p, angle) => (c.is3d ? c.spray(Object.assign({}, p, { shape: { type: 'cone', radius: p.shape.radius, angle } }), 'up') : p);
    return [
      // the snap: a quick white flash and a metal glint
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 90, offset: [0, 18], color: '#fff4dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 76, offset: [0, 20], rotation: 0.2, color: '#ffffff',
        behaviors: [c.spin(4), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]]))], order: 4 }),
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.35, size: 140, color: c.lighten(col, 0.45),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the dust puff bursting up and out
      c.sys(upward({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 14, arc: Math.PI },
        speed: [90, 220], life: [0.45, 0.65], size: [26, 42], rotation: [0, 6.28], color: [c.lighten(col, 0.35), col],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 1 }, 1.25)),
      // a few rocks kicked up
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'cone', radius: 14, angle: 0.7 },
        speed: [220, 400], life: [0.5, 0.7], size: [7, 12], rotation: [0, 6.28], color: [c.darken(col, 0.3), c.darken(col, 0.5)],
        behaviors: [c.gravity(1600), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 2 }, 'up'), 'box')),
      // hot sparks from the metal (raised a little so their tails do not dip into the ground)
      c.sys(upward({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 8, arc: Math.PI }, offset: [0, 10],
        speed: [250, 480], life: [0.2, 0.35], size: [3, 5], color: ['#ffffff', '#ffd27a'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.4))], order: 3 }, 1.1)),
    ];
  },
};
