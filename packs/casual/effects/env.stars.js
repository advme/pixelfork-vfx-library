/** Twinkling stars all over the screen. Loops until stopped. */
export default {
  name: 'env.stars',
  category: 'env',
  whenToUse: 'A night sky, a space level, a dream sequence, a magic realm. Covers the whole screen; put it behind the game if you can (it is a background feel).',
  duration: 6, loop: true, anchor: 'center', tint: '#ffffff',
  tags: ['stars', 'night', 'space', 'twinkle', 'ambient', 'sky', 'dream'],
  build(c) {
    const col = c.color('#ffffff');
    if (c.is3d) {
      // 3D: a dome of stars far around the scene; walls and hills hide them like a real sky
      const dome = (tex, rate, size, life, beh) => c.sys({ tex, blend: 'add', loop: true, prewarm: true, duration: 6, rate, in3d: true, world: true, soft: false,
        shape: { type: 'sphere', radius: 1700, thickness: 0 }, speed: 0, life, size, rotation: [0, 1], color: col, behaviors: beh });
      return [
        dome('spark', 40, [26, 60], [1.5, 3], [c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.5, 0.5], [0.7, 1], [1, 0]]))]),
        dome('glow', 60, [10, 22], [2, 4], [c.colorOverLife(c.fadeInOut(0.3, 0.7))]),
      ];
    }
    return [
      c.sys({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 12, shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 },
        speed: 0, life: [1.5, 3], size: [6, 14], rotation: [0, 1], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.5, 0.5], [0.7, 1], [1, 0]]))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 15, shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 },
        speed: 0, life: [2, 4], size: [2, 5], color: col,
        behaviors: [c.colorOverLife(c.fadeInOut(0.3, 0.7))], order: 0 }),
    ];
  },
};
