/** A chest opening: golden light rays, sparkles and coins jumping out. */
export default {
  name: 'reward.chest',
  category: 'reward',
  whenToUse: 'A chest, crate, gift box, egg or loot bag opens. Play on the box; the rays shine upward.',
  duration: 1.4,
  loop: false,
  tint: '#ffc93c',
  tags: ['chest', 'loot', 'gift', 'open', 'rays', 'box', 'egg'],
  build(c) {
    const col = c.color('#ffc93c');
    const light = c.lighten(col, 0.7);
    return [
      // rays: a stretched particle draws its streak BEHIND its motion, so these
      // crawl downward at 3px/s and the long streaks fan upward from the chest
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 9 }], shape: { type: 'cone', radius: 4, angle: 0.9, even: true }, dir: -Math.PI / 2,
        speed: [2, 4], life: [0.8, 1.1], size: [16, 26], color: col,
        stretch: { speed: 0, length: 14 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.7, 1], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.8, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.fadeInOut(0.1, 0.4))], order: 0 }),
      // coins jumping out
      c.sys(c.vol({ tex: 'coin', blend: 'normal', bursts: [{ time: 0.05, count: [8, 11] }], shape: { type: 'cone', radius: 10, angle: 0.55 },
        speed: [350, 600], life: [0.8, 1.1], size: [12, 20], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
        behaviors: [c.gravity(1300), c.spin(-8, 8), c.colorOverLife(c.fade(0.8))], order: 3 })),
      c.sys({ tex: 'spark', blend: 'add', rate: 40, duration: 0.8, shape: { type: 'circle', radius: 30 },
        speed: [20, 80], life: [0.5, 0.9], size: [8, 16], color: light,
        behaviors: [c.force(0, 200), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 }),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: [5, 7] }], shape: { type: 'cone', radius: 8, angle: 0.5 },
        speed: [250, 450], life: [0.7, 1.0], size: [14, 24], rotation: [0, 6.28], color: light,
        behaviors: [c.gravity(1000), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
