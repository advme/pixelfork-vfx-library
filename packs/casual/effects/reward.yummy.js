/** Yummy! A warm glow and a ring pop on the dish, a swirl of warm steam spins up off it, and bouncy hearts and golden stars pop up with twinkling glints. */
export default {
  name: 'reward.yummy',
  category: 'reward',
  whenToUse: 'A customer loves the dish they were served in a cooking or restaurant game: an order delivered just right, a yummy or delicious rating, a happy diner, a five-star meal, a food critic impressed. Play it on the served dish or at the customer. For food that has just finished cooking use reward.cooked; for a character eating a snack use pickup.food; for a customer who stays in love use state.love.',
  duration: 1.2, loop: false, tint: '#ff5c8a',
  tags: ['yummy', 'delicious', 'served', 'customer', 'restaurant', 'hearts', 'cooking', 'reward'],
  build(c) {
    const col = c.color('#ff5c8a');
    const light = c.lighten(col, 0.45);
    const warm = '#ffd27a';
    // the steam swirl: puffs spiral out from the dish while spinning round. In 3D the spiral lies level
    // round the dish and rises, so it turns into a helix of steam; in 2D it spins in the screen plane
    const swirlAlpha = c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.15], [0.5, 0.6], [0, 1]]));
    const swirl = c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: 6 }, { time: 0.08, count: 6 }], shape: { type: 'circle', radius: 16, thickness: 0, even: true }, offset: [0, 14],
      speed: [36, 56], life: [0.85, 1.05], size: [18, 26], rotation: [0, 6.28], color: ['#ffffff', '#fff1dc'],
      behaviors: (c.is3d ? [c.force(0, 80)] : []).concat([c.orbit(3.2), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.35, 1], [1, 1.6]])), swirlAlpha]), order: 2 }));
    return [
      // warm glow on the dish
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 160, color: warm,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0.35, 0.4], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 180, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      swirl,
      // hearts popping up with a bounce
      c.sys(c.spray({ tex: 'heart', blend: 'normal', bursts: [{ time: 0.04, count: [4, 5] }, { time: 0.2, count: [2, 3] }], shape: { type: 'cone', radius: 22, angle: 0.65 }, dir: Math.PI / 2, offset: [0, 10],
        speed: [150, 250], life: [0.8, 1.0], size: [16, 26], rotation: [-0.3, 0.3], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 50), c.noise(1.5, 8), c.sizeOverLife(c.curve([[0, 0], [0.15, 1.25], [0.28, 0.95], [0.38, 1.05], [0.8, 1], [1, 0]]))], order: 3 }, 'up')),
      // golden stars bursting out around them
      c.sys(c.spray({ tex: 'star', blend: 'normal', bursts: [{ time: 0.06, count: [6, 7] }], shape: { type: 'cone', radius: 20, angle: 1.3 }, dir: Math.PI / 2,
        speed: [170, 280], life: [0.55, 0.75], size: [13, 19], rotation: [0, 6.28], color: ['#ffd23a', '#ffe680'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.6))], order: 4 }, 'up')),
      // white glints twinkling round the dish
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.12, count: [5, 6] }], shape: { type: 'circle', radius: 55 },
        speed: [10, 40], life: [0.4, 0.6], size: [10, 17], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 60), c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
    ];
  },
};
