/** A golf drive: a crisp click, a white streak flying off with the ball, and a divot of turf and dirt clods flung up. */
export default {
  name: 'hit.golf',
  category: 'hit',
  whenToUse: 'A golf club hits the ball off the grass or tee: a drive, an iron shot, a chip, a mini-golf putt played hard. Play it at the ball on the ground at the moment of the swing; in 2D set dir (degrees, default a low 20 degrees up to the right) and in 3D pass direction the way the ball flies. Tint it sandy for a bunker shot. For a soccer kick use hit.kick.',
  duration: 0.6, loop: false, anchor: 'feet', tint: '#5cc23e',
  tags: ['golf', 'drive', 'swing', 'divot', 'turf', 'tee', 'sports', 'hit'],
  build(c) {
    const turf = c.color('#5cc23e');
    const dirt = c.mix(turf, '#7a5434', 0.7);
    const dir = c.dir === undefined ? 0.35 : c.dir;
    // 2D: the divot flies higher than the ball (halfway between the ball's line and straight up)
    const lift = (dir + Math.PI / 2) / 2;
    const fwd = c.is3d ? undefined : [Math.cos(dir) * 20, Math.sin(dir) * 20];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 90, color: '#fffbe8',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 70, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
      // the white streak of the ball leaving, with a few thinner ones beside it;
      // they grow as they fly, so their tails never reach back behind the ball
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], dir, offset: fwd, shape: { type: 'cone', radius: 1, angle: 0.01 },
        speed: 1000, life: 0.18, size: 9, color: '#ffffff', stretch: { speed: 0.018, length: 1 },
        behaviors: [c.sizeOverLife(c.grow(0.15)), c.colorOverLife(c.fade(0.4))], order: 5 })),
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [4, 5] }], dir, offset: fwd, shape: { type: 'cone', radius: 10, angle: 0.08 },
        speed: [700, 950], life: [0.1, 0.16], size: [4, 6], color: '#ffffff', stretch: { speed: 0.018, length: 1 },
        behaviors: [c.sizeOverLife(c.grow(0.15)), c.colorOverLife(c.fade(0.4))], order: 4 })),
      // the divot: clods of dirt
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [5, 7] }], dir: lift, shape: { type: 'cone', radius: 6, angle: 0.4 },
        speed: [260, 440], life: [0.45, 0.62], size: [6, 11], rotation: [0, 6.28], color: [dirt, c.darken(dirt, 0.3)],
        behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 3 }, 'up'), 'box')),
      // blades and tufts of grass
      c.sys(c.spray({ tex: 'leaf', blend: 'normal', bursts: [{ count: [7, 9] }], dir: lift, shape: { type: 'cone', radius: 8, angle: 0.55 },
        speed: [200, 380], life: [0.45, 0.6], size: [7, 12], rotation: [0, 6.28], color: [turf, c.darken(turf, 0.25)],
        behaviors: [c.gravity(1200), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 3 }, 'up')),
      // a puff of dust where the club struck (3D: c.ground turns the half-sphere to open upward)
      c.sys(c.ground(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 8, arc: Math.PI },
        speed: [40, 110], life: [0.4, 0.6], size: [20, 32], rotation: [0, 6.28], color: c.lighten(dirt, 0.5),
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 40), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.25]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.45, 0.5], [0, 1]]))], order: 1 }))),
    ];
  },
};
