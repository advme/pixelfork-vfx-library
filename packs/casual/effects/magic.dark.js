/** Dark magic: purple-black wisps curling up, a violet flash. */
export default {
  name: 'magic.dark',
  category: 'magic',
  whenToUse: 'A curse, a shadow attack, a necromancer spell, a ghost appearing, something evil activating.',
  duration: 1.1,
  loop: false,
  tint: '#8a3fff',
  tags: ['dark', 'shadow', 'curse', 'evil', 'ghost', 'necro', 'purple'],
  build(c) {
    const col = c.color('#8a3fff');
    const light = c.lighten(col, 0.5);
    return [
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 11] }], shape: { type: 'circle', radius: 16 },
        speed: [40, 140], life: [0.7, 1.0], size: [40, 70], rotation: [0, 6.28], color: [c.darken(col, 0.6), c.darken(col, 0.85)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 120), c.noise(1.5, 12), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.7, 0.5], [0, 1]]))], order: 1 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 20 },
        speed: [30, 100], life: [0.6, 1.0], size: [8, 16], color: [light, col],
        behaviors: [c.force(0, 160), c.noise(2, 14), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 3 })),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 })),
    ];
  },
};
