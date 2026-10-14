/** A life is lost: the heart icon jolts, cracks with a white glint and a red flash and ring, and breaks into red pieces that tumble down. */
export default {
  name: 'ui.lifelost',
  category: 'ui',
  whenToUse: 'The player loses a life or a heart in the HUD: a hit that costs a life, a failed try, a wrong answer that takes a heart, one less retry. Play with { el } on the heart icon as it is removed. For a heart being collected use pickup.heart; for the hit on the character itself use hit.impact.',
  duration: 0.92, loop: false, tint: '#ff3b5c',
  tags: ['ui', 'life', 'heart', 'lost', 'damage', 'hud', 'break', 'fail'],
  build(c) {
    const col = c.color('#ff3b5c');
    const dark = c.darken(col, 0.3);
    const light = c.lighten(col, 0.5);
    const s = Math.max(24, Math.min(80, Math.min(c.target.w, c.target.h)));
    // the heart holds for a moment, then breaks at `crack`
    const crack = 0.14;
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: crack, count: 1 }], life: 0.3, size: s * 3.2, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.4], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: crack, count: 1 }], life: 0.4, size: s * 3.2, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // the heart itself: a squeeze and a jolt, gone the moment it cracks
      c.sys({ tex: 'heart', blend: 'normal', bursts: [{ count: 1 }], life: crack + 0.02, size: s * 1.05, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [0.35, 1.18], [0.7, 0.88], [1, 1.05]]))], order: 2 }),
      // two big halves fall away to the left and the right
      c.sys({ tex: 'shard', blend: 'normal', bursts: [{ time: crack, count: 2 }], shape: { type: 'circle', radius: s * 0.18, thickness: 0, even: true },
        speed: [90, 130], life: 0.75, size: s * 0.95, rotation: [-0.3, 0.3], color: [col, dark],
        behaviors: [c.gravity(1100), c.spin(-4, 4), c.sizeOverLife(c.curve([[0, 1], [0.75, 0.9], [1, 0]]))], order: 3 }),
      // small pieces kicked up, then tumbling down
      c.sys({ tex: 'shard', blend: 'normal', bursts: [{ time: crack, count: [9, 11] }], shape: { type: 'cone', radius: s * 0.25, angle: 1.3 },
        speed: [120, 260], life: [0.55, 0.8], size: [s * 0.2, s * 0.36], rotation: [0, 6.28], color: [col, dark],
        behaviors: [c.gravity(1300), c.spin(-9, 9), c.sizeOverLife(c.curve([[0, 1], [0.75, 1], [1, 0]]))], order: 4 }),
      // the crack: a white glint
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: crack, count: 1 }], life: 0.18, size: s * 1.7, rotation: 0.4, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]]))], order: 5 }),
    ];
  },
};
