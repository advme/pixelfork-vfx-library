/** A fish is caught: a splash and droplets fly up out of the water, a ripple spreads and golden stars and glints celebrate the catch. */
export default {
  name: 'gather.fish',
  category: 'gather',
  whenToUse: 'A fish or anything else is pulled out of the water: a catch in a fishing game, a fish on the hook reeled in, a net hauled up, treasure or junk fished out. Play it on the water surface where it comes out; tint it with the catch\'s rarity colour (gold, purple, blue). For a plain splash use move.splash; for a bobber waiting in the water use world.ripple.',
  duration: 0.7, loop: false, tint: '#ffd84d',
  tags: ['fish', 'fishing', 'catch', 'hook', 'reel', 'splash', 'gather', 'water'],
  build(c) {
    const col = c.color('#ffd84d');
    const water = '#7fd4ff';
    const foam = '#e8f8ff';
    // 3D: the ring lies on the water (not snapped to the ground: the water is above it)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // a bright flash in the catch's colour
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 110, color: c.lighten(col, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [1, 1.1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'normal', bursts: [{ count: 1 }, { time: 0.14, count: 1 }], life: 0.5, size: 130, color: foam,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0, 1]]))], order: 1 }),
      // the splash it is pulled out of
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ count: [10, 14] }], shape: { type: 'cone', radius: 8, angle: 0.35 },
        speed: [320, 540], life: [0.45, 0.62], size: [7, 12], color: [water, foam],
        behaviors: [c.gravity(1500), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.85], [1, 0]]))], order: 2 }, 'up')),
      // white droplets thrown up and out (in 3D c.vol makes a hemisphere that domes along +Z; c.spray turns it up)
      c.sys(c.spray(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 8, arc: Math.PI },
        speed: [180, 340], life: [0.35, 0.5], size: [3, 6], color: '#ffffff',
        behaviors: [c.gravity(1400), c.colorOverLife(c.fade(0.6))], order: 3 }), 'up')),
      // celebration: stars pop up and tumble, glints twinkle around the fish
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: [5, 6] }], shape: { type: 'cone', radius: 10, angle: 0.7 },
        speed: [200, 320], life: [0.5, 0.65], size: [12, 18], rotation: [0, 6.28], color: [col, c.lighten(col, 0.6)],
        behaviors: [c.gravity(700), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [0.7, 1], [1, 0]]))], order: 5 }, 'up')),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.1, count: [4, 5] }], shape: { type: 'circle', radius: 34 }, offset: [0, 30],
        speed: [20, 50], life: [0.35, 0.5], size: [16, 24], color: c.lighten(col, 0.4),
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
    ];
  },
};
