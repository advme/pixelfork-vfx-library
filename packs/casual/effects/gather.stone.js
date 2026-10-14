/** Mining rock: stone chips burst out, hot sparks from the pick, and a cloud of grit. */
export default {
  name: 'gather.stone',
  category: 'gather',
  whenToUse: 'A pickaxe hits rock, ore or a wall; stone is mined or quarried; a boulder is chipped. Play it where it was struck, once per swing. Tint it for ore colours (gold, iron, crystal).',
  duration: 0.8, loop: false, tint: '#9aa0a8',
  tags: ['stone', 'mine', 'rock', 'pickaxe', 'ore', 'gather', 'quarry', 'survival', 'voxel'],
  build(c) {
    const col = c.color('#9aa0a8');
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 70, color: '#fff3d2',
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [7, 10] }], shape: { type: 'circle', radius: 8 },
        speed: [220, 460], life: [0.5, 0.75], size: [6, 11], rotation: [0, 6.28], color: [col, c.darken(col, 0.35)],
        behaviors: [c.gravity(1600), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 3 }, 'box')),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 4, thickness: 0 },
        speed: [300, 650], life: [0.2, 0.35], size: [3, 6], color: ['#ffffff', '#ffc75a'],
        stretch: { speed: 0.02, length: 1.5 }, behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.4))], order: 4 })),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 8 },
        speed: [40, 120], life: [0.45, 0.65], size: [22, 36], rotation: [0, 6.28], color: c.lighten(col, 0.35),
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.25]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0, 1]]))], order: 2 })),
    ];
  },
};
