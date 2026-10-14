/** Soft white feathers drift down slowly, rocking and swaying, with little wisps of down floating between them. Loops until stopped. */
export default {
  name: 'env.feathers',
  category: 'env',
  whenToUse: 'Feathers floating in the air (a pillow fight, a bird flock or a scared chicken just passed, an angel or heaven scene, a peaceful dream, a bird-themed level); play it once without a position (whole screen in 2D, around the camera in 3D), tint it for coloured or dark crow feathers, and use env.leaves for leaves or env.petals for blossom petals.',
  duration: 12, loop: true, anchor: 'top', tint: '#ffffff',
  tags: ['feathers', 'pillow fight', 'birds', 'angel', 'heaven', 'soft', 'dream', 'calm'],
  build(c) {
    const col = c.color('#ffffff');
    const shade = c.mix(col, '#d5e0ec', 0.35);
    // a feather: falls slowly, sways side to side on the air and turns as it goes (a fresh list for every system)
    const sway = (v, drift, turn) => [c.gravity(v * 1.6), c.limitSpeed(v, 1.5), c.noise(0.8, drift), c.spin(-turn, turn), c.colorOverLife(c.fadeInOut(0.05, 0.9))];
    const feather = (rate, size, colour, life, v, drift, order) => ({ tex: 'leaf', blend: 'normal', loop: true, prewarm: true, duration: 12, rate,
      speed: 0, life, size, rotation: [0, 6.28], color: colour, behaviors: sway(v, drift, 1.4), order });
    // down: tiny fluffy wisps that barely sink
    const down = (rate, life) => ({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 12, rate,
      speed: 0, life, size: [6, 10], rotation: [0, 6.28], color: col,
      behaviors: [c.gravity(40), c.limitSpeed(30, 1), c.noise(1.2, 30), c.spin(-0.8, 0.8), c.colorOverLife(c.fadeInOut(0.15, 0.8))], order: 2 });
    if (c.is3d) {
      const y = 460;
      return [
        c.sys(c.env3d(feather(7, [10, 14], shade, [(y / 50) * 0.92, y / 50], 50, 34, 0), { w: 1300, y })),
        c.sys(c.env3d(feather(8, [20, 28], [col, shade], [(y / 70) * 0.92, y / 70], 70, 44, 1), { w: 1300, y })),
        c.sys(c.env3d(down(8, [6, 8]), { w: 1100, y: 250 })),
      ];
    }
    const w = c.view.w + 80, h = c.view.h;
    const top = { type: 'rect', w, h: 0 };
    return [
      c.sys(Object.assign(feather(2.5, [12, 16], shade, [12, 15], 50, 32, 0), { shape: top, offset: [0, 30] })),
      c.sys(Object.assign(feather(2, [22, 30], [col, shade], [10, 13], 70, 44, 1), { shape: top, offset: [0, 30] })),
      c.sys(Object.assign(down(3, [8, 11]), { shape: { type: 'rect', w: c.view.w, h: h * 0.9, thickness: 1 }, offset: [0, -h * 0.5] })),
    ];
  },
};
