/** A wall jump kick-off: a puff bursts off the wall, a ring flashes flat on the wall, grit flies and a few sparkles pop. */
export default {
  name: 'move.wallkick',
  category: 'move',
  whenToUse: 'A character kicks off a wall in a wall jump, springs off a pillar or a tree trunk, or rebounds off the side of a shaft in a platformer; play it once where the feet leave the wall, aimed away from the wall (in 2D dir in degrees, default 0 = the wall is on the left; in 3D pass direction, the wall\'s outward normal), and use move.wallslide for sliding down the wall before the kick, move.doublejump for a jump in open air.',
  duration: 0.4, loop: false, tint: '#ffffff',
  tags: ['wall jump', 'wall kick', 'kick off', 'rebound', 'platformer', 'puff', 'parkour', 'move'],
  build(c) {
    const col = c.color('#ffffff');
    const dir = c.dir === undefined ? 0 : c.dir;
    // 2D: a ring seen side-on lies along the wall, so the flat ellipse is turned across the kick
    const ring = c.is3d
      ? { tex: 'ring', rotation: 0 }
      : { tex: 'ellipse', rotation: dir + Math.PI / 2 };
    // a little dust pushed along the wall face, both ways
    const along = (a) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [1, 2] }], dir: a, shape: { type: 'cone', radius: 4, angle: 0.3 },
      speed: [60, 120], life: [0.28, 0.38], size: [14, 22], rotation: [0, 6.28], color: col,
      behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.4], [1, 1.1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 1 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 90, color: '#ffffff',
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 0 }),
      c.sys(Object.assign(ring, { blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1.1]])), c.colorOverLife(c.fade(0.2))], order: 2 })),
      // the main puff, bursting out away from the wall
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 9] }], dir, shape: { type: 'cone', radius: 8, angle: 0.6 },
        speed: [160, 300], life: [0.3, 0.42], size: [20, 34], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.08)), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.45], [0.4, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      along(dir + Math.PI / 2), along(dir - Math.PI / 2),
      // grit knocked off the wall
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [5, 6] }], dir, shape: { type: 'cone', radius: 6, angle: 0.55 },
        speed: [180, 320], life: [0.28, 0.4], size: [3, 5], color: c.darken(col, 0.4),
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.6))], order: 3 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 20 },
        speed: [60, 130], life: [0.28, 0.4], size: [12, 18], rotation: [0, 6.28], color: [c.mix(col, '#ffe680', 0.5), '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
