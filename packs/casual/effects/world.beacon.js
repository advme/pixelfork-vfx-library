/** An objective marker: rings pulse out across the ground, an arrow bobs above, sparkles circle the spot. Loops until stopped. */
export default {
  name: 'world.beacon',
  category: 'world',
  whenToUse: 'Marks a place the player must go: a quest objective, a waypoint, a delivery drop-off, a mission start, the next checkpoint. Play it on the ground at that spot and stop it when the player arrives (then play reward.checkpoint).',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#ffd23a',
  tags: ['objective', 'waypoint', 'marker', 'quest', 'mission', 'target', 'destination', 'open world'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }, { time: 0.6, count: 1 }], life: 1.2, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.15], [0, 1]]))], order: 0 }),
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 70, color: light,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [1, 0.5], [0.6, 1]]))], order: 1 }),
      // the arrow above the spot, pointing down, breathing in size
      c.sys({ tex: 'arrow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 46, rotation: Math.PI, offset: [0, 150], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.12], [1, 0.9]]))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 90, offset: [0, 150], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.55, 0.5], [0.35, 1]]))], order: 2 }),
      // sparkles circling and rising from the ring
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, duration: 1.2, rate: 10, shape: { type: 'circle', radius: 32, thickness: 0 },
        speed: 0, life: [0.8, 1.2], size: [8, 13], color: light,
        behaviors: [c.orbit(2), c.force(0, 70), c.limitSpeed(60, 1), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 })),
    ];
  },
};
