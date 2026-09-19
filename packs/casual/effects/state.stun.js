/** Three stars circling above a head. Loops until stopped. */
export default {
  name: 'state.stun',
  category: 'state',
  whenToUse: 'A character or enemy is stunned, dizzy or knocked out. Play above the head with follow, stop when they recover.',
  duration: 1,
  loop: true,
  tint: '#ffe45c',
  tags: ['stun', 'dizzy', 'knocked out', 'status', 'stars'],
  build(c) {
    const col = c.color('#ffe45c');
    const light = c.lighten(col, 0.6);
    return [
      // three stars, one full circle per second, so each replaces itself seamlessly
      c.sys(c.ground({ tex: 'star', blend: 'normal', loop: true, duration: 1, bursts: [{ count: 3 }],
        shape: { type: 'circle', radius: 26, thickness: 0, even: true },
        speed: 0, life: 1, size: 20, color: col,
        behaviors: [c.orbit(c.TAU), c.spin(3), c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.1], [1, 0.9]]))], order: 1 })),
      // little sparkles drifting off
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 10, shape: { type: 'circle', radius: 28, thickness: 0 },
        speed: [10, 30], life: [0.4, 0.7], size: [6, 10], color: light,
        behaviors: [c.force(0, 40), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.3))] })),
    ];
  },
};
