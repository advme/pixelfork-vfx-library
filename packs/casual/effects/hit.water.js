/** A water attack hits: a bright splash flash, water sprays off the target, droplets and bubbles scatter and a foam ring spreads. */
export default {
  name: 'hit.water',
  category: 'hit',
  whenToUse: 'A water attack hits a target: a water gun or squirt, a water bolt or bubble spell, a hose or wave blast striking an enemy; play it on the target and aim the spray with dir (degrees, default up) or direction: [x, y, z] in 3D, and for falling into water use move.splash or for a water bomb explosion.water instead.',
  duration: 0.6, loop: false, tint: '#3fb6ff',
  tags: ['water', 'splash', 'squirt', 'water gun', 'bubble', 'wet', 'spell', 'hit'],
  build(c) {
    const col = c.color('#3fb6ff');
    const light = c.lighten(col, 0.65);
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the foam ring spreading from the hit, and the soft body of the splash itself
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.35, size: 140, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'normal', bursts: [{ count: 1 }], life: 0.26, size: 100, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 1.1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.5, 0.4], [0, 1]]))], order: 2 }),
      // the splash thrown off the target
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ count: [12, 15] }], shape: { type: 'cone', radius: 10, angle: 0.6 }, dir,
        speed: [320, 620], life: [0.4, 0.58], size: [9, 15], color: [col, light],
        behaviors: [c.gravity(1400), c.sizeOverLife(c.curve([[0, 0.6], [0.15, 1], [0.8, 0.9], [1, 0]]))], order: 3 })),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 8 },
        speed: [200, 480], life: [0.35, 0.55], size: [4, 8], color: ['#ffffff', light],
        stretch: { speed: 0.004, length: 1.4 },
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.6)), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 4 })),
      c.sys(c.vol({ tex: 'ring', blend: 'normal', bursts: [{ time: 0.03, count: [4, 6] }], shape: { type: 'circle', radius: 12 },
        speed: [60, 150], life: [0.35, 0.5], size: [8, 14], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.3)), c.force(0, 80), c.noise(3, 8), c.sizeOverLife(c.pop(0.2, 0.7)), c.colorOverLife(c.fade(0.6))], order: 4 })),
    ];
  },
};
