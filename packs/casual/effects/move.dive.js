/** A clean dive: a tall narrow plume of water shoots up, a crown of droplets falls back, rings spread and bubbles stream down into the deep. */
export default {
  name: 'move.dive',
  category: 'move',
  whenToUse: 'A character, bird or object dives head-first into water: a diving-board or cliff jump, a seabird plunging for a fish, a player jumping into a pool, lake or the sea, a submarine going under. Play it on the water surface where it goes in. For a belly-flop or anything just dropping in use move.splash; for something huge use explosion.water.',
  duration: 1.0, loop: false, tint: '#5cc4ff',
  tags: ['dive', 'water', 'splash', 'pool', 'plunge', 'swim', 'bubbles', 'sea'],
  build(c) {
    const col = c.color('#5cc4ff');
    const light = c.lighten(col, 0.65);
    // 3D: rings lie on the water (not snapped to the ground: the water is above it)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // an upper half-circle burst; in 3D c.vol makes it a hemisphere that domes along +Z, so c.spray turns it to point up
    const up = (p) => c.sys(c.spray(c.vol(p), 'up'));
    return [
      // a quick bright flash where it breaks the surface
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [1, 1.1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // rings spreading on the surface, one after another
      ring({ blend: 'normal', bursts: [{ count: 1 }, { time: 0.16, count: 1 }, { time: 0.32, count: 1 }], life: 0.6, size: 160, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0, 1]]))], order: 1 }),
      // the tall, narrow plume
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ count: [12, 16] }, { time: 0.06, count: [6, 8] }], shape: { type: 'cone', radius: 6, angle: 0.12 },
        speed: [420, 720], life: [0.55, 0.85], size: [9, 15], color: [col, light],
        behaviors: [c.gravity(1500), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.85], [1, 0]]))], order: 3 }, 'up')),
      // a low crown of white droplets around the hole
      up({ tex: 'disc', blend: 'normal', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [160, 340], life: [0.35, 0.55], size: [4, 7], color: '#ffffff',
        behaviors: [c.gravity(1400), c.colorOverLife(c.fade(0.6))], order: 4 }),
      // bubbles dragged down under the surface: they shoot down, slow in the water and start to drift up
      c.sys(c.spray({ tex: 'ring', blend: 'normal', bursts: [{ time: 0.04, count: [10, 14] }], shape: { type: 'cone', radius: 8, angle: 0.35 }, dir: -Math.PI / 2, offset: [0, -14],
        speed: [140, 300], life: [0.6, 0.95], size: [6, 13], color: light,
        behaviors: [c.limitSpeed(40, 0.25), c.force(0, 160), c.noise(2, 12), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.9]])), c.colorOverLife(c.fadeInOut(0.05, 0.7))], order: 2 }, 'down')),
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ time: 0.04, count: [6, 8] }], shape: { type: 'cone', radius: 6, angle: 0.4 }, dir: -Math.PI / 2, offset: [0, -14],
        speed: [120, 260], life: [0.4, 0.6], size: [3, 5], color: light,
        behaviors: [c.limitSpeed(40, 0.3), c.force(0, 120), c.noise(2, 8), c.colorOverLife(c.fade(0.5))], order: 2 }, 'down')),
    ];
  },
};
