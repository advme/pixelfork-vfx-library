/** Rallied troops: a golden ring breathing under the feet that sends out a soft pulse, a warm glow, and sparks, twinkles and little chevrons rising gently. Loops until stopped. */
export default {
  name: 'state.rally',
  category: 'state',
  whenToUse: 'Soldiers or units are rallied, inspired or led: a morale or leadership bonus, troops near a hero, banner or commander, an army under a war-cry buff in strategy, RTS, tactics and medieval games. Play it at each unit\'s feet with follow and stop it when the bonus ends. For the shout itself use magic.warcry; for a move-order marker on the ground use world.rally; for a blazing power-up use state.aura.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#ffcc33',
  tags: ['rally', 'inspired', 'morale', 'leadership', 'buff', 'troops', 'army', 'medieval', 'status'],
  build(c) {
    const col = c.color('#ffcc33');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // things rise from the ring: a circle on the floor in 3D, a line at the feet in 2D
    const base = c.is3d ? { type: 'circle', radius: 40, thickness: 0 } : { type: 'rect', w: 84, h: 0 };
    return [
      // the golden ring, breathing
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 104, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.96], [0.5, 1.04], [1, 0.96]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [1, 0.5], [0.75, 1]]))], order: 0 }),
      // a soft pulse sent out once a cycle
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 0.8, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 0 }),
      // a warm glow around the legs
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 130, offset: [0, 26], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.22, 0], [0.34, 0.5], [0.22, 1]]))], order: 1 }),
      // sparks rising off the ring
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 11, shape: base,
        speed: 0, life: [0.8, 1.1], size: [3, 6], color: [light, '#ffffff'],
        behaviors: [c.force(0, 240), c.limitSpeed(120, 1), c.noise(1.5, 8), c.colorOverLife(c.fadeInOut(0.1, 0.6))], order: 3 })),
      // twinkles
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: base,
        speed: 0, life: [0.5, 0.7], size: [9, 13], color: '#ffffff',
        behaviors: [c.force(0, 200), c.limitSpeed(90, 1), c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
      // little chevrons drifting up
      c.sys(c.ground({ tex: 'arrow', blend: 'add', loop: true, rate: 2.5, shape: base,
        speed: 0, life: [0.8, 1.0], size: [14, 20], color: [col, light],
        behaviors: [c.force(0, 220), c.limitSpeed(110, 1), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0.6]])), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 2 })),
    ];
  },
};
