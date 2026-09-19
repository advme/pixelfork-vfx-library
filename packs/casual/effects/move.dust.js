/** Small dust puffs kicked up while running. Loops until stopped. */
export default {
  name: 'move.dust',
  category: 'move',
  whenToUse: 'A character or vehicle is running or driving on the ground. Follow the feet or wheels; stop when they stop.',
  duration: 1,
  loop: true,
  tint: '#e9dcc7',
  tags: ['dust', 'run', 'drive', 'trail', 'ground', 'wheels'],
  build(c) {
    const col = c.color('#e9dcc7');
    return [
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 14, shape: c.is3d ? { type: 'circle', radius: 8, thickness: 0.4 } : { type: 'circle', radius: 8, arc: Math.PI, thickness: 0.5 },
        speed: [30, 90], life: [0.4, 0.6], size: [14, 24], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 50), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.5], [0, 1]]))] })),
    ];
  },
};
