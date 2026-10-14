/** Catching a ledge: a small puff of dust along the edge and pebbles knocked loose tumbling down. */
export default {
  name: 'move.ledge',
  category: 'move',
  whenToUse: 'A character grabs a ledge, hangs from a cliff edge, pulls up onto a platform or lands on a narrow edge or beam that crumbles a little; play it once at the hands (or feet) on the edge, and use move.jump or move.land for landing on open ground.',
  duration: 0.6, loop: false, tint: '#e9dcc7',
  tags: ['ledge', 'grab', 'hang', 'cliff', 'edge', 'pebbles', 'crumble', 'platformer', 'move'],
  build(c) {
    const col = c.color('#e9dcc7');
    const side = (dir) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [2, 3] }], dir, shape: { type: 'cone', radius: 4, angle: 0.3 },
      speed: [70, 140], life: [0.3, 0.45], size: [14, 22], rotation: [0, 6.28], color: [col, c.darken(col, 0.1)],
      behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.15]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 1 });
    // 3D: a small ring of puffs along the floor of the ledge; 2D: puffs out to both sides along the edge
    const puffs = c.is3d
      ? [c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 7] }], shape: { type: 'circle', radius: 6, thickness: 0 },
          speed: [70, 140], life: [0.3, 0.45], size: [14, 22], rotation: [0, 6.28], color: [col, c.darken(col, 0.1)],
          behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.15]])),
            c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 1 }))]
      : [side(0.1), side(Math.PI - 0.1)];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 60, color: '#ffffff',
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0, 1]]))], order: 0 }),
      ...puffs,
      // pebbles knocked loose, tumbling down off the edge
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [5, 7] }], dir: -Math.PI / 2, shape: { type: 'cone', radius: 14, angle: 0.5 },
        speed: [30, 110], life: [0.45, 0.62], size: [3, 6], rotation: [0, 6.28], color: [c.darken(col, 0.3), c.darken(col, 0.45)],
        behaviors: [c.gravity(1100), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 2 }, 'down'), 'box')),
      // a thin sift of dust falling with them
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [2, 3] }], dir: -Math.PI / 2, shape: { type: 'cone', radius: 10, angle: 0.4 },
        speed: [20, 50], life: [0.45, 0.6], size: [10, 16], rotation: [0, 6.28], color: col,
        behaviors: [c.gravity(260), c.limitSpeed(120, 1), c.spin(-2, 2), c.sizeOverLife(c.grow(0.5)),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 1 }, 'down')),
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [4, 6] }], dir: -Math.PI / 2, shape: { type: 'cone', radius: 16, angle: 0.6 },
        speed: [20, 70], life: [0.4, 0.6], size: [2, 3], color: c.darken(col, 0.25),
        behaviors: [c.gravity(700), c.colorOverLife(c.fade(0.6))], order: 2 }, 'down')),
    ];
  },
};
