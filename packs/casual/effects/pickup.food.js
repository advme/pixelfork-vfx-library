/** Yum: crumbs fly, little hearts and sparkles rise. */
export default {
  name: 'pickup.food',
  category: 'pickup',
  whenToUse: 'A character eats food, a pet is fed, a potion of stamina is drunk, a snack is collected. Tint to the food colour.',
  duration: 0.9, loop: false, tint: '#ffa34d',
  tags: ['food', 'eat', 'yum', 'feed', 'snack', 'stamina', 'collect'],
  build(c) {
    const col = c.color('#ffa34d');
    const light = c.lighten(col, 0.5);
    return [
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 14] }], shape: { type: 'cone', radius: 8, angle: 0.8 },
        speed: [150, 360], life: [0.4, 0.6], size: [5, 10], color: [col, c.darken(col, 0.3)],
        behaviors: [c.gravity(1300), c.spin(-4, 4), c.colorOverLife(c.fade(0.7))], order: 2 }),
      c.sys({ tex: 'heart', blend: 'normal', bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: 12, angle: 0.5 },
        speed: [60, 130], life: [0.6, 0.9], size: [12, 18], color: '#ff6b9d',
        behaviors: [c.force(0, 150), c.limitSpeed(140, 1), c.noise(1.5, 8), c.sizeOverLife(c.pop(0.15, 0.7)), c.colorOverLife(c.fade(0.7))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 80, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [5, 8] }], shape: { type: 'circle', radius: 14 },
        speed: [30, 100], life: [0.4, 0.7], size: [6, 12], color: light,
        behaviors: [c.force(0, 120), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 }),
    ];
  },
};
