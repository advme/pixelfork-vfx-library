/** Levitating: a soft glowing ring hovers under the feet, ripples spread out from it into the ground and motes drift up. Loops until stopped. */
export default {
  name: 'state.levitate',
  category: 'state',
  whenToUse: 'A character floats or hovers above the ground for a while: a levitation spell, a hover power-up, a floating wizard or ghost, anti-gravity boots, a hovering robot. Play it at the feet with follow; stop it when they land. For a selection ring under a unit use state.selected; for a blazing power aura use state.aura.',
  duration: 1.6, loop: true, anchor: 'feet', tint: '#7fe7ff',
  tags: ['levitate', 'float', 'hover', 'fly', 'anti gravity', 'magic', 'ghost', 'status'],
  build(c) {
    const col = c.color('#7fe7ff');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const base = c.is3d ? { type: 'circle', radius: 24 } : { type: 'rect', w: 54, h: 0 };
    const soft = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.45, 0.5], [0.3, 1]]));
    return [
      // a soft pool of light: lying on the floor in 3D, a low glow at the feet in 2D
      c.is3d
        ? c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 110, color: col, behaviors: [soft()], order: 0 }))
        : c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 64, offset: [0, 2], color: col, behaviors: [soft()], order: 0 }),
      // the hover ring, breathing
      ring({ blend: 'add', loop: true, cut: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 84, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.05], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.65, 0], [1, 0.5], [0.65, 1]]))], order: 1 }),
      // ripples pushed out into the ground, two per cycle
      ring({ blend: 'add', loop: true, duration: 0.8, bursts: [{ count: 1 }], life: 0.8, size: 136, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.45], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 2 }),
      // motes rising gently
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 14, shape: base,
        speed: 0, life: [1.0, 1.5], size: [4, 8], color: [light, col],
        behaviors: [c.force(0, 90), c.limitSpeed(55, 1), c.noise(1.5, 5), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 3 })),
      // a few sparkles lifting with them
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: base,
        speed: 0, life: [0.5, 0.8], size: [8, 13], rotation: [0, 0.8], color: light,
        behaviors: [c.force(0, 70), c.limitSpeed(50, 1), c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
    ];
  },
};
