/** A nebula backdrop: huge soft clouds of violet, pink and teal light swell, drift very slowly and fade while faint stars twinkle. Loops until stopped. */
export default {
  name: 'env.nebula',
  category: 'env',
  whenToUse: 'A colourful deep-space background for a space shooter, a space exploration level, a galaxy map or a cosmic menu: play it once without a position and keep it behind the game; for a plain starry night use env.stars, and add env.meteors for shooting stars.',
  duration: 8, loop: true, anchor: 'center', tint: null,
  tags: ['nebula', 'space', 'galaxy', 'cosmic', 'background', 'stars', 'sci-fi', 'ambient'],
  build(c) {
    // its own violet / pink / teal palette, or three shades of the tint
    const a = c.tint || c.rgb('#8a5cff');
    const b = c.tint ? c.lighten(c.tint, 0.4) : c.rgb('#ff5fb4');
    const d = c.tint ? c.darken(c.tint, 0.35) : c.rgb('#33cfe6');
    // a cloud swells in, hangs as a faint wash of colour, and fades; all of them drift slowly to the right
    const cloud = (peak) => [c.force(8, 2), c.limitSpeed(6, 1), c.noise(0.1, 40), c.spin(-0.06, 0.06),
      c.sizeOverLife(c.curve([[0, 0.8], [1, 1.15]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [peak, 0.3], [peak, 0.65], [0, 1]]))];
    const twinkle = () => c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.5, 0.5], [0.7, 1], [1, 0]]));
    if (c.is3d) {
      // 3D: the clouds and stars sit on a sky dome far around the scene, like env.stars
      const dome = (p) => c.sys(Object.assign({ blend: 'add', loop: true, prewarm: true, duration: 8, in3d: true, world: true, soft: false,
        shape: { type: 'sphere', radius: 1700, thickness: 0 }, speed: 0 }, p));
      return [
        dome({ tex: 'glow', rate: 1.4, life: [7, 10], size: [520, 860], color: a, behaviors: cloud(0.34), order: 0 }),
        dome({ tex: 'glow', rate: 1.1, life: [7, 10], size: [420, 720], color: b, behaviors: cloud(0.28), order: 0 }),
        dome({ tex: 'glow', rate: 1.1, life: [7, 10], size: [420, 720], color: d, behaviors: cloud(0.28), order: 0 }),
        dome({ tex: 'puff', rate: 1.4, life: [7, 10], size: [380, 620], rotation: [0, 6.28], color: [a, b], behaviors: cloud(0.2), order: 1 }),
        dome({ tex: 'spark', rate: 22, life: [1.5, 3], size: [24, 52], rotation: [0, 1], color: '#ffffff', behaviors: [twinkle()], order: 3 }),
        dome({ tex: 'glow', rate: 30, life: [2, 4], size: [9, 20], color: '#ffffff', behaviors: [c.colorOverLife(c.fadeInOut(0.3, 0.7))], order: 2 }),
      ];
    }
    const screen = { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 };
    const sky = (p) => c.sys(Object.assign({ blend: 'add', loop: true, prewarm: true, duration: 8, shape: screen, speed: 0 }, p));
    return [
      sky({ tex: 'glow', rate: 0.9, life: [7, 10], size: [240, 400], color: a, behaviors: cloud(0.34), order: 0 }),
      sky({ tex: 'glow', rate: 0.7, life: [7, 10], size: [200, 340], color: b, behaviors: cloud(0.28), order: 0 }),
      sky({ tex: 'glow', rate: 0.7, life: [7, 10], size: [200, 340], color: d, behaviors: cloud(0.28), order: 0 }),
      // wispy cloud shapes on top of the soft glows give the nebula its texture
      sky({ tex: 'puff', rate: 0.8, life: [7, 10], size: [180, 300], rotation: [0, 6.28], color: [a, b], behaviors: cloud(0.2), order: 1 }),
      sky({ tex: 'spark', rate: 8, life: [1.5, 3], size: [5, 12], rotation: [0, 1], color: '#ffffff', behaviors: [twinkle()], order: 3 }),
      sky({ tex: 'glow', rate: 12, life: [2, 4], size: [2, 4], color: '#ffffff', behaviors: [c.colorOverLife(c.fadeInOut(0.3, 0.7))], order: 2 }),
    ];
  },
};
