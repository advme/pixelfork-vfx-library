/** A piece is promoted: a gold glow and ring at its base, a column of light shooting up over it with a white-hot core, sparkles rising and stars bursting out. */
export default {
  name: 'puzzle.promote',
  category: 'puzzle',
  whenToUse: 'A board-game piece is promoted or crowned: a checkers piece becomes a king, a chess pawn becomes a queen, a shogi piece flips to its promoted side: play it on the piece as it changes; for the player reaching a new rank or league use reward.rankup, for a unit or tower upgrade use world.towerup.',
  duration: 0.9, loop: false, tint: '#ffd23a',
  tags: ['promote', 'king', 'queen', 'crown', 'chess', 'checkers', 'board game', 'puzzle'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the column: one stretched glow creeping down from just under the piece; a stretched sprite trails BACK
    // from its particle, so it stands about 240 px tall over the piece (one smooth beam, not a string of blobs)
    const H = 240;
    const pillar = (p) => c.sys(Object.assign({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 1, angle: 0.001 },
      dir: -Math.PI / 2, speed: 2, offset: [0, -40] }, p));
    // soft lights rising up inside the beam (a rect emitter takes speed 0; a push moves them up)
    const column = (p) => c.sys(Object.assign({ tex: 'glow', blend: 'add', shape: { type: 'rect', w: 0, h: 140 }, offset: [0, 60], speed: 0 }, p));
    const beam = () => c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1.15], [0.25, 1], [0.7, 0.8], [1, 0]]));
    // in 3D the ring lies flat on the board under the piece (not snapped down to the floor: the board may stand above it)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ring' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the gold beam with a white-hot core
      pillar({ life: 0.65, size: 84, color: col, stretch: { speed: 0, length: H / 84 },
        behaviors: [beam(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.08], [0.7, 0.55], [0, 1]]))], order: 2 }),
      pillar({ life: 0.55, size: 28, color: '#ffffff', stretch: { speed: 0, length: H / 28 },
        behaviors: [beam(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.08], [0.8, 0.5], [0, 1]]))], order: 3 }),
      column({ bursts: [{ count: 8 }, { time: 0.12, count: 6 }], life: [0.4, 0.55], size: [26, 36], color: light,
        behaviors: [c.force(0, 160), c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.2], [0.3, 0.6], [0, 1]]))], order: 3 }),
      // sparkles rising round the piece: a ring of them on the board in 3D, a band across the piece in 2D,
      // fired as a short stream so they rise at different heights instead of in one rigid row
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ count: [3, 4], cycle: 5, interval: 0.05 }],
        shape: c.is3d ? { type: 'circle', radius: 30 } : { type: 'rect', w: 70, h: 24, thickness: 1 }, speed: c.is3d ? [20, 60] : 0,
        life: [0.5, 0.7], size: [12, 18], rotation: [0, 0.8], color: light,
        behaviors: [c.force(0, 380), c.limitSpeed(300, 1), c.spin(-2, 2), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 })),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: [6, 7] }], shape: { type: 'circle', radius: 16 },
        speed: [140, 260], life: [0.4, 0.55], size: [12, 18], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.55))], order: 5 })),
    ];
  },
};
