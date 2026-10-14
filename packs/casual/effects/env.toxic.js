/** A toxic swamp: murky green haze hangs low and glows, toxic bubbles rise, swell and pop, sickly fumes curl up and little green specks float in the air. Loops until stopped. */
export default {
  name: 'env.toxic',
  category: 'env',
  whenToUse: 'A poisonous place that stays toxic: a toxic swamp or bog, a radioactive waste dump, a sewer, a chemical plant or mad-science lab, a zombie or mutant wasteland, a poison-gas zone: play it once without a position (rising from the bottom of the screen in 2D, from the ground around the camera in 3D) and tint it for purple poison or orange chemicals; for falling acid use env.acidrain, for a gas bomb going off explosion.toxic, for clean underwater bubbles env.bubbles, for glowing mushroom spores env.spores.',
  duration: 6, loop: true, anchor: 'bottom', tint: '#7dff3a',
  tags: ['toxic', 'poison', 'swamp', 'radioactive', 'waste', 'sewer', 'bubbles', 'gas'],
  build(c) {
    const col = c.color('#7dff3a');
    const murk = c.darken(col, 0.55);
    const fume = c.mix(col, '#e8ffd8', 0.45);
    const hot = c.lighten(col, 0.45);
    const wash = (a, inT, outT) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, inT], [a, outT], [0, 1]]));
    // a bubble rises, swells a little, then bursts: a quick blow-up and gone
    const bubble = () => c.sizeOverLife(c.curve([[0, 0.2], [0.12, 1], [0.84, 1.08], [0.93, 1.4], [1, 0]]));
    const rise = (up, wobble) => [c.force(0, up * 2), c.limitSpeed(up, 1), c.noise(1.1, wobble)];
    const layers = {
      // dark murk rolling slowly along the ground
      murk: { tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 6, speed: 0, life: [5, 7], rotation: [0, 6.28], color: murk,
        behaviors: [c.force(10, 4), c.limitSpeed(12, 1), c.noise(0.2, 16), c.spin(-0.15, 0.15), wash(0.32, 0.25, 0.7)], order: 0 },
      // a sickly green glow hanging over it
      glow: { tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, speed: 0, life: [5, 7], color: col,
        behaviors: [c.noise(0.2, 18), wash(0.16, 0.3, 0.7)], order: 1 },
      // fumes curling up and spreading
      fumes: { tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 6, speed: 0, life: [4, 5.5], rotation: [0, 6.28], color: fume,
        behaviors: [c.force(0, 40), c.limitSpeed(28, 1), c.noise(0.5, 18), c.spin(-0.3, 0.3), c.sizeOverLife(c.grow(0.5)), wash(0.2, 0.2, 0.6)], order: 2 },
      // toxic bubbles: a light outline and a glowing blob, rising and popping
      rings: { tex: 'ring', blend: 'normal', loop: true, prewarm: true, duration: 6, speed: 0, life: [1.8, 3.2], size: [10, 24], color: hot,
        behaviors: rise(55, 16).concat([bubble(), c.colorOverLife(c.fadeInOut(0.1, 0.9))]), order: 3 },
      blobs: { tex: 'disc', blend: 'add', loop: true, prewarm: true, duration: 6, speed: 0, life: [1.6, 2.8], size: [6, 14], color: col,
        behaviors: rise(48, 14).concat([bubble(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.15], [0.5, 0.9], [0, 1]]))]), order: 3 },
      // pops: little rings bursting open in the air
      pops: { tex: 'ring', blend: 'add', loop: true, prewarm: true, duration: 6, speed: 0, life: [0.16, 0.24], size: [16, 30], color: hot,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 4 },
      // tiny glowing specks drifting up
      specks: { tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, speed: 0, life: [3, 4.5], size: [2.5, 5], color: [col, hot],
        behaviors: [c.force(0, 30), c.limitSpeed(26, 1), c.noise(0.8, 20), c.colorOverLife(c.fadeInOut(0.2, 0.75))], order: 5 },
    };
    const L = (name, p) => Object.assign({}, layers[name], p);
    if (c.is3d) {
      const at = (p, a) => c.sys(c.env3d(p, Object.assign({ w: 1200 }, a)));
      return [
        at(L('murk', { rate: 4, size: [260, 400] }), { y: 20 }),
        at(L('glow', { rate: 1.8, size: [320, 480] }), { y: 60 }),
        at(L('fumes', { rate: 5, size: [70, 120] }), { y: 10, w: 1100 }),
        at(L('rings', { rate: 16, size: [14, 30] }), { y: 6, w: 1000 }),
        at(L('blobs', { rate: 12, size: [8, 18] }), { y: 6, w: 1000 }),
        at(L('pops', { rate: 14, size: [20, 36] }), { y: 120, w: 1000 }),
        at(L('specks', { rate: 18 }), { y: 20, w: 1100 }),
      ];
    }
    const w = c.view.w, h = c.view.h;
    const ground = { type: 'rect', w: w + 120, h: 0 };
    // bubbles start anywhere in the lower part of the screen and pop before they reach the middle
    const low = { type: 'rect', w, h: h * 0.4, thickness: 1 };
    return [
      c.sys(L('murk', { rate: 1.6, size: [160, 260], shape: ground, offset: [0, 30] })),
      c.sys(L('glow', { rate: 0.8, size: [180, 300], shape: { type: 'rect', w, h: h * 0.45, thickness: 1 }, offset: [0, h * 0.2] })),
      c.sys(L('fumes', { rate: 1.6, size: [50, 90], shape: ground, offset: [0, 10] })),
      c.sys(L('rings', { rate: 5, shape: low, offset: [0, h * 0.18] })),
      c.sys(L('blobs', { rate: 3.5, shape: low, offset: [0, h * 0.18] })),
      c.sys(L('pops', { rate: 6, shape: { type: 'rect', w, h: h * 0.4, thickness: 1 }, offset: [0, h * 0.32] })),
      c.sys(L('specks', { rate: 7, shape: { type: 'rect', w, h: h * 0.6, thickness: 1 }, offset: [0, h * 0.28] })),
    ];
  },
};
