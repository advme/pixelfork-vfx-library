/** Two items merge into one: sparkles rush inward, a bright pop, a ring and stars burst out. */
export default {
  name: 'puzzle.merge',
  category: 'puzzle',
  whenToUse: 'Two or more items combine into a better one: a merge game (2048, merge dragons, suika), fusing, crafting two things together, a level-up of a unit. Play it where the new item appears; tint it with the new item\'s colour.',
  duration: 0.7, loop: false, tint: '#ffc23a',
  tags: ['merge', 'combine', 'fuse', '2048', 'suika', 'upgrade', 'puzzle', 'craft'],
  build(c) {
    const col = c.color('#ffc23a');
    const light = c.lighten(col, 0.6);
    return [
      // sparkles rushing in
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [16, 20] }], shape: { type: 'circle', radius: 80, thickness: 0 },
        speed: [-300, -240], life: [0.24, 0.28], size: [6, 10], color: light,
        stretch: { speed: 0.02, length: 1.5 }, behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.7, 1], [1, 0]]))], order: 3 })),
      // the pop
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.24, count: 1 }], life: 0.28, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.24, count: 1 }], life: 0.16, size: 80, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ time: 0.24, count: 1 }], life: 0.38, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.24, count: [6, 8] }], shape: { type: 'circle', radius: 12 },
        speed: [160, 300], life: [0.35, 0.45], size: [12, 18], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.5))], order: 5 })),
    ];
  },
};
