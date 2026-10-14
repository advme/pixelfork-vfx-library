/** Drilling into rock: a hammering flash at the bit, a steady stream of rock chips and grit, hot sparks and a cloud of dust. Loops until stopped. */
export default {
  name: 'gather.drill',
  category: 'gather',
  whenToUse: 'A drill, jackhammer, mining laser or digging machine bores into rock, ore, concrete or a wall: play it where the bit touches, in 2D with dir (degrees, default 90 = chips fly up out of the hole) and in 3D with direction pointing out of the hole, tint it for ore colours and stop it when drilling stops (for one pickaxe swing use gather.stone, for cutting wood world.saw).',
  duration: 0.24, loop: true, tint: '#9aa0a8',
  tags: ['drill', 'jackhammer', 'mining', 'rock', 'ore', 'dig', 'construction', 'gather'],
  build(c) {
    const col = c.color('#9aa0a8');
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    // the hammering beat: the flash at the bit and the bursts of grit come on it
    const beat = [0, 0.08, 0.16].map((time) => ({ time, count: 1 }));
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.24, bursts: beat, life: 0.07, size: [44, 56], color: '#fff3d2',
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 4 }),
      // rock chips
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', loop: true, world: true, rate: 22, dir, shape: { type: 'cone', radius: 6, angle: 0.65 },
        speed: [200, 420], life: [0.4, 0.6], size: [4, 8], rotation: [0, 6.28], color: [col, c.darken(col, 0.35)],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 3 }), 'box')),
      // grit bursting out on every hit
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, world: true, duration: 0.24, bursts: beat.map((b) => ({ time: b.time, count: [3, 4] })), dir,
        shape: { type: 'cone', radius: 4, angle: 0.8 },
        speed: [160, 340], life: [0.25, 0.4], size: [2.5, 4], color: c.darken(col, 0.2),
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 2 })),
      // hot sparks off the bit
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 22, dir, shape: { type: 'cone', radius: 3, angle: 0.75 },
        speed: [260, 540], life: [0.14, 0.28], size: [3, 5], color: ['#ffffff', '#ffc75a'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.4))], order: 5 })),
      // rock dust
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 12, dir, shape: { type: 'cone', radius: 8, angle: 0.9 },
        speed: [40, 110], life: [0.5, 0.8], size: [18, 30], rotation: [0, 6.28], color: c.lighten(col, 0.35),
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 30), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.4, 0.5], [0, 1]]))], order: 1 })),
    ];
  },
};
