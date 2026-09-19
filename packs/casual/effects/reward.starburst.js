/** One big star that pops with rays, then a shower of small stars. */
export default {
  name: 'reward.starburst',
  category: 'reward',
  whenToUse: 'A star is earned, a perfect score, a combo milestone, a badge unlocked. Punchier than pickup.sparkle.',
  duration: 1.0,
  loop: false,
  tint: '#ffd23f',
  tags: ['star', 'burst', 'perfect', 'badge', 'score', 'reward'],
  build(c) {
    const col = c.color('#ffd23f');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1.1], [0.35, 1], [0.75, 1], [1, 0]])), c.colorOverLife(c.fade(0.7))], order: 4 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 260, color: light, rotation: 0.4,
        behaviors: [c.spin(1), c.sizeOverLife(c.curve([[0, 0.2], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ time: 0.1, count: [10, 14] }], shape: { type: 'circle', radius: 10 },
        speed: [200, 420], life: [0.5, 0.8], size: [10, 20], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.spin(-6, 6), c.gravity(700), c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 5 }),
    ];
  },
};
