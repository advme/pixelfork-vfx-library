/** Shooting stars: bright streaks flash across the sky now and then, each with a sparkling head. Loops until stopped. */
export default {
  name: 'env.meteors',
  category: 'env',
  whenToUse: 'A magical or romantic night sky: a wish moment, a space level, a calm night camp, a dreamy menu background, a star festival. Play it once without a position; pair it with env.stars for a full starry sky.',
  duration: 3, loop: true, anchor: 'top', tint: '#ffffff',
  tags: ['shooting stars', 'meteors', 'night', 'sky', 'wish', 'space', 'stars', 'dreamy', 'romantic'],
  build(c) {
    const col = c.color('#ffffff');
    // a streak is fast, so it can be one stretched sprite in the plane facing the camera (in 3D: high above the spot it looks at)
    const span = c.is3d ? 1600 : c.view.w * 1.1;
    const at = c.is3d ? [300, 520] : [c.view.w * 0.25, -c.view.h * 0.12];
    const streak = (size, colour, order) => c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 3, bursts: [{ time: 0.3, count: 1 }, { time: 1.7, count: 1 }, { time: 2.4, count: 1 }],
      shape: { type: 'rect', w: span, h: 0 }, offset: at, speed: 0, life: [0.55, 0.7], size, color: colour, stretch: { speed: 0.012, length: 3 },
      behaviors: [c.force(-2600, -1300), c.limitSpeed(1100, 1), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.15], [0.8, 0.6], [0, 1]]))], order });
    return [streak([6, 8], col, 2), streak([16, 20], c.color('#a8d8ff'), 1)];
  },
};
