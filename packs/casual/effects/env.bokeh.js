/** Bokeh lights: big blurry circles of pink, peach, lilac, aqua and blue light drift slowly and swell in and out over a soft coloured haze, some with a bright rim, with tiny twinkles in front. Loops until stopped. */
export default {
  name: 'env.bokeh',
  category: 'env',
  whenToUse: 'A soft, pretty backdrop of blurry coloured light circles behind a main menu, title, pause or settings screen, a shop, a lobby or a calm results page: play it once without a position and keep it behind the UI (tint null keeps the pastel rainbow, a tint gives shades of one colour); for a pulsing party mood use env.partylights, for rising magic motes env.magic, for a space backdrop env.nebula.',
  duration: 8, loop: true, anchor: 'center', tint: null,
  tags: ['bokeh', 'menu', 'background', 'lights', 'blur', 'soft', 'pastel', 'calm'],
  build(c) {
    // its own pastel rainbow, or five shades of the tint
    const pal = c.tint
      ? [c.tint, c.lighten(c.tint, 0.35), c.darken(c.tint, 0.2), c.mix(c.tint, '#ff9fd0', 0.35), c.mix(c.tint, '#9fe8ff', 0.35)]
      : ['#ff6fb0', '#ffb15e', '#b48cff', '#4fe0cf', '#5fb2ff'].map(c.rgb);
    // 2D: anywhere on the screen. 3D: a layer of lights floating over the area around the camera.
    // Both are rect emitters, so every layer starts at speed 0 and drifts on a gentle push and noise
    const area = (p, y) => (c.is3d
      ? c.sys(c.env3d(p, { w: 1100, y }))
      : c.sys(Object.assign({ shape: { type: 'rect', w: c.view.w + 80, h: c.view.h + 80, thickness: 1 } }, p)));
    const k = c.is3d ? 2.2 : 1;
    const s = c.is3d ? 1.3 : 1;
    // a light swells in, hangs, and fades; all of them drift slowly up and to the right
    const drift = (a) => [c.force(5, 9), c.limitSpeed(12, 1), c.noise(0.25, 16), c.sizeOverLife(c.curve([[0, 0.85], [1, 1.12]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.25], [a, 0.75], [0, 1]]))];
    const twinkle = () => c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.5, 0.4], [0.7, 1], [1, 0]]));
    return [
      // a soft wash of colour far behind
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.5 * k, speed: 0, life: [7, 9], size: [220 * s, 340 * s], color: [pal[0], pal[1]], behaviors: drift(0.16), order: 0 }, 160),
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.5 * k, speed: 0, life: [7, 9], size: [220 * s, 340 * s], color: [pal[3], pal[4]], behaviors: drift(0.16), order: 0 }, 120),
      // the bokeh: big soft discs of light, one colour pair per layer
      area({ tex: 'disc', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.7 * k, speed: 0, life: [6, 8], size: [60 * s, 110 * s], color: [pal[0], pal[1]], behaviors: drift(0.26), order: 1 }, 130),
      area({ tex: 'disc', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.7 * k, speed: 0, life: [6, 8], size: [44 * s, 86 * s], color: [pal[2], pal[4]], behaviors: drift(0.3), order: 1 }, 90),
      area({ tex: 'disc', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.7 * k, speed: 0, life: [6, 8], size: [34 * s, 70 * s], color: [pal[3], pal[4]], behaviors: drift(0.3), order: 2 }, 60),
      // a few rims: lens bokeh with a brighter edge
      area({ tex: 'ring', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.5 * k, speed: 0, life: [6, 8], size: [50 * s, 100 * s], color: [pal[1], pal[2]], behaviors: drift(0.32), order: 2 }, 100),
      // small bright dots in front
      area({ tex: 'disc', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 2 * k, speed: 0, life: [4, 6], size: [10 * s, 22 * s], color: [c.lighten(pal[0], 0.4), c.lighten(pal[4], 0.4)], behaviors: drift(0.55), order: 3 }, 40),
      // tiny white twinkles
      area({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 1.2 * k, speed: 0, life: [0.8, 1.4], size: [8, 14], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.spin(-0.6, 0.6), twinkle()], order: 4 }, 70),
    ];
  },
};
