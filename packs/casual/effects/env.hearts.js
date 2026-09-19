/** Hearts floating up across the whole screen. Loops until stopped. */
export default {
  name: 'env.hearts',
  category: 'env',
  whenToUse: 'A love scene, a date, a pet-care screen, a valentine event. Rises from the bottom of the screen.',
  duration: 6, loop: true, anchor: 'bottom', tint: '#ff6b9d',
  tags: ['hearts', 'love', 'valentine', 'pets', 'ambient', 'cute'],
  build(c) {
    const col = c.color('#ff6b9d');
    if (c.is3d) {
      return [
        c.sys(c.env3d({ tex: 'heart', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 9,
          speed: 0, life: [3, 4.5], size: [14, 28], rotation: [-0.3, 0.3], color: [c.lighten(col, 0.4), col],
          behaviors: [c.force(0, 120), c.limitSpeed(110, 1), c.noise(0.8, 30), c.spin(-0.8, 0.8), c.colorOverLife(c.fadeInOut(0.1, 0.8))] }, { w: 1100, y: 8 })),
        c.sys(c.env3d({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 10,
          speed: 0, life: [3, 4.5], size: [5, 10], color: c.lighten(col, 0.6),
          behaviors: [c.force(0, 100), c.limitSpeed(95, 1), c.noise(1, 24), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.6, 0.4], [0.8, 1], [1, 0]]))] }, { w: 1100, y: 8 })),
      ];
    }
    const w = c.view.w + 60;
    return [
      c.sys({ tex: 'heart', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 4, shape: { type: 'rect', w, h: 0 }, dir: Math.PI / 2, offset: [0, -30],
        speed: 0, life: [4, 6], size: [14, 28], rotation: [-0.3, 0.3], color: [c.lighten(col, 0.4), col],
        behaviors: [c.force(0, 120), c.limitSpeed(130, 1), c.noise(0.8, 30), c.spin(-0.8, 0.8), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 5, shape: { type: 'rect', w, h: 0 }, dir: Math.PI / 2, offset: [0, -30],
        speed: 0, life: [3, 5], size: [5, 10], color: c.lighten(col, 0.6),
        behaviors: [c.force(0, 100), c.limitSpeed(110, 1), c.noise(1, 24), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.6, 0.4], [0.8, 1], [1, 0]]))], order: 0 }),
    ];
  },
};
