/** A Halloween night: orange and purple embers drifting up and flickering, faint purple wisps rolling by and a pumpkin-orange glow along the bottom. Loops until stopped. */
export default {
  name: 'env.halloween',
  category: 'env',
  whenToUse: 'A Halloween or spooky-fun event: a pumpkin patch, a trick-or-treat level, a witch\'s party, a haunted carnival, a costume or event menu. Play it once without a position (whole screen in 2D, the area around the camera in 3D). For a scary ghost atmosphere use env.spirits; for low fog use env.fog.',
  duration: 6, loop: true, anchor: 'bottom', tint: null,
  tags: ['halloween', 'spooky', 'pumpkin', 'witch', 'embers', 'night', 'october', 'event'],
  build(c) {
    const orange = c.tint || c.rgb('#ff8a1f');
    const purple = c.tint ? c.darken(c.tint, 0.35) : c.rgb('#a64dff');
    const flicker = () => c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.35, 0.55], [0.5, 1], [0.7, 0.6], [0.85, 1], [1, 0]]));
    // a fresh list per system: behaviours are never shared
    const drift = (up) => [c.force(0, up), c.limitSpeed(up * 0.8, 1), c.noise(1.2, 28)];
    const wispFade = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.16, 0.3], [0.12, 0.7], [0, 1]]));
    if (c.is3d) {
      return [
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 14,
          speed: 0, life: [3, 5], size: [6, 12], color: [c.lighten(orange, 0.4), orange],
          behaviors: drift(70).concat([flicker()]), order: 2 }, { w: 1100, y: 6 })),
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 12,
          speed: 0, life: [3, 5], size: [6, 12], color: [c.lighten(purple, 0.35), purple],
          behaviors: drift(60).concat([flicker()]), order: 2 }, { w: 1100, y: 30 })),
        // faint glowing wisps rolling along low over the ground
        c.sys(c.env3d({ tex: 'puff', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 3,
          speed: 0, life: [5, 7], size: [160, 260], rotation: [0, 6.28], color: purple,
          behaviors: [c.force(25, 4), c.limitSpeed(30, 1), c.noise(0.3, 20), c.spin(-0.2, 0.2), wispFade()], order: 0 }, { w: 1200, y: 40 })),
        c.sys(c.env3d({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 4,
          speed: 0, life: [0.8, 1.4], size: [10, 16], rotation: [0, 0.8], color: c.lighten(orange, 0.6),
          behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }, { w: 900, y: 60 })),
      ];
    }
    const w = c.view.w + 80, h = c.view.h;
    // the effect sits on the bottom edge: this area covers the lower 85 % of the screen
    const area = { type: 'rect', w: c.view.w, h: h * 0.85, thickness: 1 };
    return [
      // a pumpkin-orange glow along the bottom
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 0.6, shape: { type: 'rect', w, h: 0 }, offset: [0, -10],
        speed: 0, life: [4, 6], size: [200, 280], color: orange,
        behaviors: [c.noise(0.3, 20), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.2, 0.35], [0.2, 0.65], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'puff', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 0.8, shape: { type: 'rect', w: c.view.w, h: h * 0.6, thickness: 1 }, offset: [0, h * 0.3],
        speed: 0, life: [5, 7], size: [130, 210], rotation: [0, 6.28], color: purple,
        behaviors: [c.force(20, 4), c.limitSpeed(25, 1), c.noise(0.3, 18), c.spin(-0.2, 0.2), wispFade()], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 7, shape: area, offset: [0, h * 0.425],
        speed: 0, life: [3, 5], size: [6, 12], color: [c.lighten(orange, 0.4), orange],
        behaviors: drift(55).concat([flicker()]), order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 5, shape: area, offset: [0, h * 0.425],
        speed: 0, life: [3, 5], size: [6, 12], color: [c.lighten(purple, 0.35), purple],
        behaviors: drift(45).concat([flicker()]), order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 2, shape: area, offset: [0, h * 0.425],
        speed: 0, life: [0.8, 1.4], size: [9, 14], rotation: [0, 0.8], color: c.lighten(orange, 0.6),
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }),
    ];
  },
};
