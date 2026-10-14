/** Fuel collected: a blue-green glow and ring burst from the item, bubbles of light and quick streaks rise up, a few glints sparkle. */
export default {
  name: 'pickup.fuel',
  category: 'pickup',
  whenToUse: 'Fuel, gas or energy cells are collected in a space, flying or driving game: a fuel canister, a jerry can, an energy cell, a power cell, a battery pack or a fuel orb refilling the tank; play it where the item was or on the ship (for magic mana use pickup.mana, for XP orbs use pickup.xp).',
  duration: 0.6, loop: false, tint: '#2fe6c8',
  tags: ['fuel', 'energy cell', 'battery', 'gas', 'refuel', 'pickup', 'space', 'power'],
  build(c) {
    const col = c.color('#2fe6c8');
    const light = c.lighten(col, 0.6);
    // rising bubbles: no spread, they float up and wobble
    const rise = () => [c.force(0, 420), c.limitSpeed(240, 1), c.noise(4, 6)];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 64, color: '#ffffff',
        behaviors: [c.colorOverLife(c.fade(0.3))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 165, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // bubbles of light: ring outlines and glowing cores
      c.sys(c.vol({ tex: 'ring', blend: 'add', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 26 },
        speed: [20, 60], life: [0.45, 0.6], size: [10, 17], color: light,
        behaviors: rise().concat([c.sizeOverLife(c.pop(0.15, 0.7))]), order: 3 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 24 },
        speed: [20, 60], life: [0.4, 0.6], size: [6, 10], color: [light, col],
        behaviors: rise().concat([c.colorOverLife(c.fade(0.5))]), order: 2 })),
      // quick streaks shooting up
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 20, angle: 0.5 }, dir: Math.PI / 2,
        speed: [260, 420], life: [0.25, 0.4], size: [4, 7], color: ['#ffffff', light], stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 4 }, 'up')),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [4, 6] }], shape: { type: 'circle', radius: 34 },
        speed: [10, 40], life: [0.35, 0.5], size: [10, 15], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 100), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
