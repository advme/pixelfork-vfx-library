/** A sweet candy burst: a pink pop and ring, round candies, candy stars and hearts in bright colours bounce out with sugar sprinkles and sparkles. */
export default {
  name: 'explosion.candy',
  category: 'explosion',
  whenToUse: 'A sweet, colourful burst in a candy or match-3 game: a colour bomb or wrapped candy going off, a candy jar or pinata breaking, a sweet booster used, a cute enemy popping into sweets. Play it at the centre; tint it for one colour or leave it multicolour. For one cleared tile use puzzle.match; for a row-and-column blast use puzzle.blast; for a big combo use reward.bigcombo.',
  duration: 0.85, loop: false, tint: null,
  tags: ['candy', 'sweets', 'match3', 'colour bomb', 'pinata', 'sugar', 'burst', 'explosion'],
  build(c) {
    const pal = c.tint
      ? [c.tint, c.lighten(c.tint, 0.4), c.darken(c.tint, 0.2), c.lighten(c.tint, 0.65)]
      : ['#ff5fa2', '#ffd23a', '#45e0b2', '#4fb0ff'].map(c.rgb);
    const pale = c.lighten(pal[0], 0.7);
    // pop in with a squash, bounce out, drop a little, shrink away
    const bounce = () => [c.speedOverLife(c.decel(0.15)), c.gravity(700), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.1, 1.15], [0.2, 1], [0.8, 1], [1, 0]]))];
    const pieces = (tex, colours, count, size, order) => c.sys(c.vol({ tex, blend: 'normal', bursts: [{ count }], shape: { type: 'circle', radius: 12 },
      speed: [220, 460], life: [0.6, 0.85], size, rotation: [0, 6.28], color: colours, behaviors: bounce(), order }));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 200, color: pale,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 240, color: c.lighten(pal[0], 0.35),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      // round candies, candy stars and hearts
      pieces('disc', [pal[0], pal[1]], [7, 8], [16, 24], 2),
      pieces('disc', [pal[2], pal[3]], [7, 8], [16, 24], 2),
      pieces('star', [pal[1], c.lighten(pal[1], 0.3)], [5, 6], [20, 28], 3),
      pieces('heart', [pal[0], c.lighten(pal[0], 0.3)], [5, 6], [20, 28], 3),
      // sugar sprinkles: short stretched rods
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [12, 14] }], shape: { type: 'circle', radius: 8 },
        speed: [300, 560], life: [0.35, 0.5], size: [3, 5], color: [pal[0], pal[3]], stretch: { speed: 0.006, length: 2 },
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.6))], order: 4 })),
      // sparkles
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.06, count: [8, 10] }], shape: { type: 'circle', radius: 60 },
        speed: [20, 70], life: [0.4, 0.7], size: [10, 16], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.2], [0.65, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
