/** A nature spell: leaves swirl up around the target, petals burst and green sparkles bloom. */
export default {
  name: 'magic.nature',
  category: 'magic',
  whenToUse: 'A nature, plant or druid spell: growing a plant, a forest blessing, a vine attack, a healing grove, summoning flowers, a spring arrives. Play it on the target or the ground. For pure healing use magic.heal.',
  duration: 1.1, loop: false, tint: '#6cd96a',
  tags: ['nature', 'plant', 'leaf', 'druid', 'grow', 'flower', 'forest', 'spring', 'spell'],
  build(c) {
    const col = c.color('#6cd96a');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 180, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys(c.ground({ tex: 'leaf', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 40, thickness: 0, even: true },
        speed: [30, 60], life: [0.8, 1.0], size: [12, 18], rotation: [0, 6.28], color: [col, c.darken(col, 0.25)],
        behaviors: [c.orbit(4), c.force(0, 220), c.limitSpeed(150, 1), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.75, 1], [1, 0]]))], order: 2 })),
      c.sys(c.vol({ tex: 'petal', blend: 'normal', bursts: [{ time: 0.1, count: [8, 10] }], shape: { type: 'circle', radius: 14 },
        speed: [120, 240], life: [0.6, 0.85], size: [10, 15], rotation: [0, 6.28], color: ['#ffb3d1', '#ffe08a'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(200), c.spin(-6, 6), c.colorOverLife(c.fade(0.7))], order: 3 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 50 },
        speed: [20, 70], life: [0.5, 0.9], size: [8, 14], color: light,
        behaviors: [c.force(0, 120), c.sizeOverLife(c.pop(0.25, 0.6))], order: 4 })),
    ];
  },
};
