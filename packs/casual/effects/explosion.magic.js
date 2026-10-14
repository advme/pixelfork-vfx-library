/** An arcane burst: a violet flash, a rune ring, stars and sparkles exploding outward in spirals. */
export default {
  name: 'explosion.magic',
  category: 'explosion',
  whenToUse: 'A magic spell explodes or is unleashed: an arcane blast, a wizard\'s area attack, a cursed object bursting, a magic crystal overloading, a fairy explosion. Play it at the centre; tint it for the school of magic.',
  duration: 1.0, loop: false, tint: '#b45cff',
  tags: ['magic', 'arcane', 'spell', 'wizard', 'mystic', 'burst', 'explosion', 'fantasy'],
  build(c) {
    const col = c.color('#b45cff');
    const light = c.lighten(col, 0.65);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 280, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: 330, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 1 })),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.08, count: 1 }], life: 0.4, size: 220, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 2 }),
      // stars spiralling out
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [12, 14] }], shape: { type: 'circle', radius: 14, thickness: 0, even: true },
        speed: [260, 380], life: [0.6, 0.85], size: [14, 22], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.orbit(3), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [0.7, 0.9], [1, 0]]))], order: 4 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [20, 26] }], shape: { type: 'circle', radius: 16 },
        speed: [150, 450], life: [0.5, 0.8], size: [4, 8], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.noise(3, 20), c.colorOverLife(c.fade(0.5))], order: 3 })),
    ];
  },
};
