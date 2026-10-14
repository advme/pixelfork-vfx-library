/** A frost explosion: a cold flash, a ring of frost, ice shards and snowflakes bursting out and a lingering chill mist. */
export default {
  name: 'explosion.ice',
  category: 'explosion',
  whenToUse: 'An ice bomb, a freezing spell exploding, an ice crystal shattering into a blast, a snow grenade. Play it at the centre. Freeze nearby enemies with state.frozen; for a frost tower freezing the ground around it use explosion.frostnova.',
  duration: 1.0, loop: false, tint: '#8fdcff',
  tags: ['ice', 'frost', 'nova', 'freeze', 'cold', 'explosion', 'snow', 'blizzard'],
  build(c) {
    const col = c.color('#8fdcff');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 300, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 360, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 1 })),
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 14 },
        speed: [300, 620], life: [0.6, 0.85], size: [10, 18], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1100), c.speedOverLife(c.decel(0.4)), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 3 }, 'shard')),
      c.sys(c.vol({ tex: 'snowflake', blend: 'add', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 20 },
        speed: [120, 320], life: [0.6, 0.9], size: [12, 22], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [0.7, 1], [1, 0]]))], order: 4 })),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.08, count: [8, 10] }], shape: { type: 'circle', radius: 24 },
        speed: [60, 160], life: [0.8, 1.0], size: [50, 80], rotation: [0, 6.28], color: '#eaf8ff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.15], [0.4, 0.6], [0, 1]]))], order: 1 })),
    ];
  },
};
