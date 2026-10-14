/** A PERFECT moment: a big white flash and glint, rainbow rings bursting out one inside the other, and multicolour stars spraying away. */
export default {
  name: 'reward.perfect',
  category: 'reward',
  whenToUse: 'A PERFECT timing moment: a perfect tap or release, a bullseye, a flawless landing or stack, a perfect note in a rhythm game, an exact drop in a timing or stacking hypercasual game. Play it where the perfect action happened. For one step of a combo use reward.combo; for a star earned use reward.starburst.',
  duration: 0.85, loop: false, tint: null,
  tags: ['perfect', 'timing', 'bullseye', 'rhythm', 'flawless', 'rainbow', 'hypercasual', 'reward'],
  build(c) {
    const rainbow = ['#ff4d6d', '#ffd23f', '#4dff9a', '#3dd6ff', '#c77dff'];
    const palette = c.tint ? [c.tint, c.lighten(c.tint, 0.4), c.lighten(c.tint, 0.7)] : rainbow;
    const per = Math.round(25 / palette.length);
    return [
      // the big white flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 280, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.15))], order: 0 }),
      // rainbow rings, one inside the other, fired a moment apart
      ...palette.map((colour, i) => c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: i * 0.04, count: 1 }], life: 0.5, size: 300 - i * 30, color: colour,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [0.5, 0.85], [1, 1]])), c.colorOverLife(c.fade(0.35))], order: 1 })),
      // short white streaks shooting out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 16] }], shape: { type: 'circle', radius: 12, thickness: 0 },
        speed: [380, 620], life: [0.25, 0.4], size: [4, 6], color: '#ffffff', stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.fade(0.4))], order: 2 })),
      // multicolour stars spraying away
      ...palette.map((colour) => c.sys(c.vol({ tex: 'star', blend: 'normal', bursts: [{ count: per }], shape: { type: 'circle', radius: 16 },
        speed: [260, 480], life: [0.6, 0.85], size: [14, 22], rotation: [0, 6.28], color: colour,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(350), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.5], [0.12, 1], [0.75, 1], [1, 0]]))], order: 3 }))),
      // the glint on top
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 240, rotation: 0.4, color: '#ffffff',
        behaviors: [c.spin(2, 2), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
    ];
  },
};
