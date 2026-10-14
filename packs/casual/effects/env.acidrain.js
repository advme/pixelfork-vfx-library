/** Acid rain: glowing green rain slants down over the whole screen and sizzles where it lands, with little hissing splashes, bright fizz glints, spreading ripples, wisps of steam and a sickly haze along the ground. Loops until stopped. */
export default {
  name: 'env.acidrain',
  category: 'env',
  whenToUse: 'Poisonous rain over a level: a toxic wasteland, a post-apocalyptic or radioactive city, an alien planet, a chemical-disaster zone, a mutant or zombie level, an acid weather hazard: play it once without a position (whole screen in 2D, the area around the camera in 3D) and stop it when the storm passes (tint it for other poisons); for ordinary rain use env.rain, for a toxic swamp with bubbles env.toxic, for a poison spell magic.poison.',
  duration: 4, loop: true, anchor: 'top', tint: '#a6ff2e',
  tags: ['acid rain', 'acid', 'toxic', 'rain', 'poison', 'radioactive', 'weather', 'wasteland'],
  build(c) {
    const col = c.color('#a6ff2e');
    const far = c.darken(col, 0.3);
    const hot = c.lighten(col, 0.5);
    const steam = c.mix(col, '#eaffdf', 0.55);
    // seconds to fall h px: speeding up at g until the terminal speed v, then steady
    const fallTime = (h, v, g) => v / g + (h - (v * v) / (2 * g)) / v;
    const drops = (rate, size, colour, life, v, g, wind, stretch, order) => ({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 4, rate,
      speed: 0, life, size, color: colour, stretch,
      behaviors: [c.gravity(g), c.force(wind, 0), c.limitSpeed(v, 2), c.colorOverLife(c.fadeInOut(0.05, 0.92))], order });
    const ripple = (p) => Object.assign({ tex: c.is3d ? 'ring' : 'ellipse', blend: 'add', loop: true, prewarm: true, duration: 4, speed: 0, color: col,
      behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))] }, p);
    const fizz = (p) => Object.assign({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 4, speed: 0, rotation: [0, 0.8], color: hot,
      behaviors: [c.sizeOverLife(c.pop(0.25, 0.4))] }, p);
    // a wisp of steam hissing up off the ground
    const wisp = (p) => Object.assign({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 4, speed: 0, rotation: [0, 6.28], color: steam,
      behaviors: [c.force(0, 120), c.limitSpeed(55, 1), c.noise(0.8, 16), c.spin(-1, 1), c.sizeOverLife(c.grow(0.4)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.32, 0.15], [0, 1]]))] }, p);
    const haze = (p) => Object.assign({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 4, speed: 0, rotation: [0, 6.28], color: steam,
      behaviors: [c.force(-10, 20), c.limitSpeed(18, 1), c.noise(0.3, 16), c.spin(-0.2, 0.2), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.2, 0.25], [0.2, 0.7], [0, 1]]))] }, p);
    // splashes: drops of acid springing up off the ground and falling back
    const hop = (p) => Object.assign({ tex: 'disc', blend: 'add', loop: true, prewarm: true, duration: 4, color: [col, hot],
      behaviors: [c.gravity(1600), c.colorOverLife(c.fade(0.6))] }, p);
    if (c.is3d) {
      const y = 600, t = fallTime(y, 1300, 8000);
      return [
        c.sys(c.env3d(haze({ rate: 3, life: [3, 4.5], size: [220, 340] }), { w: 1300, y: 30 })),
        c.sys(c.env3d(drops(300, [3, 5], [col, far], [t * 0.97, t * 1.02], 1300, 8000, -320, { speed: 0.007, length: 2 }, 1), { w: 1300, y })),
        // a cone lying on the ground shoots straight up
        c.sys(Object.assign(c.env3d(hop({ rate: 90, speed: [140, 240], life: [0.24, 0.36], size: [4, 7] }), { w: 1300, y: 2 }), { shape: { type: 'cone', radius: 650, angle: 0.35 }, order: 3 })),
        c.sys(Object.assign(c.env3d(ripple({ rate: 50, life: [0.25, 0.38], size: [16, 28] }), { w: 1300, y: 1.5 }), { render: 'flat', order: 2 })),
        c.sys(c.env3d(fizz({ rate: 40, life: [0.12, 0.2], size: [9, 15], order: 4 }), { w: 1300, y: 5 })),
        c.sys(c.env3d(wisp({ rate: 24, life: [0.7, 1], size: [20, 34], order: 5 }), { w: 1200, y: 4 })),
      ];
    }
    const w = c.view.w + 220, h = c.view.h;
    const line = { type: 'rect', w, h: 0 };
    const floor = { type: 'rect', w: c.view.w, h: 0 };
    const t1 = fallTime(h + 60, 1300, 6000), t2 = fallTime(h + 60, 950, 4500);
    return [
      // a sickly steam haze along the bottom
      c.sys(haze({ rate: 2.2, life: [3, 4.5], size: [100, 170], shape: { type: 'rect', w: c.view.w + 100, h: 0 }, offset: [0, -h + 20], order: 0 })),
      // far rain (thinner and darker), then near rain; the emitters sit right of centre because the wind pushes them left
      c.sys(Object.assign(drops(55, [3, 4.5], far, [t2 * 0.97, t2 * 1.01], 950, 4500, -300, { speed: 0.02, length: 2 }, 1), { shape: line, offset: [70, 60] })),
      c.sys(Object.assign(drops(65, [4, 6.5], col, [t1 * 0.97, t1 * 1.01], 1300, 6000, -420, { speed: 0.026, length: 2.6 }, 2), { shape: line, offset: [80, 60] })),
      // along the bottom edge: ripples spreading, splashes hopping (a wide cone aimed up), fizz and steam
      c.sys(ripple({ rate: 16, life: [0.22, 0.32], size: [16, 26], shape: floor, offset: [0, -h + 10], order: 3 })),
      c.sys(hop({ rate: 45, shape: { type: 'cone', radius: c.view.w / 2 + 20, angle: 0.35 }, dir: Math.PI / 2, offset: [0, -h + 4], speed: [120, 220], life: [0.2, 0.32], size: [3, 5], order: 3 })),
      c.sys(fizz({ rate: 18, life: [0.1, 0.18], size: [7, 12], shape: floor, offset: [0, -h + 8], order: 4 })),
      c.sys(wisp({ rate: 10, life: [0.6, 0.9], size: [16, 28], shape: floor, offset: [0, -h + 10], order: 5 })),
    ];
  },
};
