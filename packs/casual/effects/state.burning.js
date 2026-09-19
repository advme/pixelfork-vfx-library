/** On fire: flames licking upward with embers and a little smoke. Loops until stopped. */
export default {
  name: 'state.burning',
  category: 'state',
  whenToUse: 'A character, enemy, torch, campfire or object is burning. Play on it with follow; stop when the fire goes out.',
  duration: 1, loop: true, tint: '#ff7a1f',
  tags: ['burning', 'fire', 'flame', 'torch', 'campfire', 'status', 'lava'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.5);
    return [
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 24, shape: c.is3d ? { type: 'circle', radius: 14 } : { type: 'circle', radius: 14, arc: Math.PI },
        speed: [20, 60], life: [0.4, 0.6], size: [22, 40], color: [light, col],
        behaviors: [c.force(0, 220), c.limitSpeed(180, 1), c.noise(3, 8), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 })),
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 10, shape: { type: 'circle', radius: 12 },
        speed: [30, 80], life: [0.5, 0.9], size: [3, 6], color: light,
        behaviors: [c.force(0, 260), c.noise(4, 12), c.colorOverLife(c.fade(0.5))], order: 3 })),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 4, shape: { type: 'circle', radius: 10 }, offset: [0, 30],
        speed: [10, 30], life: [0.8, 1.2], size: [20, 34], rotation: [0, 6.28], color: ['#555', '#333'],
        behaviors: [c.force(0, 90), c.noise(1.5, 10), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.2], [0.4, 0.6], [0, 1]]))], order: 1 })),
      c.sys({ tex: 'glow', blend: 'add', loop: true, bursts: [{ count: 1 }], life: 1, size: 70, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [0.5, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.8, 0.5], [0.6, 1]]))], order: 0 }),
    ];
  },
};
