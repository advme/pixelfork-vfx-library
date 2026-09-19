/** A quick combo flash: a bright pop with a small star ring. Fast, stackable. */
export default {
  name: 'reward.combo',
  category: 'reward',
  whenToUse: 'A combo counter goes up, a chain reaction step, a rapid hit streak. Short enough to fire several times a second. Tint by combo level.',
  duration: 0.45,
  loop: false,
  tint: '#ff9f43',
  tags: ['combo', 'chain', 'streak', 'multiplier', 'pop', 'fast'],
  build(c) {
    const col = c.color('#ff9f43');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: 6 }], shape: { type: 'circle', radius: 20, thickness: 0, even: true },
        speed: 150, life: [0.3, 0.4], size: [12, 18], rotation: [0, 6.28], color: light,
        behaviors: [c.spin(-6, 6), c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.15, 0.6))], order: 3 }),
    ];
  },
};
