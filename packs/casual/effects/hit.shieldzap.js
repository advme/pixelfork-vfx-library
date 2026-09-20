/** An electric blue shield hit: a white-blue flash, a rippling shield glow, crackling arcs, sparks and glints. */
export default {
  name: 'hit.shieldzap',
  category: 'hit',
  whenToUse: 'A shield, force field or energy barrier takes a hit: an energy bolt striking a shield, a shocking blow blocked, an electric barrier zapped.',
  duration: 0.7,
  loop: false,
  tint: '#3fb8ff',
  tags: ['shield', 'electric', 'zap', 'spark', 'barrier', 'energy', 'block', 'hit'],
  build(c) {
    const col = c.color('#3fb8ff');
    const light = c.lighten(col, 0.6);
    const soft = c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.35, 0.5], [0, 1]]);
    return [
      // wide shield glow, low alpha, swells and fades
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.9]])), c.colorOverLife(soft)], order: 0 }),
      // ripple ring across the shield surface
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // second ring lying flat on the floor for depth
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ time: 0.04, count: 1 }], life: 0.4, size: 180, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 })),
      // bright impact flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: [80, 100], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      // main sparks flying outward
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 20] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [300, 700], life: [0.25, 0.5], size: [6, 10], color: [light, col],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(400), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 })),
      // crackling arcs: short, jittery, fast streaks in two pulses
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [6, 9] }, { time: 0.1, count: [4, 6] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [250, 550], life: [0.14, 0.28], size: [4, 6], color: ['#ffffff', light],
        stretch: { speed: 0.02, length: 1.8 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.noise(10, 40), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 5 })),
      // electric glints twinkling around the impact
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [6, 9] }, { time: 0.12, count: [3, 5] }], shape: { type: 'circle', radius: 42 },
        speed: 0, life: [0.25, 0.45], size: [14, 24], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.spin(-4, 4), c.sizeOverLife(c.pop(0.25, 0.4)), c.colorOverLife(c.fade(0.6))], order: 4 })),
      // small bright dots lingering and drifting
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 20 },
        speed: [60, 180], life: [0.3, 0.55], size: [3, 6], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.noise(4, 20), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 3 })),
    ];
  },
};
