/** A frost slow lands: a cold flash, an icy puff, snowflakes sinking slowly and two frost rings closing in around the target. */
export default {
  name: 'hit.slow',
  category: 'hit',
  whenToUse: 'A frost or slowing shot lands and slows an enemy down: a frost tower in tower defense, a slowing trap or totem, a chill or frostbolt spell. Play it on the enemy each time a slowing hit lands. For an ice hit with flying shards use hit.ice; to show the enemy staying frozen use state.frozen.',
  duration: 0.6, loop: false, tint: '#8fd8ff',
  tags: ['slow', 'frost', 'chill', 'tower defense', 'ice', 'snow', 'freeze', 'hit'],
  build(c) {
    const col = c.color('#8fd8ff');
    const light = c.lighten(col, 0.7);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse', offset: [0, -20] }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 120, color: light,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 0 }),
      // frost rings closing in: the enemy is held back
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.15], [1, 0.45]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.15], [0.8, 0.6], [0, 1]]))], order: 2 }),
      ring({ blend: 'add', bursts: [{ time: 0.08, count: 1 }], life: 0.4, size: 115, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.15], [1, 0.45]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.15], [0.8, 0.6], [0, 1]]))], order: 2 }),
      // the icy puff
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 12 },
        speed: [50, 130], life: [0.4, 0.55], size: [26, 40], rotation: [0, 6.28], color: c.lighten(col, 0.82),
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 1 })),
      // snowflakes that burst out, then sink slowly
      c.sys(c.vol({ tex: 'snowflake', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 16 },
        speed: [70, 150], life: [0.5, 0.62], size: [12, 20], rotation: [0, 6.28], color: [light, c.lighten(col, 0.3)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.gravity(150), c.spin(-3, 3), c.sizeOverLife(c.pop(0.15, 0.6))], order: 4 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 22 },
        speed: [30, 80], life: [0.3, 0.45], size: [8, 14], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 })),
    ];
  },
};
