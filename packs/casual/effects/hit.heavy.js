/** A heavy slam: a big flash, a shockwave rolling along the ground, dust and rock chips thrown up. */
export default {
  name: 'hit.heavy',
  category: 'hit',
  whenToUse: 'A very heavy blow: a hammer smash, a giant\'s stomp, a body slam, a ground pound, a boss landing, a huge punch. Play it at the point of impact (on the ground for slams). Bigger and slower than hit.punch.',
  duration: 0.8, loop: false, tint: '#ffd27a',
  tags: ['heavy', 'slam', 'smash', 'ground pound', 'hammer', 'stomp', 'shockwave', 'boss', 'hit'],
  build(c) {
    const col = c.color('#ffd27a');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 230, color: '#fff6dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.22, size: 240, rotation: [0, 1.6], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 320, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [12, 14] }], shape: c.is3d ? { type: 'circle', radius: 20, thickness: 0, even: true } : { type: 'circle', radius: 20, thickness: 0, arc: Math.PI, even: true },
        speed: [220, 320], life: [0.5, 0.7], size: [36, 56], rotation: [0, 6.28], color: '#d9cdb8',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'cone', radius: 20, angle: 0.6 },
        speed: [300, 560], life: [0.55, 0.8], size: [7, 13], rotation: [0, 6.28], color: ['#8a7a66', '#5a4d40'],
        behaviors: [c.gravity(1700), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 3 }, 'up'), 'box')),
    ];
  },
};
