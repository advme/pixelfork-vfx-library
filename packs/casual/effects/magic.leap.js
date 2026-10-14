/** A heroic leap take-off: a flash and a ring of power at the feet, dust bursting out in a ring, streaks shooting up and stones kicked into the air. */
export default {
  name: 'magic.leap',
  category: 'magic',
  whenToUse: 'A hero launches into a big powered leap: a jump-attack take-off, a super jump, a leap skill in a MOBA or action RPG, a mech boosting off the ground. Play it on the ground at the feet as the hero takes off. For an ordinary jump use move.jump; for the slam when it lands use hit.heavy or magic.shockwave.',
  duration: 0.8, loop: false, anchor: 'feet', tint: '#ffd45c',
  tags: ['leap', 'super jump', 'launch', 'take off', 'jump attack', 'dust', 'moba', 'ability'],
  build(c) {
    const col = c.color('#ffd45c');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 170, offset: [0, 15], color: '#fff6dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      // a ring of power and a wider ring of dust on the ground
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.5, size: 270, color: '#d9cdb8',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 0 }),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [11, 12] }],
        shape: c.is3d ? { type: 'circle', radius: 18, thickness: 0, even: true } : { type: 'circle', radius: 18, thickness: 0, arc: Math.PI, even: true }, offset: c.is3d ? [0, 16] : undefined,
        speed: [200, 300], life: [0.45, 0.65], size: [30, 46], rotation: [0, 6.28], color: ['#e2d7c4', '#cbbda6'],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 40), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.25]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      // streaks shooting up: born 44 px up and short at first, so their tails (about 95 px at full size) never poke into the ground
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'cone', radius: 26, angle: 0.18 }, offset: [0, 44],
        speed: [650, 1000], life: [0.22, 0.32], size: [6, 10], color: [light, '#ffffff'], stretch: { speed: 0.008, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.4))], order: 3 }, 'up')),
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'cone', radius: 22, angle: 0.55 },
        speed: [320, 560], life: [0.55, 0.8], size: [7, 12], rotation: [0, 6.28], color: ['#8a7a66', '#5a4d40'],
        behaviors: [c.gravity(1700), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 3 }, 'up'), 'box')),
    ];
  },
};
