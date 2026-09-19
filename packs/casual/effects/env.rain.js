/** Rain falling over the whole screen, with tiny splashes. Loops until stopped. */
export default {
  name: 'env.rain',
  category: 'env',
  whenToUse: 'A rainy level, a storm, a sad scene. Start it once when the level begins; it covers the whole screen.',
  duration: 4, loop: true, anchor: 'top', tint: '#bfe3ff',
  tags: ['rain', 'storm', 'weather', 'ambient', 'wet', 'sad'],
  build(c) {
    const col = c.color('#bfe3ff');
    if (c.is3d) {
      // 3D: rain falling in the world, with little ripples where it lands
      const y = 600;
      return [
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 2, rate: 420,
          // life: long enough to reach the floor from 600px up (drops accelerate first).
          // stretch: short streaks; in perspective, long ones become beams near the camera.
          speed: 0, life: [0.46, 0.52], size: [3, 5], color: col, stretch: { speed: 0.007, length: 2 },
          behaviors: [c.gravity(9000), c.force(-350, 0), c.limitSpeed(1450, 3), c.colorOverLife(c.fadeInOut(0.05, 0.95))] }, { w: 1300, y })),
        c.sys(Object.assign(c.env3d({ tex: 'ring', blend: 'add', loop: true, prewarm: true, duration: 2, rate: 70,
          speed: 0, life: [0.25, 0.4], size: [18, 30], color: col,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))] }, { w: 1300, y: 1.5 }), { render: 'flat' })),
      ];
    }
    const w = c.view.w + 200;
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 4, rate: 90, shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [60, 60],
        speed: 0, life: [0.8, 1.1], size: [4, 7], color: col,
        stretch: { speed: 0.03, length: 3 },
        behaviors: [c.gravity(6000), c.force(-500, 0), c.limitSpeed(1400, 2), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 4, rate: 60, shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [60, 60],
        speed: 0, life: [1.0, 1.4], size: [3, 5], color: c.darken(col, 0.2),
        stretch: { speed: 0.02, length: 2 },
        behaviors: [c.gravity(4500), c.force(-350, 0), c.limitSpeed(1000, 2), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: 0 }),
    ];
  },
};
