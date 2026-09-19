/** A big cartoon explosion: shockwave, fire, lots of smoke and sparks. ~300px. */
export default {
  name: 'explosion.big',
  category: 'explosion',
  whenToUse: 'A boss dies, a building or tank blows up, a big bomb goes off, a level-ending blast. Twice the size of explosion.small.',
  duration: 1.5,
  loop: false,
  tint: null,
  tags: ['explosion', 'big', 'boss', 'blast', 'nuke', 'boom'],
  build(c) {
    const fire = c.tint
      ? c.grad([[c.lighten(c.tint, 0.8), 0], [c.tint, 0.3], [c.darken(c.tint, 0.6), 1]], [[1, 0], [1, 0.6], [0, 1]])
      : c.grad([['#fff6c0', 0], ['#ffc23a', 0.25], ['#ff6a1f', 0.6], ['#4a2418', 1]], [[1, 0], [1, 0.6], [0, 1]]);
    const smoke = c.grad([['#9a9a9a', 0], ['#4f4f4f', 1]], [[0, 0], [0.8, 0.15], [0.5, 0.6], [0, 1]]);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 380, color: '#fff7d0',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 420, color: '#ffd28a',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 })),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [14, 18] }, { time: 0.12, count: [6, 8] }], shape: { type: 'circle', radius: 20 },
        speed: [120, 320], life: [0.45, 0.7], size: [70, 120], rotation: [0, 6.28],
        behaviors: [c.colorOverLife(fire), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.15]])), c.speedOverLife(c.decel(0.1)), c.spin(-2, 2)], order: 2 })),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.15, count: [12, 16] }], shape: { type: 'circle', radius: 30 },
        speed: [50, 160], life: [0.9, 1.4], size: [90, 150], rotation: [0, 6.28],
        behaviors: [c.colorOverLife(smoke), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])), c.speedOverLife(c.decel(0.2)), c.force(0, 80), c.spin(-1.5, 1.5)], order: 1 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [28, 36] }], shape: { type: 'circle', radius: 12, thickness: 0 },
        speed: [400, 1000], life: [0.4, 0.8], size: [7, 12], color: ['#fff2a8', c.tint ? c.tint : '#ffb330'],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 5 })),
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 10 },
        speed: [350, 700], life: [0.7, 1.1], size: [9, 16], rotation: [0, 6.28], color: ['#5a3a2a', '#2e1d15'],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 5 })),
    ];
  },
};
