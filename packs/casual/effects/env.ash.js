/** Falling ash: grey flakes drift down through the air with glowing embers floating among them. Loops until stopped. */
export default {
  name: 'env.ash',
  category: 'env',
  whenToUse: 'A burning or ruined world: near a volcano, after an explosion or war, a city on fire, a post-apocalyptic wasteland, a dragon\'s lair, a hell level. Play it once without a position (whole screen in 2D, the area around the camera in 3D).',
  duration: 6, loop: true, anchor: 'top', tint: '#a0a0a0',
  tags: ['ash', 'embers', 'volcano', 'apocalypse', 'war', 'fire', 'ruins', 'hell', 'weather'],
  build(c) {
    const col = c.color('#a0a0a0');
    if (c.is3d) {
      const y = 460;
      return [
        c.sys(c.env3d({ tex: 'square', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 30,
          speed: 0, life: [(y / 50) * 0.9, y / 50], size: [4, 7], rotation: [0, 6.28], color: [col, c.darken(col, 0.4)],
          behaviors: [c.gravity(100), c.limitSpeed(50, 1), c.noise(0.8, 30), c.spin(-2, 2), c.colorOverLife(c.fadeInOut(0.05, 0.92))] }, { w: 1300, y })),
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 10,
          speed: [5, 15], life: [3, 5], size: [4, 7], color: ['#ff9a3a', '#ffd27a'],
          behaviors: [c.force(0, 25), c.limitSpeed(30, 1), c.noise(0.8, 30), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.6, 0.6], [0.8, 1], [1, 0]]))] }, { w: 1100, y: 40 })),
      ];
    }
    const w = c.view.w + 100;
    return [
      c.sys({ tex: 'square', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 12, shape: { type: 'rect', w, h: 0 }, offset: [0, 30],
        speed: 0, life: [7, 10], size: [4, 7], rotation: [0, 6.28], color: [col, c.darken(col, 0.4)],
        behaviors: [c.gravity(100), c.limitSpeed(45, 1), c.noise(0.8, 30), c.spin(-2, 2), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 4, shape: { type: 'rect', w: c.view.w, h: c.view.h * 0.8, thickness: 1 }, offset: [0, -c.view.h * 0.55],
        speed: [5, 15], life: [3, 5], size: [4, 7], color: ['#ff9a3a', '#ffd27a'],
        behaviors: [c.force(0, 25), c.limitSpeed(30, 1), c.noise(0.8, 30), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.6, 0.6], [0.8, 1], [1, 0]]))], order: 1 }),
    ];
  },
};
