/** A chain reaction: four small fiery pops go off one after another around the point, then a bigger last one, each with sparks and a puff of smoke. */
export default {
  name: 'explosion.chain',
  category: 'explosion',
  whenToUse: 'A chain reaction: a row of barrels or mines going off in turn, a cluster bomb, a big machine, tank or boss breaking apart before it dies, a string of firecrackers. Play it once at the centre; five pops ripple around it over half a second. For one single blast use explosion.small or explosion.big.',
  duration: 1.3, loop: false, tint: null,
  tags: ['chain', 'chain reaction', 'cluster', 'multiple', 'firecracker', 'boom', 'boss', 'explosion'],
  build(c) {
    const fire = () => c.colorOverLife(c.tint
      ? c.grad([[c.lighten(c.tint, 0.8), 0], [c.tint, 0.3], [c.darken(c.tint, 0.6), 1]], [[1, 0], [1, 0.6], [0, 1]])
      : c.grad([['#fff4b0', 0], ['#ffb330', 0.3], ['#ff5a1f', 0.65], ['#4a2418', 1]], [[1, 0], [1, 0.6], [0, 1]]));
    const sparkCol = c.tint ? c.lighten(c.tint, 0.5) : c.rgb('#ffc04a');
    // [x, y, time, scale]: the pops ripple around the point, the last one in the middle and biggest.
    // Every part of a pop stays in the camera-facing plane, so in 3D they sit around the point just as on screen.
    const pops = [[-70, 12, 0, 0.95], [56, 46, 0.12, 1], [-24, -50, 0.24, 1.05], [74, -26, 0.36, 1.1], [-4, 18, 0.5, 1.45]];
    const pop = ([x, y, t, s]) => [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: 1 }], life: 0.18, size: 140 * s, offset: [x, y], color: '#fff3c4',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ time: t, count: [5, 7] }], shape: { type: 'circle', radius: 8 * s }, offset: [x, y],
        speed: [60 * s, 160 * s], life: [0.3, 0.45], size: [30 * s, 50 * s], rotation: [0, 6.28],
        behaviors: [fire(), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.15]])), c.speedOverLife(c.decel(0.1)), c.spin(-2, 2)], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: t, count: [6, 8] }], shape: { type: 'circle', radius: 6, thickness: 0 }, offset: [x, y],
        speed: [220 * s, 460 * s], life: [0.25, 0.4], size: [4, 7], color: ['#fff2a8', sparkCol], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(800), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 5 }),
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ time: t + 0.06, count: [2, 3] }], shape: { type: 'circle', radius: 12 * s }, offset: [x, y],
        speed: [20, 60], life: [0.5, 0.65], size: [40 * s, 62 * s], rotation: [0, 6.28], color: ['#8d8d8d', '#5a5a5a'],
        behaviors: [c.force(0, 80), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.15], [0.5, 0.6], [0, 1]]))], order: 1 }),
    ];
    return [
      ...pops.flatMap(pop),
      // the last, biggest pop sends out a ring
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.5, count: 1 }], life: 0.3, size: 230, offset: [-4, 18], color: c.tint ? c.lighten(c.tint, 0.5) : c.rgb('#ffd28a'),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 3 }),
      // bits of the thing breaking apart
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ time: 0.24, count: [3, 4] }, { time: 0.5, count: [5, 6] }], shape: { type: 'circle', radius: 20 },
        speed: [260, 520], life: [0.55, 0.8], size: [7, 12], rotation: [0, 6.28], color: ['#5a3a2a', '#2e1d15'],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 5 })),
    ];
  },
};
