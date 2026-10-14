/** A "tap here" marker: a chunky dot presses in and rings ripple out from it again and again over a soft glow. Loops until stopped. */
export default {
  name: 'ui.tapme',
  category: 'ui',
  whenToUse: 'A tutorial shows where to tap: the first move, the button the player must press next, a spot on the board, an onboarding step. Play with { el } (or { at: [x, y] }) on the spot and stop it when the player taps. For a soft hint on a puzzle tile use puzzle.hint; for drawing the eye to a button without teaching use ui.glow.',
  duration: 1.1, loop: true, tint: '#ffe14d',
  tags: ['ui', 'tutorial', 'tap here', 'onboarding', 'pointer', 'guide', 'press', 'ripple'],
  build(c) {
    const col = c.color('#ffe14d');
    // the dot presses in when each cycle starts (as the first ring leaves) and springs back; it lives a little past
    // the cycle so the next dot takes over without a gap. The glow and the dot are cut: when the player taps and the
    // game stops it, the marker goes at once instead of sitting there for another second
    const press = () => c.sizeOverLife(c.curve([[0, 1], [0.07, 0.72], [0.18, 1.12], [0.3, 1], [1, 1]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.1, bursts: [{ count: 1 }], life: 1.1, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.15, 1.05], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.6, 0.15], [0.3, 1]]))], order: 0 }),
      // solid rings so they read on light and dark screens alike
      c.sys({ tex: 'ring', blend: 'normal', loop: true, duration: 1.1, bursts: [{ count: 1 }, { time: 0.24, count: 1 }], life: 0.85, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.85, 0.35], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'disc', blend: 'normal', loop: true, cut: true, duration: 1.1, bursts: [{ count: 1 }], life: 1.15, size: 30, color: col,
        behaviors: [press()], order: 2 }),
      c.sys({ tex: 'disc', blend: 'normal', loop: true, cut: true, duration: 1.1, bursts: [{ count: 1 }], life: 1.15, size: 16, color: '#ffffff',
        behaviors: [press()], order: 3 }),
    ];
  },
};
