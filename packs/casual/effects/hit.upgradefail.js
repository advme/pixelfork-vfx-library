/** A failed upgrade: a dull ring cracks into falling pieces, a grey puff of smoke coughs out and a few weak sparks drop. Funny, not dramatic. */
export default {
  name: 'hit.upgradefail',
  category: 'hit',
  whenToUse: 'An upgrade, enchant, craft, forge or fusion attempt fails; a recipe is wrong; a gacha roll gives a dud. Play it on the item: a sad little puff, more comic than tragic. For a successful upgrade use reward.upgrade; for something really breaking use hit.shieldbreak or hit.block; for a plain vanish use explosion.puff.',
  duration: 0.65, loop: false, tint: '#a9b0c0',
  tags: ['fail', 'upgrade', 'craft', 'enchant', 'dud', 'fizzle', 'smoke', 'broken'],
  build(c) {
    const col = c.color('#a9b0c0');
    return [
      // the ring appears for a moment, then cracks
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.14, size: 136, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.5, 1.05], [1, 1]])), c.colorOverLife(c.fade(0.7))], order: 2 }),
      // its pieces, spread along the rim, dropping away
      c.sys({ tex: 'shard', blend: 'normal', bursts: [{ time: 0.12, count: 10 }], shape: { type: 'circle', radius: 54, thickness: 0, even: true },
        speed: [20, 60], life: [0.45, 0.55], size: [12, 18], rotation: [0, 6.28], color: [col, c.darken(col, 0.25)],
        behaviors: [c.gravity(900), c.spin(-6, 6), c.colorOverLife(c.fade(0.6))], order: 3 }),
      // the grey puff
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.06, count: [6, 8] }], shape: { type: 'circle', radius: 10 },
        speed: [50, 130], life: [0.5, 0.62], size: [34, 54], rotation: [0, 6.28], color: ['#8c8c8c', '#5c5c5c'],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 60), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))], order: 1 })),
      // a few dull sparks that flop out and fall
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ time: 0.04, count: [5, 7] }], shape: { type: 'cone', radius: 6, angle: 0.9 }, dir: Math.PI / 2,
        speed: [140, 260], life: [0.35, 0.5], size: [3, 5], color: '#b08a5a',
        stretch: { speed: 0.015, length: 1.2 },
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.5))], order: 4 }, 'up')),
    ];
  },
};
