/** A capture zone: a team-coloured ring on the ground, a pulse closing in to the centre and lights rising inward from the edge. Loops until stopped. */
export default {
  name: 'world.capture',
  category: 'world',
  whenToUse: 'A capture point or control zone in strategy, MOBA, arena or shooter games: king of the hill, a point being captured, a zone a team holds. Play it on the ground at the zone\'s centre, size it to the zone, tint it with the capturing team\'s colour and stop it when the capture ends (then play reward.checkpoint). For a place the player must walk to use world.beacon; for a healing area use magic.heallaura.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#3aa8ff',
  tags: ['capture', 'control point', 'zone', 'king of the hill', 'strategy', 'moba', 'territory', 'team'],
  build(c) {
    const col = c.color('#3aa8ff');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const motes = () => [c.force(0, 120), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]])), c.colorOverLife(c.fadeInOut(0.15, 0.7))];
    // 3D: lights start on the rim and drift inward over the floor while they rise; 2D: two sprays from the ends of the ground line meet in the middle
    const rising = c.is3d
      ? [c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 28, shape: { type: 'circle', radius: 105, thickness: 0 },
        speed: [-80, -60], life: [0.9, 1.2], size: [9, 15], color: [light, col], behaviors: motes(), order: 3 }))]
      : [-1, 1].map((side) => c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 14, shape: { type: 'cone', radius: 12, angle: 0.2 },
        dir: side < 0 ? 0.45 : Math.PI - 0.45, offset: [side * 100, 0],
        speed: [70, 100], life: [0.9, 1.2], size: [9, 15], color: [light, col], behaviors: motes(), order: 3 }));
    return [
      // the zone's edge, steady and bright
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 220, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [1, 0.5], [0.75, 1]]))], order: 1 }),
      // a pulse closing in to the centre every cycle
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 220, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.12]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.15], [0.7, 0.8], [0, 1]]))], order: 2 }),
      // the centre glows brighter as each pulse arrives
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 120, offset: [0, 12], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.22, 0.6], [0.55, 0.92], [0.3, 1]]))], order: 0 }),
      ...rising,
      // sparkles rising from the centre point
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 8, shape: c.is3d ? { type: 'circle', radius: 16 } : { type: 'rect', w: 30, h: 0 },
        speed: 0, life: [0.6, 0.9], size: [7, 12], color: light,
        behaviors: [c.force(0, 220), c.limitSpeed(150, 1), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
