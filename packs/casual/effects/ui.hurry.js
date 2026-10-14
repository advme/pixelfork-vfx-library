/** A red alarm pulse around a timer: the glow throbs, two quick rings beat out like a heartbeat and sparks flick off the rim. Loops until stopped. */
export default {
  name: 'ui.hurry',
  category: 'ui',
  whenToUse: 'Time is running out: the last seconds of a level timer, a countdown about to end, a bomb about to blow in a puzzle, a turn timer almost done. Play with { el, follow: true } on the timer and stop it when time is up or added. For a one-off tick on each 3, 2, 1 number use ui.countdown; for a single whole-screen warning flash use ui.flash with a red tint.',
  duration: 0.6, loop: true, tint: '#ff2e3f',
  tags: ['ui', 'timer', 'hurry', 'countdown', 'warning', 'urgent', 'time', 'alarm'],
  build(c) {
    const col = c.color('#ff2e3f');
    const light = c.lighten(col, 0.45);
    const s = Math.max(40, Math.min(150, Math.max(c.target.w, c.target.h)));
    return [
      // the glow ends each beat as bright as the next one starts, so it throbs without a seam; cut, so it does not
      // hang on (and then blink out) after time is up or added
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.6, bursts: [{ count: 1 }], life: 0.6, size: s * 2.1, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.88], [0.12, 1.08], [1, 0.88]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.75, 0.12], [0.3, 1]]))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 0.6, bursts: [{ count: 1 }, { time: 0.16, count: 1 }], life: 0.42, size: s * 1.9, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 0.6, bursts: [{ count: 3 }], shape: { type: 'circle', radius: s * 0.55, thickness: 0 },
        speed: [60, 110], life: [0.25, 0.35], size: [8, 13], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.pop(0.2, 0.4))], order: 2 }),
    ];
  },
};
