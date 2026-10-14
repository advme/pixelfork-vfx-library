/** A hit into the ground: clods of dirt kicked up, fine specks, and a puff of dust. */
export default {
  name: 'hit.dirt',
  category: 'hit',
  whenToUse: 'A bullet, arrow, shovel, hoof or heavy step hits soil, sand or grass: missed shots in a shooter, digging, a stomp on dirt. Play it on the ground where it hit. Tint it for sand, mud or snow.',
  duration: 0.8, loop: false, tint: '#8a6a48',
  tags: ['dirt', 'ground', 'impact', 'bullet', 'soil', 'sand', 'dig', 'miss'],
  build(c) {
    const col = c.color('#8a6a48');
    return [
      // clods
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [7, 10] }], shape: { type: 'cone', radius: 4, angle: 0.5 },
        speed: [260, 520], life: [0.5, 0.75], size: [5, 10], rotation: [0, 6.28], color: [col, c.darken(col, 0.35)],
        behaviors: [c.gravity(1600), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 3 }, 'up'), 'box')),
      // specks
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [14, 20] }], shape: { type: 'cone', radius: 4, angle: 0.4 },
        speed: [300, 650], life: [0.35, 0.55], size: [2, 4], color: c.darken(col, 0.2),
        behaviors: [c.gravity(1700), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
      // dust
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [40, 120], life: [0.5, 0.75], size: [24, 40], rotation: [0, 6.28], color: c.lighten(col, 0.45),
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 40), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.5, 0.5], [0, 1]]))], order: 2 })),
      c.sys(c.flat({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.35, size: 70, color: c.lighten(col, 0.3),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 1 })),
    ];
  },
};
