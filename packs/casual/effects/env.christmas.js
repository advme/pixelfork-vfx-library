/** A Christmas night: big snowflakes and soft snow drifting down, with red, green, gold and blue fairy lights twinkling everywhere. Loops until stopped. */
export default {
  name: 'env.christmas',
  category: 'env',
  whenToUse: 'A Christmas or winter-holiday scene: a festive event, a Christmas level, shop or menu, a cosy snowy village, a gift-giving screen. Play it once without a position (whole screen in 2D, the area around the camera in 3D); tint it to recolour the lights. For plain snowfall use env.snow; for a snowstorm use env.blizzard.',
  duration: 8, loop: true, anchor: 'top', tint: null,
  tags: ['christmas', 'xmas', 'holiday', 'winter', 'snow', 'festive', 'fairy lights', 'december'],
  build(c) {
    const lights = c.tint
      ? [c.tint, c.lighten(c.tint, 0.5), c.darken(c.tint, 0.2), c.lighten(c.tint, 0.8)]
      : ['#ff4a5a', '#4dff8a', '#ffd23a', '#5cc8ff'];
    // a fresh curve per system: behaviours are never shared
    const twinkle = () => c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.3, 0.45], [0.5, 1], [0.7, 0.5], [0.85, 1], [1, 0]]));
    if (c.is3d) {
      const y = 460;
      return [
        // big snowflakes, turning as they fall
        c.sys(c.env3d({ tex: 'snowflake', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 10,
          speed: 0, life: [(y / 70) * 0.9, y / 70], size: [14, 20], rotation: [0, 6.28], color: '#ffffff',
          behaviors: [c.gravity(175), c.limitSpeed(70, 1), c.noise(0.6, 26), c.spin(-1.2, 1.2), c.colorOverLife(c.fadeInOut(0.06, 0.92))], order: 1 }, { w: 1300, y })),
        // soft small snow
        c.sys(c.env3d({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 18,
          speed: 0, life: [(y / 55) * 0.9, y / 55], size: [5, 8], color: '#ffffff',
          behaviors: [c.gravity(140), c.limitSpeed(55, 1), c.noise(0.6, 20), c.colorOverLife(c.fadeInOut(0.06, 0.92))], order: 0 }, { w: 1300, y })),
        // fairy lights floating at different heights
        ...lights.map((colour, i) => c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 4,
          speed: 0, life: [2, 3.5], size: [16, 26], color: [c.lighten(colour, 0.4), colour],
          behaviors: [c.noise(0.5, 20), twinkle()], order: 2 }, { w: 1000, y: 40 + i * 30 }))),
        c.sys(c.env3d({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 3,
          speed: 0, life: [1, 1.8], size: [12, 20], rotation: [0, 0.8], color: '#ffffff',
          behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }, { w: 900, y: 90 })),
      ];
    }
    const w = c.view.w + 80;
    // fall speed decides how long a flake needs to cross the whole screen
    const nearLife = (c.view.h + 60) / 70, farLife = (c.view.h + 60) / 50;
    return [
      c.sys({ tex: 'snowflake', blend: 'normal', loop: true, prewarm: true, duration: nearLife, rate: 2.5, shape: { type: 'rect', w, h: 0 }, offset: [0, 30],
        speed: 0, life: [nearLife * 0.85, nearLife], size: [12, 18], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.gravity(175), c.limitSpeed(70, 1), c.noise(0.6, 24), c.spin(-1.2, 1.2), c.colorOverLife(c.fadeInOut(0.04, 0.9))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: farLife, rate: 5, shape: { type: 'rect', w, h: 0 }, offset: [0, 30],
        speed: 0, life: [farLife * 0.85, farLife], size: [5, 8], color: '#ffffff',
        behaviors: [c.gravity(125), c.limitSpeed(50, 1), c.noise(0.6, 18), c.colorOverLife(c.fadeInOut(0.04, 0.9))], order: 0 }),
      // fairy lights all over the screen (the effect sits at the top edge, so the area hangs below it)
      ...lights.map((colour, i) => c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 2,
        shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 }, offset: [0, -c.view.h / 2],
        speed: 0, life: [2, 3.5], size: [14, 22], color: [c.lighten(colour, 0.4), colour],
        behaviors: [c.noise(0.5, 16), twinkle()], order: 2 })),
      c.sys({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 2,
        shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 }, offset: [0, -c.view.h / 2],
        speed: 0, life: [1, 1.8], size: [10, 16], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }),
    ];
  },
};
