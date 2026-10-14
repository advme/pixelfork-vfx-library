/** A blink strike: the hero vanishes in a flash and a razor-straight streak of light cuts forward, leaving afterimage puffs, slash glints and sparks along the path. */
export default {
  name: 'move.blinkstrike',
  category: 'move',
  whenToUse: 'A dash attack that zips straight through enemies: an assassin\'s blink strike, a lightning-fast sword dash, a teleport slash, a charge that hits everything in a line. Play it where the dash starts; the streak runs about 250 px forward: in 2D set dir (degrees, the way the hero dashes, default right), in 3D pass direction. For a plain dodge or dash without a hit use move.dash; for a teleport in place use move.teleport.',
  duration: 0.45, loop: false, tint: '#5cf2ff',
  tags: ['blink', 'dash strike', 'assassin', 'teleport slash', 'zip', 'line attack', 'moba', 'streak'],
  build(c) {
    const col = c.color('#5cf2ff');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    // every part leaves the start point along dir and brakes hard, so it comes to rest somewhere along the path
    const brake = () => c.speedOverLife(c.curve([[0, 1], [0.2, 0.02], [1, 0]]));
    // the streak flies for 0.075 s at full speed, then stops about 250 px ahead; a stretched sprite keeps
    // its length while braking, so it stays as a line trailing back to the start, then thins away
    const streak = (p) => c.sys(c.spray(Object.assign({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir,
      speed: 2200, life: 0.34 }, p, { behaviors: [c.speedOverLife(c.curve([[0, 1], [0.22, 1], [0.36, 0.05], [1, 0]])),
      c.sizeOverLife(c.curve([[0, 0.1], [0.24, 1], [0.6, 0.85], [1, 0.2]])), c.colorOverLife(c.fade(0.45))] })));
    return [
      // the flash and ring where the hero vanishes
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 100, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // afterimage puffs left along the path
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: 6 }], shape: { type: 'cone', radius: 4, angle: 0.05 }, dir,
        speed: [300, 4600], life: [0.38, 0.45], size: [28, 40], rotation: [0, 6.28], color: [c.lighten(col, 0.4), c.lighten(col, 0.75)],
        behaviors: [brake(), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.5, 0.4], [0, 1]]))], order: 1 })),
      // the streak: a wide coloured body and a thin white-hot core
      streak({ size: 30, color: col, stretch: { speed: 0.0022, length: 2 }, order: 2 }),
      streak({ size: 12, color: '#ffffff', stretch: { speed: 0.0064, length: 3 }, order: 3 }),
      // sparks thrown along the line
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 14] }], shape: { type: 'cone', radius: 6, angle: 0.2 }, dir,
        speed: [700, 2200], life: [0.22, 0.32], size: [4, 6], color: [light, '#ffffff'], stretch: { speed: 0.005, length: 1.5 },
        behaviors: [c.speedOverLife(c.curve([[0, 1], [0.4, 0.15], [1, 0]])), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // slash glints popping where the blade passed through
      c.sys(c.spray({ tex: 'spark', blend: 'add', bursts: [{ count: 3 }], shape: { type: 'cone', radius: 2, angle: 0.06 }, dir,
        speed: [1400, 4400], life: 0.4, size: [34, 48], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [brake(), c.sizeOverLife(c.curve([[0, 0], [0.15, 0], [0.3, 1.1], [0.5, 0.8], [1, 0]]))], order: 4 })),
    ];
  },
};
