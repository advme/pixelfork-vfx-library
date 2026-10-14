/** A jackpot: golden rays turn behind a bright burst while a fountain of coins sprays up and rains down. */
export default {
  name: 'reward.jackpot',
  category: 'reward',
  whenToUse: 'A big win: a slot or casino jackpot, a lucky spin, a huge payout in an idle or clicker game, a treasure vault opening. Play it at the centre of the win. For a normal coin pickup use pickup.coin; for coins falling from the top use reward.coinshower.',
  duration: 1.5, loop: false, tint: '#ffd23a',
  tags: ['jackpot', 'win', 'casino', 'slots', 'coins', 'payout', 'idle', 'treasure', 'reward'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    const rays = c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0.7, 0.7], [0, 1]]);
    return [
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 1.3, size: 330, rotation: [0, 0.8], color: col,
        behaviors: [c.spin(0.5, 0.7), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 0.9]])), c.colorOverLife(rays)], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 220, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      // the coin fountain
      c.sys(c.spray({ tex: 'coin', blend: 'normal', bursts: [{ count: [14, 16] }, { time: 0.15, count: [8, 10] }, { time: 0.3, count: [5, 6] }], shape: { type: 'cone', radius: 10, angle: 0.45 },
        speed: [520, 860], life: [0.95, 1.15], size: [18, 26], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1500), c.spin(-6, 6), c.colorOverLife(c.fade(0.85))], order: 3 }, 'up')),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [12, 14] }, { time: 0.3, count: [6, 8] }], shape: { type: 'circle', radius: 30 },
        speed: [100, 260], life: [0.4, 0.7], size: [10, 18], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-4, 4), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
