/** Dust motes floating in the air. Loops until stopped. */
export default {
  name: 'env.dust',
  category: 'env',
  whenToUse: 'A sunlit room, an attic, a desert, a cave, an old library. Tiny motes drifting everywhere; very subtle.',
  duration: 8, loop: true, anchor: 'center', tint: '#fff2cc',
  tags: ['dust', 'motes', 'sunlight', 'attic', 'ambient', 'cave', 'subtle'],
  build(c) {
    const col = c.color('#fff2cc');
    if (c.is3d) {
      return [
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 26,
          speed: [3, 12], life: [4, 7], size: [3, 7], color: col,
          behaviors: [c.force(0, 6), c.noise(0.5, 40), c.colorOverLife(c.fadeInOut(0.2, 0.8))] }, { w: 1100, y: 90 })),
      ];
    }
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 12, shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 },
        speed: [3, 12], life: [4, 7], size: [2, 6], color: col,
        behaviors: [c.gravity(-4), c.noise(0.5, 30), c.colorOverLife(c.fadeInOut(0.2, 0.8))], order: 0 }),
    ];
  },
};
