/** Creeping ground mist: thin pale wisps of ghostly vapour sliding slowly along the floor, a faint eerie glow inside them and cold motes. Loops until stopped. */
export default {
  name: 'env.mist',
  category: 'env',
  whenToUse: 'Creeping ghostly mist at floor level: a haunted crypt, a graveyard path at night, a spooky corridor, a witch\'s swamp, a horror level. Play it once without a position: it creeps along the bottom of the screen (2D, left to right; dir 180 reverses) or over the floor around the camera (3D: direction: [x, y, z], or dir as a compass heading). For a thick soft fog bank use env.fog; for floating ghost lights use env.spirits.',
  duration: 8, loop: true, anchor: 'bottom', tint: '#cfe6f0',
  tags: ['mist', 'ground mist', 'spooky', 'haunted', 'graveyard', 'crypt', 'horror', 'ambient'],
  build(c) {
    const col = c.color('#cfe6f0');
    const dir = c.dir === undefined ? 0 : c.dir;
    const sign = Math.cos(dir) >= 0 ? 1 : -1;
    // fresh behaviour lists per layer: behaviours must not be shared between systems
    const fade = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.3], [a, 0.7], [0, 1]]));
    const motes = (push) => [push, c.noise(1.2, 18), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.75, 1], [1, 0]]))];
    if (c.is3d) {
      // 3D: low wisps rolling over the floor of the whole area, along a compass heading.
      // The bank and its glow lie flat just above the floor (an upright sprite this low would be cut off by the floor in a hard line);
      // their noise is kept small because noise also moves them up and down, and a flat sprite pushed below the floor disappears.
      const blow = c.heading(0);
      return [
        c.sys(c.flat(c.env3d({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 7,
          speed: 0, life: [7, 9], size: [240, 380], rotation: [0, 6.28], color: [col, c.darken(col, 0.12)],
          behaviors: [c.wind(blow, 30), c.limitSpeed(32, 1), c.noise(0.4, 10), c.spin(-0.12, 0.12), fade(0.34)], order: 0 }, { w: 1400, y: 14 }))),
        // thinner wisps standing up out of the bank, high enough that the floor does not slice them
        c.sys(c.env3d({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 10,
          speed: 0, life: [4, 6], size: [60, 110], rotation: [0, 6.28], color: c.lighten(col, 0.25),
          behaviors: [c.wind(blow, 50), c.limitSpeed(48, 1), c.noise(0.7, 16), c.spin(-0.3, 0.3), fade(0.28)], order: 1 }, { w: 1400, y: 40 })),
        c.sys(c.flat(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 3,
          speed: 0, life: [6, 8], size: [180, 280], color: col,
          behaviors: [c.wind(blow, 30), c.limitSpeed(32, 1), c.noise(0.4, 10), fade(0.14)], order: 2 }, { w: 1400, y: 16 }))),
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 14,
          speed: 0, life: [3, 5], size: [4, 7], color: c.lighten(col, 0.5),
          behaviors: motes(c.wind(blow, 40)).concat([c.force(0, 12), c.limitSpeed(40, 1)]), order: 3 }, { w: 1400, y: 40 })),
      ];
    }
    // 2D: a line along the bottom of the screen, wider than the screen so the wisps enter from the side
    const strip = { type: 'rect', w: c.view.w + 400, h: 0 };
    return [
      c.sys({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 4, shape: strip, offset: [0, 34],
        speed: 0, life: [7, 9], size: [130, 210], rotation: [0, 6.28], color: [col, c.darken(col, 0.12)],
        behaviors: [c.force(sign * 30, 0), c.limitSpeed(30, 1), c.noise(0.4, 30), c.spin(-0.12, 0.12), fade(0.28)], order: 0 }),
      // thinner, quicker wisps creeping through the bank
      c.sys({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 6, shape: strip, offset: [0, 26],
        speed: 0, life: [4, 6], size: [70, 120], rotation: [0, 6.28], color: c.lighten(col, 0.25),
        behaviors: [c.force(sign * 48, 0), c.limitSpeed(46, 1), c.noise(0.7, 20), c.spin(-0.3, 0.3), fade(0.24)], order: 1 }),
      // a faint ghostly glow inside the mist
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 2, shape: strip, offset: [0, 30],
        speed: 0, life: [6, 8], size: [110, 170], color: col,
        behaviors: [c.force(sign * 30, 0), c.limitSpeed(30, 1), c.noise(0.4, 30), fade(0.12)], order: 2 }),
      // cold motes drifting with it
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 5, shape: strip, offset: [0, 40],
        speed: 0, life: [3, 5], size: [3, 5], color: c.lighten(col, 0.5),
        behaviors: motes(c.force(sign * 40, 12)).concat([c.limitSpeed(40, 1)]), order: 3 }),
    ];
  },
};
