/** Something appears: a soft pop-in glow, ring and a few sparkles. */
export default {
  name: 'move.spawn',
  category: 'move',
  whenToUse: 'An enemy, item or character appears or respawns, a block is placed, a building finishes. Gentle and quick.',
  duration: 0.6,
  loop: false,
  tint: '#ffffff',
  tags: ['spawn', 'appear', 'respawn', 'place', 'pop in', 'new'],
  build(c) {
    const col = c.color('#ffffff');
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 })),
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ count: [6, 9] }], shape: { type: 'circle', radius: 30, thickness: 0.4 },
        speed: [20, 60], life: [0.35, 0.55], size: [8, 14], color: col,
        behaviors: [c.force(0, 80), c.sizeOverLife(c.pop(0.2, 0.5))], order: 2 })),
    ];
  },
};
