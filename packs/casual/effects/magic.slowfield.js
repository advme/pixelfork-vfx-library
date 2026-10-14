/** A slowing field on the ground: a blue-purple ring breathing slowly, lazy ripples rolling out, and soft motes and glints drifting up through it as if through syrup. Loops until stopped. */
export default {
  name: 'magic.slowfield',
  category: 'magic',
  whenToUse: 'A slowing zone lies on the ground and slows every enemy that walks through it: a slow tower\'s or frost totem\'s field in tower defense, a time-warp or gravity well area, a tar or glue patch, a slow spell\'s area on a MOBA map. Play it on the ground at the zone\'s centre, size it to the zone and stop it when the zone ends. For one slowed enemy use state.slowed, for the hit that slows use hit.slow, for a one-off time spell use magic.time and for a magic circle that is not a slow use magic.rune.',
  duration: 2.0, loop: true, anchor: 'feet', tint: '#8f7bff',
  tags: ['slow', 'zone', 'field', 'tower defense', 'time', 'area', 'trap', 'aura'],
  build(c) {
    const col = c.color('#8f7bff');
    const light = c.lighten(col, 0.55);
    const blue = c.mix(col, '#5ab8ff', 0.45);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const breathe = (lo, hi) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[lo, 0], [hi, 0.5], [lo, 1]]));
    // motes drifting up very slowly: a weak push and a low top speed, a gentle wobble
    const drift = () => [c.force(0, 40), c.limitSpeed(22, 1), c.noise(0.6, 10), c.sizeOverLife(c.pop(0.25, 0.7)), c.colorOverLife(c.fadeInOut(0.2, 0.65))];
    // the standing parts are `cut`, so the zone goes the moment the game stops it instead of hanging on for up to 2 s
    return [
      // the zone's edge, breathing slowly
      ring({ blend: 'add', loop: true, cut: true, duration: 2.0, bursts: [{ count: 1 }], life: 2.0, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.98], [0.5, 1.02], [1, 0.98]])), breathe(0.7, 1)], order: 1 }),
      // 3D: a dim pool of colour on the floor; 2D: an inner ring breathing against the edge
      c.is3d
        ? c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 2.0, bursts: [{ count: 1 }], life: 2.0, size: 210, color: blue, behaviors: [breathe(0.3, 0.4)], order: 0 }))
        : ring({ blend: 'add', loop: true, cut: true, duration: 2.0, bursts: [{ count: 1 }], life: 2.0, size: 140, color: blue,
          behaviors: [c.sizeOverLife(c.curve([[0, 1.03], [0.5, 0.97], [1, 1.03]])), breathe(0.6, 0.35)], order: 0 }),
      // lazy ripples rolling out to the edge, two per cycle
      ring({ blend: 'add', loop: true, duration: 2.0, bursts: [{ count: 1 }, { time: 1.0, count: 1 }], life: 2.0, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0.35, 0.7], [0, 1]]))], order: 2 }),
      // 3D: lights creeping slowly round the rim on the floor; they move exactly one slot (a sixth of the circle) per
      // cycle, so each new burst carries on where the last one ended instead of jumping back
      c.is3d ? c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 2.0, bursts: [{ count: 6 }], shape: { type: 'circle', radius: 92, thickness: 0, even: true },
        speed: 0, offset: [0, 4], life: 2.0, size: 13, color: light, behaviors: [c.orbit((2 * Math.PI) / 6 / 2.0), breathe(0.75, 1)], order: 3 })) : null,
      // soft motes drifting up through the zone as if through syrup
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 9, shape: c.is3d ? { type: 'circle', radius: 85 } : { type: 'rect', w: 170, h: 0 },
        speed: 0, life: [1.6, 2.2], size: [9, 15], color: [light, blue], behaviors: drift(), order: 3 })),
      // glints hanging in the air and twinkling slowly
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 5, shape: c.is3d ? { type: 'circle', radius: 80 } : { type: 'rect', w: 160, h: 0 },
        speed: 0, life: [1.2, 1.6], size: [8, 13], color: '#ffffff', behaviors: drift(), order: 4 })),
    ].filter(Boolean);
  },
};
