/** A checkpoint reached: a ring sweeps out on the ground, a column of light shoots up and sparkles rain down. */
export default {
  name: 'reward.checkpoint',
  category: 'reward',
  whenToUse: 'The player reaches a checkpoint, a save point, a flag, a respawn point or a goal post. Play it at the checkpoint\'s base. For finishing a whole level use reward.clear.',
  duration: 1.1, loop: false, anchor: 'feet', tint: '#4dff9a',
  tags: ['checkpoint', 'save', 'flag', 'respawn', 'goal', 'platformer', 'progress', 'reward'],
  build(c) {
    const col = c.color('#4dff9a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: 180, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1.2]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 140, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the column of light (raised so the streaks, which reach back as far as forward, start at the ground)
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 4 }, { time: 0.06, count: 3 }, { time: 0.12, count: 2 }], shape: { type: 'cone', radius: 10, angle: 0.03 }, offset: [0, 200],
        speed: [520, 720], life: [0.35, 0.45], size: [30, 42], color: col, stretch: { speed: 0.008, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 2 }, 'up')),
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 3 }], shape: { type: 'cone', radius: 4, angle: 0.02 }, offset: [0, 120],
        speed: [600, 760], life: [0.3, 0.4], size: [12, 16], color: '#ffffff', stretch: { speed: 0.008, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 3 }, 'up')),
      // sparkles thrown up that rain down
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: [14, 18] }], shape: { type: 'cone', radius: 12, angle: 0.4 },
        speed: [300, 520], life: [0.6, 0.9], size: [9, 15], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.gravity(750), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [0.75, 1], [1, 0]]))], order: 4 }, 'up')),
    ];
  },
};
