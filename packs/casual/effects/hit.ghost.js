/** A ghost's touch: a cold pale flash and a ring of chill, pale wisps curling away, a breath of mist and frosty glints. */
export default {
  name: 'hit.ghost',
  category: 'hit',
  whenToUse: 'A ghost, spirit or phantom touches or strikes something: a ghost enemy attacks, a haunted hand grabs, a spectral or soul-draining blow lands, a ghost flies through the player. Play it on the target. For an ice or frost attack use hit.ice; for a dark spell use magic.dark.',
  duration: 0.5, loop: false, tint: '#a8f0ff',
  tags: ['ghost', 'spirit', 'phantom', 'spectral', 'haunted', 'cold', 'touch', 'hit'],
  build(c) {
    const col = c.color('#a8f0ff');
    const light = c.lighten(col, 0.7);
    return [
      // the cold flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 140, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.15))], order: 0 }),
      // a ring of chill
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // a breath of pale mist
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 10 },
        speed: [40, 110], life: [0.4, 0.5], size: [26, 40], rotation: [0, 6.28], color: c.lighten(col, 0.55),
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 60), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.4, 0.5], [0, 1]]))], order: 1 })),
      // pale wisps curling away
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 12 },
        speed: [150, 250], life: [0.38, 0.5], size: [12, 20], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.orbit(4), c.noise(3, 14), c.force(0, 120),
          c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 2 })),
      // frosty sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 8 },
        speed: [280, 460], life: [0.2, 0.3], size: [4, 7], color: ['#ffffff', light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 3 })),
      // icy glints popping around it
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [4, 6] }], shape: { type: 'circle', radius: 34 },
        speed: [10, 40], life: [0.3, 0.42], size: [10, 16], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
