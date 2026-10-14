/** A car crash: a hard flash, a spray of sparks, glass shards and metal bits, and a dust cloud. */
export default {
  name: 'vehicle.crash',
  category: 'vehicle',
  whenToUse: 'Two cars collide, a car hits a wall or a pole, a vehicle lands hard or gets wrecked. Play it at the point of impact.',
  duration: 1.0, loop: false, tint: '#ffcf5a',
  tags: ['crash', 'collision', 'car', 'impact', 'sparks', 'glass', 'wreck', 'vehicle'],
  build(c) {
    const col = c.color('#ffcf5a');
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 170, color: '#fff6dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 130, rotation: [0, 1], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      // metal sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [26, 34] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [380, 900], life: [0.3, 0.6], size: [4, 8], color: ['#ffffff', col],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1300), c.speedOverLife(c.decel(0.35)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 5 })),
      // glass shards
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 10 },
        speed: [220, 480], life: [0.6, 0.9], size: [7, 13], rotation: [0, 6.28], color: ['#e8f7ff', '#9fd2ef'],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 3 }, 'shard')),
      // metal bits
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 8 },
        speed: [200, 420], life: [0.6, 0.9], size: [6, 11], rotation: [0, 6.28], color: ['#6d7480', '#3c4048'],
        behaviors: [c.gravity(1600), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 3 }, 'box')),
      // dust
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 16 },
        speed: [60, 170], life: [0.6, 0.95], size: [40, 70], rotation: [0, 6.28], color: ['#cfc6b8', '#a39a8c'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 30), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.25]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
    ];
  },
};
