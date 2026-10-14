/** A GREAT note: a bright flash, two rings bursting out, white streaks, sparkles and a few stars, with a glint on top. Bigger than reward.good, smaller than reward.perfect. */
export default {
  name: 'reward.great',
  category: 'reward',
  whenToUse: 'A GREAT rating in a rhythm or timing game: a note hit just off perfect, a very good tap, release or landing. Play it where the note was hit. For a PERFECT hit use reward.perfect, for a weaker GOOD hit use reward.good, for a miss use ui.miss.',
  duration: 0.6, loop: false, tint: '#3fe87f',
  tags: ['great', 'rating', 'rhythm', 'timing', 'note', 'judgement', 'music', 'reward'],
  build(c) {
    const col = c.color('#3fe87f');
    const light = c.lighten(col, 0.6);
    const out = () => c.sizeOverLife(c.curve([[0, 0.12], [0.45, 0.85], [1, 1]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.55]])), c.colorOverLife(c.fade(0.15))], order: 0 }),
      // two rings, the coloured one first and a white one just behind it
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.42, size: 230, color: col,
        behaviors: [out(), c.colorOverLife(c.fade(0.35))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.05, count: 1 }], life: 0.36, size: 170, color: '#ffffff',
        behaviors: [out(), c.colorOverLife(c.fade(0.25))], order: 2 }),
      // short white streaks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 12, thickness: 0 },
        speed: [320, 520], life: [0.22, 0.32], size: [4, 6], color: '#ffffff', stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // sparkles
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [9, 11] }], shape: { type: 'circle', radius: 16 },
        speed: [160, 320], life: [0.4, 0.6], size: [12, 20], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.55))], order: 4 })),
      // a few glossy stars that drop a little
      c.sys(c.vol({ tex: 'star', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 14 },
        speed: [220, 380], life: [0.5, 0.65], size: [12, 18], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(400), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.5], [0.12, 1], [0.75, 1], [1, 0]]))], order: 5 })),
      // the glint on top
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 180, rotation: 0.4, color: '#ffffff',
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 6 }),
    ];
  },
};
