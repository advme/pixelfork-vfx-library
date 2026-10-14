/** A loot beam: a column of light shoots up from a dropped item, with sparkles rising inside it. Loops until picked up. */
export default {
  name: 'world.lootbeam',
  category: 'world',
  whenToUse: 'Marks dropped loot, a weapon on the ground, an airdrop or a rare item so it can be seen from afar (battle royale, RPG, looter). Play it on the item and stop it when picked up. Tint by rarity: white common, green uncommon, blue rare, purple epic, gold legendary.',
  duration: 1, loop: true, anchor: 'feet', tint: '#b45cff',
  tags: ['loot', 'drop', 'rarity', 'item', 'beam', 'battle royale', 'rpg', 'airdrop', 'treasure'],
  build(c) {
    const col = c.color('#b45cff');
    const light = c.lighten(col, 0.6);
    // stretched sprites trail back from their particle, so the column starts a little above the item
    const column = (p) => c.sys(c.spray(Object.assign({ tex: 'glow', blend: 'add', loop: true, shape: { type: 'cone', radius: 3, angle: 0.01 }, offset: [0, 70] }, p), 'up'));
    return [
      column({ rate: 14, speed: [220, 300], life: [1.0, 1.3], size: [26, 34], color: col, stretch: { speed: 0.01, length: 3 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.55, 0.2], [0.4, 0.6], [0, 1]]))], order: 1 }),
      column({ rate: 12, speed: [260, 340], life: [0.9, 1.2], size: [8, 11], color: '#ffffff', stretch: { speed: 0.01, length: 4 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.2], [0.6, 0.6], [0, 1]]))], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 80, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0.8, 0.5], [0.55, 1]]))], order: 0 }),
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 8, shape: { type: 'circle', radius: 14 },
        speed: 0, life: [0.8, 1.3], size: [7, 12], color: light,
        behaviors: [c.force(0, 220), c.limitSpeed(160, 1), c.sizeOverLife(c.pop(0.2, 0.6))], order: 3 })),
    ];
  },
};
