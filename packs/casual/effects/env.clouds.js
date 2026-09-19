/** Soft clouds drifting slowly across the top of the screen. Loops until stopped. */
export default {
  name: 'env.clouds',
  category: 'env',
  whenToUse: 'A sky background, a flying level, a calm outdoor scene. Very slow; start it once. Play on the back layer if the game has a DOM scene.',
  duration: 12, loop: true, anchor: 'top', tint: '#ffffff',
  tags: ['clouds', 'sky', 'drift', 'ambient', 'calm', 'background'],
  build(c) {
    const col = c.color('#ffffff');
    if (c.is3d) {
      // 3D: clouds drifting high over the scene
      return [
        c.sys(c.env3d({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 12, rate: 0.7, soft: false,
          speed: 0, life: [18, 26], size: [500, 900], color: [col, c.darken(col, 0.06)],
          behaviors: [c.force(40, 0), c.limitSpeed(45, 2), c.noise(0.15, 20),
            c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.85, 0.1], [0.85, 0.9], [0, 1]]))] }, { w: 3000, y: 800 })),
      ];
    }
    const x0 = -(c.view.w / 2 + 220);
    return [
      c.sys({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 12, rate: 0.35, shape: { type: 'rect', w: 0, h: 260 }, dir: 0, offset: [x0, -150],
        speed: 0, life: [14, 20], size: [220, 360], color: [col, c.darken(col, 0.06)],
        behaviors: [c.force(40, 0), c.limitSpeed(38, 2), c.noise(0.15, 20),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.1], [0.9, 0.9], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 12, rate: 0.5, shape: { type: 'rect', w: 0, h: 300 }, dir: 0, offset: [x0, -180],
        speed: 0, life: [18, 26], size: [120, 200], color: c.darken(col, 0.1),
        behaviors: [c.force(25, 0), c.limitSpeed(22, 2), c.noise(0.15, 16),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.1], [0.6, 0.9], [0, 1]]))], order: -1 }),
    ];
  },
};
