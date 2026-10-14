/** Candy fall: round gumballs, candy buttons, candy stars and hearts in bright sweet colours drift gently down, swaying and spinning, with rainbow sprinkles, sugar sparkles and a soft pink glow behind. Loops until stopped. */
export default {
  name: 'env.candy',
  category: 'env',
  whenToUse: 'A sweet, candy-themed mood that stays on: a candy or sweets level, a match-3 or candy-crush style menu or map, a bakery, sweet shop or ice-cream game, a sugar land in a kids game: play it once without a position (falling from the top of the screen in 2D, over the area around the camera in 3D); tint it for candy of one colour (no tint keeps the mix); for a one-off candy burst use explosion.candy, for rainbow sparkles without the sweets env.rainbowsparkle, for party confetti env.confetti.',
  duration: 6, loop: true, anchor: 'top', tint: null,
  tags: ['candy', 'sweets', 'sprinkles', 'sugar', 'match3', 'dessert', 'cute', 'kids'],
  build(c) {
    const pal = c.tint
      ? [c.tint, c.lighten(c.tint, 0.4), c.darken(c.tint, 0.2), c.lighten(c.tint, 0.65), c.mix(c.tint, '#ffffff', 0.2), c.darken(c.tint, 0.35)]
      : ['#ff5fa2', '#ffd23a', '#45e0b2', '#4fb0ff', '#b57cff', '#ff8a3d'].map(c.rgb);
    const pale = c.lighten(pal[0], 0.6);
    // seconds to fall h px: speeding up at g until the terminal speed v, then steady
    const fallTime = (h, v, g) => v / g + (h - (v * v) / (2 * g)) / v;
    const g = 300;
    // a fresh list for every system: fall gently, sway, spin
    const fall = (v, sway, turn) => [c.gravity(g), c.limitSpeed(v, 1.5), c.noise(1.2, sway), c.spin(-turn, turn), c.colorOverLife(c.fadeInOut(0.03, 0.93))];
    // 2D: born on a line just above the top edge and falling to just below the bottom. 3D: over the area around the camera
    const h = c.is3d ? 430 : c.view.h + 70;
    const top = c.is3d ? null : { type: 'rect', w: c.view.w + 60, h: 0 };
    const k = c.is3d ? 2.4 : 1;
    const drop = (p, v, extra) => {
      const t = fallTime(h, v, g);
      // the cycle is at least one fall long, so the prewarm fills the whole screen
      const q = Object.assign({ blend: 'normal', loop: true, prewarm: true, duration: Math.max(6, Math.ceil(t)), speed: 0, life: [t, t * 1.06] }, p);
      q.rate = q.rate * k;
      if (c.is3d) {
        const r = extra ? extra(q) : q;
        return r ? c.sys(c.env3d(r, { w: 1100, y: h })) : null;
      }
      return c.sys(Object.assign(q, { shape: top, offset: [0, 35] }));
    };
    // 3D only: gumballs are real balls and sprinkles real little rods, tumbling as they fall
    const ball = c.is3d ? (q) => c.chunks(q, 'ball') : null;
    const rod = c.is3d ? (q) => c.chunks(q, 'plank') : null;
    const out = [];
    // a soft sweet glow far behind (2D: anywhere on the screen)
    out.push(c.is3d
      ? c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 1, speed: 0, life: [6, 8], size: [300, 460], color: [pale, c.lighten(pal[1], 0.6)],
        behaviors: [c.noise(0.2, 14), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.12, 0.3], [0.12, 0.7], [0, 1]]))], order: 0 }, { w: 1100, y: 160 }))
      : c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 0.45, shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 }, offset: [0, -c.view.h / 2],
        speed: 0, life: [6, 8], size: [200, 320], color: [pale, c.lighten(pal[1], 0.6)],
        behaviors: [c.noise(0.2, 14), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.16, 0.3], [0.16, 0.7], [0, 1]]))], order: 0 }));
    // round gumballs, one colour per layer so no two colours blend into a muddy one
    pal.forEach((colour) => out.push(drop({ tex: 'disc', rate: 0.28, size: [14, 22], color: [colour, c.lighten(colour, 0.2)], behaviors: fall(70, 16, 0.5), order: 1 }, 70, ball)));
    // candy buttons, stars and hearts
    out.push(
      drop({ tex: 'coin', rate: 0.3, size: [16, 22], rotation: [0, 6.28], color: [pal[4], c.lighten(pal[4], 0.25)], behaviors: fall(80, 18, 2), order: 2 }, 80),
      drop({ tex: 'coin', rate: 0.3, size: [16, 22], rotation: [0, 6.28], color: [pal[3], c.lighten(pal[3], 0.25)], behaviors: fall(80, 18, 2), order: 2 }, 80),
      drop({ tex: 'star', rate: 0.35, size: [18, 26], rotation: [0, 6.28], color: [pal[1], c.lighten(pal[1], 0.3)], behaviors: fall(75, 18, 2.5), order: 3 }, 75),
      drop({ tex: 'star', rate: 0.25, size: [18, 26], rotation: [0, 6.28], color: [pal[2], c.lighten(pal[2], 0.3)], behaviors: fall(75, 18, 2.5), order: 3 }, 75),
      drop({ tex: 'heart', rate: 0.35, size: [18, 24], rotation: [-0.4, 0.4], color: [pal[0], c.lighten(pal[0], 0.3)], behaviors: fall(72, 18, 0.4), order: 3 }, 72),
    );
    // sprinkles: short rods in every colour (2D: a tiny stretched dot falling a little faster, so it points along its fall)
    pal.forEach((colour) => out.push(c.is3d
      ? drop({ tex: 'square', rate: 1, size: [5, 7], color: colour, behaviors: fall(95, 22, 3), order: 4 }, 95, rod)
      : drop({ tex: 'disc', rate: 0.75, size: [3.2, 4.5], color: colour, stretch: { speed: 0, length: 2.8 }, behaviors: fall(95, 26, 0), order: 4 }, 95)));
    // sugar sparkles twinkling here and there
    out.push(c.is3d
      ? c.sys(c.env3d({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 4, speed: 0, life: [0.6, 1], size: [10, 16], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.3], [0.65, 1], [1, 0]]))], order: 5 }, { w: 1100, y: 140 }))
      : c.sys({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 6, rate: 1.6, shape: { type: 'rect', w: c.view.w, h: c.view.h, thickness: 1 }, offset: [0, -c.view.h / 2],
        speed: 0, life: [0.6, 1], size: [9, 15], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.3], [0.65, 1], [1, 0]]))], order: 5 }));
    return out;
  },
};
