/** A thunderstorm: heavy slanted rain, and lightning that cracks down from the sky with a flash every few seconds. Loops until stopped. */
export default {
  name: 'env.storm',
  category: 'env',
  whenToUse: 'A thunderstorm, a stormy night, a dramatic or scary level, bad weather in a day/night cycle. Play it once without a position for the whole screen (2D) or the area around the camera (3D); stop it when the storm passes. For calm rain use env.rain.',
  duration: 5, loop: true, anchor: 'top', tint: '#c6e2ff',
  tags: ['storm', 'thunder', 'lightning', 'rain', 'weather', 'night', 'horror', 'dramatic'],
  build(c) {
    const col = c.color('#c6e2ff');
    // two strikes per 5 s cycle; the first one double-flashes
    const strikes = [{ t: 1.2, x: -0.22 }, { t: 3.9, x: 0.28 }];
    const flashAt = [{ time: 1.2, count: 1 }, { time: 1.34, count: 1 }, { time: 3.9, count: 1 }];
    const flash = (size, offset) => c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 5, bursts: flashAt, life: 0.24, size, offset, color: '#e6f2ff',
      behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.45, 0.25], [0, 1]]))], order: 0 });
    const bolt = (s, x, top, speed, life) => [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 5, bursts: [{ time: s.t, count: 3 }], shape: { type: 'cone', radius: 6, angle: 0.06 }, dir: -Math.PI / 2, offset: [x, top],
        speed, life, size: [8, 12], color: '#ffffff', stretch: { speed: c.is3d ? 0.25 : 0.1, length: 6 },
        behaviors: [c.noise(30, 18), c.colorOverLife(c.fade(0.4))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 5, bursts: [{ time: s.t, count: 2 }], shape: { type: 'cone', radius: 4, angle: 0.04 }, dir: -Math.PI / 2, offset: [x, top],
        speed, life, size: [22, 30], color: col, stretch: { speed: c.is3d ? 0.2 : 0.08, length: 4 },
        behaviors: [c.noise(20, 10), c.colorOverLife(c.fade(0.4))], order: 2 }),
    ];
    if (c.is3d) {
      const y = 600;
      return [
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 2, rate: 650,
          speed: 0, life: [0.42, 0.48], size: [3, 5], color: col, stretch: { speed: 0.007, length: 2 },
          behaviors: [c.gravity(10000), c.force(-900, 0), c.limitSpeed(1600, 3), c.colorOverLife(c.fadeInOut(0.05, 0.95))] }, { w: 1300, y })),
        c.sys(Object.assign(c.env3d({ tex: 'ring', blend: 'add', loop: true, prewarm: true, duration: 2, rate: 110,
          speed: 0, life: [0.25, 0.4], size: [18, 30], color: col,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))] }, { w: 1300, y: 1.5 }), { render: 'flat' })),
        flash(3200, [0, 300]),
        ...bolt(strikes[0], -260, 1000, [2800, 3200], [0.26, 0.32]),
        ...bolt(strikes[1], 320, 1000, [2800, 3200], [0.26, 0.32]),
      ];
    }
    const w = c.view.w + 300, h = c.view.h;
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 4, rate: 150, shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [110, 60],
        speed: 0, life: [0.6, 0.85], size: [4, 7], color: col, stretch: { speed: 0.03, length: 3 },
        behaviors: [c.gravity(7500), c.force(-900, 0), c.limitSpeed(1700, 2), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 4, rate: 90, shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [110, 60],
        speed: 0, life: [0.8, 1.1], size: [3, 5], color: c.darken(col, 0.25), stretch: { speed: 0.02, length: 2 },
        behaviors: [c.gravity(5500), c.force(-700, 0), c.limitSpeed(1200, 2), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: 0 }),
      flash(Math.max(w, h) * 2.2, [0, -h / 2]),
      ...bolt(strikes[0], strikes[0].x * c.view.w, -20, [1600, 2000], [0.3, 0.36]),
      ...bolt(strikes[1], strikes[1].x * c.view.w, -20, [1600, 2000], [0.3, 0.36]),
    ];
  },
};
