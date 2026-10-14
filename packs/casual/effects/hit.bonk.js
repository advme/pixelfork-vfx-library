/** A cartoon BONK on the head: a bright pop, a ring, little white impact lines and yellow stars bouncing out. */
export default {
  name: 'hit.bonk',
  category: 'hit',
  whenToUse: 'Something bonks a character on the head in a funny cartoon way with no blood: a mallet, a frying pan, a falling coconut or anvil, a head bump, a slapstick hit; play it on top of the head, and follow it with state.stun if they stay dizzy.',
  duration: 0.6, loop: false, anchor: 'head', tint: '#ffd83a',
  tags: ['bonk', 'head', 'cartoon', 'comedy', 'mallet', 'bump', 'stars', 'slapstick'],
  build(c) {
    const col = c.color('#ffd83a');
    const light = c.lighten(col, 0.6);
    // an upward burst: the upper half-circle in 2D, a wide cone aimed up in 3D
    // (c.vol would turn the half-circle into a hemisphere that opens toward the camera, not upward)
    const up = (p) => c.sys(c.is3d ? c.spray(Object.assign({}, p, { shape: { type: 'cone', radius: p.shape.radius, angle: 1.1 } }), 'up') : p);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 100, color: '#fff8e0',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 110, rotation: 0.25, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.26, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // comic impact lines fanning up and out from the bump (8 even lines across the upper half)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 40, thickness: 0, arc: Math.PI * 8 / 7, even: true },
        speed: [270, 310], life: 0.2, size: 6, color: '#ffffff',
        stretch: { speed: 0.01, length: 4 },
        behaviors: [c.speedOverLife(c.decel(0.1)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.curve([[0, 0.7], [0.25, 1], [1, 0.3]]))], order: 4 }),
      // the cartoon stars, solid so they read on any background
      up({ tex: 'star', blend: 'normal', bursts: [{ time: 0.02, count: [5, 6] }], shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [220, 380], life: [0.45, 0.58], size: [18, 26], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1000), c.spin(-8, 8), c.speedOverLife(c.decel(0.4)), c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1.2], [0.25, 1], [0.8, 1], [1, 0]]))], order: 5 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 8 },
        speed: [150, 300], life: [0.22, 0.32], size: [5, 8], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 2 })),
    ];
  },
};
