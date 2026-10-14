/** The player grows bigger: a soft glow swells, two soft rings expand out and sparkles burst around the body. */
export default {
  name: 'move.grow',
  category: 'move',
  whenToUse: 'The player grows bigger: a snake or cell gains size in an .io game, a character eats a growth item, a size-up power-up kicks in, a merge or evolve makes it larger; play it on the centre of the body, size it to the body and fire it again at each growth step. For a level-up use reward.levelup; for a change into a new form use magic.transform; for a merge of two items use puzzle.merge.',
  duration: 0.58, loop: false, tint: '#6dff7a',
  tags: ['grow', 'bigger', 'size up', 'io', 'snake', 'agar', 'evolve', 'expand'],
  build(c) {
    const col = c.color('#6dff7a');
    const light = c.lighten(col, 0.6);
    return [
      // the body swelling with light
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.45], [0.35, 1], [1, 0.75]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.2, 0], [0.6, 0.25], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 70, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      // two soft rings expanding out, the second a beat later
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 190, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.35], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.55, 0.5], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.1, count: 1 }], life: 0.45, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.35], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.45, 0.5], [0, 1]]))], order: 2 }),
      // sparkles bursting from the rim of the body
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 40, thickness: 0.3 },
        speed: [60, 140], life: [0.4, 0.58], size: [12, 20], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.force(0, 60), c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 })),
      // little motes pushed outward
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 30 },
        speed: [120, 220], life: [0.3, 0.45], size: [6, 9], color: light,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.shrink())], order: 3 })),
    ];
  },
};
