/** A magnet sucks things in: a ring closes in while bright dots streak into the centre, then a small pop with a ring and sparkles. */
export default {
  name: 'pickup.vacuum',
  category: 'pickup',
  whenToUse: 'A batch of pellets, coins, gems or orbs is sucked in at once by a magnet or vacuum: a magnet power-up collecting nearby food in an .io game, a coin vacuum in a runner, loot pulled into the player after a fight; play it once on the collector, tinted with the items\' colour. While a magnet power-up stays active use state.magnet; for one coin use pickup.coin; for one food dot use pickup.pellet.',
  duration: 0.6, loop: false, tint: '#ffd23a',
  tags: ['vacuum', 'magnet', 'suck', 'attract', 'collect', 'pellets', 'coins', 'io'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the moment the first wave of dots reaches the centre
    const T = 0.3;
    return [
      // a ring closing in, brightening as it arrives
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: T, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.25]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.4], [0.8, 0.85], [0, 1]]))], order: 1 }),
      // dots streaking inward in three quick waves; each dies right at the centre
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [6, 8] }, { time: 0.04, count: [5, 7] }, { time: 0.08, count: [5, 7] }],
        shape: { type: 'circle', radius: 100, thickness: 0 }, speed: [-350, -330], life: 0.28, size: [7, 10], color: [col, light],
        stretch: { speed: 0.01, length: 1.2 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.85, 1], [1, 0.3]]))], order: 3 })),
      // thin white speed streaks among them
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 110, thickness: 0 },
        speed: [-400, -390], life: 0.27, size: [3, 5], color: '#ffffff', stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.7, 1], [1, 0]]))], order: 2 })),
      // the pop
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: T, count: 1 }], life: 0.22, size: 100, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: T, count: 1 }], life: 0.12, size: 50, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: T, count: 1 }], life: 0.24, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: T, count: [4, 6] }], shape: { type: 'circle', radius: 8 },
        speed: [70, 150], life: [0.22, 0.3], size: [9, 14], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
    ];
  },
};
