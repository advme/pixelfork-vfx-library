/** A perfect stack: a white flash, the block's top edge lighting up in a bright line, two white rings spreading flat from it, little stars hopping off and sparkles floating up. */
export default {
  name: 'reward.perfectstack',
  category: 'reward',
  whenToUse: 'A block, slab or layer is dropped exactly on the one below in a stacking or tower game (Stack, Tower Builder, cake or burger stacking): play it on the top face of the placed block, size it to the block and tint it if the blocks are coloured; play it again for every perfect in a row. For a general perfect tap or timing moment use reward.perfect; for an ordinary drop that is not perfect use hit.blockland.',
  duration: 0.8, loop: false, tint: '#ffffff',
  tags: ['perfect', 'stack', 'tower', 'block', 'placement', 'hypercasual', 'flash', 'reward'],
  build(c) {
    const col = c.color('#ffffff');
    const gold = '#fff1a8';
    // flat on the block's top; snap: false keeps it up there in 3D instead of dropping it to the floor
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the block's top: a line on the screen in 2D, a square outline lying on the block in 3D
    const edge = c.is3d ? { type: 'rect', w: 120, h: 120 } : { type: 'rect', w: 130, h: 0 };
    const top = c.is3d ? { type: 'circle', radius: 60 } : { type: 'rect', w: 130, h: 0 };
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 0 }),
      // two white rings spreading flat, one after the other
      ring({ blend: 'add', bursts: [{ count: 1 }, { time: 0.1, count: 1 }], life: 0.5, size: 300, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the top edge flashing white
      c.sys(c.ground({ tex: 'glow', blend: 'add', bursts: [{ count: 26 }], shape: edge, speed: 0, life: 0.32, size: [26, 34], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 2 })),
      // little stars hopping off the block in a wide cone opening upward
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ count: [6, 8] }], dir: Math.PI / 2, shape: { type: 'cone', radius: 20, angle: 1.1 },
        speed: [200, 340], life: [0.4, 0.55], size: [12, 18], rotation: [0, 6.28], color: [col, gold],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(500), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [0.7, 1], [1, 0]]))], order: 3 }, 'up')),
      // sparkles floating up off the top
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ time: 0.04, count: [12, 14] }], shape: top, speed: 0, life: [0.5, 0.75], size: [10, 18], color: [col, gold],
        behaviors: [c.force(0, 260), c.noise(2, 15), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 })),
    ];
  },
};
