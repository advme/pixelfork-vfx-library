/** A cannon shot: a white-hot flash, a fiery tongue and sparks out of the barrel, and a big rolling cloud of smoke pushed forward. */
export default {
  name: 'weapon.cannon',
  category: 'weapon',
  whenToUse: 'A cannon fires one heavy shot: a cannon tower in tower defense, a pirate ship broadside, a castle cannon, a tank gun. Play it at the muzzle; in 2D set dir (degrees, 0 = right), in 3D pass direction along the barrel. For ordinary guns use weapon.muzzle; for a spread of pellets use weapon.shotgun; where the shell lands use explosion.artillery.',
  duration: 1.0, loop: false, tint: '#ffb03a',
  tags: ['cannon', 'tower defense', 'pirate', 'ship', 'tank', 'artillery', 'shot', 'weapon'],
  build(c) {
    const col = c.color('#ffb03a');
    const dir = c.dir === undefined ? 0 : c.dir;
    // a streak trails back from its particle: in 2D the sparks start a little past the muzzle so their tails stay out of the barrel
    const out = c.is3d ? undefined : [Math.cos(dir) * 18, Math.sin(dir) * 18];
    return [
      // white-hot flash at the muzzle
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.09, size: 150, rotation: [0, 0.8], color: '#fff8e0',
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 5 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 190, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      // the fiery tongue out of the barrel
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 6, angle: 0.22 },
        speed: [380, 640], life: [0.08, 0.14], size: [38, 56], color: [col, '#ff7a1f'],
        behaviors: [c.sizeOverLife(c.shrink())], order: 4 })),
      // sparks thrown along the shot, dropping as they slow
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], dir, offset: out, shape: { type: 'cone', radius: 4, angle: 0.35 },
        speed: [350, 750], life: [0.15, 0.32], size: [4, 7], color: ['#fff2c4', col], stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.5))], order: 6 })),
      // the big smoke cloud rolling forward and staying where it was fired
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ time: 0.02, count: [12, 14] }], dir, shape: { type: 'cone', radius: 10, angle: 0.32 },
        speed: [120, 400], life: [0.7, 0.95], size: [44, 70], rotation: [0, 6.28], color: ['#f4f4f4', '#cfcfcf'],
        behaviors: [c.speedOverLife(c.decel(0.06)), c.force(0, 30), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1.2], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.8, 0.5], [0, 1]]))], order: 2 })),
      // a puff bursting out around the barrel mouth
      c.sys(c.vol({ tex: 'puff', blend: 'normal', world: true, bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [60, 120], life: [0.5, 0.7], size: [26, 40], rotation: [0, 6.28], color: '#e0e0e0',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0, 1]]))], order: 3 })),
    ];
  },
};
