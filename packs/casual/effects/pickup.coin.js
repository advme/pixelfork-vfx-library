/** A coin pop: a coin flips up, gold rings and sparkles. */
export default {
  name: 'pickup.coin',
  category: 'pickup',
  whenToUse: 'A coin or money is collected. More "coin" than pickup.sparkle: a little coin pops up and fades. Also for a cash reward.',
  duration: 0.7,
  loop: false,
  tint: '#ffcf3f',
  tags: ['coin', 'money', 'cash', 'gold', 'collect', 'pickup'],
  build(c) {
    const col = c.color('#ffcf3f');
    const light = c.lighten(col, 0.6);
    return [
      // the coin itself, popping up then falling a bit while shrinking
      c.sys({ tex: 'coin', blend: 'normal', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0, angle: 0.15 },
        speed: [260, 320], life: 0.55, size: 30, color: col,
        behaviors: [c.gravity(900), c.sizeOverLife(c.curve([[0, 0.7], [0.15, 1], [0.7, 1], [1, 0]])), c.colorOverLife(c.fade(0.7))], order: 3 }),
      // ring + flash
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 80, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 60, color: light,
        behaviors: [c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // small coins / dots flying
      c.sys({ tex: 'coin', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 6 },
        speed: [150, 300], life: [0.35, 0.5], size: [8, 13], color: col,
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [5, 8] }], shape: { type: 'circle', radius: 12 },
        speed: [40, 120], life: [0.3, 0.5], size: [8, 14], color: light,
        behaviors: [c.force(0, 120), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 }),
    ];
  },
};
