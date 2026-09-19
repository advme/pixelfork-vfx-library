/** A punchy cartoon hit: white flash, a ring, sparks and a few stars. */
export default {
  name: 'hit.impact',
  category: 'hit',
  whenToUse: 'Something gets hit: a punch, a sword slash landing, a ball striking a block, a bullet hitting a wall.',
  duration: 0.5,
  loop: false,
  tint: '#ffdd55',
  tags: ['hit', 'punch', 'impact', 'damage', 'slash'],
  build(c) {
    const col = c.color('#ffdd55');
    const light = c.lighten(col, 0.6);
    return [
      // flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: [80, 100], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      // shockwave ring
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))] }),
      // sparks
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 6, thickness: 0 },
        speed: [350, 650], life: [0.22, 0.4], size: [7, 11], color: [light, col],
        stretch: { speed: 0.025, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(500), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())] }),
      // stars tumbling out
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 4 },
        speed: [160, 320], life: [0.35, 0.5], size: [14, 22], rotation: [0, 6.28], color: light,
        behaviors: [c.spin(-7, 7), c.gravity(800), c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 1], [0.6, 1], [1, 0]]))], order: 1 }),
    ];
  },
};
