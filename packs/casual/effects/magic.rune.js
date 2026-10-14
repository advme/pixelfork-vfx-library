/** A magic circle on the ground: two glowing rings with rune marks and dots turning between them, a pulse rolling out and motes rising. Loops until stopped. */
export default {
  name: 'magic.rune',
  category: 'magic',
  whenToUse: 'A magic circle glows on the ground and stays: a spell zone or area-of-effect marker, a summoning or ritual circle, a hidden magic trap or glyph on the floor, a wizard channelling a spell; play it at the feet or on the ground and stop it when the spell ends (for a one-shot summon burst use magic.summon, for a teleporter pad use world.teleporter, for a gate to walk through use magic.portal, for a unit selection marker use state.selected).',
  duration: 2, loop: true, anchor: 'feet', tint: '#5cc8ff',
  tags: ['magic circle', 'rune', 'glyph', 'summoning', 'ritual', 'trap', 'spell zone', 'sigil'],
  build(c) {
    const col = c.color('#5cc8ff');
    const light = c.lighten(col, 0.6);
    const L = 2;
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const steady = (a, b) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [b, 0.5], [a, 1]]));
    const breathe = (a, b) => c.sizeOverLife(c.curve([[0, a], [0.5, b], [1, a]]));
    // the standing parts are `cut`, so the circle goes the moment the game stops it instead of hanging on for up to 2 s
    const circle = [
      ring({ blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 205, color: col,
        behaviors: [breathe(0.98, 1.02), steady(0.8, 1)], order: 1 }),
      ring({ blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 135, color: light,
        behaviors: [breathe(1.03, 0.97), steady(1, 0.7)], order: 1 }),
      // a pulse rolling out from the middle once a cycle
      ring({ blend: 'add', loop: true, duration: L, bursts: [{ count: 1 }], life: 0.9, size: 215, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1.1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.15], [0, 1]]))], order: 2 }),
    ];
    // the rune marks, lying flat on the floor and turning (one slot per cycle, so each cycle carries on from the last)
    const turning = (p) => c.sys(c.ground(c.flat(Object.assign({ blend: 'add', loop: true, cut: true, duration: L, speed: 0, life: L }, p))));
    const marks3d = c.is3d ? [
      // light pooled on the floor inside the circle
      c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 230, color: col,
        behaviors: [steady(0.22, 0.32)], order: 0 })),
      // a four-point sigil in the middle, a quarter turn per cycle
      c.sys(c.flat({ tex: 'spark', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 70, color: light,
        behaviors: [c.spin(Math.PI / 2 / L, Math.PI / 2 / L), steady(0.6, 0.9)], order: 2 })),
      turning({ tex: 'plus', bursts: [{ count: 6 }], shape: { type: 'circle', radius: 64, thickness: 0, even: true }, size: 15, rotation: Math.PI / 4, color: light,
        behaviors: [c.orbit((2 * Math.PI) / 6 / L), steady(0.75, 1)], order: 3 }),
      turning({ tex: 'disc', bursts: [{ count: 12 }], shape: { type: 'circle', radius: 94, thickness: 0, even: true }, size: 7, color: col,
        behaviors: [c.orbit((-2 * Math.PI) / 12 / L), steady(1, 0.6)], order: 3 }),
    ] : [];
    // 2D: the circle is seen from the side, so marks slide along its near edge one way and its far edge the other way
    const slide = (tex, y, w, drift, size, color, rate) => c.sys({ tex, blend: 'add', loop: true, rate, shape: { type: 'rect', w, h: 0 }, offset: [0, y],
      speed: 0, life: [1, 1.2], size, rotation: tex === 'plus' ? Math.PI / 4 : 0, color,
      behaviors: [c.force(drift * 4, 0), c.limitSpeed(Math.abs(drift), 1), c.colorOverLife(c.fadeInOut(0.25, 0.7))], order: 3 });
    const marks2d = c.is3d ? [] : [
      slide('plus', -12, 70, 24, 13, light, 3),
      slide('plus', 12, 70, -24, 11, light, 3),
      slide('disc', -16, 110, -20, 6, col, 5),
      slide('disc', 16, 110, 20, 5, col, 5),
    ];
    // motes rising out of the circle
    const area = c.is3d ? { type: 'circle', radius: 70 } : { type: 'rect', w: 160, h: 28, thickness: 1 };
    const rising = [
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 12, shape: area,
        speed: 0, life: [0.8, 1.2], size: [4, 7], color: [light, col],
        behaviors: [c.force(0, 160), c.limitSpeed(90, 1), c.noise(1.5, 8), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 4 })),
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: area,
        speed: 0, life: [0.6, 0.9], size: [8, 13], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 120), c.limitSpeed(60, 1), c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
    ];
    return [...circle, ...marks3d, ...marks2d, ...rising];
  },
};
