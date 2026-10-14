/** A jelly block bursts: a soft glow and ring, wobbly see-through jelly blobs and gummy cubes jiggle out and drop, with sweet droplets and twinkling sparkles. */
export default {
  name: 'explosion.jelly',
  category: 'explosion',
  whenToUse: 'A jelly, gummy or pudding thing bursts into wobbly see-through pieces: a jelly tile or gummy block cleared in a candy puzzle, a gummy bear or jelly cube enemy squashed, a wobbly jelly toy or dessert smashed in a kids or food game. Play it at the centre; tint it the jelly\'s colour. For green slime or goo use explosion.slime; for a candy colour bomb use explosion.candy; for one matched tile use puzzle.match.',
  duration: 0.85, loop: false, tint: '#ff4f8a',
  tags: ['jelly', 'gummy', 'wobbly', 'pudding', 'candy', 'squishy', 'puzzle', 'explosion'],
  build(c) {
    const col = c.color('#ff4f8a');
    const light = c.lighten(col, 0.4);
    const pale = c.lighten(col, 0.7);
    // jiggle: pop in, wobble a few times, shrink away
    const jiggle = () => c.curve([[0, 0.4], [0.1, 1.22], [0.2, 0.88], [0.3, 1.1], [0.42, 0.95], [0.55, 1.02], [0.85, 0.95], [1, 0]]);
    // see-through: the jelly stays at about two thirds alpha, then fades
    const clear = () => c.grad([['#fff', 0], ['#fff', 1]], [[0.72, 0], [0.72, 0.75], [0, 1]]);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 150, color: pale,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.28, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // the big wobbly blobs
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 14 },
        speed: [200, 380], life: [0.6, 0.85], size: [18, 30], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(800), c.sizeOverLife(jiggle()), c.colorOverLife(clear())], order: 2 })),
      // gummy cubes: rounded squares in 2D, little tumbling boxes in 3D
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [6, 7] }], shape: { type: 'circle', radius: 12 },
        speed: [240, 420], life: [0.55, 0.8], size: [12, 18], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(900), c.spin(-7, 7), c.sizeOverLife(jiggle()), c.colorOverLife(clear())], order: 3 }, 'box')),
      // shiny highlights on the jelly
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 14 },
        speed: [180, 320], life: [0.35, 0.5], size: [10, 15], color: pale,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(600), c.sizeOverLife(c.shrink())], order: 4 })),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 10 },
        speed: [300, 520], life: [0.35, 0.52], size: [5, 8], color: [light, pale],
        behaviors: [c.gravity(1300), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.85], [1, 0]]))], order: 3 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.06, count: [6, 8] }], shape: { type: 'circle', radius: 60 },
        speed: [20, 60], life: [0.4, 0.62], size: [11, 16], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.2], [0.65, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
