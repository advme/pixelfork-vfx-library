/** Bubbles rising from the bottom of the screen. Loops until stopped. */
export default {
  name: 'env.bubbles',
  category: 'env',
  whenToUse: 'An underwater level, an aquarium, a soap or bath scene, a potion lab. Rises from the bottom of the screen.',
  duration: 6, loop: true, anchor: 'bottom', tint: '#bfefff',
  tags: ['bubbles', 'underwater', 'water', 'ambient', 'aquarium', 'soap'],
  build(c) {
    const col = c.color('#bfefff');
    if (c.is3d) {
      return [
        c.sys(c.env3d({ tex: 'ring', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 18,
          speed: 0, life: [4, 7], size: [8, 24], color: col,
          behaviors: [c.force(0, 120), c.limitSpeed(95, 1), c.noise(1.5, 30), c.colorOverLife(c.fadeInOut(0.1, 0.9))] }, { w: 1200, y: 6 })),
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 22,
          speed: 0, life: [4, 7], size: [3, 6], color: col,
          behaviors: [c.force(0, 90), c.limitSpeed(70, 1), c.noise(1.5, 24), c.colorOverLife(c.fadeInOut(0.1, 0.9))] }, { w: 1200, y: 6 })),
      ];
    }
    const w = c.view.w + 80;
    return [
      c.sys({ tex: 'ring', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 8, shape: { type: 'rect', w, h: 0 }, dir: Math.PI / 2, offset: [0, -30],
        speed: [40, 90], life: [4, 7], size: [8, 24], color: col,
        behaviors: [c.force(0, 20), c.limitSpeed(120, 1), c.noise(1.5, 30), c.colorOverLife(c.fadeInOut(0.1, 0.9))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 10, shape: { type: 'rect', w, h: 0 }, dir: Math.PI / 2, offset: [0, -30],
        speed: [30, 70], life: [4, 7], size: [3, 6], color: col,
        behaviors: [c.noise(1.5, 24), c.colorOverLife(c.fadeInOut(0.1, 0.9))], order: 0 }),
    ];
  },
};
