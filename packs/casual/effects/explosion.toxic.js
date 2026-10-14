/** A toxic blast: a sickly green cloud balloons out, bubbles rise through it and slime droplets fly. */
export default {
  name: 'explosion.toxic',
  category: 'explosion',
  whenToUse: 'A gas grenade, a poison bomb, a toxic barrel bursting, a stink bomb, a zombie or mutant exploding, an acid blob popping. Play it at the centre. For a small poison attack use magic.poison.',
  duration: 1.4, loop: false, tint: '#8fe83a',
  tags: ['toxic', 'poison', 'gas', 'acid', 'zombie', 'stink', 'explosion', 'chemical'],
  build(c) {
    const col = c.color('#8fe83a');
    const light = c.lighten(col, 0.5);
    const dark = c.darken(col, 0.35);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 260, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [12, 14] }, { time: 0.1, count: [6, 8] }], shape: { type: 'circle', radius: 24 },
        speed: [100, 260], life: [1.0, 1.35], size: [60, 100], rotation: [0, 6.28], color: [col, dark],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 30), c.spin(-0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.85, 0.1], [0.55, 0.6], [0, 1]]))], order: 1 })),
      c.sys(c.vol({ tex: 'ring', blend: 'normal', bursts: [{ time: 0.1, count: [10, 14] }], shape: { type: 'circle', radius: 60 },
        speed: [20, 60], life: [0.6, 1.0], size: [12, 22], color: light,
        behaviors: [c.force(0, 160), c.limitSpeed(120, 1), c.noise(2, 10), c.sizeOverLife(c.curve([[0, 0.3], [0.7, 1], [0.9, 1.3], [1, 0]])), c.colorOverLife(c.fade(0.8))], order: 3 })),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 12 },
        speed: [300, 560], life: [0.45, 0.7], size: [5, 10], color: [col, light],
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 4 })),
    ];
  },
};
