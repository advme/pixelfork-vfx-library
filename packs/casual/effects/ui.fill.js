/** A bar fills: a bright head sweeps left to right while sparkles fill in behind it, then the whole bar flashes and stars pop off its end. */
export default {
  name: 'ui.fill',
  category: 'ui',
  whenToUse: 'A progress, XP, loading or quest bar fills up or completes: a level-progress bar reaching the end, a battle-pass tier done, an upgrade or build finishing. Play with { el } on the bar, or at its centre with width and height (the bar size in px); the sweep fits its width. For a number counting up use ui.countup; for a glint passing over a button use ui.shine.',
  duration: 0.85, loop: false, tint: '#7cff6b',
  tags: ['ui', 'progress', 'bar', 'fill', 'complete', 'xp', 'loading', 'sweep'],
  build(c) {
    const col = c.color('#7cff6b');
    const light = c.lighten(col, 0.6);
    const w = Math.max(40, c.target.w), h = Math.max(10, Math.min(60, c.target.h));
    // the head crosses the bar in `sweep` seconds; the flash and the stars come when it arrives
    const sweep = 0.4, done = sweep - 0.02;
    const left = [-w / 2, 0], right = [w / 2, 0];
    // fill sparkles all leave the left end together with spread-out speeds and stop dead at `stop` of their life,
    // so at every moment they cover the bar evenly from its left end up to the head
    const life = 0.85, stop = 0.47;
    const reach = w / (life * (stop + 0.015));
    const n = Math.round(Math.max(10, Math.min(40, w / 7)));
    const sp = Math.max(8, Math.min(16, h * 0.5));
    const head = { type: 'cone', radius: 0, angle: 0 };
    return [
      // the glow flash along the whole bar (even: spaced out along it, so no stretch of the bar is left dark)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: done, count: Math.round(Math.max(4, Math.min(14, w / 22))) }], shape: { type: 'rect', w, h: 0, even: true },
        speed: 0, life: 0.4, size: h * 2.4, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.2], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: n }], shape: { type: 'cone', radius: h * 0.35, angle: 0 }, dir: 0, offset: left,
        speed: [reach * 0.03, reach], life, size: [sp * 0.7, sp * 1.2], rotation: [0, 0.8], color: [col, light],
        behaviors: [c.speedOverLife(c.curve([[0, 1], [stop, 1], [stop + 0.03, 0], [1, 0]])), c.spin(-2, 2),
          c.sizeOverLife(c.curve([[0, 0.3], [0.08, 1], [0.45, 0.75], [0.65, 1], [1, 0]]))], order: 1 }),
      // the bright head and the glint riding on it. A plain glow, not stretched: a stretched sprite trails BACK
      // from its particle, so its bright middle lagged far behind the glint and poked out of the bar's left end
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: head, dir: 0, offset: left,
        speed: w / sweep, life: sweep, size: h * 1.8, color: light,
        behaviors: [c.colorOverLife(c.fadeInOut(0.12, 0.85))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], shape: head, dir: 0, offset: left,
        speed: w / sweep, life: sweep, size: h * 1.3, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(8), c.colorOverLife(c.fadeInOut(0.1, 0.85))], order: 3 }),
      // the finish: a flash and stars at the right end
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: done, count: 1 }], life: 0.25, size: h * 3.2, color: light, offset: right,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ time: done, count: 7 }], shape: { type: 'circle', radius: 4 }, offset: right,
        speed: [140, 260], life: [0.35, 0.5], size: [9, 15], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-6, 6), c.sizeOverLife(c.pop(0.15, 0.6))], order: 5 }),
    ];
  },
};
