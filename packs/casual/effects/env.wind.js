/** Wind: pale streaks and specks of dust race across the scene in gusts. Loops until stopped. */
export default {
  name: 'env.wind',
  category: 'env',
  whenToUse: 'A windy place or a strong breeze: a cliff top, a sailing scene, a speed or flying level, a storm coming, a desert, a dramatic standoff. Play it once without a position. For a sandstorm use env.sandstorm; for snow in wind use env.blizzard.',
  duration: 3, loop: true, anchor: 'center', tint: '#ffffff',
  tags: ['wind', 'breeze', 'gust', 'air', 'windy', 'flying', 'speed', 'weather'],
  build(c) {
    const col = c.color('#ffffff');
    // streaks enter on the left edge and race right; in 3D, on the sheet facing the camera
    const h = c.is3d ? 500 : c.view.h, left = c.is3d ? -450 : -c.view.w * 0.6;
    const edge = { type: 'rect', w: 0, h: h * 0.9 };
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 3, rate: 7, shape: edge, offset: [left, 0],
        speed: 0, life: [0.9, 1.3], size: c.is3d ? [7, 11] : [4, 7], color: col, stretch: { speed: 0.025, length: 3 },
        behaviors: [c.force(2600, 60), c.limitSpeed(1300, 1), c.noise(0.6, 20), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.2], [0.45, 0.7], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 3, rate: 12, shape: edge, offset: [left, 0],
        speed: 0, life: [1.2, 1.6], size: [2, 4], color: col,
        behaviors: [c.force(1800, 40), c.limitSpeed(900, 1), c.noise(1.2, 40), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 0 }),
    ];
  },
};
