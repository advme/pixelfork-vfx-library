/** A heavy landing: a ring of dust bursting sideways, chips of ground. */
export default {
  name: 'move.land',
  category: 'move',
  whenToUse: 'A big landing, a ground pound, a heavy object dropped, a stomp. Wider and flatter than move.jump.',
  duration: 0.7,
  loop: false,
  tint: '#e9dcc7',
  tags: ['land', 'stomp', 'ground pound', 'heavy', 'drop', 'shockwave'],
  build(c) {
    const col = c.color('#e9dcc7');
    const side = (dir) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 6, angle: 0.25 }, dir,
      speed: [220, 420], life: [0.4, 0.6], size: [26, 44], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
      behaviors: [c.speedOverLife(c.decel(0.05)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.2]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))], order: 1 });
    // 3D: one ring of puffs rolling outward over the floor, in every direction
    const puffs = c.is3d
      ? [c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 8, thickness: 0 },
          speed: [220, 400], life: [0.4, 0.6], size: [26, 44], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
          behaviors: [c.speedOverLife(c.decel(0.05)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.2]])),
            c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))], order: 1 }))]
      : [side(0.15), side(Math.PI - 0.15)];
    return [
      ...puffs,
      c.sys(c.flat({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.35, size: 160, color: c.lighten(col, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 })),
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 12] }], shape: c.is3d ? { type: 'circle', radius: 8 } : { type: 'circle', radius: 8, arc: Math.PI },
        speed: [200, 420], life: [0.35, 0.55], size: [4, 7], color: c.darken(col, 0.3),
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.6))], order: 2 }),
    ];
  },
};
