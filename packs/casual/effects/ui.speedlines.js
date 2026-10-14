/** Anime speed lines: thin white streaks rush out from the middle of the screen to its edges over a faint white haze at the border. Loops until stopped. */
export default {
  name: 'ui.speedlines',
  category: 'ui',
  whenToUse: 'Anime speed lines over the whole screen: a speed boost or nitro, falling fast, a dramatic dash, a warp jump, a rush or fever mode. Start it once with no position and stop it when the speed ends. For lines streaming behind one moving character or car use move.speed; for inward manga lines on a dramatic moment use ui.focuslines.',
  duration: 1, loop: true, anchor: 'center', tint: '#ffffff',
  tags: ['ui', 'speed', 'speed lines', 'anime', 'boost', 'dash', 'warp', 'falling'],
  build(c) {
    const col = c.color('#ffffff');
    const W = c.view.w, H = c.view.h, m = Math.min(W, H), k = m / 400;
    // A whole-screen rect (not a flat line) sends each particle straight away from its centre, along the ray it was
    // born on: exactly the radial rush wanted here. thickness 0.55 = born between 45% and 100% of the way out, so the middle stays clear
    const rays = { type: 'rect', w: W, h: H, thickness: 0.55 };
    // short at birth, full length once moving, so no tail reaches back into the middle. It grows no faster than the
    // line moves out (by 0.3 of its life the tail grew faster than the line flew and swept back across the middle)
    const reach = () => c.sizeOverLife(c.curve([[0, 0.2], [0.55, 1], [1, 1]]));
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    const around = (size, gap) => Math.max(12, Math.min(40, Math.round((2 * (W + H)) / (size * gap))));
    return [
      // a faint white haze at the border: one evenly spaced set per cycle, cross-fading into the next so it never blinks
      c.sys({ tex: 'glow', blend: 'normal', loop: true, duration: 1, bursts: [{ count: around(m * 0.45, 0.4) }], shape: { type: 'rect', w: W, h: H, even: true },
        life: 1.25, size: m * 0.45, color: col,
        behaviors: [c.colorOverLife(solid([[0, 0], [0.14, 0.2], [0.14, 0.8], [0, 1]]))], order: 0 }),
      // a few wide, soft streaks behind
      c.sys({ tex: 'glow', blend: 'normal', loop: true, duration: 1, rate: 18, shape: rays,
        speed: [600 * k, 850 * k], life: [0.3, 0.4], size: [8, 12], color: col, stretch: { speed: 0.016, length: 2 },
        behaviors: [reach(), c.colorOverLife(solid([[0, 0], [0.35, 0.2], [0.35, 0.7], [0, 1]]))], order: 1 }),
      // the thin speed lines
      c.sys({ tex: 'glow', blend: 'normal', loop: true, duration: 1, rate: 150, shape: rays,
        speed: [800 * k, 1150 * k], life: [0.26, 0.36], size: [3, 5], color: col, stretch: { speed: 0.035, length: 2 },
        behaviors: [reach(), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 2 }),
      // bright little dots flying out with them
      c.sys({ tex: 'disc', blend: 'add', loop: true, duration: 1, rate: 14, shape: { type: 'rect', w: W, h: H, thickness: 0.4 },
        speed: [1000 * k, 1400 * k], life: [0.2, 0.3], size: [3, 5], color: col, stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 3 }),
    ];
  },
};
