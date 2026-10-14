/** A rustle through a bush: a burst of leaves pops out, then spins and flutters down, with flicked grass bits, a couple of twigs and a puff of green dust. */
export default {
  name: 'move.rustle',
  category: 'move',
  whenToUse: 'A character walks, runs, rolls or dives through a bush, a hedge, a pile of leaves or tall grass, or something shakes a bush: hiding in grass, a stealth game, a farm or forest level, searching a bush for an item. Play it on the bush each time it is disturbed; tint it orange for autumn leaves. For chopping a tree use gather.wood; for dust from running use move.dust; for picking a crop use gather.harvest.',
  duration: 1.0, loop: false, tint: '#5cc04a',
  tags: ['leaves', 'bush', 'grass', 'rustle', 'hide', 'stealth', 'forest', 'garden', 'shake'],
  build(c) {
    const col = c.color('#5cc04a');
    // an upward burst: the upper half-circle in 2D, a wide cone aimed up in 3D (where c.vol would make a hemisphere facing the camera, half of it under the floor)
    const up = (p) => c.sys(c.is3d ? c.spray(Object.assign({}, p, { shape: { type: 'cone', radius: p.shape.radius, angle: 1.2 } }), 'up') : p);
    return [
      // a soft puff of leaf dust
      up({ tex: 'puff', blend: 'normal', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 16, arc: Math.PI },
        speed: [40, 90], life: [0.4, 0.55], size: [36, 52], rotation: [0, 6.28], color: c.lighten(col, 0.55),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0, 1]]))], order: 0 }),
      // twigs
      up({ tex: 'shard', blend: 'normal', bursts: [{ count: [2, 3] }], shape: { type: 'circle', radius: 14, arc: Math.PI },
        speed: [160, 260], life: [0.45, 0.6], size: [7, 10], rotation: [0, 6.28], color: ['#8a5a33', '#6b4426'],
        behaviors: [c.gravity(1100), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 1 }),
      // the leaves: thrown out fast, then caught by the air and fluttering down
      up({ tex: 'leaf', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 18, arc: Math.PI },
        speed: [150, 270], life: [0.8, 1.0], size: [12, 18], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.speedOverLife(c.curve([[0, 1], [0.3, 0.3], [1, 0.3]])), c.gravity(500), c.noise(2, 40), c.spin(-9, 9), c.colorOverLife(c.fade(0.7))], order: 2 }),
      // little grass blades and leaf bits flicked high
      up({ tex: 'leaf', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 14, arc: Math.PI },
        speed: [180, 300], life: [0.45, 0.6], size: [5, 8], rotation: [0, 6.28], color: c.lighten(col, 0.25),
        behaviors: [c.gravity(1000), c.spin(-12, 12), c.colorOverLife(c.fade(0.6))], order: 3 }),
    ];
  },
};
