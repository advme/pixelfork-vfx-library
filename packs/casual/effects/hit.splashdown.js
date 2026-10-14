/** A big splashdown: a white flash, a hollow crown of water thrown up and out, a tall column in the middle, droplets flung wide, foam churning at the surface and two rings racing out across the water. */
export default {
  name: 'hit.splashdown',
  category: 'hit',
  whenToUse: 'Something big and heavy crashes down into deep water: a character cannonballs or belly-flops into a pool, a boulder, crate, anchor or car drops into a lake or the sea, a boss or giant lands in the water, a space capsule splashes down; play it on the water surface where it hits. For a small object or a light jump in use move.splash; for a head-first dive use move.dive; for a water bomb bursting use explosion.water; for a puddle or shallows use hit.splashhit.',
  duration: 0.7, loop: false, tint: '#5cc6ff',
  tags: ['splash', 'splashdown', 'water', 'cannonball', 'fall', 'pool', 'sea', 'crown'],
  build(c) {
    const col = c.color('#5cc6ff');
    const light = c.lighten(col, 0.65);
    // rings on the water, which may sit above the ground
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // white flash where it hits
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // two foam rings racing out over the surface
      ring({ blend: 'add', bursts: [{ count: 1 }, { time: 0.12, count: 1 }], life: 0.55, size: 300, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.25))], order: 1 }),
      // foam churning up at the impact: the upper half-circle in 2D; in 3D a wide cone aimed up
      // (c.vol turns an upper half-circle into a hemisphere facing +z, not up)
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 9] }], shape: c.is3d ? { type: 'cone', radius: 24, angle: 1.2 } : { type: 'circle', radius: 24, arc: Math.PI },
        speed: [90, 200], life: [0.45, 0.6], size: [36, 60], rotation: [0, 6.28], color: '#f4fcff',
        behaviors: [c.speedOverLife(c.decel(0.12)), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.45], [0.35, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.7, 0.5], [0, 1]]))], order: 2 }, 'up')),
      // the crown: a hollow ring of water thrown up and out (thickness 0 puts every drop on the cone's rim)
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ count: [24, 28] }], shape: { type: 'cone', radius: 26, angle: 0.42, thickness: 0 }, dir: Math.PI / 2,
        speed: [480, 650], life: [0.44, 0.56], size: [10, 16], color: [col, light],
        behaviors: [c.gravity(1900), c.sizeOverLife(c.curve([[0, 0.8], [0.3, 1], [0.85, 0.9], [1, 0]]))], order: 3 }, 'up')),
      // the tall column shooting up out of the middle
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ time: 0.04, count: [9, 11] }], shape: { type: 'cone', radius: 8, angle: 0.1 }, dir: Math.PI / 2,
        speed: [560, 800], life: [0.5, 0.62], size: [13, 20], color: [light, '#ffffff'],
        behaviors: [c.gravity(1900), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [0.85, 0.9], [1, 0]]))], order: 4 }, 'up')),
      // droplets flung wide in a fan up and out
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [16, 20] }], shape: { type: 'cone', radius: 18, angle: 1.0 }, dir: Math.PI / 2,
        speed: [320, 500], life: [0.32, 0.46], size: [5, 8], color: '#ffffff',
        behaviors: [c.gravity(1700), c.colorOverLife(c.fade(0.6))], order: 5 }, 'up')),
    ];
  },
};
