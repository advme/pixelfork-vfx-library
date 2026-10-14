/** A legendary pull: a golden pillar of light, spinning rays, a giant star popping out in a burst of stars, and gold sparkles drifting down. */
export default {
  name: 'reward.legendary',
  category: 'reward',
  whenToUse: 'A legendary or ultra-rare result: a 5-star gacha pull, a legendary or mythic item from a chest, the best card in a pack, the top prize of a draw. Play it on the item or at the centre of the reveal. For a rare (blue) result use reward.rare; for the summon beam itself use reward.summon; for a money win use reward.jackpot.',
  duration: 1.7, loop: false, tint: '#ffc23a',
  tags: ['legendary', 'gacha', 'mythic', 'drop', 'pull', 'gold', 'loot', 'rarity'],
  build(c) {
    const col = c.color('#ffc23a');
    const light = c.lighten(col, 0.6);
    const rays = c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.12], [0.7, 0.7], [0, 1]]);
    // a standing column: a stretched sprite trails back from a particle creeping down, so it reaches up through the item
    const column = (p) => c.sys(Object.assign({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 1, angle: 0.001 }, dir: -Math.PI / 2, speed: 2, offset: [0, -70] }, p));
    return [
      // spinning rays behind everything
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 1.7, size: 380, rotation: [0, 0.8], color: col,
        behaviors: [c.spin(0.6, 0.8), c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1.05], [0.25, 1], [1, 0.9]])), c.colorOverLife(rays)], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 1.4, size: 300, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.08], [0.5, 0.5], [0, 1]]))], order: 0 }),
      // the gold pillar with a white core
      column({ life: 1.3, size: 90, color: col, stretch: { speed: 0, length: 5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.1, 1.15], [0.2, 1], [0.7, 0.85], [1, 0]])), c.colorOverLife(c.fade(0.55))], order: 1 }),
      column({ life: 1.2, size: 30, color: '#ffffff', stretch: { speed: 0, length: 14 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.1, 1.15], [0.2, 1], [0.7, 0.85], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 }),
      // white flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 240, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 6 }),
      // two rings
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.05, count: 1 }, { time: 0.22, count: 1 }], life: 0.5, size: 380, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      // the giant star popping out
      c.sys({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: 1 }], life: 1.2, size: 150, color: light,
        behaviors: [c.spin(0.8), c.sizeOverLife(c.curve([[0, 0], [0.1, 1.3], [0.2, 1], [0.8, 1], [1, 0]])), c.colorOverLife(c.fade(0.75))], order: 4 }),
      // the star burst
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: [18, 22] }], shape: { type: 'circle', radius: 30 },
        speed: [220, 440], life: [0.7, 1.0], size: [12, 22], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.6))], order: 5 })),
      // gold sparkles drifting down
      c.sys(c.vol({ tex: 'spark', blend: 'add', rate: 40, duration: 0.7, shape: { type: 'circle', radius: 110 },
        speed: [10, 40], life: [0.8, 1.1], size: [8, 14], color: [light, col],
        behaviors: [c.force(0, -60), c.limitSpeed(60, 1), c.noise(1.5, 16), c.sizeOverLife(c.pop(0.2, 0.6))], order: 5 })),
    ];
  },
};
