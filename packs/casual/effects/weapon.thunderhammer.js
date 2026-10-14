/** A thunder weapon: sparks crackle and jump around it, little lightning bolts flicker on and off, static trails behind it and a blue-white glow flickers. Loops until stopped. */
export default {
  name: 'weapon.thunderhammer',
  category: 'weapon',
  whenToUse: 'A weapon crackles with lightning while it is held or swung: a thunder hammer, a lightning sword, a shock spear, an electric baton or a storm staff, an electric buff on the hero\'s weapon. Play it on the weapon\'s head with follow; stop it when the charge ends. For a whole character being shocked use state.electrified, and for the blow landing hit.elementshock.',
  duration: 1, loop: true, tint: '#7fd8ff',
  tags: ['thunder', 'lightning', 'electric', 'enchanted', 'hammer', 'weapon', 'sparks', 'buff'],
  build(c) {
    const col = c.color('#7fd8ff');
    const light = c.lighten(col, 0.7);
    return [
      // an uneven flicker of blue-white light
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1,
        bursts: [{ count: 1 }, { time: 0.12, count: 1 }, { time: 0.3, count: 1 }, { time: 0.47, count: 1 }, { time: 0.6, count: 1 }, { time: 0.82, count: 1 }],
        life: [0.16, 0.22], size: [100, 130], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 0 }),
      // static left hanging in the air as it swings
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 18, shape: { type: 'circle', radius: 20 },
        speed: [10, 40], life: [0.3, 0.5], size: [3, 6], color: light,
        behaviors: [c.noise(30, 20), c.colorOverLife(c.fade(0.4))], order: 2 })),
      // jagged sparks jumping off: fast streaks shaken by heavy noise
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 60, shape: { type: 'circle', radius: 28 },
        speed: [220, 450], life: [0.05, 0.1], size: [3, 6], color: ['#ffffff', col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.noise(40, 30)], order: 3 })),
      // little bolts flickering on and off around it
      c.sys(c.vol({ tex: 'bolt', blend: 'add', loop: true, rate: 14, shape: { type: 'circle', radius: 32 },
        speed: 0, life: [0.08, 0.15], size: [22, 34], rotation: [-0.8, 0.8], color: [col, light],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1.1], [0.4, 0.8], [0.6, 1.05], [1, 0]]))], order: 4 })),
      // bright glints where the sparks jump
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 5, shape: { type: 'circle', radius: 22 },
        speed: 0, life: [0.08, 0.14], size: [20, 34], rotation: [0, 1.6], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]]))], order: 5 }),
    ];
  },
};
