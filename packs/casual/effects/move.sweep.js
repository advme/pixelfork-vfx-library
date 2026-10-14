/** A broom sweep: a puff of dust is pushed along the floor one way, with swish lines and a few flicked specks. */
export default {
  name: 'move.sweep',
  category: 'move',
  whenToUse: 'Sweeping, brushing or wiping something clean: a broom stroke in a cleaning or house game, dusting a shelf, clearing snow or leaves, brushing dirt off a find. Play it where the broom meets the floor for each stroke; in 2D set dir (degrees, default right), in 3D pass direction, the way the stroke pushes. For running dust use move.dust; for the sparkle when it is clean use reward.clean.',
  duration: 0.7, loop: false, anchor: 'feet', tint: '#e4d5bd',
  tags: ['sweep', 'broom', 'clean', 'dust', 'brush', 'house', 'chores', 'tidy'],
  build(c) {
    const col = c.color('#e4d5bd');
    const dir = c.dir === undefined ? 0 : c.dir;
    // specks are flicked a little upward, whichever way the stroke goes
    const lift = Math.cos(dir) >= 0 ? 0.35 : -0.35;
    return [
      // a low cloud left where the broom passed
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: 3 }], shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [20, 50], life: [0.5, 0.65], size: [28, 38], rotation: [0, 6.28], color: c.lighten(col, 0.2),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 30), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0.4, 0.5], [0, 1]]))], order: 0 })),
      // the dust pushed along, skimming just above the floor
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 7] }, { time: 0.05, count: [3, 4] }], shape: { type: 'cone', radius: 8, angle: 0.3 }, dir: dir + lift * 0.4, offset: [0, 6],
        speed: [140, 280], life: [0.45, 0.65], size: [18, 30], rotation: [0, 6.28], color: [col, c.darken(col, 0.12)],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 50), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.35, 1], [1, 1.35]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // swish lines along the stroke (raised so the lower ones do not sit under the floor)
      c.sys(c.spray({ tex: 'glow', blend: 'normal', bursts: [{ count: 3 }], shape: { type: 'cone', radius: 14, angle: 0.06 }, dir, offset: [0, 12],
        speed: [340, 420], life: [0.16, 0.22], size: [4, 5], color: '#ffffff', stretch: { speed: 0.012, length: 1.2 },
        behaviors: [c.speedOverLife(c.decel(0.5)), c.colorOverLife(c.fade(0.3))], order: 2 })),
      // specks of dirt flicked ahead (raised a little: a 3D direction along the floor has no upward lift)
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 11] }], shape: { type: 'cone', radius: 6, angle: 0.3 }, dir: dir + lift, offset: [0, 6],
        speed: [200, 380], life: [0.22, 0.34], size: [2, 4], color: [c.darken(col, 0.35), c.darken(col, 0.5)],
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.5))], order: 3 })),
    ];
  },
};
