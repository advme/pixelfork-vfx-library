/** Swimming: bubbles and small ripples around the body. Loops until stopped. */
export default {
  name: 'move.swim',
  category: 'move',
  whenToUse: 'A character or fish is swimming or diving. Follow the body; stop when it leaves the water.',
  duration: 1, loop: true, tint: '#bfefff',
  tags: ['swim', 'dive', 'underwater', 'bubbles', 'fish', 'water'],
  build(c) {
    const col = c.color('#bfefff');
    return [
      c.sys({ tex: 'ring', blend: 'normal', loop: true, world: true, rate: 7, shape: { type: 'circle', radius: 16 },
        speed: [10, 30], life: [0.6, 1.0], size: [5, 12], color: col,
        behaviors: [c.force(0, 160), c.limitSpeed(110, 1), c.noise(2, 8), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 10, shape: { type: 'circle', radius: 18 },
        speed: [5, 20], life: [0.5, 0.9], size: [3, 6], color: col,
        behaviors: [c.force(0, 120), c.noise(2, 6), c.colorOverLife(c.fade(0.5))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'normal', loop: true, world: true, rate: 2, life: 0.7, size: 60, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
    ];
  },
};
