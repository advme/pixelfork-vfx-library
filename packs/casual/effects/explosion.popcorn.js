/** Popcorn popping: fluffy white-and-butter kernels burst up in a quick crackle of little pops, tumble and fall, with golden hulls, a buttery glow and a wisp of steam. */
export default {
  name: 'explosion.popcorn',
  category: 'explosion',
  whenToUse: 'Popcorn pops: a popcorn machine or pan in a cooking, cinema or carnival game, corn kernels heated until they burst, a bucket overflowing, a cute snack-themed booster or enemy popping. Play it at the pan or the top of the bucket; tint it for caramel or candy popcorn. For sweets bursting in a candy match-3 game use explosion.candy; for a plain cartoon poof use explosion.puff.',
  duration: 1.0, loop: false, tint: '#ffd24a',
  tags: ['popcorn', 'pop', 'kernel', 'snack', 'cinema', 'carnival', 'cooking', 'food'],
  build(c) {
    const col = c.color('#ffd24a');
    const cream = c.lighten(col, 0.82);
    const butter = c.lighten(col, 0.4);
    // popped kernels are white by default; a tint (caramel, candy colours) colours them too
    const kernel = c.tint ? [c.lighten(col, 0.3), c.lighten(col, 0.6)] : ['#ffffff', cream];
    // the crackle: kernels pop in a quick ragged series, not all at once
    const pops = [{ count: 4 }, { time: 0.07, count: 3 }, { time: 0.14, count: 3 }, { time: 0.22, count: 2 }, { time: 0.3, count: 2 }];
    return [
      // a warm buttery glow as the pan goes off
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 130, color: butter,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 120, color: butter,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // a wisp of hot steam rising off the pan
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: 2 }, { time: 0.15, count: 2 }], shape: { type: 'cone', radius: 14, angle: 0.3 }, dir: Math.PI / 2,
        speed: [50, 90], life: [0.7, 0.9], size: [18, 26], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.4)), c.noise(1.2, 12), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.4], [1, 1.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.35, 0.5], [0, 1]]))], order: 1 }, 'up')),
      // the popped kernels: fluffy puffs that swell as they burst open, fly up, tumble and fall
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: pops, shape: { type: 'cone', radius: 14, angle: 0.45 }, dir: Math.PI / 2,
        speed: [320, 500], life: [0.65, 0.75], size: [14, 20], rotation: [0, 6.28], color: kernel,
        behaviors: [c.gravity(1000), c.spin(-8, 8), c.sizeOverLife(c.curve([[0, 0.3], [0.08, 1.2], [0.18, 1], [0.85, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.85))], order: 3 }, 'up')),
      // buttery spots on some kernels
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: 2 }, { time: 0.1, count: 2 }, { time: 0.22, count: 1 }], shape: { type: 'cone', radius: 14, angle: 0.45 }, dir: Math.PI / 2,
        speed: [320, 480], life: [0.65, 0.75], size: [12, 17], rotation: [0, 6.28], color: [butter, col],
        behaviors: [c.gravity(1000), c.spin(-8, 8), c.sizeOverLife(c.curve([[0, 0.3], [0.08, 1.2], [0.18, 1], [0.85, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.85))], order: 3 }, 'up')),
      // golden hull flakes knocked off by the pops
      c.sys(c.spray({ tex: 'shard', blend: 'normal', bursts: [{ count: 3 }, { time: 0.14, count: 3 }, { time: 0.3, count: 2 }], shape: { type: 'cone', radius: 12, angle: 1.2 }, dir: Math.PI / 2,
        speed: [160, 300], life: [0.4, 0.5], size: [5, 8], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.gravity(1100), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 2 }, 'up')),
      // the little pops: white flashes crackling in time with the kernels
      c.sys({ tex: 'spark', blend: 'add', bursts: pops.map((b) => ({ time: b.time, count: Math.max(1, b.count - 1) })), shape: { type: 'circle', radius: 24 },
        speed: 0, life: 0.14, size: [20, 30], rotation: [0, 0.8], color: ['#ffffff', butter],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]]))], order: 4 }),
    ];
  },
};
