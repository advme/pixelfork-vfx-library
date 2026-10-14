/** A holy weapon: a soft golden glow and a cross-shaped glint shine on it, a halo ring breathes out, golden motes rise from it and sparkles twinkle. Loops until stopped. */
export default {
  name: 'weapon.holyspear',
  category: 'weapon',
  whenToUse: 'A weapon is holy, blessed or full of light while it is held or swung: a holy spear, a paladin\'s sword, a light lance, an angel\'s blade, a sacred staff, a legendary weapon shining. Play it on the weapon with follow; stop it when the blessing ends. For a holy spell burst use magic.holy, and for a blessing on a character magic.buff.',
  duration: 1.2, loop: true, tint: '#ffd84d',
  tags: ['holy', 'blessed', 'light', 'divine', 'spear', 'enchanted', 'weapon', 'legendary'],
  build(c) {
    const col = c.color('#ffd84d');
    const light = c.lighten(col, 0.6);
    return [
      // a soft golden glow breathing
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.08], [1, 0.9]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.5, 0.5], [0.3, 1]]))], order: 0 }),
      // a halo ring breathing out once a cycle
      c.sys({ tex: 'ring', blend: 'add', loop: true, cut: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [1, 1.1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.25], [0, 1]]))], order: 0 }),
      // a cross-shaped holy glint, pulsing
      c.sys({ tex: 'spark', blend: 'add', loop: true, cut: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 66, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.1], [1, 0.85]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.8, 0.5], [0.5, 1]]))], order: 1 }),
      // golden light motes rising off the weapon
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 18, shape: { type: 'circle', radius: 22 },
        speed: [5, 25], life: [0.8, 1.2], size: [5, 9], color: [light, col],
        behaviors: [c.force(0, 90), c.limitSpeed(70, 1), c.noise(1.5, 10), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]))], order: 2 })),
      // white sparkles twinkling around it
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, world: true, rate: 7, shape: { type: 'circle', radius: 24 },
        speed: [5, 20], life: [0.4, 0.6], size: [8, 14], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 40), c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 })),
    ];
  },
};
