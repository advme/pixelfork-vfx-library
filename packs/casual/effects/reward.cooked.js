/** A dish is ready: a warm golden flash, two rings pop out, a puff of steam rises off the food and golden stars and glints burst around it. */
export default {
  name: 'reward.cooked',
  category: 'reward',
  whenToUse: 'A dish or meal finishes cooking in a cooking, restaurant or farm game: food comes out of the oven, a recipe is completed, an order is plated and ready to serve, a cake is baked. Play it on the dish. For eating food use pickup.food; for picking a crop use gather.harvest.',
  duration: 1.1, loop: false, tint: '#ffc93c',
  tags: ['cooked', 'dish', 'ready', 'recipe', 'cooking', 'restaurant', 'meal', 'reward'],
  build(c) {
    const col = c.color('#ffc93c');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.15))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.12, count: 1 }], life: 0.45, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // a puff of steam rising off the hot food
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: 3 }, { time: 0.12, count: 2 }, { time: 0.24, count: 2 }], shape: { type: 'cone', radius: 16, angle: 0.3 }, dir: Math.PI / 2, offset: [0, 10],
        speed: [70, 130], life: [0.6, 0.85], size: [22, 32], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.3)), c.force(0, 60), c.noise(1.2, 14), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 1.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 2 }, 'up')),
      // golden stars bursting out
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.04, count: [8, 10] }], shape: { type: 'circle', radius: 20 },
        speed: [160, 280], life: [0.5, 0.75], size: [12, 20], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.6))], order: 3 })),
      // white glints twinkling around the dish
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.15, count: [5, 7] }], shape: { type: 'circle', radius: 55 },
        speed: [10, 40], life: [0.4, 0.6], size: [10, 18], color: '#ffffff',
        behaviors: [c.force(0, 60), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
