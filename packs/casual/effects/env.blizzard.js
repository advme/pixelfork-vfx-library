/** A blizzard: dense snow driven sideways by a howling wind, with gusts streaking through. Loops until stopped. */
export default {
  name: 'env.blizzard',
  category: 'env',
  whenToUse: 'A snowstorm: a frozen mountain, an arctic level, a harsh winter survival scene, a snow boss arena, a cold that should feel dangerous. Play it once without a position (whole screen in 2D, the area around the camera in 3D). For gentle snowfall use env.snow.',
  duration: 4, loop: true, anchor: 'top', tint: '#ffffff',
  tags: ['blizzard', 'snowstorm', 'snow', 'wind', 'winter', 'arctic', 'cold', 'storm', 'weather'],
  build(c) {
    const col = c.color('#ffffff');
    if (c.is3d) {
      const y = 480;
      const flakes = (rate, size, speed) => c.sys(c.env3d({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 4, rate,
        speed: 0, life: [(y / speed) * 0.92, y / speed], size, color: col,
        behaviors: [c.gravity(speed * 3), c.force(-speed * 3, 0), c.limitSpeed(speed * 1.6, 1), c.noise(1.2, 30), c.colorOverLife(c.fadeInOut(0.05, 0.92))] }, { w: 1300, y }));
      return [flakes(70, [7, 11], 220), flakes(60, [5, 7], 160)];
    }
    const w = c.view.w + 400;
    const line = (rate, size, life, speed, order) => c.sys({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 4, rate, shape: { type: 'rect', w, h: 0 }, offset: [200, 30],
      speed: 0, life, size, color: col,
      behaviors: [c.gravity(speed * 3), c.force(-speed * 3.5, 0), c.limitSpeed(speed * 1.8, 1), c.noise(1.2, 30), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order });
    return [
      line(36, [8, 12], [2, 3], 260, 2),
      line(44, [5, 7], [2.5, 3.5], 190, 1),
      // gusts: long faint streaks racing across
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 4, rate: 3, shape: { type: 'rect', w: 0, h: c.view.h * 0.9 }, offset: [c.view.w * 0.6, -c.view.h * 0.5],
        speed: 0, life: [0.8, 1.1], size: [5, 8], color: col, stretch: { speed: 0.02, length: 3 },
        behaviors: [c.force(-3000, -300), c.limitSpeed(1400, 1), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.35, 0.2], [0.35, 0.7], [0, 1]]))], order: 3 }),
    ];
  },
};
