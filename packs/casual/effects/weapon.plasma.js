/** A plasma shot: a fat glowing ball with a crackling halo of sparks flies off from a muzzle flare, a short glow trailing behind it. */
export default {
  name: 'weapon.plasma',
  category: 'weapon',
  whenToUse: 'A plasma gun, ion cannon, charged blaster or alien weapon fires a slow, heavy ball of energy (sci-fi shooters, space shmups, robot bosses): play it at the barrel with dir in 2D (degrees, 0 = right, 90 = up) or direction in 3D; for a thin, fast bolt use weapon.laser, and for the impact use hit.laser.',
  duration: 0.6, loop: false, tint: '#3dff9e',
  tags: ['plasma', 'blaster', 'shot', 'energy ball', 'sci-fi', 'space', 'shmup', 'weapon'],
  build(c) {
    const col = c.color('#3dff9e');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    // everything that travels with the ball is launched with it at t = 0 (emitters do not move)
    const v = 640;
    const shot = (p) => c.sys(c.spray(Object.assign({ blend: 'add', dir, shape: { type: 'cone', radius: 1, angle: 0.003 }, speed: v }, p)));
    // the halo sparks flicker on and off as they ride along
    const flicker = () => c.sizeOverLife(c.curve([[0, 0.2], [0.08, 1], [0.16, 0.25], [0.27, 1.1], [0.37, 0.15], [0.48, 1], [0.58, 0.3], [0.7, 0.95], [0.82, 0.2], [0.92, 0.8], [1, 0]]));
    return [
      // muzzle flare
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 100, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 74, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.shrink())], order: 4 }),
      // a few short sparks kicked out of the barrel
      c.sys(c.spray({ tex: 'glow', blend: 'add', world: true, dir, bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 3, angle: 0.55 },
        speed: [150, 380], life: [0.12, 0.25], size: [3, 5], color: light, stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 5 })),
      // the short trail: launched with the ball but a little slower, so it strings out behind it; each piece is a
      // short streak (about 70 px), so together they make one smooth comet tail (faded in, so it never reaches back into the gun)
      shot({ tex: 'glow', bursts: [{ count: 8 }], speed: [v * 0.8, v * 0.97], life: 0.5, size: [18, 28], color: [col, light], stretch: { speed: 0.003, length: 1.2 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.15, 1], [1, 0.5]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.18], [1, 0.5], [0, 1]]))], order: 2 }),
      // the ball: a fat wobbling glow, a solid bright body inside it and a white-hot core
      shot({ tex: 'glow', bursts: [{ count: 1 }], life: 0.55, size: 74, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.08, 1.12], [0.25, 0.92], [0.45, 1.06], [0.65, 0.93], [0.85, 1.02], [1, 0.6]])), c.colorOverLife(c.fade(0.8))], order: 3 }),
      shot({ tex: 'glow', bursts: [{ count: 1 }], life: 0.55, size: 44, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.7], [0.1, 1], [0.3, 0.9], [0.5, 1.05], [0.7, 0.92], [1, 0.7]])), c.colorOverLife(c.fade(0.8))], order: 4 }),
      shot({ tex: 'glow', bursts: [{ count: 1 }], life: 0.55, size: 26, color: '#ffffff',
        behaviors: [c.colorOverLife(c.fade(0.8))], order: 6 }),
      // the crackling halo: sparks and little bolts riding with the ball, circling its path and flickering
      shot({ tex: 'spark', bursts: [{ count: [7, 9] }], shape: { type: 'cone', radius: 20, thickness: 0, angle: 0.003 }, life: [0.42, 0.55], size: [12, 20],
        rotation: [0, 6.28], color: ['#ffffff', light], behaviors: [c.orbit(9), c.spin(-12, 12), flicker()], order: 7 }),
      shot({ tex: 'bolt', bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: 24, thickness: 0, angle: 0.003 }, life: [0.38, 0.52], size: [14, 20],
        rotation: [-3.14, 3.14], color: light, behaviors: [c.orbit(-7), flicker()], order: 7 }),
    ];
  },
};
