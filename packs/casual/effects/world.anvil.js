/** A hammer strikes an anvil: a white clang, a ringing flash and a fan of bright orange sparks fountaining up and raining down. */
export default {
  name: 'world.anvil',
  category: 'world',
  whenToUse: 'A blacksmith hammers hot metal on an anvil, a forge or crafting station makes or upgrades an item, a weapon is reforged, a horseshoe is struck: play it once per hammer blow on the anvil (for metal hitting metal in a fight use hit.metal, for sparks that keep going world.sparks).',
  duration: 0.8, loop: false, tint: '#ff9a2a',
  tags: ['anvil', 'forge', 'blacksmith', 'hammer', 'craft', 'sparks', 'smithing', 'upgrade'],
  build(c) {
    const col = c.color('#ff9a2a');
    const light = c.lighten(col, 0.55);
    // an upward half-burst: the upper half-circle in 2D, a wide cone pointed straight up in 3D
    // (c.vol turns a half-circle into a hemisphere that opens sideways in 3D, not upward)
    const upward = (p) => c.sys(c.is3d ? c.spray(Object.assign({}, p, { shape: { type: 'cone', radius: p.shape.radius, angle: 1.2 } }), 'up') : p);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 130, color: '#fff3d2',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: [90, 110], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.24, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 3 }),
      // the heat glow left on the metal
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 80, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 1 }),
      // the fan of sparks
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [34, 42] }], dir: Math.PI / 2, shape: { type: 'cone', radius: 6, angle: 1.05 },
        speed: [300, 760], life: [0.4, 0.75], size: [3, 6], color: ['#fff4c8', col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1400), c.speedOverLife(c.decel(0.5)), c.colorOverLife(c.fade(0.5))], order: 5 }, 'up')),
      // fat embers that arc out and drop
      upward({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 6, arc: Math.PI },
        speed: [160, 360], life: [0.5, 0.8], size: [6, 10], color: [light, col],
        behaviors: [c.gravity(1100), c.sizeOverLife(c.curve([[0, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.5))], order: 4 }),
      // a wisp of smoke off the hot iron
      upward({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.05, count: [2, 3] }], shape: { type: 'circle', radius: 6, arc: Math.PI },
        speed: [20, 50], life: [0.5, 0.7], size: [18, 26], rotation: [0, 6.28], color: '#9a9a9a',
        behaviors: [c.force(0, 60), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0, 1]]))], order: 0 }),
    ];
  },
};
