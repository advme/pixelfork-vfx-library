/** A gunpowder keg goes up: a white-hot flash, an orange fireball, a ring, thick black smoke rolling up, wooden splinters and staves flying and burning sparks. */
export default {
  name: 'explosion.gunpowder',
  category: 'explosion',
  whenToUse: 'A gunpowder keg, powder barrel or powder magazine blows up, or a cannonball or black-powder bomb bursts: pirate ships, castle sieges, westerns, medieval and historical games. Play it at the centre of the keg or where the ball bursts. Fiery orange with thick black smoke and wooden splinters; for a red fuel barrel use explosion.barrel, for a shell landing in the dirt use explosion.artillery, for a round cartoon bomb use explosion.small.',
  duration: 1.2, loop: false, tint: '#ff8a2a',
  tags: ['gunpowder', 'powder keg', 'barrel', 'cannonball', 'pirate', 'siege', 'black powder', 'explosion'],
  build(c) {
    const col = c.color('#ff8a2a');
    const light = c.lighten(col, 0.6);
    const fire = c.grad([[c.lighten(col, 0.8), 0], [col, 0.3], [c.darken(col, 0.55), 0.7], ['#1e1612', 1]], [[1, 0], [1, 0.6], [0, 1]]);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 270, color: '#fff3c4',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 6 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.18, size: 230, rotation: [0, 1.6], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 6 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.42, size: 330, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // thick black powder smoke rolling up behind the fire
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.06, count: [11, 13] }], shape: { type: 'circle', radius: 26 },
        speed: [50, 140], life: [0.85, 1.15], size: [60, 100], rotation: [0, 6.28], color: ['#3a3330', '#211c1a'],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.force(0, 100), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.45], [1, 1.45]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.92, 0.15], [0.7, 0.6], [0, 1]]))], order: 1 })),
      // the fireball
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [12, 14] }, { time: 0.07, count: [4, 5] }], shape: { type: 'circle', radius: 16 },
        speed: [120, 280], life: [0.45, 0.65], size: [50, 85], rotation: [0, 6.28],
        behaviors: [c.colorOverLife(fire), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.15]])), c.speedOverLife(c.decel(0.2)), c.force(0, 160), c.spin(-2, 2)], order: 3 })),
      // wooden splinters and staves of the keg
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [12, 14] }], shape: { type: 'circle', radius: 12 },
        speed: [320, 680], life: [0.7, 1.0], size: [9, 18], rotation: [0, 6.28], color: ['#b37a45', '#6e4526'],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.8))], order: 4 }, 'plank')),
      // black powder grit
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 8 },
        speed: [240, 520], life: [0.4, 0.6], size: [3, 5], color: ['#2a2420', '#4a3a30'],
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.6))], order: 4 })),
      // burning sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [16, 20] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [350, 800], life: [0.3, 0.6], size: [4, 6], color: ['#fff2a8', col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 5 })),
    ];
  },
};
