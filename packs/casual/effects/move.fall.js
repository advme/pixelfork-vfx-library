/** Falling into a pit: a dust ring kicks out round the edge, puffs billow up off the rim, and stones, grit and dust streaks are pulled down into the hole, shrinking as they drop away. */
export default {
  name: 'move.fall',
  category: 'move',
  whenToUse: 'A character or object falls into a pit, hole, trapdoor, well or crevasse and drops out of sight: a trapdoor opening under the player, falling off the edge of a dungeon floor, a collapsing floor tile, a hole in a platformer or endless runner. Play it once on the ground at the hole the moment they drop; tint it for the floor (sand, snow, stone). For a trap snapping shut use world.trap; for landing at the bottom use move.land; for a platform crumbling away use world.crumble.',
  duration: 0.75, loop: false, anchor: 'feet', tint: '#cdb592',
  tags: ['fall', 'pit', 'trapdoor', 'hole', 'drop', 'dungeon', 'platformer', 'dust'],
  build(c) {
    const col = c.color('#cdb592');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the rim of the hole: a line along the ground in 2D, a circle on the floor in 3D
    const rim = (r, w) => (c.is3d ? { type: 'circle', radius: r, thickness: 0 } : { type: 'rect', w, h: 0 });
    // the mouth of the hole: an area on the floor in 3D, the same line in 2D
    const mouth = c.is3d ? { type: 'rect', w: 70, h: 70, thickness: 1 } : { type: 'rect', w: 76, h: 0 };
    return [
      // the dust ring kicked out round the edge
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.4, size: 150, color: c.lighten(col, 0.45),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // puffs billowing up off the rim
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 10] }], shape: rim(42, 100),
        speed: c.is3d ? [40, 90] : 0, life: [0.45, 0.65], size: [26, 40], rotation: [0, 6.28], color: [c.lighten(col, 0.3), col],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 70), c.limitSpeed(70, 1), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.55, 0.5], [0, 1]]))], order: 1 })),
      // a puff swallowed down the hole: it sinks and shrinks away
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.04, count: [4, 5] }], shape: mouth,
        speed: 0, life: [0.4, 0.55], size: [30, 44], rotation: [0, 6.28], color: c.darken(col, 0.15),
        behaviors: [c.force(0, -900), c.limitSpeed(160, 1), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.8], [0.3, 1], [1, 0.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.6, 0.5], [0, 1]]))], order: 2 })),
      // stones pulled down into the pit, shrinking as they fall away
      c.sys(c.chunks(c.ground({ tex: 'square', blend: 'normal', bursts: [{ count: [6, 8] }, { time: 0.08, count: [3, 4] }], shape: mouth,
        speed: 0, life: [0.5, 0.7], size: [8, 14], rotation: [0, 6.28], color: [c.darken(col, 0.3), c.darken(col, 0.5)],
        behaviors: [c.gravity(1500), c.spin(-8, 8), c.sizeOverLife(c.curve([[0, 1], [0.6, 0.7], [1, 0.2]])), c.colorOverLife(c.fade(0.7))], order: 3 }), 'box')),
      // grit and dust streaks rushing down after them (stretched, so each grain leaves a short line behind it); streaks
      // trail back UP toward the floor, so they start a little inside the hole to keep the tails below the floor line
      c.sys(c.ground({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }, { time: 0.1, count: [4, 6] }], shape: mouth, offset: [0, -10],
        speed: 0, life: [0.35, 0.5], size: [3, 5], color: c.darken(col, 0.35), stretch: { speed: 0.015, length: 1.2 },
        behaviors: [c.gravity(2200), c.limitSpeed(520, 1), c.colorOverLife(c.fade(0.6))], order: 4 })),
    ];
  },
};
