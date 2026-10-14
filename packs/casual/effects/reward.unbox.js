/** A loot box pops open: a burst of light and short rays out of the lid, a ring, and gold coins and stars jumping out and tumbling down. */
export default {
  name: 'reward.unbox',
  category: 'reward',
  whenToUse: 'A loot box, mystery box, gacha capsule, supply crate or reward egg pops open in one quick burst: battle-pass rewards, crate openings in shooters, capsule toys. Play it on the box and tint it to the box rarity (the coins stay gold). For a treasure chest with light rays rising use reward.chest; for the item reveal that follows use reward.cardreveal, reward.rare or reward.legendary.',
  duration: 1.1, loop: false, tint: '#5ad1ff',
  tags: ['loot box', 'unbox', 'mystery box', 'capsule', 'crate', 'open', 'gacha', 'coins'],
  build(c) {
    const col = c.color('#5ad1ff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 170, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 6 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.7, size: 240, offset: [0, 20], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.25))], order: 0 }),
      // short rays of light bursting out of the open lid. Streaks trail BACK, so they start out on a wider rim and
      // grow in: a full-length streak at birth would poke down through the box into the lower half
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 14] }], shape: { type: 'circle', radius: 34, arc: Math.PI, thickness: 0 }, offset: [0, 10],
        speed: [380, 620], life: [0.2, 0.28], size: [9, 14], color: light,
        stretch: { speed: 0.007, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.4))], order: 2 })),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.02, count: 1 }], life: 0.4, size: 260, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // gold coins jumping out
      c.sys(c.spray({ tex: 'coin', blend: 'normal', bursts: [{ time: 0.04, count: [8, 10] }], shape: { type: 'cone', radius: 10, angle: 0.55 }, dir: Math.PI / 2,
        speed: [380, 620], life: [0.8, 1.05], size: [13, 20], rotation: [0, 6.28], color: ['#ffc93c', '#ffe27a'],
        behaviors: [c.gravity(1400), c.spin(-8, 8), c.colorOverLife(c.fade(0.8))], order: 4 }, 'up')),
      // stars jumping out
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ time: 0.04, count: [6, 8] }], shape: { type: 'cone', radius: 10, angle: 0.75 }, dir: Math.PI / 2,
        speed: [300, 520], life: [0.7, 1.0], size: [12, 20], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.gravity(1000), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.8, 1], [1, 0]]))], order: 5 }, 'up')),
      // twinkles popping around the box
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.06, count: [6, 8] }], shape: { type: 'circle', radius: 50 },
        speed: [30, 80], life: [0.4, 0.7], size: [10, 16], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 3 })),
    ];
  },
};
