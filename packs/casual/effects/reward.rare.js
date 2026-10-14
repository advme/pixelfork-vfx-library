/** A rare reveal: a cool blue flash and cross-glint, a burst of sparkles, a ring and twinkles lingering around the item. */
export default {
  name: 'reward.rare',
  category: 'reward',
  whenToUse: 'A rare (blue-tier) item, card or character is revealed: a rare drop, a 4-star pull, a rare card in a pack, a better-than-usual loot roll. Play it on the item; tint it for other tiers (green uncommon, purple epic). For a legendary use reward.legendary; for collecting a gem use pickup.gem.',
  duration: 1.0, loop: false, tint: '#3fa9ff',
  tags: ['rare', 'reveal', 'gacha', 'loot', 'drop', 'blue', 'sparkle', 'rarity'],
  build(c) {
    const col = c.color('#3fa9ff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 110, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      // the cross-glint
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 170, rotation: 0.4, color: light,
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 240, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the sparkle burst
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 12 },
        speed: [160, 340], life: [0.5, 0.75], size: [10, 18], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.pop(0.15, 0.5))], order: 3 })),
      // twinkles lingering around the item
      c.sys({ tex: 'spark', blend: 'add', rate: 22, duration: 0.6, shape: { type: 'rect', w: 140, h: 140, thickness: 1 },
        speed: 0, life: [0.25, 0.4], size: [10, 18], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.4, 0.5))], order: 2 }),
    ];
  },
};
