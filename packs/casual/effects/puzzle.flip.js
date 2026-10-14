/** A tile flips to a new colour: a pop of that colour, a quick ring, a four-point glint flashing on it, and glints and dots springing off its edge. */
export default {
  name: 'puzzle.flip',
  category: 'puzzle',
  whenToUse: 'A reversi or othello disc is turned to the other colour, or a tile in a flip, lights-out or colour-change puzzle switches colour: play it on each tile as it turns, tinted with its new colour (light enough for a whole row at once); for a piece being put down use puzzle.place, for a playing card turned face up use ui.cardflip, for a tile cleared use puzzle.match.',
  duration: 0.32, loop: false, tint: '#3dd6ff',
  tags: ['flip', 'reversi', 'othello', 'tile', 'turn', 'colour change', 'board game', 'puzzle'],
  build(c) {
    const col = c.color('#3dd6ff');
    const light = c.lighten(col, 0.6);
    // in 3D the ring lies flat on the board (not snapped down to the floor: the board may stand above it)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ring' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.24, size: 100, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // dots springing off the edge (solid, so they still show for a dark tint such as a black reversi disc)
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 12 },
        speed: [140, 220], life: [0.22, 0.3], size: [4, 6], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.shrink())], order: 2 })),
      // the ting: a quick four-point glint on the tile
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.03, count: 1 }], life: 0.2, size: 64, color: '#ffffff',
        behaviors: [c.spin(3), c.sizeOverLife(c.pop(0.3, 0.4))], order: 3 }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.04, count: 4 }], shape: { type: 'circle', radius: 22, thickness: 0, even: true },
        speed: [40, 80], life: [0.24, 0.3], size: [10, 14], rotation: [0, 0.8], color: light,
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 })),
    ];
  },
};
