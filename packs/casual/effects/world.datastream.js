/** Data flowing: columns of small bright squares stream upward out of a glowing port, blinking as they go, over a soft column of light. Loops until stopped. */
export default {
  name: 'world.datastream',
  category: 'world',
  whenToUse: 'Data streams upward in a cyber world (a server rack, a data pillar or terminal, a cyberspace level, a computer core, an upload in progress, a hacker hideout): play it at the base and leave it running; for a hologram projector use world.hologram, for a teleporter pad use world.teleporter.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#38e8ff',
  tags: ['data', 'cyber', 'digital', 'stream', 'server', 'matrix', 'computer', 'sci-fi'],
  build(c) {
    const col = c.color('#38e8ff');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // one column of squares; each square blinks on its way up (two blink patterns so columns differ)
    const blinks = [
      [[0, 0], [0.06, 1], [0.4, 1], [0.43, 0.3], [0.48, 1], [0.8, 1], [1, 0]],
      [[0, 0], [0.06, 1], [0.6, 1], [0.63, 0.3], [0.68, 1], [0.85, 1], [1, 0]],
    ];
    const column = (x, rate, k) => c.sys({ tex: 'pixel', blend: 'add', loop: true, rate, dir: Math.PI / 2, shape: { type: 'cone', radius: 0.5, angle: 0.001 }, offset: [x, 6],
      speed: [105, 140], life: [1.0, 1.3], size: [6, 9], color: [col, '#ffffff'],
      behaviors: [c.sizeOverLife(c.curve(blinks[k % 2])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [1, 0.6], [0, 1]]))], order: 2 });
    // the glows are re-laid at the start of each cycle only (so nothing new appears after stop()), live a little
    // longer than the cycle and fade in and out, so each copy cross-fades into the next; they switch off on stop()
    const breathe = (lo, hi) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [lo, 0.05], [hi, 0.5], [lo, 0.95], [0, 1]]));
    const steady = (p) => Object.assign({ blend: 'add', loop: true, cut: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.26 }, p);
    return [
      // the soft column of light the data runs through
      c.sys(steady({ tex: 'glow', size: 170, offset: [0, 80], color: col, behaviors: [breathe(0.16, 0.24)], order: 0 })),
      // the glowing port the streams come out of, and its hot centre
      ring(steady({ size: 112, color: col, behaviors: [breathe(0.75, 1)], order: 1 })),
      c.sys(steady({ tex: 'glow', size: 70, offset: [0, 4], color: light, behaviors: [breathe(0.5, 0.8)], order: 1 })),
      column(-40, 6, 0), column(-20, 8, 1), column(0, 7, 0), column(20, 8, 1), column(40, 6, 0),
    ];
  },
};
