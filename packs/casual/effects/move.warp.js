/** A hyperspace jump: light streaks rush in and collapse into a point, a white flash and a star-shaped flare, a streak zips away, sparkles are left behind. */
export default {
  name: 'move.warp',
  category: 'move',
  whenToUse: 'A spaceship jumps to hyperspace, a robot or hero warps out, a portal swallows someone, a level-exit jump in a space game: play it where the ship or character was, with dir in 2D (degrees, default 90 = up, the way it leaves) or direction in 3D; for a short magic blink in and out use move.teleport.',
  duration: 1.1, loop: false, tint: '#7fc8ff',
  tags: ['warp', 'hyperspace', 'jump', 'space', 'sci-fi', 'ship', 'vanish', 'exit'],
  build(c) {
    const col = c.color('#7fc8ff');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    // the collapse ends and the flash fires at 0.3 s
    const t = 0.3;
    return [
      // streaks rushing in from all around: 120 px out, moving inward at 450 px/s, they reach the centre as they die
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 14] }, { time: 0.04, count: [8, 10] }], shape: { type: 'circle', radius: 120, thickness: 0 },
        speed: -450, life: 0.26, size: [5, 8], color: ['#ffffff', light], stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.7, 1], [1, 0]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.3], [1, 1]]))], order: 3 })),
      // the gathering glow swells, then collapses into a point
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: t, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.75, 1], [1, 0.05]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.4, 0], [0.9, 0.7], [1, 1]]))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: t, size: 46, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.8, 1], [1, 0.1]]))], order: 2 }),
      // the flash, a star flare and a ring
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: 1 }], life: 0.18, size: 230, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: t, count: 1 }], life: 0.24, size: 180, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 0]]))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: t, count: 1 }], life: 0.32, size: 190, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      // the jump: a line of light shoots out along dir, led by a bright head. The line is a particle drifting
      // slowly BACKWARD, so its streak reaches FORWARD from the warp point; it grows with its size.
      c.sys(c.spray({ tex: 'glow', blend: 'add', dir, bursts: [{ time: t, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 },
        speed: -20, life: 0.22, size: 20, color: col, stretch: { speed: 0.02, length: 13 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.05], [0.4, 1], [1, 1]])), c.colorOverLife(c.fade(0.4))], order: 6 })),
      c.sys(c.spray({ tex: 'disc', blend: 'add', dir, bursts: [{ time: t, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 },
        speed: -20, life: 0.18, size: 6, color: '#ffffff', stretch: { speed: 0.02, length: 43 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.05], [0.45, 1], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 7 })),
      c.sys(c.spray({ tex: 'glow', blend: 'add', dir, bursts: [{ time: t, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 },
        speed: 3000, life: 0.1, size: 34, color: '#ffffff',
        behaviors: [c.colorOverLife(c.fade(0.6))], order: 7 })),
      // sparkles left hanging where it was
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: t + 0.02, count: [10, 13] }], shape: { type: 'circle', radius: 16 },
        speed: [40, 140], life: [0.45, 0.75], size: [8, 14], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.noise(2, 12), c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: t + 0.02, count: [10, 12] }], shape: { type: 'circle', radius: 20 },
        speed: [20, 90], life: [0.5, 0.75], size: [3, 5], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.noise(1.5, 14), c.colorOverLife(c.fadeInOut(0.1, 0.5))], order: 4 })),
    ];
  },
};
