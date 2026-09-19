/** A poison burst: green bubbles rising and popping, a toxic puff. */
export default {
  name: 'magic.poison',
  category: 'magic',
  whenToUse: 'A poison attack, an acid splash, a toxic barrel breaks, a swamp bubble pops. For an ongoing poisoned status use state.poison.',
  duration: 1.0,
  loop: false,
  tint: '#7ee83a',
  tags: ['poison', 'acid', 'toxic', 'bubbles', 'slime', 'gas'],
  build(c) {
    const col = c.color('#7ee83a');
    const light = c.lighten(col, 0.5);
    return [
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 14 },
        speed: [50, 140], life: [0.6, 0.9], size: [40, 64], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 60), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      // bubbles: grow, wobble up, pop
      c.sys(c.vol({ tex: 'ring', blend: 'normal', bursts: [{ count: [8, 12] }, { time: 0.15, count: [4, 6] }], shape: { type: 'circle', radius: 24 },
        speed: [20, 70], life: [0.5, 0.9], size: [10, 22], color: light,
        behaviors: [c.force(0, 180), c.limitSpeed(140, 1), c.noise(2, 8), c.sizeOverLife(c.curve([[0, 0.3], [0.7, 1], [0.9, 1.3], [1, 0]])), c.colorOverLife(c.fade(0.8))], order: 3 })),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 10 },
        speed: [200, 420], life: [0.4, 0.6], size: [5, 10], color: [col, light],
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.6))], order: 2 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
    ];
  },
};
