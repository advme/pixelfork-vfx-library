/** Flying: wing flaps push little gusts out to both sides. Loops until stopped. */
export default {
  name: 'move.fly',
  category: 'move',
  whenToUse: 'A bird, bee, dragon or winged character is flying or hovering. Follow the body; stop on landing.',
  duration: 0.45, loop: true, tint: '#ffffff',
  tags: ['fly', 'wings', 'flap', 'hover', 'bird', 'gust'],
  build(c) {
    const col = c.color('#ffffff');
    const flap = (dir) => c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, duration: 0.45, bursts: [{ count: [2, 3] }],
      shape: { type: 'cone', radius: 10, angle: 0.4 }, dir, offset: [dir < Math.PI / 2 ? 18 : -18, 0],
      speed: [120, 220], life: [0.3, 0.45], size: [16, 26], rotation: [0, 6.28], color: col,
      behaviors: [c.speedOverLife(c.decel(0.1)), c.gravity(300), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.1]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.45, 0.5], [0, 1]]))], order: 1 });
    return [
      flap(-Math.PI / 6), flap(Math.PI + Math.PI / 6),
      c.sys({ tex: 'leaf', blend: 'normal', loop: true, world: true, rate: 2, shape: { type: 'circle', radius: 20 },
        speed: [10, 30], life: [0.8, 1.2], size: [6, 10], rotation: [0, 6.28], color: col,
        behaviors: [c.gravity(250), c.limitSpeed(120, 1), c.noise(2, 12), c.spin(-4, 4), c.colorOverLife(c.fade(0.6))], order: 2 }),
    ];
  },
};
