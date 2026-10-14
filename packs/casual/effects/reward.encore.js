/** A full-combo finale: a big flash, golden glint rays (and spotlight beams fanning up in 2D), a confetti blast and rainbow music notes raining down with twinkles. */
export default {
  name: 'reward.encore',
  category: 'reward',
  whenToUse: 'The end of a song with a full combo or a top grade in a rhythm or music game: an all-perfect run, a song cleared with an S rank, a concert finale, a dance-off won. Play it once at the centre of the screen or the stage. For a plain level win use reward.clear, for one perfect note use reward.perfect.',
  duration: 1.4, loop: false, tint: null,
  tags: ['encore', 'full combo', 'song complete', 'rhythm', 'music', 'concert', 'finale', 'reward'],
  build(c) {
    const palette = c.tint ? [c.tint, c.lighten(c.tint, 0.35), c.lighten(c.tint, 0.65)] : ['#ff4fa3', '#47b6ff', '#4dff9a'].map(c.rgb);
    const gold = c.tint || c.rgb('#ffd23a');
    const confetti = (colour) => c.sys(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [13, 15] }], shape: { type: 'cone', radius: 12, angle: 0.75 }, dir: Math.PI / 2,
      speed: [450, 760], life: [1.0, 1.3], size: [7, 11], rotation: [0, 6.28], color: [colour, c.lighten(colour, 0.3)],
      behaviors: [c.gravity(900), c.limitSpeed([[0, 900], [0.3, 260], [1, 160]], 1.5), c.noise(2, 30), c.spin(-10, 10), c.colorOverLife(c.fade(0.8))], order: 3 }, 'up'));
    // notes rain from above: a line over the spot in 2D, an area of the world in 3D
    const rain = (colour) => {
      const p = { tex: 'note', blend: 'normal', rate: c.is3d ? 16 : 12, duration: 0.45, speed: 0, life: [0.85, 1.0], size: [16, 24], rotation: [-0.4, 0.4], color: [colour, c.lighten(colour, 0.3)],
        behaviors: [c.gravity(900), c.limitSpeed(300, 1.5), c.noise(1.5, 30), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0], [0.12, 1.1], [0.25, 1], [0.85, 1], [1, 0]]))], order: 4 };
      return c.is3d ? c.sys(c.env3d(p, { w: 380, y: 340 })) : c.sys(Object.assign(p, { shape: { type: 'rect', w: 320, h: 0 }, offset: [0, 230] }));
    };
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 320, color: '#fff6dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // golden glint rays turning slowly
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 1.2, size: 400, rotation: [0, 0.8], color: gold,
        behaviors: [c.spin(0.5, 0.7), c.colorOverLife(c.grad([['#ffffff', 0], ['#ffffff', 1]], [[0, 0], [0.7, 0.15], [0.6, 0.6], [0, 1]]))], order: 1 }),
      // 2D: spotlight beams fanning up from below (the particles creep down, so the long streaks point up)
      c.is3d ? null : c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 7 }], shape: { type: 'cone', radius: 4, angle: 0.8, even: true }, dir: -Math.PI / 2, offset: [0, -50],
        speed: [2, 4], life: [1.0, 1.2], size: [16, 24], color: [gold, c.lighten(gold, 0.7)], stretch: { speed: 0, length: 13 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.7, 1], [1, 0]])), c.colorOverLife(c.grad([['#ffffff', 0], ['#ffffff', 1]], [[0, 0], [0.55, 0.2], [0.45, 0.7], [0, 1]]))], order: 1 }),
      ...palette.map(confetti),
      ...palette.map(rain),
      // twinkles all around
      c.sys({ tex: 'spark', blend: 'add', rate: 30, duration: 0.9, shape: { type: 'circle', radius: 130 },
        speed: 0, life: [0.3, 0.5], size: [10, 18], rotation: [0, 6.28], color: ['#ffffff', c.lighten(gold, 0.5)],
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 5 }),
    ];
  },
};
