/** Thinking: three outlined thought bubbles pop up one after another over the head, small to big, drift up a little and pop away in turn. Loops until stopped. */
export default {
  name: 'state.thinking',
  category: 'state',
  whenToUse: 'A character is thinking, pondering, waiting or loading: an NPC deciding, a customer choosing an order, an AI opponent taking its turn, a pet wondering, a puzzle hint about to appear. Follow the head; stop it when they decide. For sleeping or idling use state.sleep.',
  duration: 1.8, loop: true, anchor: 'head', tint: '#ffffff',
  tags: ['thinking', 'thought', 'bubble', 'ponder', 'waiting', 'loading', 'idea', 'emotion'],
  build(c) {
    const col = c.color('#ffffff');
    const edge = c.mix(col, '#3d4a6b', 0.65);
    // fill and outline share every value (no randomness, no noise) so they move as one bubble
    const bubble = (x, y, size, t) => {
      const base = { loop: true, duration: 1.8, bursts: [{ time: t, count: 1 }], offset: [x, y], life: 1.1 };
      const life = () => [c.force(0, 14), c.sizeOverLife(c.curve([[0, 0], [0.1, 1.25], [0.18, 0.92], [0.25, 1], [0.86, 1], [0.93, 1.15], [1, 0]]))];
      return [
        c.sys(Object.assign({}, base, { tex: 'disc', blend: 'normal', size: size * 0.92, color: col, behaviors: life(), order: 2 })),
        c.sys(Object.assign({}, base, { tex: 'ring', blend: 'normal', size, color: edge, behaviors: life(), order: 3 })),
      ];
    };
    return [
      ...bubble(10, 4, 13, 0),
      ...bubble(24, 20, 19, 0.25),
      ...bubble(43, 44, 30, 0.5),
      // a soft glow behind the big bubble and a twinkle as it lands
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.8, bursts: [{ time: 0.5, count: 1 }], offset: [43, 46], life: 1.1, size: 72, color: col,
        behaviors: [c.force(0, 14), c.sizeOverLife(c.pop(0.12, 0.85)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.35, 0.15], [0.25, 0.8], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 1.8, bursts: [{ time: 0.55, count: 2 }], shape: { type: 'circle', radius: 18, thickness: 0 }, offset: [43, 46],
        speed: [10, 25], life: [0.35, 0.45], size: [8, 11], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 }),
    ];
  },
};
