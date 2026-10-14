/** Ultimate ready: a bright golden glow breathes around the hero, a ring pulses out at the feet and sparks spiral up around the body. Loops until stopped. */
export default {
  name: 'state.ultready',
  category: 'state',
  whenToUse: 'A hero\'s ultimate or special ability is charged and ready to use: the ult is up in a MOBA or hero shooter, a super meter is full, a special attack can be fired. Play it on the character (follow it) and stop it when the ability is used. For a character already blazing in a powered-up mode use state.aura.',
  duration: 1, loop: true, tint: '#ffcf3a',
  tags: ['ultimate', 'ult ready', 'special', 'super', 'ability', 'moba', 'hero', 'charged'],
  build(c) {
    const col = c.color('#ffcf3a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse', offset: [0, -40] }, p)));
    // 3D: a real helix around the body (orbit about the vertical); 2D: rising from a line at the feet with a wobble
    const rise = (p, turn) => c.sys(c.ground(Object.assign({ loop: true, speed: 0, offset: [0, -32],
      shape: c.is3d ? { type: 'circle', radius: 34, thickness: 0 } : { type: 'rect', w: 70, h: 0 } }, p,
    { behaviors: (c.is3d ? [c.orbit(turn)] : [c.noise(3, 14)]).concat(p.behaviors) })));
    return [
      // the breathing glow around the body
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 175, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.86], [0.5, 1.1], [1, 0.86]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.32, 0], [0.62, 0.5], [0.32, 1]]))], order: 0 }),
      // a steady glowing ring at the feet
      ring({ blend: 'add', loop: true, cut: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.95], [0.5, 1.05], [1, 0.95]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [1, 0.5], [0.75, 1]]))], order: 1 }),
      // a pulse sent out from the ring every second
      ring({ blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 0.7, size: 190, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [1, 1.1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0, 1]]))], order: 1 }),
      // sparks spiralling up
      rise({ tex: 'spark', blend: 'add', rate: 20, life: [0.7, 0.9], size: [9, 14], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.force(0, 420), c.limitSpeed(170, 1), c.sizeOverLife(c.pop(0.2, 0.6))], order: 3 }, 5),
      // thin energy streaks riding up with them
      rise({ tex: 'glow', blend: 'add', rate: 14, life: [0.55, 0.75], size: [3, 5], color: '#ffffff', stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.force(0, 520), c.limitSpeed(230, 1), c.colorOverLife(c.fade(0.5))], order: 2 }, 6),
      // big twinkles flashing on around the body
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: { type: 'circle', radius: 48 },
        speed: 0, life: [0.35, 0.5], size: [16, 24], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.35, 1], [1, 0]]))], order: 4 })),
    ];
  },
};
