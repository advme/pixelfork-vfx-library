/** A bunch of party balloons is let go: a soft pop of light, round balloons in bright colours spread and float up swaying, with a little confetti and sparkles. */
export default {
  name: 'reward.balloons',
  category: 'reward',
  whenToUse: 'A happy release of party balloons as a reward: a level won in a kids or party game, a birthday or celebration moment, a prize or milestone where a bunch of colourful balloons floats up. Play it on the character or low in the middle of the screen; leave it multicolour or tint it for one colour. For a single balloon popping use explosion.balloon; for a birthday burst with cake-style sparkles use reward.birthday; for a confetti cannon use reward.confetti.',
  duration: 1.45, loop: false, tint: null,
  tags: ['balloons', 'party', 'birthday', 'celebrate', 'reward', 'kids', 'win', 'float'],
  build(c) {
    const pal = c.tint
      ? [c.tint, c.lighten(c.tint, 0.35), c.darken(c.tint, 0.2), c.lighten(c.tint, 0.6), c.darken(c.tint, 0.35)]
      : ['#ff4f6d', '#ffd23a', '#3dc8ff', '#7ce65a', '#b77bff'].map(c.rgb);
    // one colour per system so every balloon stays clean; the drop turned upside down is a balloon with its knot
    const balloon = (colour) => c.sys(c.vol({ tex: 'drop', blend: 'normal', bursts: [{ count: 2 }], shape: { type: 'circle', radius: 26 },
      speed: [50, 120], life: [1.25, 1.45], size: [34, 46], rotation: [Math.PI - 0.25, Math.PI + 0.25], color: [colour, c.lighten(colour, 0.15)],
      behaviors: [c.force(0, 380), c.limitSpeed(175, 1), c.noise(1.1, 40), c.spin(-0.5, 0.5),
        c.sizeOverLife(c.curve([[0, 0.3], [0.1, 1.12], [0.2, 0.96], [0.3, 1], [0.8, 1], [1, 0.75]])), c.colorOverLife(c.fade(0.8))], order: 3 }));
    const confetti = (colour) => c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: 5 }], shape: { type: 'circle', radius: 14 },
      speed: [160, 320], life: [0.9, 1.2], size: [6, 9], rotation: [0, 6.28], color: colour,
      behaviors: [c.speedOverLife(c.decel(0.3)), c.gravity(500), c.limitSpeed([[0, 600], [0.25, 600], [0.4, 120], [1, 120]], 1.5), c.noise(2.5, 18), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 4 }));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 180, color: c.lighten(pal[1], 0.6),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 200, color: c.lighten(pal[0], 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      balloon(pal[0]), balloon(pal[1]), balloon(pal[2]), balloon(pal[3]), balloon(pal[4]),
      confetti(pal[1]), confetti(pal[2]), confetti(pal[0]),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [6, 8] }], shape: { type: 'circle', radius: 70 },
        speed: [20, 60], life: [0.45, 0.7], size: [12, 18], color: '#ffffff',
        behaviors: [c.force(0, 80), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.2], [0.65, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
