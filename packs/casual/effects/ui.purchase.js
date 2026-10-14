/** A purchase goes through: a green flash and double ring, gold coins hop up and fall, white and green sparkles burst out. */
export default {
  name: 'ui.purchase',
  category: 'ui',
  whenToUse: 'A purchase succeeds in a shop: an item, skin, booster or upgrade bought with coins or gems, an in-app purchase confirmed, a deal paid for. Play with { el } on the Buy button or the item bought. For a free reward being claimed use ui.burst; for coins collected in play use pickup.coin.',
  duration: 0.85, loop: false, tint: '#3ee86f',
  tags: ['ui', 'purchase', 'buy', 'shop', 'store', 'coins', 'success', 'paid'],
  build(c) {
    const col = c.color('#3ee86f');
    const light = c.lighten(col, 0.55);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.1, count: 1 }], life: 0.45, size: 180, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // gold glints thrown up with the coins
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.03, count: 8 }], shape: { type: 'cone', radius: 10, angle: 0.8 },
        speed: [200, 380], life: [0.3, 0.5], size: [5, 8], color: '#ffe680',
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.4)), c.sizeOverLife(c.shrink())], order: 2 }),
      // the coins hop up and fall back past the button
      c.sys({ tex: 'coin', blend: 'normal', bursts: [{ time: 0.03, count: [9, 11] }], shape: { type: 'cone', radius: 12, angle: 0.65 },
        speed: [300, 480], life: [0.6, 0.85], size: [15, 22], rotation: [-0.5, 0.5], color: ['#ffd23f', '#ffb422'],
        behaviors: [c.gravity(1200), c.spin(-4, 4), c.sizeOverLife(c.curve([[0, 0.5], [0.1, 1], [0.8, 1], [1, 0]]))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [9, 11] }], shape: { type: 'circle', radius: 26 },
        speed: [90, 240], life: [0.4, 0.7], size: [10, 18], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 120), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 }),
    ];
  },
};
