/** An exploding red barrel: a big fireball rolling upward, red metal shards and grey rims flying, burning fuel flung out and dripping, a ring and black smoke. */
export default {
  name: 'explosion.barrel',
  category: 'explosion',
  whenToUse: 'An explosive red barrel, a fuel drum, a gas tank or propane canister blows up: the classic shooter and action-game hazard, a car fuel tank going up. Play it at the barrel\'s centre. For a generic small blast use explosion.small; for a green toxic barrel use explosion.toxic.',
  duration: 1.25, loop: false, tint: null,
  tags: ['barrel', 'explosive', 'fuel', 'gas tank', 'red barrel', 'hazard', 'fireball', 'explosion'],
  build(c) {
    const fire = () => c.colorOverLife(c.tint
      ? c.grad([[c.lighten(c.tint, 0.8), 0], [c.tint, 0.3], [c.darken(c.tint, 0.6), 1]], [[1, 0], [1, 0.6], [0, 1]])
      : c.grad([['#fff4b0', 0], ['#ffb330', 0.28], ['#ff5a1f', 0.62], ['#3a1c14', 1]], [[1, 0], [1, 0.6], [0, 1]]));
    const flame = c.tint ? c.lighten(c.tint, 0.4) : c.rgb('#ffb347');
    const deep = c.tint ? c.tint : c.rgb('#ff6a1f');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 260, color: '#fff3c4',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 340, color: flame,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // black smoke rolling up behind
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.12, count: [9, 11] }], shape: { type: 'circle', radius: 26 },
        speed: [40, 120], life: [0.8, 1.1], size: [60, 100], rotation: [0, 6.28], color: ['#5a5a5a', '#333333'],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.force(0, 110), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.15], [0.55, 0.6], [0, 1]]))], order: 1 })),
      // the fireball, rolling upward
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [12, 14] }, { time: 0.08, count: [5, 6] }], shape: { type: 'circle', radius: 18 },
        speed: [100, 260], life: [0.5, 0.75], size: [55, 95], rotation: [0, 6.28],
        behaviors: [fire(), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.2]])), c.speedOverLife(c.decel(0.25)), c.force(0, 200), c.spin(-2, 2)], order: 3 })),
      // red metal shards of the barrel
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 14 },
        speed: [320, 680], life: [0.7, 1.0], size: [12, 22], rotation: [0, 6.28], color: ['#e8402e', '#9a2418'],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.8))], order: 4 }, 'shard')),
      // grey rims and the lid
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 10 },
        speed: [300, 600], life: [0.7, 1.0], size: [8, 13], rotation: [0, 6.28], color: ['#9aa3ad', '#5b636b'],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.8))], order: 4 }, 'plank')),
      // burning fuel flung out in arcs
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [220, 460], life: [0.6, 0.9], size: [9, 14], color: [flame, deep], stretch: { speed: 0.01, length: 1.3 },
        behaviors: [c.gravity(1200), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 5 })),
      // fast sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [400, 800], life: [0.3, 0.5], size: [4, 6], color: ['#fff2a8', flame], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 5 })),
      // burning drips falling out of the fireball
      c.sys(c.spray({ tex: 'drop', blend: 'add', bursts: [{ time: 0.15, count: [5, 7] }], shape: { type: 'cone', radius: 40, angle: 0.15 }, dir: -Math.PI / 2,
        speed: [30, 90], life: [0.55, 0.75], size: [13, 19], rotation: Math.PI, color: [flame, deep],
        behaviors: [c.gravity(900), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.6))], order: 5 }, 'down')),
    ];
  },
};
