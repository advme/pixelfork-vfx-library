/** Digital rain: columns of green pixel squares stream down at different speeds, each led by a bright white-green head with a glow, trailing pixels that thin out behind it, over a faint green haze with stray pixels blinking. Loops until stopped. */
export default {
  name: 'env.matrix',
  category: 'env',
  whenToUse: 'A hacker or code backdrop: a hacking minigame, a computer or cyber world, a cyberpunk menu, a virus or AI level, a terminal or data-stream screen: play it once without a position (falling down the whole screen in 2D, in columns around the camera in 3D) and tint it for other code colours; for a broken, glitching screen use env.glitch, for one glitching character state.glitch.',
  duration: 4, loop: true, anchor: 'top', tint: '#39ff6a',
  tags: ['matrix', 'digital rain', 'code', 'hacker', 'cyber', 'pixel', 'computer', 'data'],
  build(c) {
    const col = c.color('#39ff6a');
    const head = c.lighten(col, 0.8);
    const dim = c.darken(col, 0.42);
    const px = c.is3d ? 14 : 10;
    // spacing of the pixels in a column
    const step = px * 1.3;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const pick = (a, b) => Math.floor(rnd(a, b + 1));
    // a straight-down shot: a thin cone with no spread
    const down = { type: 'cone', radius: 0.5, angle: 0.001 };
    const out = [];
    // one column: every pixel is launched from the same point at the same speed, so the stream keeps its spacing
    // as it falls. The first pixel of a drop is its head; the rest trail above it and thin out toward the end.
    // Every column has its own speed and cycle, so the rain never falls in step and the pattern does not repeat
    const column = (at, v, life, D) => {
      const gap = step / v;
      const n1 = pick(4, 6), n2 = pick(4, 7);
      const span = gap * (n1 + n2 + 1) + 0.05;
      const two = Math.random() < 0.45 && D / 2 > span;
      const t0 = rnd(0, Math.max(0, (two ? D / 2 : D) - span));
      const drops = two ? [t0, t0 + D / 2] : [t0];
      const heads = drops.map((t) => ({ time: t, count: 1 }));
      const trail = [];
      drops.forEach((t) => {
        trail.push({ time: t + gap, count: 1, cycle: n1, interval: gap });
        trail.push({ time: t + gap * (n1 + 1), count: 1, cycle: n2, interval: gap, probability: 0.55 });
      });
      const base = (p) => {
        const q = Object.assign({ loop: true, prewarm: true, duration: D, shape: down, dir: -Math.PI / 2, offset: at, speed: v, life }, p);
        // 3D: aimed straight down in the world, and the pixels stay where they fell when the camera moves
        return c.sys(c.is3d ? c.spray(Object.assign(q, { world: true }), 'down') : q);
      };
      out.push(
        base({ tex: 'glow', blend: 'add', bursts: heads, size: px * 3.4, color: col,
          behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.5, 0.88], [0, 1]]))], order: 1 }),
        base({ tex: 'pixel', blend: 'normal', bursts: trail, size: [px * 0.75, px * 0.95], color: [col, dim],
          behaviors: [c.colorOverLife(c.fade(0.88))], order: 2 }),
        base({ tex: 'pixel', blend: 'normal', bursts: heads, size: px * 1.05, color: head,
          behaviors: [c.colorOverLife(c.fade(0.88))], order: 3 }),
      );
    };
    // a stray pixel that blinks off and on once
    const blink = () => c.sizeOverLife(c.curve([[0, 1], [0.3, 1], [0.32, 0], [0.55, 0], [0.57, 1], [1, 1]]));
    const haze = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.1, 0.3], [0.1, 0.7], [0, 1]]));
    if (c.is3d) {
      // 3D: columns standing all over the area around the camera, falling from 7-10 m to the ground
      for (let i = 0; i < 16; i++) {
        const top = rnd(360, 500), v = rnd(180, 320);
        const x = -550 + ((i % 4) + rnd(0.15, 0.85)) * 275;
        const z = -550 + (Math.floor(i / 4) + rnd(0.15, 0.85)) * 275;
        column([x, top, z], v, top / v, rnd(3.4, 5));
      }
      return [
        c.sys(c.env3d({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 4, rate: 1.2, speed: 0, life: [5, 7], size: [300, 460], color: dim,
          behaviors: [c.noise(0.2, 14), haze()], order: 0 }, { w: 1100, y: 120 })),
        c.sys(c.env3d({ tex: 'pixel', blend: 'normal', loop: true, prewarm: true, duration: 4, rate: 24, speed: 0, life: [0.12, 0.35], size: [px * 0.6, px * 0.9], color: [dim, col],
          behaviors: [blink()], order: 1 }, { w: 1100, y: 160 })),
        ...out,
      ];
    }
    const w = c.view.w, h = c.view.h;
    const n = Math.max(8, Math.min(16, Math.round(w / 34)));
    const slot = w / n;
    for (let i = 0; i < n; i++) {
      const v = rnd(150, 300);
      // born just above the top edge; life lasts until the pixel is just below the bottom edge
      column([-w / 2 + (i + 0.5 + rnd(-0.12, 0.12)) * slot, 24], v, (h + 44) / v, rnd(3.4, 5));
    }
    const screen = { type: 'rect', w, h, thickness: 1 };
    return [
      // a faint green glow over the screen
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 4, rate: 0.5, shape: screen, offset: [0, -h / 2], speed: 0, life: [5, 7], size: [200, 320], color: dim,
        behaviors: [c.noise(0.2, 14), haze()], order: 0 }),
      // stray pixels blinking here and there
      c.sys({ tex: 'pixel', blend: 'normal', loop: true, prewarm: true, duration: 4, rate: 10, shape: screen, offset: [0, -h / 2], speed: 0, life: [0.12, 0.35], size: [px * 0.6, px * 0.9], color: [dim, col],
        behaviors: [blink()], order: 1 }),
      ...out,
    ];
  },
};
