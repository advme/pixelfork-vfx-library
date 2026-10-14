/** A water balloon bursts on someone: a quick pop and ring, a big splash of water streaks and spray, droplets dripping off and torn rubber bits flying. */
export default {
  name: 'hit.waterballoon',
  category: 'hit',
  whenToUse: 'A water balloon bursts on a character or a target: a water-balloon fight, a summer, beach or pool-party game, a carnival splash game, a prank where someone gets soaked. Play it on the one who is hit, and follow it with state.wet if they stay soaked; tint it for coloured water. For a big water bomb or a geyser use explosion.water; for a water-gun or water-spell hit use hit.water; for a dry party balloon popping use explosion.balloon.',
  duration: 0.65, loop: false, tint: '#4fb8ff',
  tags: ['water balloon', 'splash', 'water', 'soaked', 'summer', 'prank', 'party', 'hit'],
  build(c) {
    const col = c.color('#4fb8ff');
    const light = c.lighten(col, 0.6);
    // the balloon's rubber keeps its own party colour
    const rubber = c.rgb('#ff5c8a');
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 120, color: light,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.26, size: 180, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // the splash: water streaks thrown out in every direction, arcing down
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [18, 22] }], shape: { type: 'circle', radius: 16 },
        speed: [280, 520], life: [0.35, 0.52], size: [7, 12], color: [col, light], stretch: { speed: 0.006, length: 1.4 },
        behaviors: [c.speedOverLife(c.decel(0.45)), c.gravity(1400), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.85], [1, 0]]))], order: 3 })),
      // white foam spray and a soft mist burst
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 12 },
        speed: [200, 420], life: [0.3, 0.48], size: [4, 7], color: '#ffffff',
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 4 })),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 16 },
        speed: [60, 150], life: [0.32, 0.45], size: [36, 54], rotation: [0, 6.28], color: '#eef9ff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.45, 0.5], [0, 1]]))], order: 2 })),
      // water dripping off the one who was hit (dir aims the 2D cone down, so a game's dir cannot turn the drips)
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ time: 0.08, count: [5, 7] }], shape: { type: 'cone', radius: 34, angle: 0.12 }, dir: -Math.PI / 2,
        speed: [30, 90], life: [0.4, 0.55], size: [8, 12], rotation: Math.PI, color: [col, light],
        behaviors: [c.gravity(900), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.7))], order: 2 }, 'down')),
      // torn rubber bits
      c.sys(c.vol({ tex: 'shard', blend: 'normal', bursts: [{ count: [6, 7] }], shape: { type: 'circle', radius: 16 },
        speed: [220, 400], life: [0.38, 0.55], size: [10, 16], rotation: [0, 6.28], color: [rubber, c.darken(rubber, 0.2)],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(900), c.spin(-14, 14), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 5 })),
    ];
  },
};
