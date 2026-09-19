/** A shield shatters: glass shards, a bright ring and a flash. */
export default {
  name: 'hit.shieldbreak',
  category: 'hit',
  whenToUse: 'A shield, barrier, bubble or armour breaks. Play where the shield was, then stop its state.shield loop.',
  duration: 0.8, loop: false, tint: '#6fc3ff',
  tags: ['shield', 'break', 'shatter', 'barrier', 'glass', 'armor'],
  build(c) {
    const col = c.color('#6fc3ff');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [1, 1.6]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      c.sys(c.chunks({ tex: 'shard', blend: 'add', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 60, thickness: 0.3 },
        speed: [150, 400], life: [0.5, 0.75], size: [14, 30], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.spin(-8, 8), c.gravity(1000), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.6)), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 3 }, 'shard')),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 50 },
        speed: [80, 260], life: [0.3, 0.5], size: [5, 9], color: light,
        behaviors: [c.gravity(700), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 })),
    ];
  },
};
