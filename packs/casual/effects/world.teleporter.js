/** A teleporter pad: a glowing ring on the floor sends rings floating up, streams of light rise from its rim and a soft column of light hums above it. Loops until stopped. */
export default {
  name: 'world.teleporter',
  category: 'world',
  whenToUse: 'A teleporter pad, warp gate on the floor, jump pad to another level, sci-fi elevator or beam-me-up spot stands ready in the level: play it on the pad and leave it running, and play move.teleport on whoever steps in; for a quest marker use world.beacon, for a hologram projector use world.hologram.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#3dffc5',
  tags: ['teleporter', 'pad', 'warp', 'portal', 'sci-fi', 'gate', 'beam', 'level exit'],
  build(c) {
    const col = c.color('#3dffc5');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the pad's rim: a circle on the ground in 3D, a line along the ground in 2D
    const rim = c.is3d ? { type: 'circle', radius: 48, thickness: 0 } : { type: 'rect', w: 96, h: 0 };
    return [
      // a soft column of light humming above the pad
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 160, offset: [0, 70], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.06], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.48, 0.5], [0.3, 1]]))], order: 0 }),
      // the pad ring on the floor, breathing
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 112, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [1, 0.5], [0.7, 1]]))], order: 1 }),
      // rings floating up from the pad, getting smaller and fainter
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }, { time: 0.4, count: 1 }, { time: 0.8, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir: Math.PI / 2,
        speed: 120, life: 1.1, size: 104, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.1], [0.5, 0.6], [0, 1]]))], order: 2 }),
      // streams of light rising from the rim
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 36, shape: rim,
        speed: 0, life: [0.45, 0.65], size: [5, 8], color: ['#ffffff', light], stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.force(0, 700), c.limitSpeed(320, 1), c.colorOverLife(c.fade(0.5))], order: 3 })),
      // sparkles drifting up inside the column
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 7, shape: c.is3d ? { type: 'circle', radius: 32 } : { type: 'rect', w: 64, h: 0 }, offset: [0, 10],
        speed: 0, life: [0.7, 1.1], size: [8, 13], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 200), c.limitSpeed(110, 1), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 })),
    ];
  },
};
