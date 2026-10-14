/** Magical ambience: soft coloured bokeh lights drift behind, glowing motes and fine fairy dust rise slowly everywhere, and bright sparkles and little stars twinkle in and out. Loops until stopped. */
export default {
  name: 'env.magic',
  category: 'env',
  whenToUse: 'An enchanted place or a magic mood: a fairy land, an enchanted forest, a wizard\'s tower, a magic shop, a dream world, a fantasy title screen or menu background. Play it once without a position for the whole screen (2D) or the area around the camera (3D); tint it to the world\'s magic colour. For a plain night sky use env.stars; for wandering firefly lights use env.fireflies; for spooky ghost lights use env.spirits.',
  duration: 8, loop: true, anchor: 'center', tint: '#c38cff',
  tags: ['magic', 'fairy', 'enchanted', 'fantasy', 'sparkle', 'twinkle', 'dream', 'menu', 'ambient'],
  build(c) {
    const col = c.color('#c38cff');
    const light = c.lighten(col, 0.55);
    const pale = c.lighten(col, 0.75);
    const area = (p, y) => (c.is3d
      ? c.sys(c.env3d(p, { w: 1100, y }))
      : c.sys(Object.assign({ shape: { type: 'rect', w: c.view.w, h: c.view.h + 60, thickness: 1 }, offset: [0, -30] }, p)));
    const k = c.is3d ? 2.2 : 1;
    // a twinkle: in, a dip, in again, out (each call returns a fresh behaviour)
    const twinkle = () => c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.38, 0.3], [0.6, 1], [1, 0]]));
    // area emitters are rects: every layer starts at speed 0 and rises on its force and noise
    return [
      // soft coloured bokeh lights drifting far behind
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 1.2 * k, speed: 0, life: [6, 8], size: [60, 110], color: [col, c.lighten(col, 0.25)],
        behaviors: [c.force(0, 8), c.limitSpeed(14, 1), c.noise(0.3, 20), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.34, 0.3], [0.34, 0.7], [0, 1]]))], order: 0 }, 70),
      // glowing motes rising, pulsing softly
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 5 * k, speed: 0, life: [4, 6], size: [9, 15], color: [col, light],
        behaviors: [c.force(0, 22), c.limitSpeed(32, 1), c.noise(0.6, 28), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.45, 0.65], [0.7, 1], [1, 0]]))], order: 1 }, 10),
      // fine fairy dust rising a little faster
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 8 * k, speed: 0, life: [3, 4.5], size: [3, 5], color: pale,
        behaviors: [c.force(0, 35), c.limitSpeed(50, 1), c.noise(0.9, 30), c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 2 }, 0),
      // bright four-point sparkles twinkling twice as they float
      area({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 4 * k, speed: 0, life: [1.5, 2.5], size: [16, 26], rotation: [0, 1], color: [pale, '#ffffff'],
        behaviors: [c.force(0, 16), c.limitSpeed(22, 1), c.spin(-1, 1), twinkle()], order: 3 }, 30),
      // little stars turning slowly as they twinkle
      area({ tex: 'star', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 2 * k, speed: 0, life: [1.8, 2.8], size: [10, 16], rotation: [0, 6.28], color: [light, pale],
        behaviors: [c.force(0, 12), c.limitSpeed(18, 1), c.spin(-1.5, 1.5), twinkle()], order: 4 }, 40),
    ];
  },
};
