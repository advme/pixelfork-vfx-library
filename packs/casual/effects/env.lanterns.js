/** Sky lanterns: warm glowing lanterns rise slowly and sway, near ones big and bright, far ones small and dim, over a soft festival glow and tiny rising sparks. Loops until stopped. */
export default {
  name: 'env.lanterns',
  category: 'env',
  whenToUse: 'A calm festival night: a lantern festival, Diwali, Mid-Autumn or Lunar New Year, a wish or memorial moment, a romantic river or temple night, a peaceful ending. Play it once without a position (whole screen in 2D, the area around the camera in 3D). For small wandering lights use env.fireflies; for sparks from a fire use env.embers.',
  duration: 8, loop: true, anchor: 'bottom', tint: '#ffa640',
  tags: ['lanterns', 'sky lanterns', 'festival', 'diwali', 'lunar new year', 'wish', 'night', 'calm'],
  build(c) {
    const col = c.color('#ffa640');
    const light = c.lighten(col, 0.5);
    // rise at a steady terminal speed and sway; a fresh list per system
    const float = (speed, drift) => [c.force(0, speed * 1.6), c.limitSpeed(speed, 1), c.noise(0.3, drift)];
    // the little flame inside flickers the lantern's size a touch
    const flicker = () => c.sizeOverLife(c.curve([[0, 1], [0.2, 0.93], [0.4, 1], [0.6, 0.95], [0.8, 1], [1, 0.94]]));
    if (c.is3d) {
      const lanterns = (rate, size, speed, life, tone, order) => c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: life[1], rate,
        speed: 0, life, size, color: tone,
        behaviors: float(speed, 16).concat([flicker(), c.colorOverLife(c.fadeInOut(0.06, 0.8))]), order }, { w: 1200, y: 10 }));
      return [
        lanterns(1.6, [34, 50], 42, [14, 18], [light, col], 2),
        lanterns(2, [20, 28], 28, [16, 20], [col, c.darken(col, 0.2)], 1),
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 5, rate: 8,
          speed: 0, life: [3, 5], size: [3, 6], color: [light, '#ffe2a8'],
          behaviors: [c.force(0, 60), c.limitSpeed(45, 1), c.noise(1, 18), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.6, 0.6], [0.8, 1], [1, 0]]))], order: 3 }, { w: 1000, y: 10 })),
      ];
    }
    const w = c.view.w + 100, h = c.view.h;
    // 2D: a glow stretched a little along its (upward) motion reads as a tall paper lantern
    const lanterns = (rate, size, speed, tone, order) => {
      const life = (h * 0.95) / speed;
      return c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: life, rate, shape: { type: 'rect', w, h: 0 }, offset: [0, -30],
        speed: 0, life: [life * 0.8, life], size, color: tone, stretch: { speed: 0, length: 1.4 },
        behaviors: float(speed, 14).concat([flicker(), c.colorOverLife(c.fadeInOut(0.05, 0.8))]), order });
    };
    return [
      // a warm festival glow along the bottom
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.5, shape: { type: 'rect', w, h: 0 }, offset: [0, -10],
        speed: 0, life: [5, 7], size: [220, 300], color: col,
        behaviors: [c.noise(0.3, 16), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.2, 0.3], [0.2, 0.7], [0, 1]]))], order: 0 }),
      lanterns(0.8, [16, 22], 28, [col, c.darken(col, 0.2)], 1),
      lanterns(0.5, [30, 42], 42, [light, col], 2),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 3, shape: { type: 'rect', w, h: 0 }, offset: [0, -10],
        speed: 0, life: [3, 5], size: [3, 6], color: [light, '#ffe2a8'],
        behaviors: [c.force(0, 70), c.limitSpeed(55, 1), c.noise(1, 18), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.6, 0.6], [0.8, 1], [1, 0]]))], order: 3 }),
    ];
  },
};
