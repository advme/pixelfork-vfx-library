/** Try again: a soft orange haze, a friendly ring that wobbles like jelly and settles, and a few round dots drifting gently down. */
export default {
  name: 'ui.wrongtry',
  category: 'ui',
  whenToUse: 'A gentle, friendly "not quite, try again" for young children: a wrong pick in a kids learning, toddler, spelling or counting game, where a red X would feel harsh. Play it with { el } on the chosen answer; the ring fits its size. For a clear wrong answer or invalid move use puzzle.wrong; for a right answer use ui.correct.',
  duration: 0.9, loop: false, tint: '#ffa53a',
  tags: ['try again', 'wrong', 'oops', 'gentle', 'kids', 'learning', 'quiz', 'not quite'],
  build(c) {
    const col = c.color('#ffa53a');
    const light = c.lighten(col, 0.45);
    const w = Math.max(40, Math.min(c.target.w, 320)), h = Math.max(40, Math.min(c.target.h, 220));
    // a ring radius that clears the answer's corners, at most 240 px across; the ring texture's band sits at about 0.39 of its size
    const r = Math.max(36, Math.min(120, Math.hypot(w, h) / 2 + 8));
    const s = r / 0.39;
    // the jelly wobble: in, overshoot, under, smaller and smaller swings, settle
    const wobble = () => c.sizeOverLife(c.curve([[0, 0.6], [0.1, 1.08], [0.2, 0.93], [0.3, 1.05], [0.4, 0.97], [0.5, 1.02], [0.6, 1], [1, 0.96]]));
    return [
      // a soft orange haze (not a flash: nothing harsh)
      c.sys({ tex: 'glow', blend: 'normal', bursts: [{ count: 1 }], life: 0.8, size: r * 2.6, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.7], [0.3, 1], [1, 0.95]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.32, 0.15], [0.25, 0.6], [0, 1]]))], order: 0 }),
      // the wobbling ring and a lighter echo just inside it
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.8, size: s, color: col,
        behaviors: [wobble(), c.colorOverLife(c.fade(0.6))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.8, size: s * 0.88, color: light,
        behaviors: [wobble(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.5], [0, 1]]))], order: 1 }),
      // a few soft dots slipping off the ring and drifting down
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ time: 0.08, count: [5, 6] }], shape: { type: 'circle', radius: r, thickness: 0 },
        speed: [20, 50], life: [0.6, 0.8], size: [6, 10], color: [col, light],
        behaviors: [c.gravity(160), c.limitSpeed(55, 1), c.noise(1.2, 6), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.7, 1], [1, 0]])), c.colorOverLife(c.fade(0.7))], order: 3 }),
    ];
  },
};
