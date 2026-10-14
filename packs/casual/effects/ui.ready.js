/** Ready to collect: a glow pops, a ring springs out round the item and bounces into place, a second ring pings away, dots hop out and bright glints twinkle over the top. */
export default {
  name: 'ui.ready',
  category: 'ui',
  whenToUse: 'A timed item, building or production finishes and is ready to collect: a crop grown, a factory or mine output done, a cake out of the oven in an idle game, a building upgrade or a free chest timer finished. Play it once with { el } on the item or building at the moment it becomes ready. For a glow that keeps drawing the eye until tapped use ui.glow (state.sparkle on a thing in the game world); for an ability off cooldown use ui.cooldown; for a dish finished in a cooking game use reward.cooked.',
  duration: 0.7, loop: false, tint: '#62e86a',
  tags: ['ui', 'ready', 'collect', 'done', 'finished', 'idle', 'timer', 'bounce'],
  build(c) {
    const col = c.color('#62e86a');
    const light = c.lighten(col, 0.6);
    // the item's size; with no element given (or in 3D) an 80 px item. Without an element the target is the default
    // 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const s = plain ? 80 : Math.max(36, Math.min(220, Math.max(c.target.w, c.target.h)));
    // the bounce: shoots past the rim, drops inside it, then settles with a smaller wobble
    const bounce = () => c.sizeOverLife(c.curve([[0, 0.2], [0.17, 1.18], [0.31, 0.9], [0.44, 1.05], [0.56, 0.98], [0.68, 1], [1, 1]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: s * 2, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the bounce ring, white-hot as it springs out and settling into the main colour
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.65, size: s * 1.4, color: '#ffffff',
        behaviors: [bounce(), c.colorOverLife(c.grad([['#ffffff', 0], [col, 0.3], [col, 1]], [[1, 0], [1, 0.6], [0, 1]]))], order: 1 }),
      // a softer glow riding the same bounce, so the ring reads as a chunky band
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.65, size: s * 1.52, color: col,
        behaviors: [bounce(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.4, 0.6], [0, 1]]))], order: 1 }),
      // then a ping outward
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.1, count: 1 }], life: 0.35, size: s * 2.3, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.05, count: 8 }], shape: { type: 'circle', radius: s * 0.45, thickness: 0, even: true },
        speed: [140, 190], life: [0.28, 0.36], size: [6, 9], color: light,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.3))], order: 3 }),
      // glints twinkling over the top half, two then two more
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.08, count: 2 }, { time: 0.22, count: 2 }], shape: { type: 'circle', radius: s * 0.55, thickness: 0.35, arc: Math.PI },
        speed: [5, 15], life: [0.35, 0.45], size: [s * 0.26, s * 0.38], rotation: [0, 0.6], color: ['#ffffff', light],
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0]]))], order: 4 }),
    ];
  },
};
