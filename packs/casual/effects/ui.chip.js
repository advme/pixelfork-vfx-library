/** Casino chips clink down: a flash, a double ring, little chips hopping up and dropping, and gold glints. */
export default {
  name: 'ui.chip',
  category: 'ui',
  whenToUse: 'Casino or poker chips are placed, bet, stacked or won at a table: a bet in blackjack, roulette or poker, a pot pushed to the winner. Play it on the chip stack and tint it with the chip colour. For coins collected use pickup.coin; for a big casino win use reward.jackpot.',
  duration: 0.5, loop: false, tint: '#ff4d5e',
  tags: ['ui', 'chip', 'casino', 'poker', 'bet', 'blackjack', 'roulette', 'stack'],
  build(c) {
    const col = c.color('#ff4d5e');
    const light = c.lighten(col, 0.55);
    // in 3D the ring lies flat on the table top where it was played (not snapped down to the floor)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ring' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'add', bursts: [{ count: 1 }, { time: 0.07, count: 1 }], life: 0.3, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // tiny bright dots
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 10 },
        speed: [160, 260], life: [0.25, 0.35], size: [3, 5], color: light,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.shrink())], order: 2 })),
      // little chips hopping up and falling back
      c.sys(c.spray({ tex: 'coin', blend: 'normal', bursts: [{ count: [4, 5] }], dir: Math.PI / 2, shape: { type: 'cone', radius: 10, angle: 0.55 },
        speed: [220, 330], life: [0.42, 0.52], size: [12, 16], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1300), c.spin(-8, 8), c.sizeOverLife(c.curve([[0, 0.6], [0.15, 1], [0.8, 1], [1, 0]]))], order: 3 }, 'up')),
      // gold glints
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 18 },
        speed: [40, 110], life: [0.3, 0.45], size: [10, 16], rotation: [0, 0.8], color: '#fff1b0',
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
    ];
  },
};
