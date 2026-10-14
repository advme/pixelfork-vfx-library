/** A star collected: the star pops big and spins away upward while sparkles burst and a ring flashes. */
export default {
  name: 'pickup.star',
  category: 'pickup',
  whenToUse: 'A star is collected: level stars, a platformer collectible, a rating star earned in play, a bonus star. Play it where the star was. For the 1-3 stars on a results screen use ui.star.',
  duration: 0.65, loop: false, tint: '#ffd23a',
  tags: ['star', 'collect', 'collectible', 'platformer', 'bonus', 'pickup', 'shiny'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    return [
      c.sys(c.spray({ tex: 'star', blend: 'normal', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, speed: 160, life: 0.55, size: 40, color: col,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(8, 8), c.sizeOverLife(c.curve([[0, 1], [0.2, 1.5], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 8, thickness: 0, even: true },
        speed: [140, 220], life: [0.35, 0.5], size: [10, 15], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.pop(0.15, 0.5))], order: 3 })),
    ];
  },
};
