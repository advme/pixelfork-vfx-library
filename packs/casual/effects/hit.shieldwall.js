/** A blow lands on a raised wooden shield: a warm flash, a chunky thud ring pulsing out, wooden splinters and a few iron sparks bouncing off, and a puff of wood dust. */
export default {
  name: 'hit.shieldwall',
  category: 'hit',
  whenToUse: 'A sword, axe, club or spear strikes a raised wooden shield and is blocked: a shield wall holding, a knight or viking blocking, a hoplite taking a blow in a medieval, historical or RPG fight. Play it on the shield face, once per blow; in 2D set dir (degrees, the way splinters bounce off, default 90 = up), in 3D pass direction away from the shield. For an arrow sticking in the shield use hit.arrow; for metal on metal use hit.metal; for a perfect parry use hit.parry; for an energy shield use hit.shieldzap; when the shield breaks use hit.shieldbreak.',
  duration: 0.6, loop: false, tint: '#ffc96b',
  tags: ['shield', 'block', 'shield wall', 'wood', 'thud', 'knight', 'viking', 'medieval', 'hit'],
  build(c) {
    const col = c.color('#ffc96b');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.25))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 80, rotation: [0, 0.8], color: '#fffaf0',
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 5 }),
      // the thud: a bold ring, then a wider faint one
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.05, count: 1 }], life: 0.26, size: 170, color: c.darken(col, 0.15),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 2 }),
      // wooden splinters bouncing off the shield
      c.sys(c.chunks(c.spray({ tex: 'shard', blend: 'normal', bursts: [{ count: [7, 9] }], dir, shape: { type: 'cone', radius: 8, angle: 0.8 },
        speed: [220, 480], life: [0.4, 0.58], size: [7, 13], rotation: [0, 6.28], color: ['#c48a52', '#7a4d2a'],
        behaviors: [c.gravity(1400), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 4 }), 'plank')),
      // a few sparks off the iron rim
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [7, 9] }], dir, shape: { type: 'cone', radius: 4, angle: 0.7 },
        speed: [350, 700], life: [0.15, 0.3], size: [3, 5], color: ['#ffffff', light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1200), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.4))], order: 5 })),
      // wood dust
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 10 },
        speed: [40, 110], life: [0.35, 0.5], size: [24, 36], rotation: [0, 6.28], color: '#e6cfa8',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.5, 0.5], [0, 1]]))], order: 0 })),
    ];
  },
};
