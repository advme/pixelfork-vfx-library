/** A multi-ball split: a flash and a ring, and six glowing balls burst out in a star, each with a short comet tail. */
export default {
  name: 'pickup.multiball',
  category: 'pickup',
  whenToUse: 'A multi-ball, split-ball, triple-shot or clone power-up is caught or fires: the ball splits into several in a breakout or pinball game, a shot splits in a shooter. Play it where the power-up was caught or the ball split. For any other power-up use pickup.powerup.',
  duration: 0.5, loop: false, tint: '#ff4fd8',
  tags: ['multiball', 'split', 'power-up', 'breakout', 'pinball', 'triple shot', 'clone', 'arcade'],
  build(c) {
    const col = c.color('#ff4fd8');
    const light = c.lighten(col, 0.6);
    // six balls on evenly spaced paths: the halo, the tail and the core share the same directions, speed and life, so they stay together
    const path = () => ({ bursts: [{ count: 6 }], shape: { type: 'circle', radius: 6, thickness: 0, even: true }, speed: 300, life: 0.5 });
    const ballSize = () => c.sizeOverLife(c.curve([[0, 0.4], [0.12, 1.2], [0.3, 1], [0.75, 1], [1, 0]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the halo around each ball
      c.sys(Object.assign({ tex: 'glow', blend: 'add', size: 40, color: col,
        behaviors: [c.speedOverLife(c.decel(0.08)), ballSize(), c.colorOverLife(c.fade(0.6))], order: 2 }, path())),
      // a comet tail behind each ball; it trails back toward the centre and is gone before the ball slows down
      c.sys(Object.assign({ tex: 'glow', blend: 'add', size: 11, color: light, stretch: { speed: 0.02, length: 1 },
        behaviors: [c.speedOverLife(c.decel(0.08)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.3], [0, 0.6], [0, 1]]))], order: 3 }, path())),
      // the bright core of each ball
      c.sys(Object.assign({ tex: 'disc', blend: 'add', size: 13, color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.08)), ballSize(), c.colorOverLife(c.fade(0.6))], order: 4 }, path())),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [5, 7] }], shape: { type: 'circle', radius: 16 },
        speed: [40, 120], life: [0.3, 0.45], size: [8, 14], rotation: [0, 0.8], color: light,
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 })),
    ];
  },
};
