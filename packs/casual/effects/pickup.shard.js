/** A shard pickup: a quick cross-glint and a small ring, a few crystal shards spinning out, and glints catching the light around them. */
export default {
  name: 'pickup.shard',
  category: 'pickup',
  whenToUse: 'A gem shard, crystal fragment, soul shard, star piece or other small fragment is collected, often many in a row (collect 10 shards to unlock a hero). Play it where the shard was; tint it to the shard colour. For a whole gem or premium currency use pickup.gem.',
  duration: 0.45, loop: false, tint: '#c86bff',
  tags: ['shard', 'fragment', 'crystal', 'gem', 'collect', 'piece', 'soul', 'gacha'],
  build(c) {
    const col = c.color('#c86bff');
    const light = c.lighten(col, 0.65);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 80, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 100, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 90, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(4), c.sizeOverLife(c.curve([[0, 0.2], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      // crystal shards: glowing glass pieces tumbling in 3D
      c.sys(c.chunks({ tex: 'shard', blend: 'add', bursts: [{ count: [5, 7] }], shape: { type: 'circle', radius: 6 },
        speed: [110, 220], life: [0.35, 0.48], size: [10, 16], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-9, 9), c.sizeOverLife(c.curve([[0, 0.6], [0.15, 1.1], [0.7, 1], [1, 0]]))], order: 3 }, 'shard')),
      // glints catching the light around them
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.08, count: [4, 5] }], shape: { type: 'circle', radius: 34 },
        speed: 0, life: [0.18, 0.3], size: [8, 14], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.4, 0.5))], order: 5 }),
    ];
  },
};
