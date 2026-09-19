/** Chunks and dust when a crate, wall or rock is hit or broken. */
export default {
  name: 'hit.block',
  category: 'hit',
  whenToUse: 'A crate, brick, wall, rock or block is hit or breaks. Tint it the colour of the material (wood, stone, ice).',
  duration: 0.8,
  loop: false,
  tint: '#c68a4b',
  tags: ['block', 'crate', 'break', 'debris', 'wood', 'stone', 'destroy'],
  build(c) {
    const col = c.color('#c68a4b');
    return [
      // chunks
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 10 },
        speed: [200, 480], life: [0.5, 0.8], size: [8, 16], rotation: [0, 6.28], color: [col, c.darken(col, 0.35)],
        behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 2 }, 'plank')),
      // dust
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 7] }], shape: { type: 'circle', radius: 12 },
        speed: [60, 160], life: [0.4, 0.6], size: [26, 44], rotation: [0, 6.28], color: c.lighten(col, 0.55),
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // tiny chips
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 6 },
        speed: [250, 550], life: [0.3, 0.5], size: [3, 5], color: c.darken(col, 0.2),
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 3 })),
    ];
  },
};
