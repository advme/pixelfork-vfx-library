/** A hard kick or shot of a ball: a punchy flash, speed streaks flying the way the ball goes, and grass kicked up. */
export default {
  name: 'hit.kick',
  category: 'hit',
  whenToUse: 'A ball is kicked, hit or thrown hard: a soccer shot, a golf drive, a baseball hit, a power shot, a volleyball spike. Play it on the ball at the moment of the hit; in 2D set dir (degrees) and in 3D pass direction the way the ball flies. Then follow the ball with move.trail.',
  duration: 0.5, loop: false, tint: '#ffffff',
  tags: ['kick', 'ball', 'soccer', 'football', 'shot', 'sports', 'golf', 'hit'],
  build(c) {
    const col = c.color('#ffffff');
    const dir = c.dir === undefined ? 0 : c.dir;
    return [
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 110, rotation: [0, 0.8], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 120, color: '#fff6d0',
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // streaks rushing off the way the ball goes
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [7, 9] }], dir, shape: { type: 'cone', radius: 18, angle: 0.12 },
        speed: [700, 1000], life: [0.12, 0.2], size: [5, 8], color: col, stretch: { speed: 0.02, length: 1 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 4 })),
      // turf kicked up
      c.sys(c.spray({ tex: 'leaf', blend: 'normal', bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 8, angle: 0.6 },
        speed: [160, 320], life: [0.35, 0.5], size: [6, 10], rotation: [0, 6.28], color: ['#6cc24a', '#3f9a37'],
        behaviors: [c.gravity(1300), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 0 }, 'up')),
    ];
  },
};
