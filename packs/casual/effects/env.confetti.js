/** Confetti drifting down endlessly. Loops until stopped. */
export default {
  name: 'env.confetti',
  category: 'env',
  whenToUse: 'A celebration screen that stays open: a winner podium, a birthday event, a season end. For a one-off burst use reward.confetti or reward.clear.',
  duration: 4, loop: true, anchor: 'top', tint: null,
  tags: ['confetti', 'celebration', 'party', 'ambient', 'winner', 'event'],
  build(c) {
    const palette = c.tint ? [c.tint, c.lighten(c.tint, 0.5), c.darken(c.tint, 0.25)] : ['#ff4d6d', '#ffd23f', '#3dd6ff', '#7cff6b', '#c77dff', '#ff9f43'];
    if (c.is3d) {
      const y = 480;
      return palette.map((colour, i) => c.sys(c.env3d({ tex: 'square', blend: 'normal', loop: true, prewarm: true, duration: 4, rate: 6,
        speed: 0, life: [(y / 170) * 0.9, y / 170], size: [9, 15], rotation: [0, 6.28], color: colour,
        behaviors: [c.gravity(700), c.limitSpeed(170, 1.5), c.noise(2.5, 22), c.spin(-9, 9), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: i }, { w: 1100, y })));
    }
    const w = c.view.w + 60;
    return palette.map((colour, i) =>
      c.sys({ tex: 'square', blend: 'normal', loop: true, prewarm: true, duration: 4, rate: 3, shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [0, 30],
        speed: 0, life: [3.5, 5], size: [9, 15], rotation: [0, 6.28], color: colour,
        behaviors: [c.gravity(700), c.limitSpeed(180, 1.5), c.noise(2.5, 22), c.spin(-9, 9), c.colorOverLife(c.fadeInOut(0.05, 0.85))], order: i }));
  },
};
