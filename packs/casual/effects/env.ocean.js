/** An ocean breeze: soft sea-spray mist rolls across, white foam flecks fly along on the wind and droplets are flung up off the waves, with sun glints on the spray. Loops until stopped. */
export default {
  name: 'env.ocean',
  category: 'env',
  whenToUse: 'By the sea (a beach, a harbour or pier, a ship deck, a pirate or sailing game, a lighthouse cliff, a surfing or fishing level); play it once without a position (over the lower part of the screen in 2D, around the camera in 3D), set dir 180 in 2D to blow the breeze leftward or pass direction: [x, y, z] or a dir compass heading in 3D, and use vehicle.wake for a boat\'s own wake, env.fog for still fog or env.wind for plain wind.',
  duration: 6, loop: true, anchor: 'bottom', tint: '#e6f7ff',
  tags: ['ocean', 'sea', 'beach', 'spray', 'foam', 'breeze', 'pirate', 'coast'],
  build(c) {
    const col = c.color('#e6f7ff');
    const sea = c.mix(col, '#9fd6ff', 0.35);
    const dir = c.dir === undefined ? 0 : c.dir;
    const sign = Math.cos(dir) >= 0 ? 1 : -1;
    // 3D: the breeze is a world direction on the ground; 2D: a push left or right
    const blow = c.is3d ? c.heading(0) : null;
    const push = (x, y) => (c.is3d ? c.wind(blow, x) : c.force(sign * x, y));
    const mistA = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.16, 0.3], [0.16, 0.7], [0, 1]]));
    const mist = (rate, size) => ({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 6, rate,
      speed: 0, life: [6, 8], size, rotation: [0, 6.28], color: sea,
      behaviors: [push(30, 0), c.limitSpeed(40, 1), c.noise(0.3, 20), c.spin(-0.15, 0.15), mistA()], order: 0 });
    const flecks = (rate) => ({ tex: 'disc', blend: 'normal', loop: true, prewarm: true, duration: 6, rate,
      speed: 0, life: [2.6, 3.4], size: c.is3d ? [4, 7] : [2.5, 5], color: [col, sea],
      behaviors: [push(500, 40), c.limitSpeed(190, 1), c.noise(1.4, c.is3d ? 30 : 22), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 3 });
    // spray: droplets flung up off the waves, carried along and falling back
    const spray = (rate, bursts) => ({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 6, rate, bursts,
      speed: [170, 300], life: [0.7, 1.0], size: [4, 6], color: col, stretch: { speed: 0.015, length: 1.3 },
      behaviors: [c.gravity(650), push(220, 0), c.colorOverLife(c.fade(0.6))], order: 2 });
    const glints = (rate) => ({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 6, rate,
      speed: 0, life: [0.35, 0.6], size: [7, 13], rotation: [0, 0.8], color: '#ffffff',
      behaviors: [push(60, 0), c.sizeOverLife(c.pop(0.3, 0.45))], order: 4 });
    if (c.is3d) {
      return [
        c.sys(c.env3d(mist(2.5, [320, 480]), { w: 1500, y: 50 })),
        c.sys(Object.assign(c.env3d(spray(40, [{ time: 1.5, count: 30 }, { time: 4.2, count: 26 }]), { w: 1300, y: 3 }), { shape: { type: 'cone', radius: 650, angle: 0.15 } })),
        c.sys(c.env3d(flecks(40), { w: 1300, y: 60 })),
        c.sys(c.env3d(glints(14), { w: 1200, y: 8 })),
      ];
    }
    const w = c.view.w, h = c.view.h, x0 = -sign * (w / 2 + 40);
    return [
      c.sys(Object.assign(mist(1.3, [220, 330]), { shape: { type: 'rect', w: w + 240, h: h * 0.55, thickness: 1 }, offset: [0, h * 0.26] })),
      // spray off a wide strip along the bottom: a cone aimed up, so droplets arc up and fall back
      c.sys(Object.assign(spray(16, [{ time: 1.5, count: 10 }, { time: 4.2, count: 12 }]), { shape: { type: 'cone', radius: w / 2 + 30, angle: 0.2 }, dir: Math.PI / 2, offset: [0, -6] })),
      c.sys(Object.assign(flecks(14), { shape: { type: 'rect', w: 0, h: h * 0.6 }, offset: [x0, h * 0.3] })),
      c.sys(Object.assign(glints(5), { shape: { type: 'rect', w, h: h * 0.3, thickness: 1 }, offset: [0, h * 0.15] })),
    ];
  },
};
