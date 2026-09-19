/** A critical hit: red-orange, bigger, with a double ring and spinning stars. */
export default {
  name: 'hit.crit',
  category: 'hit',
  whenToUse: 'A critical hit, a super move landing, a weak-point strike, a headshot. Louder than hit.impact.',
  duration: 0.6,
  loop: false,
  tint: '#ff5a4a',
  tags: ['critical', 'crit', 'big hit', 'super', 'headshot', 'combo'],
  build(c) {
    const col = c.color('#ff5a4a');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 140, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.3, size: 180, color: col, rotation: [0, 6.28],
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0.2], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.1, count: 1 }], life: 0.4, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [16, 22] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [450, 900], life: [0.25, 0.45], size: [7, 12], color: [light, col],
        stretch: { speed: 0.025, length: 1.5 },
        behaviors: [c.gravity(600), c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 }),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 6 },
        speed: [250, 450], life: [0.4, 0.6], size: [16, 26], rotation: [0, 6.28], color: light,
        behaviors: [c.spin(-9, 9), c.gravity(900), c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 1], [0.6, 1], [1, 0]]))], order: 5 }),
    ];
  },
};
