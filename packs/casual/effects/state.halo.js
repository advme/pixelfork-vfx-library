/** A golden halo floats above the head, gently pulsing, with lights running around it and sparkles drifting down. Loops until stopped. */
export default {
  name: 'state.halo',
  category: 'state',
  whenToUse: 'A character is blessed, holy or angelic for a while: an angel or saint, a blessed or sanctified status, a good-ghost spirit, a holy buff that lasts, a pure-hearted moment in a life sim; follow the head and stop it when the blessing ends (for a one-off blessing use magic.holy, for a lasting heal use state.regen).',
  duration: 1.6, loop: true, anchor: 'head', tint: '#ffd23a',
  tags: ['halo', 'angel', 'holy', 'blessed', 'saint', 'divine', 'heaven', 'status'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the head anchor already sits a little above the head, so the halo hangs right there
    const L = 1.6, Y = 2;
    // 3D: a ring lying flat above the head; 2D: the same ring seen from the side, an ellipse
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const rim = c.is3d ? { type: 'circle', radius: 24, thickness: 0 } : { type: 'rect', w: 46, h: 0 };
    const breathe = (a, b) => c.sizeOverLife(c.curve([[0, a], [0.5, b], [1, a]]));
    const glowAlpha = (a, b) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [b, 0.5], [a, 1]]));
    return [
      // the standing parts are `cut`, so the halo goes the moment the game stops it instead of hanging on for up to a cycle
      // soft light around the halo
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 90, offset: [0, Y], color: col,
        behaviors: [breathe(0.9, 1.08), glowAlpha(0.28, 0.45)], order: 0 }),
      // the halo: a solid gold band with a brighter band inside it
      ring({ blend: 'normal', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 60, offset: [0, Y], color: col,
        behaviors: [breathe(0.96, 1.04), glowAlpha(0.85, 1)], order: 1 }),
      ring({ blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 53, offset: [0, Y], color: light,
        behaviors: [breathe(0.98, 1.05), glowAlpha(0.55, 0.9)], order: 2 }),
      // 3D: three lights running around the ring (a third of a turn per cycle, so each cycle carries on the last);
      // 2D: little glints popping along it
      c.is3d
        ? c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 3 }], shape: { type: 'circle', radius: 22, thickness: 0, even: true }, offset: [0, Y],
          speed: 0, life: L, size: 10, color: '#ffffff', behaviors: [c.orbit((2 * Math.PI) / 3 / L)], order: 3 }))
        : c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 2.5, shape: rim, offset: [0, Y],
          speed: 0, life: 0.5, size: [10, 15], rotation: [0, 0.8], color: '#ffffff', behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }),
      // sparkles drifting down from the halo
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 7, shape: rim, offset: [0, Y - 2],
        speed: 0, life: [0.9, 1.3], size: [5, 9], rotation: [0, 0.8], color: light,
        behaviors: [c.force(0, -60), c.limitSpeed(36, 1), c.noise(1.5, 6), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 })),
    ];
  },
};
