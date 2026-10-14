/** On a win streak: a hot flash and rings, a burst of flames roaring upward and embers flying high. */
export default {
  name: 'reward.streak',
  category: 'reward',
  whenToUse: 'A win streak or hot streak: the player is "on fire", several wins or perfect hits in a row, a kill streak, the streak counter going up. Play it on the streak counter or the character. For one step of a combo use reward.combo; for something that keeps burning use state.burning.',
  duration: 1.05, loop: false, tint: '#ff7a1f',
  tags: ['streak', 'on fire', 'hot streak', 'win streak', 'kill streak', 'fire', 'flames', 'reward'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.5);
    const hot = c.lighten(col, 0.8);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the hot ring, then a wider orange one
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 180, color: hot,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.06, count: 1 }], life: 0.45, size: 260, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.25))], order: 1 }),
      // the burst of flames roaring up
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: 12 }, { time: 0.08, count: 8 }, { time: 0.16, count: 6 }], shape: { type: 'cone', radius: 18, angle: 0.55 },
        speed: [140, 300], life: [0.45, 0.7], size: [50, 78], rotation: [-0.3, 0.3], color: [light, col],
        behaviors: [c.force(0, 400), c.limitSpeed(420, 1), c.noise(3, 10), c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [0.6, 0.85], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 }, 'up')),
      // the white-hot core of the flames
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: 8 }, { time: 0.1, count: 5 }], shape: { type: 'cone', radius: 10, angle: 0.3 },
        speed: [120, 240], life: [0.35, 0.5], size: [32, 46], rotation: [-0.2, 0.2], color: hot,
        behaviors: [c.force(0, 400), c.limitSpeed(380, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.45))], order: 3 }, 'up')),
      // embers thrown up high
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: 14 }, { time: 0.12, count: 8 }], shape: { type: 'circle', radius: 12 },
        speed: [150, 320], life: [0.6, 0.95], size: [4, 7], color: [hot, light],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.force(0, 260), c.noise(3, 25), c.colorOverLife(c.fade(0.5))], order: 4 })),
    ];
  },
};
