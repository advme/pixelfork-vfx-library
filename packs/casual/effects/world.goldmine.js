/** A gold mine at work: a warm golden glow, sparkles twinkling up off it and a little coin popping up with a glint every so often. Loops until stopped. */
export default {
  name: 'world.goldmine',
  category: 'world',
  whenToUse: 'A gold mine, bank, farm or money tower is producing income in tower defense, idle, clicker or city builder games: play it on top of the building and leave it running while it earns; for the moment a payout is collected use pickup.coin, for a big win use reward.jackpot, for coins raining down use reward.coinshower and for an unopened chest use world.chestidle.',
  duration: 1.5, loop: true, tint: '#ffcf3a',
  tags: ['gold mine', 'money', 'income', 'tower defense', 'idle', 'coins', 'bank', 'economy'],
  build(c) {
    const col = c.color('#ffcf3a');
    const light = c.lighten(col, 0.6);
    return [
      // the warm glow, breathing slowly (cut: it goes the moment the game stops the loop instead of hanging on)
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.5, bursts: [{ count: 1 }], life: 1.5, size: 120, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.22, 0], [0.38, 0.5], [0.22, 1]]))], order: 0 }),
      // a glint and a gold ring each time a coin pops out
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.5, bursts: [{ time: 0.15, count: 1 }], life: 0.3, size: 70, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 1.5, bursts: [{ time: 0.15, count: 1 }], life: 0.18, size: 54, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]]))], order: 5 }),
      // the coin: one pops up every cycle, and now and then a second one
      c.sys(c.spray({ tex: 'coin', blend: 'normal', loop: true, duration: 1.5,
        bursts: [{ time: 0.15, count: 1 }, { time: 0.85, count: 1, probability: 0.5 }],
        dir: Math.PI / 2, shape: { type: 'cone', radius: 4, angle: 0.35 },
        speed: [280, 340], life: 0.62, size: [18, 22], color: col,
        behaviors: [c.gravity(900), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.75, 1], [1, 0]])), c.colorOverLife(c.fade(0.75))], order: 4 }, 'up')),
      // sparkles twinkling up off the building
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 9, shape: { type: 'circle', radius: 34 },
        speed: [10, 30], life: [0.5, 0.8], size: [8, 14], color: [light, '#ffffff'],
        behaviors: [c.force(0, 60), c.sizeOverLife(c.pop(0.25, 0.5))], order: 3 })),
      // gold dust drifting up
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 8, shape: { type: 'circle', radius: 28 },
        speed: [10, 25], life: [0.8, 1.1], size: [4, 7], color: [col, light],
        behaviors: [c.force(0, 90), c.limitSpeed(50, 1), c.noise(1.5, 8), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 2 })),
    ];
  },
};
