/** Dust devils: now and then a small whirl of dust spins up off the dry ground, twirls for a moment and dies away, while loose dust skims along in the breeze. Loops until stopped. */
export default {
  name: 'env.dustdevil',
  category: 'env',
  whenToUse: 'A dry, hot, empty landscape where little dust whirls spin up now and then (a desert or wild-west town, a dusty road, a savanna or wasteland, a ghost-town standoff, a drought); play it once without a position (along the bottom of the screen in 2D, on the ground around the camera in 3D), set dir 180 in 2D to blow the breeze leftward or pass direction: [x, y, z] or a dir compass heading in 3D, and use magic.tornado for a whirlwind attack or env.sandstorm for a full storm.',
  duration: 7, loop: true, anchor: 'bottom', tint: '#d9b27a',
  tags: ['dust devil', 'whirlwind', 'desert', 'dust', 'wind', 'western', 'dry', 'wasteland'],
  build(c) {
    const col = c.color('#d9b27a');
    const dark = c.darken(col, 0.3);
    const dir = c.dir === undefined ? 0 : c.dir;
    const sign = Math.cos(dir) >= 0 ? 1 : -1;
    const dustA = (a, inT, outT) => c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, inT], [a, outT], [0, 1]]);
    // a stream that spins up for 0.4 s, holds for 1.4 s and dies down for 0.4 s
    const stream = (t0, n, gap) => [
      { time: t0, count: 1, cycle: Math.round(0.4 / gap), interval: gap },
      { time: t0 + 0.4, count: n, cycle: Math.round(1.4 / gap), interval: gap },
      { time: t0 + 1.8, count: 1, cycle: Math.round(0.4 / gap), interval: gap },
    ];
    // a whirl: cones aimed straight up whose particles orbit the axis (in 2D the spin is seen side-on: dust
    // sweeping left and right as it rises). Orbit turns positions, not velocities, so a fast orbit keeps a
    // particle near its starting radius: the puffs turn slowly and lean outward to open the funnel, while the
    // grit starts on a wide ring and whips round fast to show the spin
    const whirl = (x, z, t0) => {
      const at = c.is3d ? [x, 0, z] : [x, 26];
      const up = (shape, p) => c.sys(c.ground(Object.assign({ loop: true, duration: 7, shape, dir: Math.PI / 2, offset: at }, p)));
      return [
        // dust kicked out along the ground at its foot
        c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, duration: 7, bursts: stream(t0, 1, 0.1), shape: c.is3d ? { type: 'circle', radius: 14 } : { type: 'rect', w: 30, h: 0 }, offset: at,
          speed: [30, 70], life: [0.8, 1.1], size: [18, 28], rotation: [0, 6.28], color: col,
          behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 10), c.sizeOverLife(c.grow(0.5)), c.colorOverLife(dustA(0.45, 0.2, 0.4))], order: 1 })),
        up({ type: 'cone', radius: 6, angle: 1.0 }, { tex: 'puff', blend: 'normal', bursts: stream(t0, 3, 0.06), speed: [80, 120], life: [1.2, 1.6], size: [18, 26], rotation: [0, 6.28], color: [col, c.lighten(col, 0.15)],
          behaviors: [c.orbit(2.6), c.force(0, 90), c.limitSpeed(180, 1), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.6]])), c.colorOverLife(dustA(0.42, 0.2, 0.65))], order: 2 }),
        up({ type: 'cone', radius: 22, angle: 0.6, thickness: 0.3 }, { tex: 'disc', blend: 'normal', bursts: stream(t0, 2, 0.05), speed: [110, 170], life: [1.0, 1.3], size: [2.5, 4.5], color: dark,
          behaviors: [c.orbit(10), c.force(0, 110), c.limitSpeed(240, 1), c.colorOverLife(c.fade(0.6))], order: 3 }),
      ];
    };
    if (c.is3d) {
      const blow = c.heading(0);
      return [
        c.sys(c.env3d({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 7, rate: 3,
          speed: 0, life: [4, 5.5], size: [90, 150], rotation: [0, 6.28], color: col,
          behaviors: [c.wind(blow, 200), c.limitSpeed(110, 1), c.noise(0.6, 20), c.spin(-0.4, 0.4), c.colorOverLife(dustA(0.13, 0.2, 0.75))] }, { w: 1400, y: 30 })),
        c.sys(c.env3d({ tex: 'disc', blend: 'normal', loop: true, prewarm: true, duration: 7, rate: 26,
          speed: 0, life: [2, 3], size: [3, 5], color: dark, stretch: { speed: 0.02, length: 1.5 },
          behaviors: [c.wind(blow, 700), c.limitSpeed(260, 1), c.noise(1.2, 12), c.colorOverLife(c.fadeInOut(0.1, 0.8))] }, { w: 1300, y: 12 })),
        ...whirl(-240, -120, 0.6),
        ...whirl(260, 150, 3.9),
      ];
    }
    const x0 = -sign * (c.view.w / 2 + 60);
    return [
      // the breeze: low dust clouds and grit skimming across the ground
      c.sys({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 7, rate: 1.6, shape: { type: 'rect', w: 0, h: 120 }, offset: [x0, 60],
        speed: 0, life: [4, 5.5], size: [50, 90], rotation: [0, 6.28], color: col,
        behaviors: [c.force(sign * 200, 0), c.limitSpeed(110, 1), c.noise(0.6, 14), c.spin(-0.4, 0.4), c.colorOverLife(dustA(0.2, 0.22, 0.75))], order: 0 }),
      c.sys({ tex: 'disc', blend: 'normal', loop: true, prewarm: true, duration: 7, rate: 9, shape: { type: 'rect', w: 0, h: 140 }, offset: [x0, 70],
        speed: 0, life: [2.2, 3], size: [2, 3.5], color: dark, stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.force(sign * 600, 0), c.limitSpeed(240, 1), c.noise(1.2, 10), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 4 }),
      ...whirl(-c.view.w * 0.24, 0, 0.6),
      ...whirl(c.view.w * 0.27, 0, 3.9),
    ];
  },
};
