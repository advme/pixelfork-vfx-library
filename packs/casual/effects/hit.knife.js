/** A knife thunks into wood: a sharp white glint and a few hot steel sparks, a quick ring, wooden splinters and chips flying back out and a puff of sawdust. */
export default {
  name: 'hit.knife',
  category: 'hit',
  whenToUse: 'A thrown knife, axe, dart or shuriken sticks into a wooden target, log, board or wall in a knife-throwing game (Knife Hit style) or a target game: play it where the blade went in, set dir toward the side it came from (degrees, default -90 = down, for knives thrown up from below; direction: [x, y, z] in 3D) and tint it the wood colour. For an arrow or crossbow bolt use hit.arrow; for a knife hitting another knife or metal use hit.metal.',
  duration: 0.5, loop: false, tint: '#c8894a',
  tags: ['knife', 'throw', 'dart', 'axe', 'wood', 'splinter', 'target', 'hit'],
  build(c) {
    const col = c.color('#c8894a');
    const light = c.lighten(col, 0.4);
    const deep = c.darken(col, 0.35);
    const dir = c.dir === undefined ? -Math.PI / 2 : c.dir;
    return [
      // a puff of sawdust
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: 3 }], shape: { type: 'circle', radius: 6 },
        speed: [30, 80], life: [0.3, 0.45], size: [18, 26], rotation: [0, 6.28], color: c.lighten(col, 0.6),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.4, 0.5], [0, 1]]))], order: 0 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 70, color: '#fff3d6',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 64, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0))], order: 2 }),
      // wood chips
      c.sys(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 6, angle: 0.9 },
        speed: [120, 300], life: [0.25, 0.4], size: [4, 7], rotation: [0, 6.28], color: col,
        behaviors: [c.gravity(1000), c.spin(-10, 10), c.colorOverLife(c.fade(0.6))], order: 3 })),
      // splinters flying back out of the cut
      c.sys(c.chunks(c.spray({ tex: 'shard', blend: 'normal', bursts: [{ count: [7, 9] }], dir, shape: { type: 'cone', radius: 4, angle: 0.75 },
        speed: [200, 420], life: [0.35, 0.5], size: [9, 15], rotation: [0, 6.28], color: [light, deep],
        behaviors: [c.gravity(1400), c.spin(-14, 14), c.colorOverLife(c.fade(0.7))], order: 4 }), 'plank')),
      // hot sparks off the steel
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 3, angle: 0.9 },
        speed: [300, 560], life: [0.12, 0.22], size: [4, 6], color: ['#fff6c8', '#ffc94d'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(600), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 5 })),
      // the sharp glint
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 72, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0]]))], order: 5 }),
    ];
  },
};
