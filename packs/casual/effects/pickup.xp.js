/** Experience orbs drifting up and fading: XP, mana, energy. */
export default {
  name: 'pickup.xp',
  category: 'pickup',
  whenToUse: 'Experience, mana, energy or souls are gained. Soft orbs float up from the point. Tint to the resource colour.',
  duration: 0.9,
  loop: false,
  tint: '#a06bff',
  tags: ['xp', 'experience', 'mana', 'energy', 'orb', 'soul', 'gain'],
  build(c) {
    const col = c.color('#a06bff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 14 },
        speed: [30, 90], life: [0.6, 0.9], size: [12, 22], color: [light, col],
        behaviors: [c.force(0, 220), c.limitSpeed(200, 1), c.noise(1.5, 10), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 80, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [5, 8] }], shape: { type: 'circle', radius: 12 },
        speed: [30, 90], life: [0.5, 0.8], size: [6, 12], color: light,
        behaviors: [c.force(0, 180), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 }),
    ];
  },
};
