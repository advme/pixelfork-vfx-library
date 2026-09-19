/** Coins rain down across the screen and bounce off the bottom. */
export default {
  name: 'reward.coinshower',
  area: true,
  category: 'reward',
  whenToUse: 'A big money reward: jackpot, chest of coins, level payout, daily bonus. Covers the whole screen from the top.',
  duration: 3.0,
  loop: false,
  anchor: 'top',
  tint: '#ffcf3f',
  tags: ['coins', 'shower', 'jackpot', 'rain', 'money', 'reward', 'payout'],
  build(c) {
    const col = c.color('#ffcf3f');
    if (c.is3d) {
      // 3D: coins rain down around the player and hit the floor
      const y = 470;
      return [
        c.sys(c.env3d({ tex: 'coin', blend: 'normal', rate: 70, duration: 1.6,
          speed: 0, life: [0.62, 0.7], size: [18, 30], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
          behaviors: [c.gravity(2600), c.limitSpeed(820, 1), c.spin(-6, 6), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: 2 }, { w: 620, y })),
        c.sys(c.env3d({ tex: 'spark', blend: 'add', rate: 45, duration: 1.8,
          speed: 0, life: [0.8, 1.0], size: [8, 14], color: c.lighten(col, 0.6),
          behaviors: [c.gravity(1500), c.limitSpeed(520, 1), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.5, 0.3], [0.7, 1], [1, 0]]))], order: 3 }, { w: 620, y })),
        c.sys(Object.assign(c.env3d({ tex: 'ring', blend: 'add', rate: 50, duration: 1.7, bursts: [],
          speed: 0, life: [0.25, 0.35], size: [26, 40], color: c.lighten(col, 0.5),
          behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))] }, { w: 620, y: 1.5 }), { render: 'flat' })),
      ];
    }
    const w = c.view.w + 60;
    return [
      c.sys({ tex: 'coin', blend: 'normal', rate: 45, duration: 1.6, shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [0, 40],
        speed: [0, 40], life: [2.0, 2.6], size: [18, 30], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
        behaviors: [c.gravity(1300), c.limitSpeed(900, 1), c.spin(-6, 6), c.noise(1, 8), c.colorOverLife(c.fade(0.85))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', rate: 25, duration: 1.8, shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [0, 20],
        speed: [0, 30], life: [1.5, 2.2], size: [8, 14], color: c.lighten(col, 0.6),
        behaviors: [c.gravity(900), c.limitSpeed(650, 1), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.5, 0.3], [0.7, 1], [1, 0]]))], order: 3 }),
    ];
  },
};
