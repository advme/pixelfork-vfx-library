/** A curse: dark wisps spiral inward and a sickly ring pulses. */
export default {
  name: 'magic.curse',
  category: 'magic',
  whenToUse: 'A curse, hex, debuff or drain lands on a character; a cursed item is picked up. Play on the body.',
  duration: 1.2, loop: false, tint: '#7a2cff',
  tags: ['curse', 'hex', 'debuff', 'drain', 'evil', 'spiral'],
  build(c) {
    const col = c.color('#7a2cff');
    const light = c.lighten(col, 0.4);
    return [
      // wisps spiralling inward
      c.sys(c.ground({ tex: 'glow', blend: 'add', rate: 60, duration: 0.7, shape: { type: 'circle', radius: 110, thickness: 0.3 },
        speed: [-150, -110], life: [0.6, 0.8], size: [8, 16], color: [light, col],
        behaviors: [c.orbit(5), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.6))], order: 2 })),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', rate: 30, duration: 0.7, shape: { type: 'circle', radius: 100, thickness: 0.3 },
        speed: [-130, -90], life: [0.7, 0.9], size: [24, 40], rotation: [0, 6.28], color: [c.darken(col, 0.6), c.darken(col, 0.85)],
        behaviors: [c.orbit(4), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 0.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.3], [0, 1]]))], order: 1 })),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ time: 0.7, count: 1 }], life: 0.5, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.1]])), c.colorOverLife(c.fade(0.3))], order: 3 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.75, count: 1 }], life: 0.4, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
    ];
  },
};
