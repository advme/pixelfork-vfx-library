/** A dust puff at the feet when a character jumps or lands. */
export default {
  name: 'move.jump',
  category: 'move',
  whenToUse: 'A character jumps, lands, or starts running. Play at the feet. Also a soft landing for a dropped object.',
  duration: 0.5,
  loop: false,
  tint: '#e9dcc7',
  tags: ['jump', 'land', 'dust', 'feet', 'run', 'puff'],
  build(c) {
    const col = c.color('#e9dcc7');
    return [
      // puffs spreading sideways
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 9] }], shape: c.is3d ? { type: 'circle', radius: 12, thickness: 0.4 } : { type: 'circle', radius: 12, arc: Math.PI, thickness: 0.4 },
        speed: [120, 260], life: [0.35, 0.55], size: [28, 44], rotation: [0, 6.28],
        color: [col, c.darken(col, 0.15)],
        behaviors: [c.speedOverLife(c.decel(0.05)), c.force(0, 60), c.spin(-2, 2),
          c.sizeOverLife(c.curve([[0, 0.5], [0.35, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))] })),
      // a few grit specks
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: [4, 6] }], shape: c.is3d ? { type: 'circle', radius: 6 } : { type: 'circle', radius: 6, arc: Math.PI },
        speed: [160, 300], life: [0.3, 0.45], size: [4, 6], color: c.darken(col, 0.3),
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.6))] }),
    ];
  },
};
