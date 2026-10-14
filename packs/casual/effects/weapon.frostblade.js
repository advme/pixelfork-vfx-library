/** A frost blade: cold mist rolls off the weapon and sinks, snowflakes and frost dust trail behind it, and icy glints twinkle along it. Loops until stopped. */
export default {
  name: 'weapon.frostblade',
  category: 'weapon',
  whenToUse: 'A weapon is enchanted with ice or frost while it is held or swung: a frost sword, an ice axe, a freezing spear, a cold magic staff, an ice buff on the hero\'s blade. Play it on the blade with follow so mist and snowflakes trail behind each swing; stop it when the enchantment ends. For a frozen character use state.frozen, and for the blow landing hit.elementice.',
  duration: 1, loop: true, tint: '#8fe3ff',
  tags: ['frost', 'ice', 'enchanted', 'blade', 'weapon', 'cold', 'snowflake', 'buff'],
  build(c) {
    const col = c.color('#8fe3ff');
    const light = c.lighten(col, 0.7);
    const mist = c.lighten(col, 0.85);
    return [
      // a cold glow around the blade, breathing slowly
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, bursts: [{ count: 1 }], life: 1, size: 95, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.7, 0.5], [0.5, 1]]))], order: 0 }),
      // frost mist rolling off and sinking (cold air falls)
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 10, shape: { type: 'circle', radius: 16 },
        speed: [5, 25], life: [0.6, 0.9], size: [26, 40], rotation: [0, 6.28], color: mist,
        behaviors: [c.force(0, -40), c.noise(1.5, 10), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.55, 0.25], [0, 1]]))], order: 1 }),
      // fine frost dust left in the air
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 24, shape: { type: 'circle', radius: 16 },
        speed: [10, 40], life: [0.4, 0.8], size: [3, 6], color: [light, '#ffffff'],
        behaviors: [c.force(0, -60), c.noise(3, 12), c.colorOverLife(c.fade(0.5))], order: 2 })),
      // snowflakes drifting down behind the blade
      c.sys(c.vol({ tex: 'snowflake', blend: 'add', loop: true, world: true, rate: 8, shape: { type: 'circle', radius: 18 },
        speed: [15, 45], life: [0.6, 1.0], size: [12, 18], rotation: [0, 6.28], color: light,
        behaviors: [c.force(0, -70), c.limitSpeed(60, 1), c.spin(-2, 2), c.sizeOverLife(c.pop(0.2, 0.6))], order: 3 })),
      // icy glints twinkling on the blade
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 7, shape: { type: 'circle', radius: 16 },
        speed: 0, life: [0.2, 0.35], size: [16, 26], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.4))], order: 4 }),
    ];
  },
};
