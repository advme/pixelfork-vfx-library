/** A shield popping on: expanding ring, bright rim and a quick sparkle. */
export default {
  name: 'magic.shield',
  category: 'magic',
  whenToUse: 'A shield, barrier or block activates, an attack is deflected, armour absorbs a hit. For a lasting bubble use state.shield.',
  duration: 0.6,
  loop: false,
  tint: '#6fc3ff',
  tags: ['shield', 'block', 'barrier', 'deflect', 'armor', 'parry'],
  build(c) {
    const col = c.color('#6fc3ff');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'disc', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 150, color: c.darken(col, 0.3),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.4, 0.2], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.1, count: 1 }], life: 0.45, size: 190, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 1.05]])), c.colorOverLife(c.fade(0.4))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 110, color: light, rotation: 0.6,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 12 }], shape: { type: 'circle', radius: 70, thickness: 0, even: true },
        speed: [20, 60], life: [0.3, 0.5], size: [6, 10], color: light,
        behaviors: [c.colorOverLife(c.fade(0.3)), c.sizeOverLife(c.shrink())], order: 4 }),
    ];
  },
};
