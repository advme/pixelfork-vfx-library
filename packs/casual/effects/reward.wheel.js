/** A prize-wheel win: sparkles race round a glowing circle, then a flash, a ring and a burst of coins and stars. */
export default {
  name: 'reward.wheel',
  category: 'reward',
  whenToUse: 'A prize wheel, lucky spin, roulette or daily-spin wheel stops on a prize. Play it at the centre of the wheel when it stops. For a slot-machine jackpot or a huge payout use reward.jackpot; for a single coin use pickup.coin.',
  duration: 1.35, loop: false, tint: '#ffd23a',
  tags: ['wheel', 'spin', 'lucky spin', 'prize', 'roulette', 'daily reward', 'casino', 'reward'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the moment the sparkles finish their laps and the prize bursts out
    const hit = 0.5;
    return [
      // a glow building up behind the wheel
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: 230, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.5], [0.7, 0.85], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [0.8, 1], [1, 1.1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0.6, 0.8], [0, 1]]))], order: 1 }),
      // sparkles racing round the rim, and smaller dots round the other way inside
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 90, thickness: 0, even: true },
        speed: 0, life: 0.55, size: 20, color: light,
        behaviors: [c.orbit(7), c.spin(4, 4), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]))], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 66, thickness: 0, even: true },
        speed: 0, life: 0.55, size: 10, color: col,
        behaviors: [c.orbit(-5), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]))], order: 2 }),
      // the win: a flash and a ring
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: hit, count: 1 }], life: 0.25, size: 260, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: hit, count: 1 }], life: 0.45, size: 300, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      // a fountain of coins
      c.sys(c.spray({ tex: 'coin', blend: 'normal', bursts: [{ time: hit, count: [12, 14] }, { time: hit + 0.1, count: [6, 8] }], shape: { type: 'cone', radius: 10, angle: 0.5 },
        speed: [480, 760], life: [0.6, 0.75], size: [18, 24], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1500), c.spin(-6, 6), c.colorOverLife(c.fade(0.85))], order: 4 }, 'up')),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: hit, count: [12, 14] }], shape: { type: 'circle', radius: 30 },
        speed: [160, 320], life: [0.5, 0.7], size: [10, 18], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-4, 4), c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
    ];
  },
};
