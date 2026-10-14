/** A healing zone: a green ring glowing on the ground, a soft pulse rolling out and green crosses and motes floating up from it. Loops until stopped. */
export default {
  name: 'magic.heallaura',
  category: 'magic',
  whenToUse: 'A healing area on the ground that units stand in: a healing totem or shrine, a medic tent, a support tower\'s heal radius, a heal-circle spell, a healing spring. Play it at the zone\'s centre on the ground, size it to the zone and stop it when the zone ends. For one character healing over time use state.regen; for a one-off heal use magic.heal.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#5cf07a',
  tags: ['heal', 'aura', 'zone', 'healing circle', 'support', 'totem', 'tower defense', 'regen'],
  build(c) {
    const col = c.color('#5cf07a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const breathe = (lo, hi) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[lo, 0], [hi, 0.5], [lo, 1]]));
    return [
      // the zone's edge
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 180, color: col,
        behaviors: [breathe(0.7, 1)], order: 1 }),
      // 3D: a soft green pool on the floor; 2D: an inner ring breathing against the edge
      c.is3d
        ? c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 190, color: col, behaviors: [breathe(0.3, 0.42)], order: 0 }))
        : ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 120, color: light, behaviors: [breathe(0.6, 0.3)], order: 0 }),
      // a soft pulse of healing rolling out to the edge
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.0, size: 180, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.15], [0, 1]]))], order: 2 }),
      // crosses floating up from inside the zone
      c.sys(c.ground({ tex: 'plus', blend: 'add', loop: true, rate: 9, shape: c.is3d ? { type: 'circle', radius: 70 } : { type: 'rect', w: 150, h: 0 },
        speed: 0, life: [1.0, 1.4], size: [12, 20], color: [light, col],
        behaviors: [c.force(0, 110), c.limitSpeed(80, 1), c.noise(1.5, 6), c.sizeOverLife(c.pop(0.2, 0.65)), c.colorOverLife(c.fadeInOut(0.15, 0.65))], order: 3 })),
      // motes rising off the ring
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 16, shape: c.is3d ? { type: 'circle', radius: 88, thickness: 0 } : { type: 'rect', w: 175, h: 0 },
        speed: 0, life: [0.8, 1.2], size: [5, 10], color: light,
        behaviors: [c.force(0, 160), c.limitSpeed(110, 1), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
