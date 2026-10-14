/** A scanning beam: a bright line of light with a ring around it sweeps up and then down over a soft column of light, sparkles riding along, a glowing pad at the base. Loops until stopped. */
export default {
  name: 'world.scanner',
  category: 'world',
  whenToUse: 'A scanning beam sweeps up and down over something (a security scanner at a gate, a body or item scan, a sci-fi checkpoint, a drone scanning the player, an analysis or cloning station): play it at the feet or base of what is scanned (size 1 covers a character) and stop it when the scan is done; for a hologram projector use world.hologram, for a teleporter pad use world.teleporter.',
  duration: 1.6, loop: true, anchor: 'feet', tint: '#44ffd2',
  tags: ['scanner', 'scan', 'beam', 'security', 'sci-fi', 'laser', 'checkpoint', 'analyze'],
  build(c) {
    const col = c.color('#44ffd2');
    const light = c.lighten(col, 0.6);
    const T = 1.6, half = 0.8, bottom = 6, top = 106;
    // a ring that lies flat: side-on 'ellipse' in 2D, a flat ring in 3D that keeps its own height
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the sweep's motion: every part of one sweep gets the same push and speed limit, so they travel together
    const move = (s) => [c.force(0, 900 * s), c.limitSpeed(115, 1)];
    const edge = [[0, 0], [1, 0.08], [1, 0.9], [0, 1]];
    // one sweep: s = 1 rises from the bottom at time 0, s = -1 comes down from the top half a cycle later
    const sweep = (s) => {
      const at = { loop: true, duration: T, bursts: [{ time: s > 0 ? 0 : half }], offset: [0, s > 0 ? bottom : top], speed: 0 };
      return [
        // the line of light: a row of glows on a flat line in 2D; in 3D a disc of light lying flat (a scanning plane)
        c.is3d
          ? c.sys(c.flat(Object.assign({}, at, { tex: 'glow', blend: 'add', bursts: [{ time: at.bursts[0].time, count: 1 }], life: half, size: 104, color: col,
            behaviors: move(s).concat([c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], edge.map(([a, t]) => [a * 0.7, t])))]), order: 2 }), { snap: false }))
          : c.sys(Object.assign({}, at, { tex: 'glow', blend: 'add', bursts: [{ time: at.bursts[0].time, count: 32 }], shape: { type: 'rect', w: 100, h: 0, even: true },
            life: half, size: 22, color: col, behaviors: move(s).concat([c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], edge.map(([a, t]) => [a * 0.55, t])))]), order: 2 })),
        ring(Object.assign({}, at, { blend: 'add', bursts: [{ time: at.bursts[0].time, count: 1 }], life: half, size: 108, color: light,
          behaviors: move(s).concat([c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], edge))]), order: 3 })),
        // sparkles riding the beam, winking out along the way
        c.sys(c.ground(Object.assign({}, at, { tex: 'spark', blend: 'add', bursts: [{ time: at.bursts[0].time, count: [6, 8] }],
          shape: c.is3d ? { type: 'circle', radius: 50 } : { type: 'rect', w: 96, h: 0 },
          life: [0.2, 0.8], size: [8, 14], rotation: [0, 0.8], color: ['#ffffff', light],
          behaviors: move(s).concat([c.sizeOverLife(c.pop(0.25, 0.6))]), order: 4 }))),
      ];
    };
    // the column and the pad are re-laid at the start of each cycle and live a little longer than it, fading in and
    // out, so each copy cross-fades into the next; on stop() the scan finishes its pass and everything ends with it
    const hum = (a, b) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.04], [b, 0.25], [a, 0.5], [b, 0.75], [a, 0.96], [0, 1]]));
    return [
      // a soft column of light over the scanned area
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: T, bursts: [{ count: 1 }], life: T + 0.06, size: 150, offset: [0, 56], color: col,
        behaviors: [hum(0.14, 0.2)], order: 0 }),
      // the scanner pad at the base
      ring({ blend: 'add', loop: true, duration: T, bursts: [{ count: 1 }], life: T + 0.06, size: 112, color: col,
        behaviors: [hum(1, 0.6)], order: 1 }),
      ...sweep(1), ...sweep(-1),
    ];
  },
};
