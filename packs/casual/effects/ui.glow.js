/** A soft pulsing glow behind a button or card. Loops until stopped. */
export default {
  name: 'ui.glow',
  category: 'ui',
  whenToUse: 'Draw the eye to a button or card: Play, Claim, a ready chest, a new item. Play with { el, follow: true }; stop when tapped.',
  duration: 1, loop: true, tint: '#ffd23f',
  tags: ['ui', 'glow', 'pulse', 'attention', 'highlight', 'cta'],
  build(c) {
    const col = c.color('#ffd23f');
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.6, 0.5], [0.35, 1]]))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: { type: 'circle', radius: 60 },
        speed: 0, life: [0.5, 0.8], size: [8, 14], color: c.lighten(col, 0.6),
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.4, 1], [1, 0]]))], order: 1 }),
    ];
  },
};
