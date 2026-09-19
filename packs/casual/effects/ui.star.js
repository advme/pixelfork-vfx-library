/** A star lights up: flash, ring and a few small stars. For result screens. */
export default {
  name: 'ui.star',
  category: 'ui',
  whenToUse: 'A star on a result screen is earned, a rating star fills, a favourite is marked. Play with { el } on the star.',
  duration: 0.6, loop: false, tint: '#ffd23f',
  tags: ['ui', 'star', 'rating', 'result', 'earn', 'favourite'],
  build(c) {
    const col = c.color('#ffd23f');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 20 },
        speed: [120, 260], life: [0.4, 0.55], size: [10, 16], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.spin(-6, 6), c.gravity(500), c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.15, 0.6))], order: 2 }),
    ];
  },
};
