/** Chopping wood: wood chips and splinters fly, a puff of sawdust, and a few leaves drift down. */
export default {
  name: 'gather.wood',
  category: 'gather',
  whenToUse: 'An axe hits a tree, a log is chopped, wood is harvested or a wooden thing is hacked at. Play it at the spot that was hit, once per swing; for a wooden crate breaking use hit.block.',
  duration: 1.1, loop: false, tint: '#c08a4e',
  tags: ['wood', 'chop', 'tree', 'axe', 'harvest', 'gather', 'lumber', 'survival', 'crafting'],
  build(c) {
    const col = c.color('#c08a4e');
    return [
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [6, 9] }], shape: { type: 'circle', radius: 8 },
        speed: [200, 420], life: [0.5, 0.75], size: [6, 11], rotation: [0, 6.28], color: [col, c.lighten(col, 0.3)],
        behaviors: [c.gravity(1400), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 3 }, 'plank')),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 6 },
        speed: [250, 500], life: [0.3, 0.5], size: [2, 4], color: c.lighten(col, 0.4),
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 4 })),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 8 },
        speed: [40, 110], life: [0.4, 0.6], size: [20, 32], rotation: [0, 6.28], color: c.lighten(col, 0.55),
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 2 })),
      // leaves shaken loose from the crown above
      c.sys({ tex: 'leaf', blend: 'normal', bursts: [{ time: 0.05, count: [3, 5] }], shape: { type: 'rect', w: 90, h: 20, thickness: 1 }, offset: [0, 110],
        speed: 0, life: [0.9, 1.1], size: [9, 14], rotation: [0, 6.28], color: ['#6cc24a', '#3f9a37'],
        behaviors: [c.gravity(260), c.limitSpeed(110, 1), c.noise(1.5, 30), c.spin(-4, 4), c.colorOverLife(c.fade(0.75))], order: 1 }),
    ];
  },
};
