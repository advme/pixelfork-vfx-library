/** A matched tile pops: a bright square flash, a ring, glossy bits and a few stars. */
export default {
  name: 'puzzle.match',
  category: 'puzzle',
  whenToUse: 'A tile, gem, candy or block is cleared in a match-3, a tile puzzle, a bubble shooter or a sorting game. Play it on each cleared tile (el: the tile, or at its centre); tint it with the tile\'s colour. Cheap enough for a whole cascade at once.',
  duration: 0.55, loop: false, tint: '#ff4f8b',
  tags: ['match', 'match3', 'tile', 'clear', 'gem', 'candy', 'puzzle', 'pop'],
  build(c) {
    const col = c.color('#ff4f8b');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'square', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 64, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [1, 1.35]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
      c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 16 },
        speed: [160, 320], life: [0.35, 0.5], size: [7, 12], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(500), c.spin(-8, 8), c.sizeOverLife(c.shrink())], order: 2 })),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 10 },
        speed: [80, 180], life: [0.35, 0.5], size: [10, 16], rotation: [0, 6.28], color: '#fff6c8',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-4, 4), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
