/** Underwater ambience: soft light from the surface glows at the top and falls in slanted shafts, bright motes drift in a slow current, patches of light shimmer like caustics and bubbles of several sizes wobble up. Loops until stopped. */
export default {
  name: 'env.underwater',
  category: 'env',
  whenToUse: 'An underwater level or scene: the sea floor, a coral reef, a sunken ship, a mermaid kingdom, a deep dive, the view inside an aquarium. Play it once without a position (whole screen in 2D, the area around the camera in 3D) and stop it when the player surfaces. For bubbles alone use env.bubbles; for bubbles from one spot use world.bubblecolumn.',
  duration: 6, loop: true, anchor: 'center', tint: '#8fe8ff',
  tags: ['underwater', 'ocean', 'sea', 'reef', 'diving', 'caustics', 'ambient', 'deep'],
  build(c) {
    const col = c.color('#8fe8ff');
    const light = c.lighten(col, 0.6);
    // light patches swell, dip and swell again, like caustics; faint, they only colour the scene
    const shimmer = () => [c.sizeOverLife(c.curve([[0, 0.6], [0.25, 1], [0.5, 0.75], [0.75, 1], [1, 0.7]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.26, 0.3], [0.12, 0.5], [0.26, 0.7], [0, 1]]))];
    const twinkle = () => c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.5, 0.6], [0.85, 1], [1, 0]]));
    // a bubble wobbling up: it fades in where it is born and out near the end of its life
    const rise = (lift, max, wobble) => [c.force(0, lift), c.limitSpeed(max, 1), c.noise(1.5, wobble), c.colorOverLife(c.fadeInOut(0.1, 0.85))];
    if (c.is3d) {
      const motes = (y, rate) => c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate,
        speed: 0, life: [4, 7], size: [6, 11], color: [light, col],
        behaviors: [c.force(12, 5), c.limitSpeed(16, 1), c.noise(0.5, 30), twinkle(), c.colorOverLife(c.fadeInOut(0.15, 0.85))], order: 1 }, { w: 1100, y }));
      return [
        // caustics: soft light dancing on the floor
        c.sys(c.flat(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 12,
          speed: 0, life: [2.2, 3.2], size: [110, 220], color: col, behaviors: shimmer(), order: 0 }, { w: 1100, y: 0 }))),
        motes(30, 8),
        motes(150, 8),
        // small bubbles rising from the floor
        c.sys(c.env3d({ tex: 'ring', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 8,
          speed: 0, life: [3.5, 5], size: [7, 13], color: light, behaviors: rise(120, 70, 24), order: 2 }, { w: 1100, y: 6 })),
        // a few big bubbles wobbling up among them
        c.sys(c.env3d({ tex: 'ring', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 2.5,
          speed: 0, life: [4, 5.5], size: [16, 26], color: light, behaviors: rise(100, 55, 30), order: 3 }, { w: 1100, y: 6 })),
      ];
    }
    const W = c.view.w + 60, H = c.view.h + 60, m = Math.min(c.view.w, c.view.h);
    // the light shafts slant down to the right; a streak trails BACK from its particle, so the particles
    // are born well below the surface and each shaft reaches back up through the top of the screen
    const slant = -Math.PI / 2 + 0.32;
    return [
      // light from the surface: a soft bright band along the top of the screen
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 1.6, shape: { type: 'rect', w: W, h: 0 }, offset: [0, c.view.h / 2],
        speed: 0, life: [3, 4], size: [m * 0.6, m * 0.9], color: light,
        behaviors: [c.noise(0.3, 20), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.13, 0.4], [0.13, 0.6], [0, 1]]))], order: 0 }),
      // slanted shafts of light swaying down from the surface, drifting very slowly
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 1.2, dir: slant, shape: { type: 'cone', radius: c.view.w * 0.7, angle: 0 },
        offset: [-c.view.w * 0.12, c.view.h / 2 - 220], speed: [4, 8], life: [4, 6], size: [40, 75], color: light, stretch: { speed: 0, length: 6 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.14, 0.35], [0.14, 0.65], [0, 1]]))], order: 0 }),
      // caustic light in the upper part of the screen, nearer the surface
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 3, shape: { type: 'rect', w: W, h: c.view.h * 0.6, thickness: 1 }, offset: [0, c.view.h * 0.2],
        speed: 0, life: [2.2, 3.2], size: [70, 140], color: col, behaviors: [c.noise(0.4, 20)].concat(shimmer()), order: 1 }),
      // bright motes drifting in a slow current
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 8, shape: { type: 'rect', w: W, h: H, thickness: 1 },
        speed: 0, life: [4, 7], size: [4, 8], color: [light, col],
        behaviors: [c.force(12, 5), c.limitSpeed(14, 1), c.noise(0.5, 26), twinkle(), c.colorOverLife(c.fadeInOut(0.15, 0.85))], order: 2 }),
      // small bubbles rising
      c.sys({ tex: 'ring', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 6, shape: { type: 'rect', w: W, h: H, thickness: 1 },
        speed: 0, life: [3, 4.5], size: [5, 10], color: light, behaviors: rise(120, 55, 20), order: 3 }),
      // a few big bubbles wobbling up among them
      c.sys({ tex: 'ring', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 1.5, shape: { type: 'rect', w: W, h: H, thickness: 1 },
        speed: 0, life: [4, 5.5], size: [14, 24], color: light, behaviors: rise(100, 45, 26), order: 4 }),
    ];
  },
};
