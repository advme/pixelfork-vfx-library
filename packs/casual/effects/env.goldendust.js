/** Golden dust: warm gold motes float slowly up through a soft golden haze, with fine glitter, tumbling gold-leaf flakes and little glints twinkling. Loops until stopped. */
export default {
  name: 'env.goldendust',
  category: 'env',
  whenToUse: 'A warm, rich golden mood behind a win or victory screen, a shop or store, a treasure room or vault, a royal hall, a jackpot or daily-reward screen, a rich golden menu: play it once without a position (whole screen in 2D, the area around the camera in 3D); for a one-off rain of coins use reward.coinshower, for plain indoor dust use env.dust, for fire embers env.embers, for purple fairy motes env.magic.',
  duration: 8, loop: true, anchor: 'center', tint: '#ffc83d',
  tags: ['gold', 'golden', 'dust', 'treasure', 'shop', 'win', 'glitter', 'warm', 'rich'],
  build(c) {
    const col = c.color('#ffc83d');
    const light = c.lighten(col, 0.55);
    const warm = c.mix(col, '#ff9a2e', 0.35);
    const deep = c.darken(col, 0.25);
    // 2D: the whole screen (a little taller, so motes rise in from below). 3D: a layer over the area around the camera
    const area = (p, y) => (c.is3d
      ? c.sys(c.env3d(p, { w: 1100, y }))
      : c.sys(Object.assign({ shape: { type: 'rect', w: c.view.w, h: c.view.h + 60, thickness: 1 }, offset: [0, -30] }, p)));
    const k = c.is3d ? 2.2 : 1;
    // area emitters are rects: every layer starts at speed 0 and rises on its force and noise
    return [
      // warm light: big soft glows breathing far behind
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 0.6 * k, speed: 0, life: [6, 8], size: c.is3d ? [300, 460] : [240, 380], color: [warm, col],
        behaviors: [c.force(0, 6), c.limitSpeed(10, 1), c.noise(0.2, 16), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.15, 0.3], [0.15, 0.7], [0, 1]]))], order: 0 }, 90),
      // golden motes floating up, pulsing softly
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 6 * k, speed: 0, life: [4, 6], size: [8, 15], color: [col, light],
        behaviors: [c.force(0, 26), c.limitSpeed(36, 1), c.noise(0.6, 24), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.45, 0.6], [0.7, 1], [1, 0]]))], order: 1 }, 10),
      // gold-leaf flakes tumbling slowly upward (solid, so they read on light backgrounds too)
      area({ tex: 'square', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 2.5 * k, speed: 0, life: [4, 6], size: [5, 9], rotation: [0, 6.28], color: [col, deep],
        behaviors: [c.force(0, 20), c.limitSpeed(28, 1), c.noise(0.8, 22), c.spin(-3, 3), c.colorOverLife(c.fadeInOut(0.15, 0.8))], order: 2 }, 20),
      // fine glitter rising a little faster
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 10 * k, speed: 0, life: [3, 4.5], size: [2, 4], color: c.lighten(col, 0.75),
        behaviors: [c.force(0, 40), c.limitSpeed(55, 1), c.noise(0.9, 26), c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 2 }, 0),
      // glints: little four-point sparkles flashing twice as they float
      area({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 4 * k, speed: 0, life: [0.8, 1.3], size: [12, 22], rotation: [0, 0.8], color: light,
        behaviors: [c.force(0, 14), c.limitSpeed(18, 1), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.38, 0.3], [0.6, 1], [1, 0]]))], order: 3 }, 40),
    ];
  },
};
