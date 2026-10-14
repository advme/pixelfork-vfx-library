/** A steam vent: white steam hisses up in a jet and billows away. Loops until stopped. */
export default {
  name: 'world.steam',
  category: 'world',
  whenToUse: 'Steam or vapour escaping: a pipe or vent in a factory, a hot spring, a kettle, a geyser vent, a cooling engine, hot food. Play it at the opening and leave it running; size 0.4 for a cup or pot.',
  duration: 1, loop: true, tint: '#ffffff',
  tags: ['steam', 'vapor', 'vent', 'pipe', 'factory', 'hot spring', 'kettle', 'cooking', 'industrial'],
  build(c) {
    const col = c.color('#ffffff');
    return [
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 16, shape: { type: 'cone', radius: 4, angle: 0.2 },
        speed: [160, 240], life: [0.8, 1.1], size: [16, 24], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.noise(1, 14), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.4], [1, 3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.4, 0.5], [0, 1]]))], order: 1 }),
    ];
  },
};
