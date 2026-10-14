/** A flaming sword: fire licks up the blade with a white-hot core, a hot glow breathes around it, and flames and embers trail behind every swing. Loops until stopped. */
export default {
  name: 'weapon.flamesword',
  category: 'weapon',
  whenToUse: 'A weapon is on fire or fire-enchanted while it is held or swung: a flaming sword, a fire axe, a burning spear or club, a fire buff on the hero\'s blade. Play it on the blade with follow so flames and embers trail behind each swing; stop it when the enchantment ends. For a whole character on fire use state.burning, for a fireball in flight magic.fire, and for the blow landing hit.elementfire.',
  duration: 1, loop: true, tint: '#ff7a1f',
  tags: ['flaming sword', 'fire', 'enchanted', 'blade', 'weapon', 'burning', 'embers', 'buff'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.55);
    const hot = c.lighten(col, 0.85);
    return [
      // a hot glow breathing around the blade
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, bursts: [{ count: 1 }], life: 1, size: 95, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.05], [1, 0.85]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.4, 0], [0.6, 0.5], [0.4, 1]]))], order: 0 }),
      // a wisp of dark smoke curling off the top
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 4, shape: { type: 'circle', radius: 10 }, offset: [0, 26],
        speed: [10, 30], life: [0.7, 1.0], size: [18, 28], rotation: [0, 6.28], color: ['#555555', '#333333'],
        behaviors: [c.force(0, 90), c.noise(1.5, 10), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.35, 0.25], [0, 1]]))], order: 1 }),
      // flames licking up the blade; they stay in the air where they were born, so a swing leaves a fiery trail
      c.sys(c.vol({ tex: 'flame', blend: 'add', loop: true, world: true, rate: 50, shape: { type: 'circle', radius: 16 },
        speed: [10, 40], life: [0.3, 0.5], size: [22, 36], rotation: [-0.3, 0.3], color: [light, col],
        behaviors: [c.force(0, 240), c.limitSpeed(200, 1), c.noise(3, 10), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0]])),
          c.colorOverLife(c.fade(0.45))], order: 2 })),
      // the white-hot core hugging the blade
      c.sys({ tex: 'flame', blend: 'add', loop: true, rate: 26, shape: { type: 'circle', radius: 9 },
        speed: [5, 20], life: [0.18, 0.28], size: [14, 22], color: hot,
        behaviors: [c.force(0, 200), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 }),
      // embers drifting up and trailing behind
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 16, shape: { type: 'circle', radius: 14 },
        speed: [30, 90], life: [0.5, 0.9], size: [3, 6], color: [hot, light],
        behaviors: [c.force(0, 160), c.noise(4, 16), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 4 })),
    ];
  },
};
