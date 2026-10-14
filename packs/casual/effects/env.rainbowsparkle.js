/** A magical rainbow drizzle: tiny twinkling sparkles and little stars in every colour of the rainbow fall slowly and softly. Loops until stopped. */
export default {
  name: 'env.rainbowsparkle',
  category: 'env',
  whenToUse: 'A magical, happy or dreamy scene (a fairy or unicorn world, a candy land, a wish coming true, a princess or party menu, a rainbow level in a kids\' game); play it once without a position (whole screen in 2D, around the camera in 3D), tint it for sparkles of one colour (no tint keeps the rainbow), and use env.confetti for party confetti or env.fireflies for floating fairy lights.',
  duration: 8, loop: true, anchor: 'top', tint: null,
  tags: ['rainbow', 'sparkles', 'magic', 'fairy', 'unicorn', 'glitter', 'dreamy', 'kids'],
  build(c) {
    const t = c.tint;
    // each sparkle is a random mix of its pair; a tint turns every pair into shades of one colour
    const pairs = t
      ? [[c.lighten(t, 0.5), t], [t, c.darken(t, 0.2)], [c.lighten(t, 0.25), c.lighten(t, 0.7)]]
      : [['#ff4f8b', '#ffa13d'], ['#ffe14d', '#5dff7a'], ['#3fc8ff', '#b05cff']].map((p) => p.map(c.rgb));
    const twinkle = () => c.sizeOverLife(c.curve([[0, 0], [0.08, 1], [0.2, 0.45], [0.32, 1], [0.46, 0.5], [0.6, 1], [0.74, 0.45], [0.88, 1], [1, 0]]));
    // a slow, soft fall with a little flutter (a fresh list for every system)
    const drift = (v) => [c.gravity(v * 1.5), c.limitSpeed(v, 1), c.noise(0.7, 18)];
    const v = c.is3d ? 90 : 110;
    const life = c.is3d ? [4.6, 5] : [7, 8];
    const area = (p) => (c.is3d ? c.sys(c.env3d(p, { w: 1200, y: 440 })) : c.sys(Object.assign({ shape: { type: 'rect', w: c.view.w + 40, h: 0 }, offset: [0, 20] }, p)));
    const glints = (colour, order) => area({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 8, rate: c.is3d ? 9 : 3.5,
      speed: 0, life, size: c.is3d ? [15, 23] : [11, 17], rotation: [0, 0.8], color: colour,
      behaviors: drift(v).concat([c.spin(-1.5, 1.5), twinkle()]), order });
    return [
      // a fine glitter dust between the sparkles
      area({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: c.is3d ? 10 : 6,
        speed: 0, life, size: c.is3d ? [4, 7] : [3, 5], color: [pairs[0][0], pairs[2][1]],
        behaviors: drift(v * 0.85).concat([c.colorOverLife(c.fadeInOut(0.1, 0.85))]), order: 0 }),
      glints(pairs[0], 1),
      glints(pairs[1], 2),
      glints(pairs[2], 3),
      // a few chunky little stars tumbling down
      area({ tex: 'star', blend: 'add', loop: true, prewarm: true, duration: 8, rate: c.is3d ? 5 : 2,
        speed: 0, life, size: c.is3d ? [12, 18] : [9, 13], rotation: [0, 6.28], color: [pairs[1][0], c.rgb('#ffffff')],
        behaviors: drift(v * 1.1).concat([c.spin(-2.5, 2.5), c.sizeOverLife(c.curve([[0, 0], [0.1, 1], [0.85, 1], [1, 0]]))]), order: 4 }),
    ];
  },
};
