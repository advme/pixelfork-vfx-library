/** A cartoon puff explosion: fire balls, a bright core, smoke and sparks. */
export default {
  name: 'explosion.small',
  category: 'explosion',
  whenToUse: 'A small thing blows up: a barrel, an enemy, a car crash, a bomb, a rocket landing. About 150px wide.',
  duration: 1.0,
  loop: false,
  tint: null,
  tags: ['explosion', 'blast', 'boom', 'bomb', 'destroy'],
  build(c) {
    const fire = c.tint
      ? c.grad([[c.lighten(c.tint, 0.8), 0], [c.tint, 0.3], [c.darken(c.tint, 0.6), 1]], [[1, 0], [1, 0.6], [0, 1]])
      : c.grad([['#fff4b0', 0], ['#ffb330', 0.3], ['#ff5a1f', 0.65], ['#4a2418', 1]], [[1, 0], [1, 0.6], [0, 1]]);
    const smoke = c.grad([['#8d8d8d', 0], ['#5a5a5a', 1]], [[0, 0], [0.75, 0.15], [0.5, 0.6], [0, 1]]);
    return [
      // core flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 190, color: '#fff7c8',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      // fire balls
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 11] }], shape: { type: 'circle', radius: 12 },
        speed: [90, 220], life: [0.35, 0.55], size: [45, 75], rotation: [0, 6.28],
        behaviors: [c.colorOverLife(fire), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.15]])), c.speedOverLife(c.decel(0.1)), c.spin(-2, 2)], order: 2 })),
      // smoke behind, rises slowly
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.1, count: [6, 8] }], shape: { type: 'circle', radius: 16 },
        speed: [40, 120], life: [0.7, 1.0], size: [55, 95], rotation: [0, 6.28],
        behaviors: [c.colorOverLife(smoke), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.speedOverLife(c.decel(0.2)), c.force(0, 70), c.spin(-1.5, 1.5)], order: 1 })),
      // sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 20] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [300, 700], life: [0.3, 0.6], size: [6, 10], color: ['#fff2a8', c.tint ? c.tint : '#ffb330'],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 4 })),
      // debris chunks
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [5, 8] }], shape: { type: 'circle', radius: 6 },
        speed: [250, 500], life: [0.6, 0.9], size: [7, 12], rotation: [0, 6.28], color: ['#5a3a2a', '#2e1d15'],
        behaviors: [c.gravity(1500), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 4 })),
    ];
  },
};
