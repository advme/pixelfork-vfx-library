/** A balloon pops: a quick white flash, a snap ring, cartoon pop lines, torn rubber flying out and a little confetti. */
export default {
  name: 'explosion.balloon',
  category: 'explosion',
  whenToUse: 'A balloon pops: a balloon-popping or dart game, a party balloon shot or stepped on, a bubble-gum bubble bursting, a floating balloon enemy bursting with a bang. Tint it the balloon\'s colour. For a water balloon use explosion.water; for a smoky cartoon poof use explosion.puff; for many small bubbles in a bubble shooter use puzzle.bubble.',
  duration: 0.9, loop: false, tint: '#ff3b5c',
  tags: ['balloon', 'pop', 'burst', 'party', 'dart', 'bang', 'rubber', 'carnival'],
  build(c) {
    const col = c.color('#ff3b5c');
    const light = c.lighten(col, 0.55);
    // a pinch of party confetti: one colour per system so the colours stay clean
    const confetti = (colour) => c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: 4 }], shape: { type: 'circle', radius: 12 },
      speed: [160, 320], life: [0.7, 0.88], size: [6, 9], rotation: [0, 6.28], color: colour,
      behaviors: [c.speedOverLife(c.decel(0.3)), c.gravity(500), c.limitSpeed([[0, 600], [0.3, 600], [0.45, 140], [1, 140]], 1.5), c.noise(2.5, 18), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 2 }));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 120, color: '#ffffff',
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 160, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // cartoon pop lines shooting out
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: 10 }], shape: { type: 'circle', radius: 18, thickness: 0, even: true },
        speed: [380, 520], life: [0.12, 0.18], size: [4, 6], color: '#ffffff', stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 4 })),
      // torn rubber
      c.sys(c.vol({ tex: 'shard', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 16 },
        speed: [220, 420], life: [0.45, 0.65], size: [10, 18], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(900), c.spin(-14, 14), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 3 })),
      confetti('#ffd23a'), confetti('#3dd6ff'), confetti('#7cff6b'),
    ];
  },
};
