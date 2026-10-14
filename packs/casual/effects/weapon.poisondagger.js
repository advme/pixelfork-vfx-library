/** A poisoned blade: venom drops swell on it and fall off, toxic bubbles rise and pop, and a sickly green glow and vapour hang around it. Loops until stopped. */
export default {
  name: 'weapon.poisondagger',
  category: 'weapon',
  whenToUse: 'A weapon is coated in poison or venom while it is held or swung: a poisoned dagger, a venom blade, an acid sword, a toxic spear or arrowhead, a plague staff, a poison buff on the hero\'s weapon. Play it on the blade with follow; stop it when the coating wears off. For a poisoned character use state.poison, and for a poison splash landing magic.poison.',
  duration: 1, loop: true, tint: '#7ee83a',
  tags: ['poison', 'venom', 'toxic', 'acid', 'dagger', 'enchanted', 'weapon', 'drip'],
  build(c) {
    const col = c.color('#7ee83a');
    const light = c.lighten(col, 0.5);
    return [
      // a sickly green glow, breathing
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, bursts: [{ count: 1 }], life: 1, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.65, 0.5], [0.45, 1]]))], order: 0 }),
      // glowing toxic fumes curling up off the blade
      c.sys({ tex: 'puff', blend: 'add', loop: true, world: true, rate: 5, shape: { type: 'circle', radius: 12 },
        speed: [5, 20], life: [0.8, 1.2], size: [24, 36], rotation: [0, 6.28], color: col,
        behaviors: [c.force(0, 50), c.noise(1.5, 10), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.3, 0.3], [0, 1]]))], order: 1 }),
      // glowing toxic motes
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 12, shape: { type: 'circle', radius: 14 },
        speed: [5, 25], life: [0.4, 0.7], size: [4, 8], color: [light, col],
        behaviors: [c.force(0, 60), c.noise(2, 8), c.colorOverLife(c.fade(0.4))], order: 2 })),
      // venom drops: each swells on the blade for a moment, then lets go and falls
      c.sys({ tex: 'drop', blend: 'normal', loop: true, world: true, rate: 4, shape: { type: 'circle', radius: 12 },
        speed: 0, life: [0.6, 0.8], size: [13, 18], color: [light, col],
        behaviors: [c.gravity(1100), c.limitSpeed([[0, 0], [0.35, 0], [0.4, 1400], [1, 1400]], 1),
          c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.9]])), c.colorOverLife(c.fade(0.85))], order: 3 }),
      // bubbles rising and popping
      c.sys(c.vol({ tex: 'ring', blend: 'normal', loop: true, world: true, rate: 8, shape: { type: 'circle', radius: 14 },
        speed: [10, 30], life: [0.6, 1.0], size: [9, 16], color: light,
        behaviors: [c.force(0, 110), c.limitSpeed(80, 1), c.noise(2, 8), c.sizeOverLife(c.curve([[0, 0.3], [0.8, 1], [0.92, 1.35], [1, 0]])),
          c.colorOverLife(c.fade(0.85))], order: 4 })),
    ];
  },
};
