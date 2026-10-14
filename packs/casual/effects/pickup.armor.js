/** Armour picked up: a blue hexagon plate snaps on with a flash, a ring and glinting sparks. */
export default {
  name: 'pickup.armor',
  category: 'pickup',
  whenToUse: 'Armour, a shield plate or extra protection is picked up: an armour vest in a shooter, a shield potion, a defence boost, a hull repair. Play it on the character. For an active shield bubble use state.shield.',
  duration: 0.6, loop: false, tint: '#47a6ff',
  tags: ['armor', 'armour', 'shield', 'protection', 'vest', 'defense', 'pickup', 'shooter'],
  build(c) {
    const col = c.color('#47a6ff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'hexshard', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.6], [0.18, 0.9], [0.3, 1.05], [0.7, 1], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.15], [0.9, 0.6], [0, 1]]))], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.08, count: 1 }], life: 0.25, size: 150, color: light,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.08, count: 1 }], life: 0.35, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.08, count: [5, 7] }], shape: { type: 'circle', radius: 44, thickness: 0 },
        speed: [10, 40], life: [0.3, 0.45], size: [10, 16], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 })),
    ];
  },
};
