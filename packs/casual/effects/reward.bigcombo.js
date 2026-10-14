/** A huge combo: a flash and turning rays, rainbow rings rolling out one after another, a burst of stars and colour sparkles swirling away in a pinwheel. */
export default {
  name: 'reward.bigcombo',
  category: 'reward',
  whenToUse: 'A huge combo or chain: a 10x combo, a long chain reaction, a fever or frenzy mode starting, a combo record. Play it at the centre of the combo text. Rainbow by default; a tint makes it one colour. For each small combo step use reward.combo; for a win or hot streak use reward.streak; for a match-3 special tile firing use puzzle.blast.',
  duration: 1.15, loop: false, tint: null,
  tags: ['combo', 'big combo', 'chain', 'fever', 'frenzy', 'streak', 'rainbow', 'reward'],
  build(c) {
    const t = c.tint;
    const bands = t
      ? [c.lighten(t, 0.6), c.lighten(t, 0.3), t, c.lighten(t, 0.45), t, c.lighten(t, 0.2)]
      : ['#ff4d6d', '#ffa43a', '#ffe14d', '#5ff07a', '#3dc8ff', '#b06bff'];
    const glint = t ? c.lighten(t, 0.7) : c.rgb('#fff2a0');
    const gold = t ? c.lighten(t, 0.3) : c.rgb('#ffcc33');
    // rainbow rings: the outer band first, each next one a little later and smaller, so they roll out as one rainbow wave
    const ring = (colour, i) => c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.03 + i * 0.04, count: 1 }], life: 0.6, size: 340 - i * 30, color: colour,
      behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.45, 0.85], [1, 1]])), c.colorOverLife(c.fade(0.35))], order: 2 });
    // sparkles swirling out: each one curves sideways as it flies, so together they make a pinwheel
    const swirl = (colour, n, order) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.04, count: n }], shape: { type: 'circle', radius: 10, thickness: 0, even: true },
      speed: [260, 340], life: [0.75, 0.9], size: [13, 19], color: colour,
      behaviors: [c.speedOverLife(c.decel(0.4)), c.orbit(2.2), c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [0.7, 0.8], [1, 0]]))], order });
    // turning rays: two four-point glints a half-step apart make eight even rays; gold, gone before they can turn dull
    const rays = (r) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: 330, rotation: r, color: gold,
      behaviors: [c.spin(0.8), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.15], [0.4, 0.5], [0, 0.9]]))], order: 1 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 150, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      rays(0), rays(Math.PI / 4),
      ...bands.map(ring),
      swirl(c.lighten(bands[0], 0.3), 7, 3),
      swirl(c.lighten(bands[2], 0.3), 8, 3),
      swirl(c.lighten(bands[4], 0.3), 9, 3),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: [14, 18] }], shape: { type: 'circle', radius: 20 },
        speed: [220, 420], life: [0.7, 1.1], size: [12, 20], rotation: [0, 6.28], color: ['#ffffff', glint],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(500), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.5], [0.12, 1], [0.75, 1], [1, 0]]))], order: 4 })),
    ];
  },
};
