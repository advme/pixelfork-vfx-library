/** Loot drops: a bright pop on the floor, a ring kicked out, a short beam of light shooting up out of the item, stars hopping out and sparkles rising. */
export default {
  name: 'reward.loot',
  category: 'reward',
  whenToUse: 'An item drops from a defeated enemy or a smashed pot in an RPG, dungeon crawler or looter: a weapon, armour piece, gem or potion falls to the floor. Play it once on the ground where the item lands and tint it by rarity (white common, green uncommon, blue rare, purple epic, gold legendary). For a beam that stays over the item until it is picked up use world.lootbeam; for a chest opening use reward.chest; for collecting the item use pickup.sparkle.',
  duration: 1.0, loop: false, anchor: 'feet', tint: '#ffc93c',
  tags: ['loot', 'drop', 'item', 'rarity', 'rpg', 'dungeon', 'enemy', 'treasure'],
  build(c) {
    const col = c.color('#ffc93c');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the beam: stretched glows trail BACK from their particle, so the column starts above the item and shoots up
    const column = (p) => c.sys(c.spray(Object.assign({ tex: 'glow', blend: 'add', shape: { type: 'cone', radius: 2, angle: 0.01 }, offset: [0, 96] }, p), 'up'));
    return [
      // the pop: a white flash on the item
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 100, offset: [0, 16], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      // the coloured glow pooled round the item
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 1.0, size: 130, offset: [0, 18], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.55, 0.4], [0, 1]]))], order: 0 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.25))], order: 1 }),
      // the short beam: a coloured column with a white core, built up over a quarter of a second
      column({ bursts: [{ count: 1, cycle: 8, interval: 0.035 }], speed: [240, 280], life: [0.5, 0.6], size: [30, 36], color: col,
        stretch: { speed: 0.01, length: 1.2 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.25], [0.5, 0.6], [0, 1]]))], order: 2 }),
      column({ bursts: [{ time: 0.02, count: 1, cycle: 7, interval: 0.035 }], speed: [280, 320], life: [0.45, 0.55], size: [10, 12], color: '#ffffff',
        stretch: { speed: 0.01, length: 2.2 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.95, 0.25], [0.6, 0.6], [0, 1]]))], order: 3 }),
      // stars hopping out of the item and falling back
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [4, 6] }], shape: { type: 'cone', radius: 6, angle: 0.6 }, offset: [0, 12],
        speed: [260, 420], life: [0.5, 0.62], size: [12, 20], rotation: [0, 6.28], color: light,
        behaviors: [c.gravity(1000), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [0.7, 1], [1, 0]]))], order: 4 })),
      // sparkles rising round the item
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 24, duration: 0.45, shape: c.is3d ? { type: 'circle', radius: 26 } : { type: 'rect', w: 60, h: 0 }, offset: [0, 6],
        speed: 0, life: [0.4, 0.55], size: [8, 14], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.force(0, 420), c.limitSpeed(140, 1), c.sizeOverLife(c.pop(0.2, 0.55))], order: 4 })),
    ];
  },
};
