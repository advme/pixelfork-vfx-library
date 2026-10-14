/** Focus: thin rings slowly close in around the head, motes gather inward and a glint flashes as each ring arrives. Loops until stopped. */
export default {
  name: 'state.focus',
  category: 'state',
  whenToUse: 'A character concentrates or takes aim: a sniper steadying a shot, an archer drawing a bow, a meditating monk, a focus or accuracy buff, a mind power gathering before it is used. Play it at the head with follow; stop it when they act. For a mark over an enemy who is being targeted use state.marked; for pondering or deciding use state.thinking; for charging up raw power use state.aura.',
  duration: 1.2, loop: true, anchor: 'head', tint: '#62e6ff',
  tags: ['focus', 'concentrate', 'aim', 'sniper', 'meditate', 'precision', 'mind', 'status'],
  build(c) {
    const col = c.color('#62e6ff');
    const light = c.lighten(col, 0.6);
    // the head's middle: the anchor sits just above the head
    const cy = -32;
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 76, offset: [0, cy], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.2, 0], [0.34, 0.5], [0.2, 1]]))], order: 0 }),
      // soft rings closing in, one every 0.6 s, each arriving as the next one is halfway
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }, { time: 0.6, count: 1 }], life: 1.2, size: 150, offset: [0, cy], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.5]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.3], [0.5, 0.88], [0, 1]]))], order: 1 }),
      // a crisp, thin ring of dots riding on each soft ring, turning slowly as it closes in
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 28 }, { time: 0.6, count: 28 }], shape: { type: 'circle', radius: 59, thickness: 0, even: true }, offset: [0, cy],
        speed: -26, life: 1.2, size: 6, color: light,
        behaviors: [c.orbit(0.4), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.3], [1, 0.88], [0, 1]]))], order: 2 }),
      // motes drawn in toward the head
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 12, shape: { type: 'circle', radius: 54, thickness: 0 }, offset: [0, cy],
        speed: [-58, -46], life: [0.75, 0.85], size: [3, 6], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [1, 1]])), c.colorOverLife(c.fadeInOut(0.3, 0.8))], order: 3 })),
      // the glint where each ring lands
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }, { time: 0.6, count: 1 }], life: 0.3, size: 34, offset: [22, cy + 22], rotation: 0.2, color: '#ffffff',
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0]]))], order: 4 }),
    ];
  },
};
