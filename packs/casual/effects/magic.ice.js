/** An ice burst: crystal shards, frost puffs and cold sparkles. */
export default {
  name: 'magic.ice',
  category: 'magic',
  whenToUse: 'An ice spell hits, something freezes or shatters, a frost trap triggers, an ice block breaks.',
  duration: 0.9,
  loop: false,
  tint: '#8fe3ff',
  tags: ['ice', 'frost', 'freeze', 'shatter', 'cold', 'crystal'],
  build(c) {
    const col = c.color('#8fe3ff');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 3 }], life: 0.4, size: 140, color: light, rotation: [0, 2],
        behaviors: [c.spin(1), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys(c.chunks({ tex: 'shard', blend: 'add', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 8 },
        speed: [200, 450], life: [0.5, 0.8], size: [14, 28], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.spin(-6, 6), c.gravity(900), c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 4 }, 'shard')),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 14 },
        speed: [60, 150], life: [0.5, 0.8], size: [36, 60], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 20 },
        speed: [30, 100], life: [0.5, 0.9], size: [6, 12], color: light,
        behaviors: [c.gravity(150), c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
    ];
  },
};
