/** Trapped in a bubble: a big soft soap bubble that breathes and wobbles, a bright shine in its corner, glints running round its rim and tiny bubbles rising inside. Loops until stopped. */
export default {
  name: 'state.bubbled',
  category: 'state',
  whenToUse: 'A character is trapped or carried inside a floating soap bubble for a while: caught by a bubble attack or bubble trap, held in a bubble jail until rescued, floating up inside a bubble power-up, a pet or baby sealed in a bubble in a kids game. Play it at the character\'s centre with follow; when the bubble bursts, stop it and play puzzle.bubble there at size 2. For a protective shield or barrier use state.shield; for floating without a bubble use state.levitate; for weightless drifting use state.zerog.',
  duration: 1.6, loop: true, tint: '#8fe3ff',
  tags: ['bubble', 'trapped', 'soap', 'float', 'captured', 'kids', 'status', 'cute'],
  build(c) {
    const col = c.color('#8fe3ff');
    const light = c.lighten(col, 0.6);
    const pink = c.mix(light, '#ffc2ec', 0.5);
    const s = c.is3d ? 0.75 : 1;
    const size = 150 * s;
    // a soap bubble breathes: two rims slightly out of step make it look like it wobbles
    const breathe = (a, b) => c.curve([[0, a], [0.25, b], [0.5, a], [0.75, b], [1, a]]);
    return [
      // the faint inside of the bubble
      c.sys({ tex: 'disc', blend: 'add', loop: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: size * 0.96, color: c.darken(col, 0.82), cut: true,
        behaviors: [c.sizeOverLife(breathe(0.97, 1.02))], order: 0 }),
      // the solid soap film edge, so it reads on bright backgrounds too
      c.sys({ tex: 'ring', blend: 'normal', loop: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size, color: light, cut: true,
        behaviors: [c.sizeOverLife(breathe(0.97, 1.03)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.6, 0.5], [0.45, 1]]))], order: 1 }),
      // the glowing rim, a touch pink, wobbling out of step with the film
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: size * 1.02, color: pink, cut: true,
        behaviors: [c.sizeOverLife(breathe(1.02, 0.97)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.95, 0.25], [0.6, 0.5], [0.95, 0.75], [0.6, 1]]))], order: 2 }),
      // the shine in the upper left
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 34 * s, color: '#ffffff', offset: [-40 * s, 38 * s], cut: true,
        behaviors: [c.sizeOverLife(breathe(0.9, 1.1)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.9, 0.5], [0.7, 1]]))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 26 * s, rotation: 0.3, color: '#ffffff', offset: [-40 * s, 38 * s], cut: true,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1.1], [0.5, 0.5], [0.8, 1], [1, 0.6]]))], order: 4 }),
      // glints running round the rim (the ring texture's bright band sits at about 0.4 x its size from the centre)
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 1.6, bursts: [{ count: 3 }], shape: { type: 'circle', radius: size * 0.4, thickness: 0, even: true },
        speed: 0, life: 1.6, size: [11 * s, 15 * s], color: '#ffffff', cut: true,
        behaviors: [c.orbit(c.TAU / 1.6), c.sizeOverLife(c.curve([[0, 0.5], [0.5, 1.2], [1, 0.5]]))], order: 4 }),
      // tiny bubbles rising inside (cut too: they must not hang in the air once the big bubble is gone)
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.6, rate: 3, cut: true, shape: { type: 'circle', radius: 34 * s },
        speed: [5, 15], life: [0.8, 1.1], size: [6 * s, 10 * s], color: light,
        behaviors: [c.force(0, 50), c.limitSpeed(45, 1), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [0.85, 1], [1, 0]])), c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 2 }),
    ];
  },
};
