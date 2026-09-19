/** A sandstorm blowing across the screen. Loops until stopped. */
export default {
  name: 'env.sandstorm',
  category: 'env',
  whenToUse: 'A desert level, a dust storm, a windy wasteland. In 2D it blows left to right (dir 180 reverses). In 3D it blows along the ground: direction: [x, y, z], or dir as a compass heading (0 = +X, 90 = -Z).',
  duration: 3, loop: true, anchor: 'center', tint: '#e2c58a',
  tags: ['sandstorm', 'desert', 'wind', 'dust', 'storm', 'ambient'],
  build(c) {
    const col = c.color('#e2c58a');
    const dir = c.dir === undefined ? 0 : c.dir;
    const sign = Math.cos(dir) >= 0 ? 1 : -1;
    if (c.is3d) {
      // 3D: sand streaming across the ground through the whole area, along a compass heading
      const blow = c.heading(0);
      return [
        c.sys(c.env3d({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 3, rate: 26,
          speed: 0, life: [1.6, 2.4], size: [120, 220], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
          behaviors: [c.wind(blow, 1500), c.limitSpeed(650, 2), c.noise(1, 30), c.spin(-1, 1),
            c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.2], [0.4, 0.7], [0, 1]]))] }, { w: 1500, y: 55 })),
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 3, rate: 70,
          speed: 0, life: [1.0, 1.6], size: [3, 6], color: c.lighten(col, 0.3), stretch: { speed: 0.02, length: 2 },
          behaviors: [c.wind(blow, 2500), c.limitSpeed(1000, 2), c.noise(2, 20), c.colorOverLife(c.fadeInOut(0.1, 0.8))] }, { w: 1500, y: 40 })),
      ];
    }
    const h = c.view.h + 200, x0 = -sign * (c.view.w / 2 + 160);
    return [
      c.sys({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 3, rate: 18, shape: { type: 'rect', w: 0, h }, dir, offset: [x0, 0],
        speed: 0, life: [1.6, 2.4], size: [90, 160], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
        behaviors: [c.force(sign * 1500, 0), c.limitSpeed(700, 2), c.noise(1, 30), c.spin(-1, 1),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.2], [0.45, 0.7], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 3, rate: 40, shape: { type: 'rect', w: 0, h }, dir, offset: [x0, 0],
        speed: 0, life: [1.0, 1.6], size: [3, 6], color: c.lighten(col, 0.3),
        stretch: { speed: 0.02, length: 2 },
        behaviors: [c.force(sign * 2500, 0), c.limitSpeed(1100, 2), c.noise(2, 20), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 1 }),
    ];
  },
};
