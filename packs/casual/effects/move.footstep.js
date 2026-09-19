/** One small dust puff for a single footstep. */
export default {
  name: 'move.footstep',
  category: 'move',
  whenToUse: 'Each footstep of a walking character, a hoof, a paw; tiny and quick. For continuous running use move.dust instead.',
  duration: 0.4, loop: false, tint: '#e9dcc7',
  tags: ['footstep', 'step', 'walk', 'puff', 'tiny', 'paw'],
  build(c) {
    const col = c.color('#e9dcc7');
    return [
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [2, 3] }], shape: c.is3d ? { type: 'circle', radius: 5, thickness: 0.4 } : { type: 'circle', radius: 5, arc: Math.PI },
        speed: [30, 80], life: [0.3, 0.4], size: [12, 18], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 40), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.5], [0, 1]]))] })),
    ];
  },
};
