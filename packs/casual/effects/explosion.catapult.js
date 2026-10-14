/** A catapult stone smashes into a wall: a dull flash, a shock ring, the boulder splitting into big shards, stone chunks and gravel flying out and a billowing cloud of grey stone dust. No fire. */
export default {
  name: 'explosion.catapult',
  category: 'explosion',
  whenToUse: 'A catapult, trebuchet or siege boulder smashes into a castle wall, tower, gate or rock face: a siege hit with flying stone chunks, grey dust and a shock ring, and no fire. Play it where the stone strikes. For a fiery shell or cannonball landing in the dirt use explosion.artillery; for a whole wall or building collapsing use explosion.dust; for a pickaxe chipping rock use gather.stone; for the launch use weapon.catapult.',
  duration: 1.15, loop: false, tint: '#c9bfae',
  tags: ['catapult', 'trebuchet', 'siege', 'boulder', 'stone', 'wall', 'castle', 'rubble', 'explosion'],
  build(c) {
    const col = c.color('#c9bfae');
    const light = c.lighten(col, 0.45);
    const rock = c.darken(col, 0.35);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 220, color: '#fff4dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.25))], order: 6 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.18, size: 190, rotation: [0, 1.6], color: '#fff0cc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 6 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.38, size: 300, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.12], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // the cloud of stone dust
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [10, 12] }, { time: 0.08, count: [4, 5] }], shape: { type: 'circle', radius: 24 },
        speed: [60, 200], life: [0.8, 1.1], size: [50, 85], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.force(0, 35), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.75, 0.5], [0, 1]]))], order: 1 })),
      // the boulder splitting into big shards
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 10 },
        speed: [180, 380], life: [0.7, 0.95], size: [20, 28], rotation: [0, 6.28], color: [col, rock],
        behaviors: [c.gravity(1500), c.spin(-8, 8), c.colorOverLife(c.fade(0.8))], order: 4 }, 'shard')),
      // stone chunks flying out
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [12, 14] }], shape: { type: 'circle', radius: 14 },
        speed: [300, 650], life: [0.7, 1.0], size: [9, 18], rotation: [0, 6.28], color: [rock, c.darken(col, 0.55)],
        behaviors: [c.gravity(1600), c.spin(-11, 11), c.colorOverLife(c.fade(0.8))], order: 4 }, 'box')),
      // gravel
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [14, 16] }], shape: { type: 'circle', radius: 10 },
        speed: [200, 460], life: [0.5, 0.8], size: [4, 7], color: [col, rock],
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.7))], order: 3 })),
      // a few white sparks of stone on stone
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [350, 700], life: [0.18, 0.32], size: [3, 5], color: '#fff6e0', stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1200), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.4))], order: 5 })),
    ];
  },
};
