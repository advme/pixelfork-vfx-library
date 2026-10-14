/** An ice hit: a cold flash, ice shards snapping off, snowflakes and a frosty puff. */
export default {
  name: 'hit.ice',
  category: 'hit',
  whenToUse: 'An ice or frost attack lands: an ice arrow, a freeze punch, a cold blast, snowball impact, a frozen enemy struck. Play it on the target. For becoming frozen use state.frozen; for an ice spell burst use explosion.ice.',
  duration: 0.6, loop: false, tint: '#9fe6ff',
  tags: ['ice', 'frost', 'freeze', 'cold', 'snow', 'shard', 'snowball', 'hit'],
  build(c) {
    const col = c.color('#9fe6ff');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 130, color: light,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 10 },
        speed: [200, 400], life: [0.45, 0.6], size: [8, 14], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1200), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 3 }, 'shard')),
      c.sys(c.vol({ tex: 'snowflake', blend: 'add', bursts: [{ count: [5, 7] }], shape: { type: 'circle', radius: 14 },
        speed: [60, 160], life: [0.45, 0.6], size: [12, 20], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-3, 3), c.sizeOverLife(c.pop(0.15, 0.6))], order: 4 })),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 10 },
        speed: [40, 120], life: [0.4, 0.55], size: [24, 38], rotation: [0, 6.28], color: '#eaf8ff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0, 1]]))], order: 1 })),
    ];
  },
};
