/** An asteroid shot to pieces: a hot white flash, rock chunks flying straight out and tumbling (no gravity in space), a puff of grey dust and glowing embers. */
export default {
  name: 'hit.asteroid',
  category: 'hit',
  whenToUse: 'An asteroid, space rock, meteor or comet is shot and breaks apart in a space shooter or asteroid-mining game: play it where the rock was, once per rock destroyed (tint it for icy or crystal asteroids); for a rock mined with a pickaxe on the ground use gather.stone, for a crate or wall breaking use hit.block.',
  duration: 0.6, loop: false, tint: '#a38b78',
  tags: ['asteroid', 'rock', 'space', 'shooter', 'break', 'debris', 'meteor', 'destroy'],
  build(c) {
    const col = c.color('#a38b78');
    const ember = '#ffb04a';
    return [
      // the flash and a star glint
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 130, color: '#fff1d6',
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 120, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]]))], order: 6 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 150, color: c.lighten(col, 0.6),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 4 }),
      // rock chunks: no gravity in space, they fly straight, slow down a little and shrink away
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 11] }], shape: { type: 'circle', radius: 12 },
        speed: [160, 380], life: [0.45, 0.62], size: [8, 15], rotation: [0, 6.28], color: [col, c.darken(col, 0.35)],
        behaviors: [c.speedOverLife(c.decel(0.35)), c.spin(-8, 8), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 2 }, 'shard')),
      // grey dust
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 14 },
        speed: [50, 140], life: [0.4, 0.6], size: [26, 42], rotation: [0, 6.28], color: c.lighten(col, 0.35),
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.55, 0.5], [0, 1]]))], order: 1 })),
      // small chips
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 8 },
        speed: [220, 480], life: [0.3, 0.5], size: [3, 5], color: c.darken(col, 0.2),
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.6))], order: 3 })),
      // glowing embers from the hot core
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 6, thickness: 0 },
        speed: [280, 560], life: [0.18, 0.32], size: [3, 6], color: ['#ffffff', ember], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4))], order: 4 })),
    ];
  },
};
