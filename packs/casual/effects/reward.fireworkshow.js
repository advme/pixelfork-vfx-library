/** A fireworks show: six rockets climb on sparkling trails one after another and burst at different heights in different colours, ending in a big gold finale that crackles. */
export default {
  name: 'reward.fireworkshow',
  category: 'reward',
  whenToUse: 'A grand celebration that deserves a whole show: New Year, a festival night, a championship or tournament won, a park or castle closing show, a wedding. Play it on the ground under the show (or low on the screen); the rockets climb 200-340 px before they burst. For a single firework use explosion.firework; for a full win screen with confetti use reward.clear.',
  duration: 2.5, loop: false, anchor: 'feet', tint: null,
  tags: ['fireworks', 'show', 'new year', 'festival', 'celebration', 'night', 'rockets', 'victory'],
  build(c) {
    const palette = c.tint
      ? [c.tint, c.lighten(c.tint, 0.45), c.darken(c.tint, 0.15)]
      : ['#ff4d6d', '#3dd6ff', '#7cff6b', '#c77dff', '#ff9f43'];
    const gold = c.tint ? c.lighten(c.tint, 0.6) : c.rgb('#ffd23f');
    // 3D: the show spreads around the spot in depth too
    const at = (x, y, z) => (c.is3d ? [x, y, z] : [x, y]);
    // every rocket climbs for `rise` seconds at a steady speed, then bursts exactly where it stops
    const rise = 0.45;
    // the rocket's head starts this far above the launch point (its streak fills the gap)
    const lift = 60;
    // [launch time, x, burst height, z (3D only), scale]
    const shells = [[0, -110, 230, 40, 1], [0.2, 100, 290, -60, 1], [0.4, -20, 330, 0, 1], [0.6, 150, 210, 70, 0.9], [0.78, -150, 300, -40, 1], [0.95, 20, 260, 0, 1.35]];
    const out = [];
    // flashes and the ring are flat pictures; in3d keeps them on the same world spot as the 3D bursts
    shells.forEach(([t, x, h, z, k], i) => {
      const last = i === shells.length - 1;
      const colour = last ? gold : c.rgb(palette[i % palette.length]);
      const light = c.lighten(colour, 0.6);
      const v = h / rise, tb = t + rise, base = at(x, 0, z), top = at(x, h, z);
      out.push(
        // the rocket. Its streak trails back about 60 px, so it starts that far up and fades in: no tail pokes below the ground
        c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: 1 }], shape: { type: 'cone', radius: 1, angle: 0.02 }, dir: Math.PI / 2, offset: at(x, lift, z), duration: 2,
          speed: (h - lift) / rise, life: rise, size: 7, color: '#fff3c4', stretch: { speed: 0.012, length: 2 },
          behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.2], [1, 1]]))], order: 3 })),
        // its sparkling trail: launched with it but slower, so it strings out behind
        c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: 8 }], shape: { type: 'cone', radius: 2, angle: 0.06 }, dir: Math.PI / 2, offset: base, duration: 2,
          speed: [v * 0.45, v * 0.95], life: [rise * 0.9, rise * 1.3], size: [3, 5], color: gold,
          behaviors: [c.gravity(400), c.colorOverLife(c.fade(0.3))], order: 2 })),
        c.sys({ tex: 'glow', blend: 'add', in3d: c.is3d, bursts: [{ time: tb, count: 1 }], offset: top, duration: 2, life: 0.22, size: 150 * k, color: light,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
        c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: tb, count: Math.round(26 * k) }], shape: { type: 'circle', radius: 4, thickness: 0, even: true }, offset: top, duration: 2,
          speed: [300 * k, 400 * k], life: [0.8, 1.05], size: [7, 10], color: [light, colour], stretch: { speed: 0.02, length: 1.4 },
          behaviors: [c.gravity(300), c.speedOverLife(c.curve([[0, 1], [0.4, 0.3], [1, 0.1]])), c.colorOverLife(c.fade(0.6)), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]]))], order: 2 })),
        c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: tb, count: Math.round(8 * k) }], shape: { type: 'circle', radius: 4 }, offset: top, duration: 2,
          speed: [120 * k, 320 * k], life: [0.8, 1.05], size: [8, 13], color: light,
          behaviors: [c.gravity(250), c.speedOverLife(c.curve([[0, 1], [0.4, 0.2], [1, 0.05]])), c.sizeOverLife(c.curve([[0, 0], [0.5, 1], [0.7, 0.2], [0.85, 1], [1, 0]]))], order: 4 })),
      );
      if (last) {
        out.push(
          c.sys({ tex: 'ring', blend: 'add', in3d: c.is3d, bursts: [{ time: tb, count: 1 }], offset: top, duration: 2, life: 0.45, size: 320, color: light,
            behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
          // the crackle: white glitter popping all over the finale
          c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: tb + 0.3, count: 9 }, { time: tb + 0.42, count: 9 }], shape: { type: 'circle', radius: 120 }, offset: top, duration: 2,
            speed: [0, 20], life: [0.25, 0.4], size: [10, 16], rotation: [0, 0.8], color: '#ffffff',
            behaviors: [c.gravity(200), c.sizeOverLife(c.pop(0.2, 0.4))], order: 5 })),
        );
      }
    });
    return out;
  },
};
