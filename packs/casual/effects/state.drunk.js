/** Tipsy: golden bubbles and little stars wobble up from the head, with a hiccup of bubbles every so often. Loops until stopped. */
export default {
  name: 'state.drunk',
  category: 'state',
  whenToUse: 'A cartoon character is tipsy, drunk, woozy or confused for a while: after a funny potion or a party drink, a confusion debuff that scrambles the controls. Play it over the head with follow; stop it when they sober up. For a knock-out with stars circling the head use state.stun; for nausea or feeling sick use state.sick; for poison bubbles rising from the body use state.poison.',
  duration: 1.6, loop: true, anchor: 'head', tint: '#ffcf4a',
  tags: ['drunk', 'tipsy', 'woozy', 'confused', 'dizzy', 'bubbles', 'cartoon', 'status'],
  build(c) {
    const col = c.color('#ffcf4a');
    const light = c.lighten(col, 0.55);
    // a bubble swells, wobbles up and pops
    const bubble = () => c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [0.85, 1], [0.93, 1.35], [1, 0]]));
    return [
      // a warm, swaying glow
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 72, offset: [0, -4], color: col,
        behaviors: [c.noise(0.8, 6), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.28, 0], [0.42, 0.5], [0.28, 1]]))], order: 0 }),
      // a steady trickle of bubbles swaying up
      c.sys(c.ground({ tex: 'ring', blend: 'normal', loop: true, rate: 5, shape: { type: 'circle', radius: 14 },
        speed: 0, life: [1.1, 1.5], size: [9, 17], color: [light, col],
        behaviors: [c.force(0, 120), c.limitSpeed(40, 1), c.noise(1.4, 12), bubble(), c.colorOverLife(c.fade(0.85))], order: 1 })),
      // hic! a little puff of bubbles once a cycle
      c.sys(c.vol({ tex: 'ring', blend: 'normal', loop: true, duration: 1.6, bursts: [{ time: 0.3, count: [4, 5] }], shape: { type: 'circle', radius: 6, arc: Math.PI },
        speed: [50, 90], life: [0.6, 0.85], size: [7, 13], color: light,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 60), c.noise(2, 5), bubble()], order: 2 })),
      // little stars wobbling up
      c.sys(c.ground({ tex: 'star', blend: 'add', loop: true, rate: 3, shape: { type: 'circle', radius: 18 },
        speed: 0, life: [0.9, 1.2], size: [8, 13], color: [col, '#ffffff'],
        behaviors: [c.force(0, 100), c.limitSpeed(45, 1), c.noise(1.8, 10), c.spin(-3, 3), c.sizeOverLife(c.pop(0.2, 0.7))], order: 3 })),
    ];
  },
};
