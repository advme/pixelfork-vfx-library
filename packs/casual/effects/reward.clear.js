/** Level clear: fireworks popping around the screen plus falling confetti. */
export default {
  name: 'reward.clear',
  area: true,
  category: 'reward',
  whenToUse: 'Level complete, stage clear, game won. A whole-screen celebration. Play once when the result screen appears.',
  duration: 4.0,
  loop: false,
  anchor: 'center',
  tint: null,
  tags: ['clear', 'win', 'level complete', 'fireworks', 'celebration', 'victory'],
  build(c) {
    const palette = c.tint ? [c.tint, c.lighten(c.tint, 0.5)] : ['#ff4d6d', '#ffd23f', '#3dd6ff', '#7cff6b', '#c77dff', '#ff9f43'];
    if (c.is3d) {
      // 3D: fireworks bursting in the sky around the player, confetti falling through the scene
      const out = [];
      for (let i = 0; i < 7; i++) {
        const colour = palette[i % palette.length], light = c.lighten(colour, 0.6), t = i * 0.32;
        const off = [(Math.random() - 0.5) * 760, 240 + Math.random() * 220, (Math.random() - 0.5) * 760];
        out.push(
          c.sys({ tex: 'glow', blend: 'add', in3d: true, soft: false, bursts: [{ time: t, count: 1 }], life: 0.25, size: 170, color: light, offset: off, duration: 3,
            behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
          c.sys({ tex: 'glow', blend: 'add', in3d: true, soft: false, bursts: [{ time: t, count: 44 }], shape: { type: 'sphere', radius: 4, thickness: 0 }, offset: off, duration: 3,
            speed: [330, 430], life: [0.9, 1.3], size: [8, 12], color: [light, colour], stretch: { speed: 0.03, length: 1.5 },
            behaviors: [c.gravity(330), c.speedOverLife(c.curve([[0, 1], [0.4, 0.3], [1, 0.1]])), c.colorOverLife(c.fade(0.6)), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]]))], order: 1 }));
      }
      const y = 480;
      palette.forEach((colour, i) => out.push(c.sys(c.env3d({ tex: 'square', blend: 'normal', rate: 22, duration: 2.2,
        speed: 0, life: [(y / 175) * 0.9, y / 175], size: [9, 15], rotation: [0, 6.28], color: colour,
        behaviors: [c.gravity(700), c.limitSpeed(175, 1.5), c.noise(2.5, 22), c.spin(-9, 9), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: 3 + i }, { w: 1000, y }))));
      return out;
    }
    const w = c.view.w, h = c.view.h;
    const systems = [];
    // 6 fireworks at random spots, staggered
    for (let i = 0; i < 6; i++) {
      const colour = palette[i % palette.length];
      const light = c.lighten(colour, 0.6);
      const off = [(Math.random() - 0.5) * w * 0.8, (Math.random() - 0.2) * h * 0.6];
      const t = i * 0.35;
      systems.push(
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: 1 }], life: 0.25, size: 140, color: light, offset: off, duration: 3,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: 30 }], shape: { type: 'circle', radius: 4, thickness: 0, even: true }, offset: off, duration: 3,
          speed: [350, 450], life: [0.9, 1.3], size: [7, 11], color: [light, colour],
          stretch: { speed: 0.03, length: 1.5 },
          behaviors: [c.gravity(350), c.speedOverLife(c.curve([[0, 1], [0.4, 0.3], [1, 0.1]])), c.colorOverLife(c.fade(0.6)), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]]))], order: 1 })
      );
    }
    // confetti from the top
    palette.forEach((colour, i) => systems.push(
      c.sys({ tex: 'square', blend: 'normal', rate: 14, duration: 2.2, shape: { type: 'rect', w: w + 40, h: 0 }, dir: -Math.PI / 2, offset: [0, h / 2 + 30],
        speed: [0, 40], life: [2.5, 3.5], size: [9, 15], rotation: [0, 6.28], color: colour,
        behaviors: [c.gravity(700), c.limitSpeed(190, 1.5), c.noise(2.5, 22), c.spin(-9, 9), c.colorOverLife(c.fade(0.85))], order: 3 + i })));
    return systems;
  },
};
