/** A sniper shot: a sharp white muzzle star, a crack ring across the barrel, a very fast thin tracer streaking off along the shot and a wisp of smoke left at the barrel. */
export default {
  name: 'weapon.sniper',
  category: 'weapon',
  whenToUse: 'A sniper tower, sniper rifle or long-range marksman fires one precise, very fast shot: a sniper or rifle tower in tower defense, a sharpshooter unit, a hunting rifle, a scope shot in a shooter. Play it at the barrel tip; in 2D set dir (degrees, 0 = right) toward the target and in 3D pass direction. A thin tracer streaks off along the shot; for a sci-fi beam that reaches the target at once use weapon.railgun, for ordinary rapid gunfire use weapon.muzzle, and play hit.bullet where it lands.',
  duration: 0.5, loop: false, tint: '#ffe27a',
  tags: ['sniper', 'rifle', 'tracer', 'tower defense', 'marksman', 'long range', 'shot', 'weapon'],
  build(c) {
    const col = c.color('#ffe27a');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    // The tracer: one particle fired along the shot at 2800 px/s (~560 px in its life). A stretched sprite trails BACK
    // from its particle about size x (0.5 + speed x stretch.speed) px, so the core (3 px, 0.018) and its glow (8 px, 0.0067)
    // are both ~150 px long. The length follows the size, not the braking, so the size grows from 0 over its first 0.056 s,
    // no faster than the head pulls away from the barrel: the tail never reaches back into the gun.
    const tracer = (p) => c.sys(c.spray(Object.assign({ blend: 'add', dir, world: true, bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 },
      speed: 2800, life: 0.2 }, p)));
    const launch = () => c.sizeOverLife(c.curve([[0, 0], [0.28, 1], [1, 1]]));
    return [
      // a wisp of smoke left hanging at the barrel
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ count: [3, 4] }], dir, shape: { type: 'cone', radius: 3, angle: 0.3 },
        speed: [40, 120], life: [0.38, 0.48], size: [16, 26], rotation: [0, 6.28], color: '#e6e6e6',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 40), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.4, 0.5], [0, 1]]))], order: 0 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      // the crack ring across the barrel (seen side-on in 2D, so it crosses the shot)
      c.sys({ tex: c.is3d ? 'ring' : 'ellipse', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: c.is3d ? 46 : 64, rotation: c.is3d ? 0 : dir + Math.PI / 2, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // the tracer: a soft glow round a thin white-hot core
      tracer({ tex: 'glow', size: 8, color: col, stretch: { speed: 0.0067, length: 0.5 }, behaviors: [launch(), c.colorOverLife(c.fade(0.6))], order: 3 }),
      tracer({ tex: 'disc', size: 3, color: '#ffffff', stretch: { speed: 0.018, length: 0.5 }, behaviors: [launch(), c.colorOverLife(c.fade(0.6))], order: 4 }),
      // the sharp muzzle star: a big glint lined up with the shot and a smaller one turned across it
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 120, rotation: dir, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0]]))], order: 5 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 70, rotation: dir + Math.PI / 4, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0]]))], order: 5 }),
      // a few hot flecks kicked out along the shot: streaks of at most 5 x (1.2 + 500 x 0.006) = 21 px, born small and
      // 22 px past the muzzle in 2D, so their tails stay out of the barrel
      c.sys(c.spray({ tex: 'glow', blend: 'add', world: true, dir, offset: c.is3d ? undefined : [Math.cos(dir) * 22, Math.sin(dir) * 22], bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 3, angle: 0.4 },
        speed: [250, 500], life: [0.1, 0.2], size: [3, 5], color: light, stretch: { speed: 0.006, length: 1.2 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.4))], order: 6 })),
    ];
  },
};
