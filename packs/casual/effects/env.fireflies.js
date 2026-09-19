/** Fireflies wandering slowly around the screen. Loops until stopped. */
export default {
  name: 'env.fireflies',
  category: 'env',
  whenToUse: 'A night forest, a fairy glade, a calm evening, a magical garden. Soft lights drifting everywhere.',
  duration: 8, loop: true, anchor: 'center', tint: '#d6ff6a',
  tags: ['fireflies', 'night', 'forest', 'fairy', 'ambient', 'glow', 'calm'],
  build(c) {
    const col = c.color('#d6ff6a');
    if (c.is3d) {
      return [
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 9,
          speed: [5, 20], life: [3, 6], size: [8, 16], color: [c.lighten(col, 0.4), col],
          behaviors: [c.noise(0.6, 60), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.35, 0.4], [0.5, 1], [0.7, 0.5], [0.85, 1], [1, 0]]))] }, { w: 1100, y: 70 })),
      ];
    }
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 5, shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 },
        speed: [5, 20], life: [3, 6], size: [8, 16], color: [c.lighten(col, 0.4), col],
        behaviors: [c.noise(0.6, 50), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.35, 0.4], [0.5, 1], [0.7, 0.5], [0.85, 1], [1, 0]]))], order: 1 }),
    ];
  },
};
