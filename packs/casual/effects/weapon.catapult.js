/** A catapult lets fly: a whoosh of air along the throw, a puff of dust from the creaking frame and wooden splinters snapping off. */
export default {
  name: 'weapon.catapult',
  category: 'weapon',
  whenToUse: 'A catapult, trebuchet, ballista or siege engine launches its load: the moment the arm swings in tower defense, castle siege and launch-the-boulder games. Play it at the top of the arm as it releases; in 2D set dir (degrees, the way the shot flies, default 60 = up and to the right), in 3D pass direction. Where the boulder lands use explosion.artillery.',
  duration: 0.8, loop: false, tint: '#c8935a',
  tags: ['catapult', 'trebuchet', 'ballista', 'siege', 'launch', 'tower defense', 'wood', 'weapon'],
  build(c) {
    const col = c.color('#c8935a');
    const dust = c.lighten(col, 0.55);
    const dir = c.dir === undefined ? Math.PI / 3 : c.dir;
    // a streak trails back from its particle: in 2D the air streaks start ahead of the arm so they do not reach back into the frame
    const out = c.is3d ? undefined : [Math.cos(dir) * 28, Math.sin(dir) * 28];
    return [
      // the thunk of the arm hitting its stop
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 90, color: c.lighten(col, 0.7),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 0 }),
      // the whoosh: air streaks flying along the throw
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [4, 5] }], dir, offset: out, shape: { type: 'cone', radius: 16, angle: 0.18 },
        speed: [520, 760], life: [0.14, 0.22], size: [8, 11], color: '#ffffff', stretch: { speed: 0.01, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.5)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.4, 0.5], [0, 1]]))], order: 4 })),
      // dust shaken out of the frame
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 14 },
        speed: [70, 160], life: [0.5, 0.75], size: [30, 48], rotation: [0, 6.28], color: dust,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 25), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      // dust dragged along by the throw
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ count: [4, 5] }], dir, shape: { type: 'cone', radius: 10, angle: 0.45 },
        speed: [140, 280], life: [0.5, 0.7], size: [20, 32], rotation: [0, 6.28], color: dust,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0, 1]]))], order: 2 })),
      // splinters snapping off and tumbling down
      c.sys(c.chunks(c.spray({ tex: 'shard', blend: 'normal', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 10, angle: 0.7 },
        speed: [220, 420], life: [0.55, 0.8], size: [10, 16], rotation: [0, 6.28], color: [col, c.darken(col, 0.35)],
        behaviors: [c.gravity(1300), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 3 }), 'plank')),
    ];
  },
};
