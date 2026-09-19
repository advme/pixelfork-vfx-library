/** A cheerful burst of coloured dots. Multicolour by default. */
export default {
  name: 'ui.burst',
  category: 'ui',
  whenToUse: 'A reward is claimed, a task is checked off, a purchase completes, a gift is opened in the UI. Play with { el }.',
  duration: 0.7, loop: false, tint: null,
  tags: ['ui', 'burst', 'claim', 'done', 'dots', 'confetti', 'purchase'],
  build(c) {
    const palette = c.tint ? [c.tint, c.lighten(c.tint, 0.5)] : ['#ff4d6d', '#ffd23f', '#3dd6ff', '#7cff6b', '#c77dff'];
    return [
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 120, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ...palette.map((colour, i) =>
        c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 5 }], shape: { type: 'circle', radius: 10 },
          speed: [200, 380], life: [0.45, 0.65], size: [7, 12], color: colour,
          behaviors: [c.gravity(700), c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 1 + i })),
    ];
  },
};
