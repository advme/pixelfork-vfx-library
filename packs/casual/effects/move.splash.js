/** A water splash: drops up in a fan, foam and a ripple ring. */
export default {
  name: 'move.splash',
  category: 'move',
  whenToUse: 'Something falls into or jumps out of water, a puddle is stepped in, a boat hits a wave. Play at the water surface.',
  duration: 0.9,
  loop: false,
  tint: '#7fd4ff',
  tags: ['splash', 'water', 'drops', 'puddle', 'wave', 'swim'],
  build(c) {
    const col = c.color('#7fd4ff');
    const light = c.lighten(col, 0.7);
    return [
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [16, 22] }], shape: { type: 'cone', radius: 14, angle: 0.5 },
        speed: [350, 650], life: [0.5, 0.75], size: [7, 14], color: [light, col],
        stretch: { speed: 0.004, length: 1.4 },
        behaviors: [c.gravity(1500), c.colorOverLife(c.fade(0.7)), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 3 })),
      // foam
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 14, angle: 0.7 },
        speed: [120, 260], life: [0.35, 0.55], size: [26, 44], rotation: [0, 6.28], color: light,
        behaviors: [c.gravity(600), c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 0.9]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))], order: 2 })),
      c.sys(c.flat({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }, { time: 0.15, count: 1 }], life: 0.5, size: 140, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 80, color: light,
        behaviors: [c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.2))], order: 0 }),
    ];
  },
};
