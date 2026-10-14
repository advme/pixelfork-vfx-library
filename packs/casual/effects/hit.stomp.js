/** A stomp on an enemy's head: a squash ring, dust puffed out to both sides and stars popping up. */
export default {
  name: 'hit.stomp',
  category: 'hit',
  whenToUse: 'The player jumps on an enemy\'s head, squashes a bug, ground-pounds a target or bounces off a foe in a platformer. Play it on top of the enemy as it gets squashed.',
  duration: 0.55, loop: false, tint: '#ffe14d',
  tags: ['stomp', 'squash', 'jump on', 'platformer', 'mario', 'ground pound', 'enemy', 'hit'],
  build(c) {
    const col = c.color('#ffe14d');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const side = (dir) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [3, 4] }], dir, shape: { type: 'cone', radius: 4, angle: 0.35 },
      speed: [160, 260], life: [0.3, 0.42], size: [18, 28], rotation: [0, 6.28], color: '#f4f4f4',
      behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0, 1]]))], order: 1 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 110, color: '#fff6d0',
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 3 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.28, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1.1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      side(0.15), side(Math.PI - 0.15),
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: 8, angle: 0.55 },
        speed: [200, 320], life: [0.4, 0.5], size: [14, 20], rotation: [0, 6.28], color: [col, '#ffffff'],
        behaviors: [c.gravity(900), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [0.7, 1], [1, 0]]))], order: 4 }, 'up')),
    ];
  },
};
