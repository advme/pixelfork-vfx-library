/** A piece is set down on the board: a tiny flash, a crisp ring snapping outward in the player's colour, a little ring of dust and a couple of glints. */
export default {
  name: 'puzzle.place',
  category: 'puzzle',
  whenToUse: 'A piece, stone, disc or mark is placed on a board in connect-four, go, gomoku, reversi, tic-tac-toe or checkers (or a chess move lands): play it on the square where it lands on every move, tinted with the player\'s colour; for a piece taken use puzzle.capture, for a reversi disc turning over use puzzle.flip, for dice landing use ui.dice.',
  duration: 0.35, loop: false, tint: '#ffcc33',
  tags: ['place', 'piece', 'board game', 'connect four', 'go', 'reversi', 'tic-tac-toe', 'puzzle'],
  build(c) {
    const col = c.color('#ffcc33');
    const light = c.lighten(col, 0.5);
    // in 3D the ring lies flat on the board (not snapped down to the floor: the board may stand above it)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ring' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 70, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // dust pushed out round the base: a ring of puffs over the board (top-down boards in 2D, the board plane in 3D)
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: 6 }], shape: { type: 'circle', radius: 12, thickness: 0, even: true },
        speed: [80, 130], life: [0.3, 0.38], size: [14, 20], rotation: [0, 6.28], color: '#efe7da',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      // a solid ring, so it shows in any player colour (even black go stones)
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.26, size: 100, color: c.lighten(col, 0.2),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.35], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [2, 3] }], shape: { type: 'circle', radius: 16 },
        speed: [30, 80], life: [0.2, 0.28], size: [10, 14], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 3 })),
    ];
  },
};
