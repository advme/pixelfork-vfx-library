/** A hailstorm: chunky white ice pellets pelt down fast and hop off the ground, with icy glints where they strike and a cold mist low down. Loops until stopped. */
export default {
  name: 'env.hail',
  category: 'env',
  whenToUse: 'A hailstorm: ice pellets hammering down on a winter or mountain level, a freak storm, an ice boss arena or a weather hazard; play it once without a position (whole screen in 2D, around the camera in 3D) and use env.snow for soft snow, env.blizzard for a snowstorm or env.rain for rain.',
  duration: 3, loop: true, anchor: 'top', tint: '#eef8ff',
  tags: ['hail', 'hailstorm', 'ice', 'storm', 'weather', 'winter', 'cold', 'pellets'],
  build(c) {
    const col = c.color('#eef8ff');
    const far = c.mix(col, '#a9d4ff', 0.35);
    // seconds to fall h px: speeding up at g until the terminal speed v, then steady
    const fallTime = (h, v, g) => v / g + (h - (v * v) / (2 * g)) / v;
    // a pellet: a solid ice ball, stretched a little by its speed
    const pellet = (rate, size, colour, life, v, g, wind) => ({ tex: 'disc', blend: 'normal', loop: true, prewarm: true, duration: 3, rate,
      speed: 0, life, size, color: colour, stretch: { speed: 0.0012, length: 1.1 },
      behaviors: [c.gravity(g), c.force(wind, 0), c.limitSpeed(v, 3), c.colorOverLife(c.fadeInOut(0.03, 0.95))] });
    const glint = (p) => Object.assign({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 3, speed: 0, rotation: [0, 0.8], color: col,
      behaviors: [c.sizeOverLife(c.pop(0.3, 0.4))] }, p);
    if (c.is3d) {
      const y = 520;
      const fall = (rate, size, colour, v, g) => {
        const t = fallTime(y, v, g);
        return c.sys(c.env3d(pellet(rate, size, colour, [t * 0.97, t * 1.03], v, g, -0.14 * g), { w: 1300, y }));
      };
      return [
        fall(120, [8, 11], col, 1100, 6500),
        fall(140, [5, 7], far, 800, 5000),
        // hops: pellets spring off the floor and drop back (a cone lying on the ground shoots straight up)
        c.sys(Object.assign(c.env3d({ tex: 'disc', blend: 'normal', loop: true, prewarm: true, duration: 3, rate: 120,
          speed: [250, 400], life: [0.3, 0.44], size: [6, 9], color: col,
          behaviors: [c.gravity(1800), c.colorOverLife(c.fade(0.75))] }, { w: 1300, y: 2 }), { shape: { type: 'cone', radius: 650, angle: 0.25 } })),
        // little white ticks on the floor where pellets strike
        c.sys(Object.assign(c.env3d({ tex: 'ring', blend: 'add', loop: true, prewarm: true, duration: 3, rate: 50,
          speed: 0, life: [0.16, 0.24], size: [10, 18], color: col,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))] }, { w: 1300, y: 1.5 }), { render: 'flat' })),
        c.sys(c.env3d(glint({ rate: 40, life: [0.12, 0.2], size: [10, 16] }), { w: 1300, y: 5 })),
      ];
    }
    const w = c.view.w + 260, h = c.view.h;
    const line = { type: 'rect', w, h: 0 };
    const fall = (rate, size, colour, v, g, order) => {
      const t = fallTime(h + 30, v, g);
      return c.sys(Object.assign(pellet(rate, size, colour, [t * 0.97, t * 1.01], v, g, -0.14 * g), { shape: line, offset: [110, 30], order }));
    };
    return [
      // a cold mist hugging the bottom
      c.sys({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 3, rate: 1.6, shape: line, offset: [0, -h + 20],
        speed: 0, life: [3, 4], size: [160, 240], rotation: [0, 6.28], color: far,
        behaviors: [c.force(-30, 8), c.limitSpeed(25, 1), c.spin(-0.2, 0.2), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.2, 0.3], [0.2, 0.7], [0, 1]]))], order: 0 }),
      fall(55, [5, 7], far, 850, 4500, 1),
      fall(45, [8, 11], col, 1100, 6000, 3),
      // hops along the bottom edge: a wide cone aimed up, so each pellet springs up and falls back
      c.sys({ tex: 'disc', blend: 'normal', loop: true, prewarm: true, duration: 3, rate: 40, shape: { type: 'cone', radius: c.view.w / 2 + 20, angle: 0.3 }, dir: Math.PI / 2, offset: [0, -h + 4],
        speed: [220, 360], life: [0.25, 0.4], size: [5, 8], color: col,
        behaviors: [c.gravity(1800), c.colorOverLife(c.fade(0.75))], order: 2 }),
      c.sys(glint({ rate: 10, life: [0.15, 0.25], size: [8, 14], shape: { type: 'rect', w: c.view.w, h: 0 }, offset: [0, -h + 8], order: 4 })),
    ];
  },
};
