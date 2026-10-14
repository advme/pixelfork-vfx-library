/** A captured piece breaks apart: a white pop, a ring, a puff of dust, chunks of the piece flying out and dropping, crumbs and a few sharp glints. */
export default {
  name: 'puzzle.capture',
  category: 'puzzle',
  whenToUse: 'A chess or checkers piece is captured or jumped and taken off the board (also a piece knocked out in ludo, backgammon or another board game): play it on the taken piece and tint it with that piece\'s colour; for a piece simply put down use puzzle.place, for a tile cleared in a match-3 use puzzle.match.',
  duration: 0.6, loop: false, tint: '#e8455a',
  tags: ['capture', 'chess', 'checkers', 'take', 'piece', 'board game', 'puzzle', 'break'],
  build(c) {
    const col = c.color('#e8455a');
    const light = c.lighten(col, 0.55);
    // in 3D the ring lies flat on the board where the piece stood (not snapped down to the floor: the board may stand above it)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ring' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.28, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the puff where the piece was
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 10 },
        speed: [60, 140], life: [0.4, 0.55], size: [26, 40], rotation: [0, 6.28], color: '#f1ebe2',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 40), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 2 })),
      // chunks of the piece flying out and dropping (solid tumbling blocks in 3D)
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 10 },
        speed: [220, 420], life: [0.45, 0.6], size: [9, 15], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.gravity(1400), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 3 }, 'box')),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 8 },
        speed: [260, 480], life: [0.3, 0.42], size: [3, 5], color: c.lighten(col, 0.25),
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 4 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 14 },
        speed: [60, 140], life: [0.2, 0.3], size: [12, 18], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
    ];
  },
};
