/** A key pickup: the key pops up and spins with a gold flash. */
export default {
  name: 'pickup.key',
  category: 'pickup',
  whenToUse: 'A key, a pass, a ticket or an access card is collected; a door unlocks.',
  duration: 0.8, loop: false, tint: '#ffcf3f',
  tags: ['key', 'unlock', 'door', 'ticket', 'pass', 'collect'],
  build(c) {
    const col = c.color('#ffcf3f');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'key', blend: 'normal', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0, angle: 0.1 },
        speed: [240, 300], life: 0.65, size: 38, color: col,
        behaviors: [c.gravity(800), c.spin(4), c.sizeOverLife(c.curve([[0, 0.7], [0.15, 1], [0.75, 1], [1, 0]])), c.colorOverLife(c.fade(0.75))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 100, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 80, color: light,
        behaviors: [c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [6, 9] }], shape: { type: 'circle', radius: 14 },
        speed: [40, 120], life: [0.35, 0.6], size: [8, 14], color: light,
        behaviors: [c.force(0, 120), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 }),
    ];
  },
};
