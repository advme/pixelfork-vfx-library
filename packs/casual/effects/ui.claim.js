/** A claim button pays out: a gold flash and double ring, a fountain of coins hops up out of the whole button and tumbles back down past it, with glints and white sparkles bursting round it. */
export default {
  name: 'ui.claim',
  category: 'ui',
  whenToUse: 'The player presses a Claim or Collect button and takes coins or another currency: a daily reward, a quest or mission payout, idle or offline earnings, a free coin gift, a battle-pass reward. Play with { el } on the button; coins and sparkles burst out of it (tint it for gems or another currency). For a paid purchase use ui.purchase; for a colourful burst without coins use ui.burst; for one coin picked up in play use pickup.coin; for coins raining over the whole screen use reward.coinshower.',
  duration: 0.9, loop: false, tint: '#ffcf3f',
  tags: ['ui', 'claim', 'collect', 'coins', 'reward', 'payout', 'button', 'daily'],
  build(c) {
    const col = c.color('#ffcf3f');
    const light = c.lighten(col, 0.6);
    const deep = c.darken(col, 0.14);
    const w = Math.max(40, Math.min(320, c.target.w));
    // the glow and rings fit the button; the coins leave from across most of its width
    const g = Math.max(90, Math.min(260, w * 1.25));
    const mouth = Math.max(10, Math.min(70, w * 0.3));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: g, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.09, count: 1 }], life: 0.42, size: g * 1.3, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // glints thrown up with the coins
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ time: 0.02, count: 10 }], shape: { type: 'cone', radius: mouth, angle: 0.75 }, dir: Math.PI / 2,
        speed: [240, 440], life: [0.3, 0.5], size: [5, 8], color: light,
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.4)), c.sizeOverLife(c.shrink())], order: 2 }, 'up')),
      // the coin fountain: they hop about 100 px up and fall back past the button
      c.sys(c.spray({ tex: 'coin', blend: 'normal', bursts: [{ time: 0.02, count: [11, 13] }, { time: 0.1, count: [4, 5] }], shape: { type: 'cone', radius: mouth, angle: 0.6 }, dir: Math.PI / 2,
        speed: [340, 520], life: [0.6, 0.85], size: [16, 24], rotation: [-0.5, 0.5], color: [col, deep],
        behaviors: [c.gravity(1300), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.4], [0.1, 1], [0.8, 1], [1, 0]]))], order: 3 }, 'up')),
      // white and gold sparkles bursting out of the button
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [9, 11] }], shape: { type: 'circle', radius: Math.max(14, Math.min(60, w * 0.25)) },
        speed: [100, 260], life: [0.4, 0.65], size: [10, 18], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 120), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
