/** Spikes shoot up out of the floor: a row of steel spikes (a ring of them in 3D) snaps up from the middle outward, dust bursts at their base, gravel flies and metal glints flash on the tips before they sink back. */
export default {
  name: 'world.spikes',
  category: 'world',
  whenToUse: 'A spike trap fires out of the floor in a platformer, dungeon or obstacle course (floor spikes, a spike pit, retracting blades popping up); play it on the ground where the spikes come out, and use magic.earth for rock spikes from a spell or world.trap for a trap with no spikes.',
  duration: 0.85, loop: false, anchor: 'feet', tint: '#cfd8e6',
  tags: ['spikes', 'trap', 'floor', 'hazard', 'metal', 'dungeon', 'platformer', 'obstacle'],
  build(c) {
    const col = c.color('#cfd8e6');
    const metal = [c.lighten(col, 0.25), c.darken(col, 0.3)];
    const dust = '#d8cbb5';
    // up fast with a little overshoot, hold, sink away
    const rise = () => c.sizeOverLife(c.curve([[0, 0], [0.08, 1.2], [0.15, 1], [0.75, 1], [1, 0]]));
    // 2D: one spike per system, so the row is evenly spaced, popping up from the middle outward
    const spike2d = (x, t) => c.sys({ tex: 'shard', blend: 'normal', bursts: [{ time: t, count: 1 }], offset: [x, 20],
      speed: 0, life: 0.7, size: [42, 48], color: metal, behaviors: [rise()], order: 2 });
    const spikes = c.is3d
      ? [c.sys(c.ground({ tex: 'shard', render: 'mesh', geo: 'shard', upright: true, blend: 'normal', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 46, thickness: 0, even: true },
          speed: 0, life: 0.7, size: [46, 54], color: metal, behaviors: [rise()], order: 2 }))]
      : [spike2d(-60, 0.06), spike2d(-30, 0.03), spike2d(0, 0), spike2d(30, 0.03), spike2d(60, 0.06)];
    const row = c.is3d ? { type: 'circle', radius: 46, thickness: 0 } : { type: 'rect', w: 140, h: 0 };
    // a burst up off the floor: the upper half circle on screen in 2D, a wide cone aimed at world up in 3D
    // (c.vol turns a half circle into a hemisphere facing along z, which would throw it sideways)
    const upward = (p, angle) => (c.is3d ? c.spray(Object.assign({}, p, { shape: { type: 'cone', radius: p.shape.radius, angle } }), 'up') : p);
    return [
      ...spikes,
      // dust bursting at the base of the spikes
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [9, 11] }], shape: row,
        speed: c.is3d ? [50, 110] : 0, life: [0.4, 0.6], size: [24, 38], rotation: [0, 6.28], color: dust,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 90), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.55, 0.5], [0, 1]]))], order: 1 })),
      // gravel thrown up
      c.sys(upward({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 40, arc: Math.PI },
        speed: [180, 360], life: [0.35, 0.55], size: [3, 6], color: c.darken(dust, 0.4),
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 3 }, 1.0)),
      // metal glints flashing on the tips (3D mesh tips stand about 33 px high, the 2D sprites about 40)
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ time: 0.06, count: 3 }, { time: 0.2, count: 2 }],
        shape: c.is3d ? row : { type: 'rect', w: 120, h: 0 }, offset: [0, c.is3d ? 33 : 40],
        speed: 0, life: 0.25, size: [18, 26], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.spin(3), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0]]))], order: 4 })),
    ];
  },
};
