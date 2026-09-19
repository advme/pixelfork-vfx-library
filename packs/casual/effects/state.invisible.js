/** Invisible or ghostly: a faint shimmer of glints and soft pulses. Loops until stopped. */
export default {
  name: 'state.invisible',
  category: 'state',
  whenToUse: 'A character is invisible, cloaked, a ghost, or phasing. Follow the body (draw the character at low opacity yourself); stop when visible again.',
  duration: 1, loop: true, tint: '#cfe8ff',
  tags: ['invisible', 'cloak', 'ghost', 'phase', 'shimmer', 'status'],
  build(c) {
    const col = c.color('#cfe8ff');
    return [
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 7, shape: { type: 'circle', radius: 30 },
        speed: 0, life: [0.6, 1.0], size: [6, 12], rotation: [0, 1], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.4, 1], [1, 0]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.6, 1]]))], order: 1 })),
      c.sys({ tex: 'ring', blend: 'add', loop: true, rate: 1.2, life: 1.0, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0, 1]]))], order: 0 }),
    ];
  },
};
