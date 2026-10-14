/** A hard landing in shallow water: a wide, low crown of water fans out to both sides, droplets scatter, foam pushes out and a ring spreads. */
export default {
  name: 'hit.splashhit',
  category: 'hit',
  whenToUse: 'Something lands hard in shallow water, a puddle, a swamp or mud: a character landing or stomping in a puddle, a heavy hit on wet ground, a cannonball or boulder hitting the shallows, a ground pound in a marsh. Play it where it lands; tint it brown for mud. For falling into deep water use move.splash; for slime or goo use hit.splat; for dry ground use hit.dirt.',
  duration: 0.5, loop: false, tint: '#5cc4ff',
  tags: ['splash', 'puddle', 'mud', 'shallow', 'swamp', 'landing', 'stomp', 'hit'],
  build(c) {
    const col = c.color('#5cc4ff');
    const light = c.lighten(col, 0.6);
    // the foam keeps some of the tint, so a brown tint gives light-brown mud foam rather than white
    const foam = c.lighten(col, 0.7);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // foam shoved out low along the ground: all round in 3D, to both sides in 2D
    const shove = (p) => c.sys(Object.assign({ tex: 'puff', blend: 'normal', speed: [160, 260], life: [0.3, 0.42], size: [18, 28], rotation: [0, 6.28], color: foam,
      behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0, 1]]))], order: 1 }, p));
    // the crown's water: drops stretched along their flight
    const water = (p) => c.sys(Object.assign({ tex: 'disc', blend: 'normal', life: [0.38, 0.52], size: [6, 11], color: [col, light], stretch: { speed: 0.004, length: 1.4 },
      behaviors: [c.gravity(1500), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 3 }, p));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 100, color: light,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.4, size: 200, color: foam,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0, 1]]))], order: 0 }),
      // the crown: in 3D a ring of water thrown up and out all round; in 2D, seen side-on, two sheets splaying out in a V
      ...(c.is3d
        ? [water(c.spray({ bursts: [{ count: [26, 32] }], shape: { type: 'cone', radius: 30, angle: 0.8, thickness: 0 }, speed: [360, 560] }, 'up'))]
        : [0.95, Math.PI - 0.95].map((dir, i) => water({ bursts: [{ count: [12, 15] }], dir, offset: [i ? -14 : 14, 0], shape: { type: 'cone', radius: 6, angle: 0.28 }, speed: [300, 520] }))),
      // droplets scattered higher (in 3D c.vol makes a hemisphere that domes along +Z; c.spray turns it up)
      c.sys(c.spray(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 12, arc: Math.PI },
        speed: [200, 380], life: [0.35, 0.5], size: [3, 6], color: foam,
        behaviors: [c.gravity(1500), c.colorOverLife(c.fade(0.6))], order: 4 }), 'up')),
      ...(c.is3d
        ? [shove(c.ground({ bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 16, thickness: 0 } }))]
        : [0.15, Math.PI - 0.15].map((dir) => shove({ bursts: [{ count: [3, 4] }], dir, shape: { type: 'cone', radius: 4, angle: 0.35 } }))),
    ];
  },
};
