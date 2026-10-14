/** A rally point: a ring on the ground shrinks onto the spot again and again, and the spot pulses with a pop of sparks each time it arrives. Loops until stopped. */
export default {
  name: 'world.rally',
  category: 'world',
  whenToUse: 'A rally point, move order or gather point for units in RTS, tower defense and tactics games: where troops will walk to or gather. Play it on the ground at the point and stop it when the units arrive or the order changes. For a one-tap acknowledgement use ui.tap; for a quest objective the player must reach use world.beacon.',
  duration: 0.9, loop: true, anchor: 'feet', tint: '#40d8ff',
  tags: ['rally', 'waypoint', 'move order', 'rts', 'tower defense', 'tactics', 'marker', 'gather'],
  build(c) {
    const col = c.color('#40d8ff');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the shrinking ring reaches the spot at 0.75 s of each 0.9 s cycle
    const hit = 0.75;
    return [
      // the ring closing in onto the spot
      ring({ blend: 'add', loop: true, duration: 0.9, bursts: [{ count: 1 }], life: hit, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.15]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.2], [1, 0.8], [0, 1]]))], order: 1 }),
      // the spot itself, always there
      ring({ blend: 'add', loop: true, duration: 0.9, bursts: [{ count: 1 }], life: 0.9, size: 36, color: light,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.75, 0.8], [1, 0.9], [0.75, 1]]))], order: 2 }),
      // the pulse when the ring arrives: a flash and a little ring popping out
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.9, bursts: [{ time: hit, count: 1 }], life: 0.3, size: 80, offset: [0, 8], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      ring({ blend: 'add', loop: true, duration: 0.9, bursts: [{ time: hit, count: 1 }], life: 0.3, size: 70, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, duration: 0.9, bursts: [{ time: hit, count: 5 }],
        shape: c.is3d ? { type: 'circle', radius: 4, thickness: 0, even: true } : { type: 'circle', radius: 4, thickness: 0, arc: Math.PI, even: true },
        speed: [80, 120], life: [0.25, 0.35], size: [7, 11], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
