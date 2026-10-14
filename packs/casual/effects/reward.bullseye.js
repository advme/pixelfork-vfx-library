/** A bullseye: target rings snap in to the centre, then a white flash and glint, gold rings burst back out, gold sparks shoot away and stars spray out. */
export default {
  name: 'reward.bullseye',
  category: 'reward',
  whenToUse: 'The exact centre of a target is hit: a bullseye in archery, darts, axe or knife throwing, a shooting gallery or a ball-toss game, a perfect hit on a target board. Play it on the centre of the target (it faces the camera) and add hit.arrow or hit.knife for the impact itself. For a perfect timing moment that is not a target use reward.perfect; for a goal or basket use reward.goal.',
  duration: 0.95, loop: false, tint: '#ffd23f',
  tags: ['bullseye', 'target', 'archery', 'darts', 'centre', 'perfect', 'gold', 'reward'],
  build(c) {
    const col = c.color('#ffd23f');
    const light = c.lighten(col, 0.5);
    // the moment the rings meet in the middle
    const hit = 0.18;
    return [
      // target rings snapping in to the centre one after the other; each lives until `hit`, so all three meet there together
      ...[[280, '#ffffff'], [210, col], [140, '#ffffff']].map(([size, colour], i) => c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: i * 0.03, count: 1 }], life: hit - i * 0.03, size, color: colour,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [0.6, 0.6], [1, 0.05]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [1, 0.4], [1, 1]]))], order: 1 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: hit, count: 1 }], life: 0.2, size: 220, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.15))], order: 0 }),
      // gold rings bursting back out, one inside the other
      ...[[320, col], [260, '#ffffff'], [200, col]].map(([size, colour], i) => c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: hit + i * 0.04, count: 1 }], life: 0.45, size, color: colour,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [0.5, 0.85], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 2 })),
      // gold sparks shooting out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: hit, count: [16, 18] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [380, 620], life: [0.25, 0.4], size: [4, 6], color: [col, light], stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // stars spraying away
      c.sys(c.vol({ tex: 'star', blend: 'normal', bursts: [{ time: hit + 0.02, count: [10, 12] }], shape: { type: 'circle', radius: 16 },
        speed: [240, 420], life: [0.55, 0.75], size: [14, 20], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(350), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.5], [0.12, 1], [0.75, 1], [1, 0]]))], order: 4 })),
      // the gold centre popping
      c.sys({ tex: 'disc', blend: 'add', bursts: [{ time: hit, count: 1 }], life: 0.3, size: 44, color: col,
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.7)), c.colorOverLife(c.fade(0.5))], order: 4 }),
      // the glint on top
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: hit, count: 1 }], life: 0.3, size: 200, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(2, 2), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
    ];
  },
};
