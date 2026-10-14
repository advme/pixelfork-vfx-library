/** A haunted grave: an eerie green glow pooled on the ground, a slow ring pulse, low mist, and ghostly wisps rising slowly out of the earth. Loops until stopped. */
export default {
  name: 'world.grave',
  category: 'world',
  whenToUse: 'A haunted grave, a tombstone, a crypt door, a cursed burial mound or a spooky spot in a graveyard where something might rise. Play it on the ground at the grave and leave it running. For ghost lights over the whole level use env.spirits; for the undead climbing out once use magic.raise.',
  duration: 2, loop: true, anchor: 'feet', tint: '#6dff9e',
  tags: ['grave', 'tombstone', 'graveyard', 'haunted', 'crypt', 'ghost', 'spooky', 'halloween'],
  build(c) {
    const col = c.color('#6dff9e');
    const light = c.lighten(col, 0.55);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the grave plot: a disc on the ground in 3D, a row along the ground in 2D
    const plot = c.is3d ? { type: 'circle', radius: 40 } : { type: 'rect', w: 90, h: 0 };
    // in 3D everything rising out of the plot starts a little above the floor, or the floor slices the sprites off in a hard line
    const lift = c.is3d ? [0, 16] : undefined;
    // fresh behaviour lists per layer: behaviours must not be shared between systems
    const rise = (up, max, wobble) => [c.force(0, up), c.limitSpeed(max, 1), c.noise(0.9, wobble)];
    const fadeInOut = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.2], [a, 0.6], [0, 1]]));
    return [
      // the eerie glow pooled on the ground (lying on the floor in 3D)
      c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: 190, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.06], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.55, 0.5], [0.35, 1]]))], order: 0 })),
      // a slow ring pulse spreading over the ground
      ring({ blend: 'add', loop: true, duration: 2, bursts: [{ count: 1 }], life: 1.6, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.2], [0, 1]]))], order: 1 }),
      // low mist hugging the grave
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 3, shape: plot, offset: lift,
        speed: c.is3d ? [5, 15] : 0, life: [2.2, 3], size: [44, 70], rotation: [0, 6.28], color: [c.mix(col, '#c8d6d0', 0.75), '#b8c8c0'],
        behaviors: [c.force(0, 10), c.limitSpeed(20, 1), c.noise(0.6, 14), c.spin(-0.3, 0.3), fadeInOut(0.3)], order: 1 })),
      // soft ghost lights rising among the wisps
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 3, shape: plot, offset: lift,
        speed: 0, life: [2.2, 3], size: [40, 64], color: col,
        behaviors: rise(50, 45, 26).concat([fadeInOut(0.25)]), order: 2 })),
      // ghostly wisps rising out of the earth (teardrops turned point down, so their tails trail below)
      c.sys(c.ground({ tex: 'drop', blend: 'add', loop: true, rate: 5, shape: plot, offset: lift,
        speed: 0, life: [2.2, 3], size: [14, 22], rotation: Math.PI, color: [light, col],
        behaviors: rise(50, 45, 26).concat([c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [0.45, 0.85], [0.7, 1], [1, 0.4]])), fadeInOut(0.85)]), order: 3 })),
      // tiny motes
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 8, shape: plot, offset: lift,
        speed: 0, life: [1.5, 2.5], size: [3, 5], color: light,
        behaviors: [c.force(0, 70), c.limitSpeed(55, 1), c.noise(2, 16), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]))], order: 4 })),
    ];
  },
};
