/** A racket smacks the ball: a quick bright pop, a ring snapping out and thin speed streaks shooting off the way the ball goes. */
export default {
  name: 'hit.racket',
  category: 'hit',
  whenToUse: 'A player swings a racket or bat at a ball or shuttlecock in a racket sport: a tennis serve or return, a badminton smash, a ping-pong shot, a squash or padel hit, a volley. Play it on the ball at the moment of contact; in 2D set dir (degrees, default 0 = right) and in 3D pass direction the way the ball flies. For a ball bouncing off a breakout, pong or pinball paddle use hit.paddle; for a kicked ball use hit.kick; for a golf drive use hit.golf; for a baseball bat use hit.homerun.',
  duration: 0.35, loop: false, tint: '#e4ff3a',
  tags: ['tennis', 'racket', 'badminton', 'ping pong', 'serve', 'smash', 'sports', 'hit'],
  build(c) {
    const col = c.color('#e4ff3a');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    // 2D: start the streaks just in front of the ball, so their tails do not reach back through it
    const fwd = c.is3d ? undefined : [Math.cos(dir) * 18, Math.sin(dir) * 18];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 90, color: '#fffbe0',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 80, rotation: [0, 0.8], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      // the "pock" ring
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 95, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // speed streaks shooting off with the ball
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [6, 8] }], dir, offset: fwd, shape: { type: 'cone', radius: 12, angle: 0.1 },
        speed: [650, 950], life: [0.1, 0.17], size: [4, 6], color: [light, '#ffffff'], stretch: { speed: 0.02, length: 1 },
        behaviors: [c.sizeOverLife(c.grow(0.15)), c.colorOverLife(c.fade(0.4))], order: 4 })),
      // little bits of fuzz knocked off the ball
      c.sys(c.spray({ tex: 'disc', blend: 'add', bursts: [{ count: [5, 7] }], dir, shape: { type: 'cone', radius: 6, angle: 0.55 },
        speed: [180, 360], life: [0.25, 0.35], size: [3, 5], color: col,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.5))], order: 4 })),
    ];
  },
};
