/** A full-screen wipe: a soft wall of light with glowing streaks, spinning squares and twinkles sweeps across the whole screen. */
export default {
  name: 'ui.transition',
  category: 'ui',
  whenToUse: 'A screen or scene change: menu to level, one level to the next, opening the world map, a time skip. A bright sweep crosses the whole screen in about 0.75 s; swap the screen underneath as it passes the middle (about 0.25 s). Play it without a position; dir sets the way it travels (degrees, default 0 = left to right, 90 = upward). For a plain white flash use ui.flash.',
  duration: 0.75, loop: false, anchor: 'center', tint: '#5ce1ff',
  tags: ['ui', 'transition', 'wipe', 'scene', 'screen', 'sweep', 'swipe', 'level'],
  build(c) {
    const col = c.color('#5ce1ff');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    const cx = Math.cos(dir), cy = Math.sin(dir);
    // how far the screen reaches along the sweep, and across it
    const along = Math.abs(cx) * c.view.w + Math.abs(cy) * c.view.h;
    const across = Math.abs(cy) * c.view.w + Math.abs(cx) * c.view.h;
    // everything starts just off the trailing edge and the front crosses in about 0.45 s
    const margin = 80;
    const v = (along + margin * 2) / 0.45;
    const start = [-cx * (along / 2 + margin), -cy * (along / 2 + margin)];
    // a cone with angle 0 fires every particle straight along dir from a disc standing across the screen
    const wall = { type: 'cone', angle: 0, radius: across * 0.7 };
    const per = Math.round(Math.max(6, Math.min(22, across / 45)));
    return [
      // the wall of light: big soft glows side by side, many and faint so random gaps and clumps do not show
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.02, count: Math.round(per * 1.6) }], shape: wall, dir, offset: start,
        speed: [v * 0.95, v * 1.05], life: 0.5, size: [across * 0.22, across * 0.3], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.25, 0.2], [0.2, 0.75], [0, 1]]))], order: 0 }),
      // streaks, in waves so the front is ragged
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: per, cycle: 5, interval: 0.03 }], shape: wall, dir, offset: start,
        speed: [v * 0.9, v * 1.2], life: [0.45, 0.55], size: [5, 10], color: [light, '#ffffff'], stretch: { speed: 0.012, length: 2 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.1, 0.75))], order: 1 }),
      c.sys({ tex: 'square', blend: 'add', bursts: [{ time: 0.04, count: Math.round(per * 0.7), cycle: 4, interval: 0.04 }], shape: wall, dir, offset: start,
        speed: [v * 0.7, v], life: [0.5, 0.62], size: [12, 30], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [0.7, 0.9], [1, 0]])), c.colorOverLife(c.fade(0.7))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.06, count: Math.round(per * 0.5), cycle: 4, interval: 0.04 }], shape: wall, dir, offset: start,
        speed: [v * 0.6, v * 0.9], life: [0.45, 0.6], size: [10, 20], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.spin(-4, 4), c.sizeOverLife(c.pop(0.2, 0.6))], order: 3 }),
    ];
  },
};
