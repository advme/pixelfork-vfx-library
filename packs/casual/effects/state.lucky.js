/** Lucky: four green clover leaves circle the character with gold sparkles riding between them, gold glints twinkle all round and a warm gold glow breathes. Loops until stopped. */
export default {
  name: 'state.lucky',
  category: 'state',
  whenToUse: 'The player has a luck buff or good-fortune bonus: a four-leaf clover or lucky charm picked up, a better drop or crit chance, a lucky streak in a slot or gacha game, a fortune blessing, a lucky cat bonus. Follow the character; stop it when the luck runs out. For a one-off stat boost use magic.buff; for invincibility use state.rainbow.',
  duration: 2, loop: true, tint: '#ffc928',
  tags: ['lucky', 'luck', 'clover', 'fortune', 'charm', 'buff', 'gold', 'status'],
  build(c) {
    const col = c.color('#ffc928');
    const light = c.lighten(col, 0.5);
    // leaves and sparkles go round once every 2 s and spin a full turn in that time, so the copy
    // laid down each cycle lands exactly where the last one was
    const orbiting = (p) => c.sys(c.ground(Object.assign({ loop: true, duration: 2, shape: { type: 'circle', radius: 44, thickness: 0, even: true }, offset: [0, 8], speed: 0, life: 2.03 }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 2, bursts: [{ time: 0, count: 1 }, { time: 1, count: 1 }], life: 1.03, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.05], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.14, 0], [0.3, 0.5], [0.14, 1]]))], order: 0 }),
      orbiting({ tex: 'leaf', blend: 'normal', bursts: [{ count: 4 }], size: 20, color: '#4ccf4c',
        behaviors: [c.orbit(Math.PI), c.spin(Math.PI), c.sizeOverLife(c.curve([[0, 1], [0.25, 1.12], [0.5, 1], [0.75, 1.12], [1, 1]]))], order: 2 }),
      orbiting({ tex: 'spark', blend: 'add', bursts: [{ time: 0.25, count: 4 }], size: 16, color: c.lighten(col, 0.2),
        behaviors: [c.orbit(Math.PI), c.sizeOverLife(c.curve([[0, 1], [0.125, 0.55], [0.25, 1], [0.375, 0.55], [0.5, 1], [0.625, 0.55], [0.75, 1], [0.875, 0.55], [1, 1]]))], order: 3 }),
      // loose gold twinkles and glints floating up
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 8, shape: { type: 'circle', radius: 44 },
        speed: 0, life: [0.45, 0.7], size: [8, 14], color: [col, light],
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 })),
      // in 3D the glints rise from a ring round the body, not from inside the model
      c.sys(c.ground({ tex: 'disc', blend: 'add', loop: true, rate: 7, shape: c.is3d ? { type: 'circle', radius: 32, thickness: 0.35 } : { type: 'rect', w: 60, h: 0 }, offset: [0, -30],
        speed: 0, life: [0.8, 1.1], size: [3, 6], color: col,
        behaviors: [c.force(0, 140), c.limitSpeed(90, 1), c.noise(1.5, 6), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 1 })),
    ];
  },
};
