/** A big player swallows a smaller one: its bits and streaks rush into the centre as a glow closes in, then a chomp flash, a ring and a burst of sparks. */
export default {
  name: 'hit.eat',
  category: 'hit',
  whenToUse: 'A big player eats or absorbs a smaller one in an .io or arena game (agar.io, hole.io, a big snake swallowing a small one, a big fish eating a small fish): bits are pulled in and a chomp burst goes off; play it on the eater where the smaller one disappears, tinted with the eaten player\'s colour. For a bite attack that does not swallow use hit.bite; for food dots use pickup.pellet; for things pulled in by a magnet use pickup.vacuum.',
  duration: 0.59, loop: false, tint: '#ff7a3d',
  tags: ['eat', 'swallow', 'absorb', 'devour', 'io', 'agar', 'chomp', 'gulp'],
  build(c) {
    const col = c.color('#ff7a3d');
    const light = c.lighten(col, 0.55);
    // the moment the bits arrive in the middle
    const T = 0.24;
    return [
      // a glow closing in on the eater while it swallows
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: T, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.8], [0.3, 1]]))], order: 0 }),
      // the eaten one's bits rushing into the centre
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [14, 16] }], shape: { type: 'circle', radius: 80, thickness: 0 },
        speed: [-330, -300], life: T, size: [8, 14], color: [col, light],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [0.8, 0.9], [1, 0.2]]))], order: 2 })),
      // speed streaks pulled in with them
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 90, thickness: 0 },
        speed: [-380, -350], life: T, size: [4, 6], color: light, stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.7, 1], [1, 0]]))], order: 1 })),
      // the chomp
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: T, count: 1 }], life: 0.2, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: T, count: 1 }], life: 0.12, size: 80, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: T, count: 1 }], life: 0.3, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: T, count: [8, 10] }], shape: { type: 'circle', radius: 12 },
        speed: [160, 300], life: [0.25, 0.35], size: [10, 16], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ time: T, count: [6, 8] }], shape: { type: 'circle', radius: 10 },
        speed: [200, 380], life: [0.2, 0.3], size: [5, 8], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.shrink())], order: 4 })),
    ];
  },
};
