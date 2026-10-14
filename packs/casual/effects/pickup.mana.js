/** Mana restored: blue motes rush into the character and a cool glow pulses outward. */
export default {
  name: 'pickup.mana',
  category: 'pickup',
  whenToUse: 'Mana, energy or stamina is restored: a mana potion, an energy drink, a blue orb picked up, a battery collected, magic power recharged. Play it on the character. For health use pickup.heart or magic.heal.',
  duration: 0.7, loop: false, tint: '#4f8bff',
  tags: ['mana', 'energy', 'stamina', 'potion', 'magic', 'recharge', 'orb', 'pickup', 'rpg'],
  build(c) {
    const col = c.color('#4f8bff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [16, 20] }], shape: { type: 'circle', radius: 80, thickness: 0 },
        speed: [-300, -260], life: [0.26, 0.3], size: [6, 10], color: light, stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.8, 1], [1, 0]]))], order: 2 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.25, count: 1 }], life: 0.35, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.25, count: 1 }], life: 0.4, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.25, count: [6, 8] }], shape: { type: 'circle', radius: 30 },
        speed: [20, 60], life: [0.35, 0.45], size: [10, 15], color: '#ffffff',
        behaviors: [c.force(0, 120), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 })),
    ];
  },
};
