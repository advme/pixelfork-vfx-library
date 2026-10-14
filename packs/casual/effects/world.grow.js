/** A growing plant: green sparkles, glowing motes and little leaves drift gently up from the soil, over a soft green glow. Loops until stopped. */
export default {
  name: 'world.grow',
  category: 'world',
  whenToUse: 'A plant, crop, tree or flower is growing over time: a farm plot between planting and harvest, a sapling sprouting, a fertilised field, a magic beanstalk. Play it at the base of the plant and leave it running until it is ready. For a one-off growth spell use magic.nature; for health regenerating use state.regen.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#7be04f',
  tags: ['grow', 'growing', 'plant', 'crop', 'farm', 'garden', 'sprout', 'farming'],
  build(c) {
    const col = c.color('#7be04f');
    const light = c.lighten(col, 0.6);
    // along the ground: a row in 2D, a disc on the floor in 3D
    const area = c.is3d ? { type: 'circle', radius: 34 } : { type: 'rect', w: 70, h: 0 };
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // a soft green glow breathing at the base. It lives 0.06 s longer than a cycle and fades in and out over
      // exactly that overlap, so the old and the new glow cross-fade instead of blinking once a cycle
      c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.26, size: 120, color: col, offset: c.is3d ? undefined : [0, 14],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.25, 0.048], [0.4, 0.5], [0.25, 0.952], [0, 1]]))], order: 0 })),
      // a faint ring sent out once a cycle
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.0, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0, 1]]))], order: 1 }),
      // glowing motes rising
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 8, shape: area,
        speed: 0, life: [0.8, 1.2], size: [3, 6], color: light,
        behaviors: [c.force(0, 110), c.limitSpeed(70, 1), c.noise(2, 8), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 2 })),
      // little leaves drifting up
      c.sys(c.ground({ tex: 'leaf', blend: 'normal', loop: true, rate: 3, shape: area,
        speed: 0, life: [1.1, 1.5], size: [8, 12], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
        behaviors: [c.force(0, 70), c.limitSpeed(45, 1), c.noise(1.2, 16), c.spin(-2.5, 2.5), c.sizeOverLife(c.pop(0.2, 0.7)), c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 3 })),
      // green sparkles twinkling up
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 7, shape: area,
        speed: 0, life: [0.9, 1.3], size: [8, 14], rotation: [0, 1], color: [light, '#ffffff'],
        behaviors: [c.force(0, 90), c.limitSpeed(55, 1), c.noise(1.5, 10), c.spin(1.5), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.6, 0.7], [1, 0]]))], order: 4 })),
    ];
  },
};
