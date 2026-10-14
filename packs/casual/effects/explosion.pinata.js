/** A pinata bursts open: a bright pop and ring, coloured paper chunks tumble out, round candies and candy stars bounce out and rain down with confetti, a paper-dust puff and sparkles. */
export default {
  name: 'explosion.pinata',
  category: 'explosion',
  whenToUse: 'A pinata is smashed open: a birthday or fiesta party game, a kids party mini-game, a hanging prize sack or loot pinata in a casual game, candy and paper bursting out and raining down. Play it at the pinata\'s centre; leave it multicolour or tint it for one colour. For a colour bomb or candy burst in a match-3 game use explosion.candy; for a party popper or glitter bomb use explosion.glitter; for a present being unwrapped use reward.gift.',
  duration: 1.05, loop: false, tint: null,
  tags: ['pinata', 'party', 'candy', 'birthday', 'fiesta', 'smash', 'confetti', 'explosion'],
  build(c) {
    const pal = c.tint
      ? [c.tint, c.lighten(c.tint, 0.4), c.darken(c.tint, 0.2), c.lighten(c.tint, 0.65)]
      : ['#ff4f9a', '#ffd23a', '#2fd6c4', '#7b6bff'].map(c.rgb);
    // crepe-paper chunks: flat planks tumbling in 3D, rounded squares in 2D
    const paper = (colour) => c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 18 },
      speed: [240, 460], life: [0.75, 1.0], size: [14, 22], rotation: [0, 6.28], color: [colour, c.lighten(colour, 0.2)],
      behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(1000), c.spin(-9, 9), c.sizeOverLife(c.curve([[0, 1], [0.85, 0.9], [1, 0]]))], order: 2 }, 'plank'));
    // candies pop in with a squash, bounce out and drop
    const candy = (tex, colours, count, size) => c.sys(c.vol({ tex, blend: 'normal', bursts: [{ time: 0.02, count }], shape: { type: 'circle', radius: 12 },
      speed: [200, 420], life: [0.7, 0.95], size, rotation: [0, 6.28], color: colours,
      behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(900), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.1, 1.15], [0.2, 1], [0.85, 1], [1, 0]]))], order: 3 }));
    const confetti = (colour) => c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: 5 }], shape: { type: 'circle', radius: 14 },
      speed: [200, 380], life: [0.85, 1.05], size: [6, 9], rotation: [0, 6.28], color: colour,
      behaviors: [c.speedOverLife(c.decel(0.3)), c.gravity(500), c.limitSpeed([[0, 600], [0.3, 600], [0.45, 140], [1, 140]], 1.5), c.noise(2.5, 18), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 4 }));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 170, color: '#fff6dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 220, color: c.lighten(pal[1], 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // paper dust puffed out of the broken shell
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 16 },
        speed: [60, 140], life: [0.45, 0.6], size: [34, 50], rotation: [0, 6.28], color: '#fff3e0',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      paper(pal[0]), paper(pal[1]), paper(pal[2]),
      // a random colour is a blend between the two, so each candy system keeps to one colour family
      // (yellow-to-teal would give muddy greens)
      candy('disc', [pal[0], pal[3]], [4, 5], [13, 18]),
      candy('disc', [pal[2], c.lighten(pal[2], 0.3)], [4, 5], [13, 18]),
      candy('disc', [pal[1], c.lighten(pal[1], 0.3)], [2, 3], [13, 18]),
      candy('star', [pal[1], c.lighten(pal[1], 0.3)], [3, 4], [16, 22]),
      confetti(pal[3]), confetti(pal[0]), confetti(pal[2]),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [6, 8] }], shape: { type: 'circle', radius: 60 },
        speed: [20, 70], life: [0.4, 0.6], size: [12, 16], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.2], [0.65, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
