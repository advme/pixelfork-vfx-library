/** Scorching heat: faint shimmering wisps waver up from the ground through a warm haze, with sunlit dust motes hanging in the air. Loops until stopped. */
export default {
  name: 'env.heat',
  category: 'env',
  whenToUse: 'Scorching heat (a desert at noon, a hot summer day, a sun-baked road or wasteland, a heatwave, the ground near a volcano or a furnace); play it once without a position (rising from the bottom of the screen in 2D, from the ground around the camera in 3D) and use env.sandstorm for blowing sand, env.embers for glowing embers or env.dust for plain floating dust.',
  duration: 6, loop: true, anchor: 'bottom', tint: '#ffb35c',
  tags: ['heat', 'hot', 'desert', 'summer', 'heat haze', 'shimmer', 'sun', 'heatwave'],
  build(c) {
    const col = c.color('#ffb35c');
    const pale = c.lighten(col, 0.5);
    const soft = (a, inT, outT) => c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, inT], [a, outT], [0, 1]]);
    // a shimmer wisp: a tall, faint stretched glow rising slowly while it wavers from side to side
    const wisp = (rate, size, life, v, stretch, wobble, a, order) => ({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate,
      speed: 0, life, size, color: pale, stretch,
      behaviors: [c.force(0, v * 2), c.limitSpeed(v, 1), c.noise(1.7, wobble), c.colorOverLife(soft(a, 0.3, 0.6))], order });
    const haze = (rate, size) => ({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate,
      speed: 0, life: [5, 7], size, color: col,
      behaviors: [c.force(0, 6), c.limitSpeed(6, 1), c.noise(0.3, 30), c.colorOverLife(soft(0.14, 0.35, 0.65))], order: 0 });
    const motes = (rate, size) => ({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate,
      speed: [2, 8], life: [4, 7], size, color: [pale, '#ffffff'],
      behaviors: [c.force(0, 5), c.noise(0.5, 28), c.colorOverLife(soft(0.8, 0.2, 0.8))], order: 3 });
    if (c.is3d) {
      return [
        c.sys(c.env3d(haze(1.6, [420, 620]), { w: 1300, y: 30 })),
        c.sys(c.env3d(wisp(14, [34, 50], [2.5, 3.2], 100, { speed: 0.01, length: 2.5 }, 16, 0.09, 1), { w: 1200, y: 4 })),
        c.sys(c.env3d(wisp(26, [8, 12], [1.8, 2.4], 120, { speed: 0.012, length: 4 }, 12, 0.3, 2), { w: 1200, y: 4 })),
        c.sys(c.env3d(motes(16, [3, 6]), { w: 1100, y: 80 })),
      ];
    }
    const w = c.view.w + 40, h = c.view.h;
    // the shimmer fills the lower half of the screen, thickest near the ground
    const low = { type: 'rect', w, h: h * 0.5, thickness: 1 };
    return [
      c.sys(Object.assign(haze(1.2, [260, 400]), { shape: { type: 'rect', w, h: 0 } })),
      c.sys(Object.assign(wisp(5, [30, 46], [3, 4], 50, { speed: 0.03, length: 2.5 }, 14, 0.1, 1), { shape: low, offset: [0, h * 0.2] })),
      c.sys(Object.assign(wisp(12, [6, 10], [1.8, 2.6], 90, { speed: 0.06, length: 4 }, 10, 0.32, 2), { shape: low, offset: [0, h * 0.2] })),
      c.sys(Object.assign(motes(7, [2, 4.5]), { shape: { type: 'rect', w: c.view.w, h: h * 0.85, thickness: 1 }, offset: [0, h * 0.45] })),
    ];
  },
};
