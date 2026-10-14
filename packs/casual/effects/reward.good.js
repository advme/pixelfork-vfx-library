/** A GOOD note: a small soft flash, one ring and a few sparkles and dots. Quick and light, fine on every note. */
export default {
  name: 'reward.good',
  category: 'reward',
  whenToUse: 'A GOOD rating in a rhythm or timing game: a note hit a little early or late, an okay tap or landing that still counts. Small and quick, safe on every note. For better timing use reward.great or reward.perfect, for a miss use ui.miss.',
  duration: 0.4, loop: false, tint: '#4aa8ff',
  tags: ['good', 'rating', 'rhythm', 'timing', 'note', 'judgement', 'music', 'reward'],
  build(c) {
    const col = c.color('#4aa8ff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.34, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [0.5, 0.85], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 12, thickness: 0, even: true },
        speed: [110, 190], life: [0.32, 0.42], size: [10, 15], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-4, 4), c.sizeOverLife(c.pop(0.2, 0.55))], order: 3 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: 6 }], shape: { type: 'circle', radius: 14, thickness: 0 },
        speed: [160, 240], life: [0.25, 0.35], size: [4, 6], color: light,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 2 })),
    ];
  },
};
