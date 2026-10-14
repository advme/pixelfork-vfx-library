/** Ice skating: a trail of twinkling ice sparkles left on the ice, frost chips and a cold mist sprayed out behind the blade. Loops until stopped. */
export default {
  name: 'move.skate',
  category: 'move',
  whenToUse: 'A character skates or slides on ice: figure skating, ice hockey, a slippery ice level, a penguin belly slide, a snowboard or skis carving fresh snow; follow the feet and stop it when they leave the ice (in 2D dir is the way the spray flies behind the blade, default 170 degrees for skating to the right, and the chips arc up from it; in 3D pass direction pointing backward), and use move.slide for sliding on dirt or grass, move.skid for braking to a stop.',
  duration: 1, loop: true, anchor: 'feet', tint: '#8fe3ff',
  tags: ['skate', 'ice', 'skating', 'hockey', 'frost', 'sparkle', 'snowboard', 'winter', 'move'],
  build(c) {
    const col = c.color('#8fe3ff');
    const pale = c.lighten(col, 0.65);
    const dir = c.dir === undefined ? Math.PI - 0.2 : c.dir;
    // the chips fly a little higher than the mist, on whichever side the spray points, so they arc up off the
    // ice instead of skimming flat and dropping straight through it
    const chips = Math.cos(dir) < 0 ? dir - 0.55 : dir + 0.55;
    // a cold glow on the ice under the blade (lying on the floor in 3D)
    const under = (p) => (c.is3d ? c.sys(c.flat(p)) : c.sys(p));
    return [
      under({ tex: 'glow', blend: 'add', loop: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.5, size: 64, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.5, 0.5], [0.35, 1]]))], order: 0 }),
      // the sparkle trail left on the ice
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, world: true, rate: 16, shape: { type: 'circle', radius: 6 },
        speed: [0, 12], life: [0.45, 0.75], size: [8, 14], rotation: [0, 6.28], color: [pale, '#ffffff'],
        behaviors: [c.spin(-2, 2), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 })),
      // frost chips shaved off the ice
      c.sys(c.spray({ tex: 'shard', blend: 'normal', loop: true, world: true, rate: 26, dir: chips, shape: { type: 'cone', radius: 4, angle: 0.3 },
        speed: [180, 320], life: [0.22, 0.34], size: [4, 7], rotation: [0, 6.28], color: ['#ffffff', pale],
        behaviors: [c.gravity(1100), c.spin(-10, 10), c.colorOverLife(c.fade(0.5))], order: 2 })),
      // a cold mist of ice dust
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 10, dir, shape: { type: 'cone', radius: 6, angle: 0.4 },
        speed: [60, 130], life: [0.4, 0.6], size: [14, 22], rotation: [0, 6.28], color: c.lighten(col, 0.8),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 30), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.4, 0.5], [0, 1]]))], order: 1 })),
      // a little snowflake glint now and then
      c.sys(c.vol({ tex: 'snowflake', blend: 'add', loop: true, world: true, rate: 3, shape: { type: 'circle', radius: 10 },
        speed: [20, 50], life: [0.5, 0.8], size: [8, 12], rotation: [0, 6.28], color: pale,
        behaviors: [c.force(0, 30), c.spin(-3, 3), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 })),
    ];
  },
};
