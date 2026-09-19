/** Embers drifting up from the bottom of the screen. Loops until stopped. */
export default {
  name: 'env.embers',
  category: 'env',
  whenToUse: 'A lava level, a burning city, a campfire scene, a volcano, a forge. Rises from the bottom of the screen.',
  duration: 6, loop: true, anchor: 'bottom', tint: '#ff8c2a',
  tags: ['embers', 'lava', 'fire', 'volcano', 'ambient', 'sparks', 'forge'],
  build(c) {
    const col = c.color('#ff8c2a');
    if (c.is3d) {
      // 3D: embers lift off the ground all around
      return [
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 34,
          speed: 0, life: [3, 5], size: [4, 9], color: [c.lighten(col, 0.5), col],
          behaviors: [c.force(0, 140), c.limitSpeed(110, 1), c.noise(1.5, 30), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.6, 0.7], [0.8, 1], [1, 0]]))] }, { w: 1200, y: 4 })),
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 12,
          speed: 0, life: [4, 6], size: [12, 20], color: c.darken(col, 0.3),
          behaviors: [c.force(0, 60), c.limitSpeed(55, 1), c.noise(1, 24), c.colorOverLife(c.fadeInOut(0.2, 0.7))] }, { w: 1200, y: 10 })),
      ];
    }
    const w = c.view.w + 80;
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 14, shape: { type: 'rect', w, h: 0 }, dir: Math.PI / 2, offset: [0, -20],
        speed: [40, 100], life: [3, 5], size: [4, 9], color: [c.lighten(col, 0.5), col],
        behaviors: [c.force(0, 30), c.limitSpeed(140, 1), c.noise(1.5, 30), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.6, 0.7], [0.8, 1], [1, 0]]))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 8, shape: { type: 'rect', w, h: 0 }, dir: Math.PI / 2, offset: [0, -20],
        speed: [20, 60], life: [4, 6], size: [10, 18], color: c.darken(col, 0.3),
        behaviors: [c.noise(1, 24), c.colorOverLife(c.fadeInOut(0.2, 0.7))], order: 0 }),
    ];
  },
};
