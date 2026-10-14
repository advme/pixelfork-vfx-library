/** The base takes a hit: a hard red flash and alarm ring, chunks of stone rubble knocked off and tumbling down, grit, red sparks and a puff of dark smoke. */
export default {
  name: 'hit.basehit',
  category: 'hit',
  whenToUse: 'The player\'s base, castle, core, gate or crystal takes damage when an enemy gets through in tower defense, base defense or castle defense games: play it on the base each time it loses health (with ui.hurt on the screen if you want the edges to redden too); for an ordinary wall, crate or rock being hit use hit.block, for a tower or building blowing up use explosion.big, and for a hero taking a hit use hit.impact (not a baseball base hit: for a bat hitting the ball use hit.homerun).',
  duration: 0.62, loop: false, tint: '#ff3b3b',
  tags: ['base', 'castle', 'core', 'tower defense', 'damage', 'leak', 'rubble', 'hit'],
  build(c) {
    const col = c.color('#ff3b3b');
    const light = c.lighten(col, 0.55);
    return [
      // the red flash of damage
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // an alarm ring kicked out round the base
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 190, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // dark smoke puffed off the wall
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 7] }], shape: { type: 'circle', radius: 14 },
        speed: [60, 150], life: [0.45, 0.62], size: [30, 48], rotation: [0, 6.28], color: ['#6a625c', '#4a4440'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 60), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.25]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.55, 0.5], [0, 1]]))], order: 2 })),
      // chunks of stone rubble knocked up off the wall, tumbling and falling away
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [9, 11] }], dir: Math.PI / 2, shape: { type: 'cone', radius: 14, angle: 1.0 },
        speed: [200, 400], life: [0.45, 0.62], size: [9, 16], rotation: [0, 6.28], color: ['#b9aa98', '#7c6d60'],
        behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 3 }, 'up'), 'box')),
      // grit
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 8 },
        speed: [220, 440], life: [0.3, 0.45], size: [3, 5], color: '#8f8072',
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 3 })),
      // red-hot sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 16 },
        speed: [280, 520], life: [0.2, 0.35], size: [4, 7], color: [light, col], stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 4 })),
      // the hard white crack at the centre
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.13, size: 120, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0]]))], order: 5 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 90, color: light,
        behaviors: [c.colorOverLife(c.fade(0.3))], order: 5 }),
    ];
  },
};
