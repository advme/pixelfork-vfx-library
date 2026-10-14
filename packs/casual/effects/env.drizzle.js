/** A light drizzle: fine, thin rain falls gently through a soft drifting mist, with tiny ripples where it lands. Loops until stopped. */
export default {
  name: 'env.drizzle',
  category: 'env',
  whenToUse: 'Light rain and a grey, gentle mood (a drizzly morning, a quiet town or forest, a calm or melancholy moment, the start or end of a shower); play it once without a position (whole screen in 2D, around the camera in 3D) and use env.rain for a proper downpour or env.storm for thunder and lightning.',
  duration: 6, loop: true, anchor: 'top', tint: '#cfe6ff',
  tags: ['drizzle', 'light rain', 'rain', 'mist', 'weather', 'grey', 'calm', 'wet'],
  build(c) {
    const col = c.color('#cfe6ff');
    const haze = c.mix(col, '#ffffff', 0.4);
    // seconds to fall h px: speeding up at g until the terminal speed v, then steady
    const fallTime = (h, v, g) => v / g + (h - (v * v) / (2 * g)) / v;
    const fine = (a) => c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.06], [a, 0.88], [0, 1]]);
    // a fine streak: thin and short, so it reads as drizzle and not as a downpour
    const streak = (rate, size, colour, life, v, g, wind, a) => ({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate,
      speed: 0, life, size, color: colour, stretch: { speed: c.is3d ? 0.012 : 0.02, length: 2 },
      behaviors: [c.gravity(g), c.force(wind, 0), c.limitSpeed(v, 2), c.colorOverLife(fine(a))] });
    const mist = (p) => Object.assign({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 6, speed: 0, rotation: [0, 6.28], color: haze,
      behaviors: [c.force(-14, 0), c.limitSpeed(14, 1), c.noise(0.3, 30), c.spin(-0.1, 0.1),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.13, 0.3], [0.13, 0.7], [0, 1]]))] }, p);
    const ripple = (p) => Object.assign({ tex: c.is3d ? 'ring' : 'ellipse', blend: 'add', loop: true, prewarm: true, duration: 6, speed: 0, color: col,
      behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))] }, p);
    if (c.is3d) {
      const y = 520, t = fallTime(y, 650, 3000);
      return [
        c.sys(c.env3d(mist({ rate: 3, life: [6, 8], size: [300, 460] }), { w: 1400, y: 70 })),
        c.sys(c.env3d(streak(170, [2.5, 4], col, [t * 0.97, t * 1.02], 650, 3000, -140, 0.75), { w: 1300, y })),
        c.sys(Object.assign(c.env3d(ripple({ rate: 40, life: [0.3, 0.45], size: [12, 20] }), { w: 1300, y: 1.5 }), { render: 'flat' })),
      ];
    }
    const w = c.view.w + 140, h = c.view.h;
    const line = { type: 'rect', w, h: 0 };
    const t1 = fallTime(h + 40, 650, 3000), t2 = fallTime(h + 40, 480, 2400);
    return [
      c.sys(mist({ rate: 1.2, life: [6, 8], size: [220, 340], shape: { type: 'rect', w: c.view.w + 200, h: h * 0.9, thickness: 1 }, offset: [0, -h * 0.5], order: 0 })),
      c.sys(Object.assign(streak(38, [1.8, 2.6], c.darken(col, 0.15), [t2 * 0.97, t2 * 1.01], 480, 2400, -90, 0.5), { shape: line, offset: [50, 40], order: 1 })),
      c.sys(Object.assign(streak(42, [2.4, 3.4], col, [t1 * 0.97, t1 * 1.01], 650, 3000, -120, 0.8), { shape: line, offset: [50, 40], order: 2 })),
      // tiny ripples along the bottom edge
      c.sys(ripple({ rate: 9, life: [0.35, 0.5], size: [16, 26], shape: { type: 'rect', w: c.view.w, h: 0 }, offset: [0, -h + 14], order: 3 })),
    ];
  },
};
