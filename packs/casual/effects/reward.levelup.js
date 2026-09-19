/** A golden level-up: expanding ring, a crown of stars rising, sparkles. */
export default {
  name: 'reward.levelup',
  category: 'reward',
  whenToUse: 'The player levels up, upgrades an item, unlocks something, or completes a big milestone. Play on the character or the item.',
  duration: 1.2,
  loop: false,
  tint: '#ffc93c',
  tags: ['level up', 'upgrade', 'unlock', 'milestone', 'reward', 'gold'],
  build(c) {
    const col = c.color('#ffc93c');
    const light = c.lighten(col, 0.7);
    return [
      // glow flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.1))] }),
      // two rings
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.15, count: 1 }], life: 0.6, size: 280, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
      // crown of stars, evenly spaced, rising
      c.sys(c.ground({ tex: 'star', blend: 'add', bursts: [{ count: 10 }], shape: { type: 'circle', radius: 34, thickness: 0, even: true },
        speed: 90, life: [0.8, 1.0], size: [18, 26], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.force(0, 320), c.speedOverLife(c.decel(0.2)), c.spin(-4, 4), c.sizeOverLife(c.pop(0.12, 0.7))], order: 2 })),
      // sparkles streaming up for a moment
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 60, duration: 0.6, shape: { type: 'circle', radius: 40 },
        speed: [40, 90], life: [0.5, 0.8], size: [8, 16], color: light,
        behaviors: [c.force(0, 260), c.sizeOverLife(c.pop(0.2, 0.5))], order: 2 })),
    ];
  },
};
