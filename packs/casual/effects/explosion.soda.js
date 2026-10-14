/** Pop and fizz! A cork-pop flash and ring, then a gush of white foam fountains out of the bottle, drink droplets spray, bubbles shoot up and wobble, and fizzy glints sparkle along the jet. */
export default {
  name: 'explosion.soda',
  category: 'explosion',
  whenToUse: 'A soda, cola or champagne bottle pops open and fizzes over: a shaken soda can exploding, a champagne toast at a party, wedding or victory, a fizzy drink gag in a cooking or party game, a cola-and-mint geyser. Play it at the bottle\'s mouth; in 2D aim it with dir (degrees, default 90 = straight up) and in 3D with direction: [x, y, z]. Tint it for the drink (golden champagne by default, brown for cola, orange for orange soda). For a fountain that keeps running use world.fountain; for a water balloon bursting use explosion.water.',
  duration: 1.2, loop: false, tint: '#ffd75e',
  tags: ['soda', 'champagne', 'fizz', 'bottle', 'cork', 'foam', 'bubbles', 'party'],
  build(c) {
    const col = c.color('#ffd75e');
    const light = c.lighten(col, 0.5);
    const foam = c.lighten(col, 0.85);
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    return [
      // the cork pops: a quick flash and a ring at the mouth
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the foam fountain: a gush of white foam for a third of a second that arcs over and falls
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: 2, cycle: 12, interval: 0.03 }], shape: { type: 'cone', radius: 6, angle: 0.18 }, dir,
        speed: [380, 560], life: [0.6, 0.75], size: [18, 28], rotation: [0, 6.28], color: ['#ffffff', foam],
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.5)), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1.1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.9, 0.6], [0, 1]]))], order: 2 })),
      // droplets of the drink spraying out with it
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }, { time: 0.1, count: [6, 8] }], shape: { type: 'cone', radius: 5, angle: 0.3 }, dir,
        speed: [380, 640], life: [0.5, 0.7], size: [5, 8], color: [col, light], stretch: { speed: 0.003, length: 1.2 },
        behaviors: [c.gravity(1400), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 3 })),
      // bubbles shooting out, slowing and wobbling up before they pop
      c.sys(c.spray({ tex: 'ring', blend: 'normal', bursts: [{ count: 2, cycle: 7, interval: 0.04 }], shape: { type: 'cone', radius: 6, angle: 0.35 }, dir,
        speed: [240, 460], life: [0.7, 1.0], size: [6, 11], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 60), c.noise(2, 14), c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [0.88, 1], [0.94, 1.3], [1, 0]]))], order: 4 })),
      // fizzy glints sparkling along the jet
      c.sys(c.spray({ tex: 'spark', blend: 'add', bursts: [{ time: 0.03, count: [6, 8] }], shape: { type: 'cone', radius: 6, angle: 0.3 }, dir,
        speed: [160, 400], life: [0.3, 0.5], size: [8, 13], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
    ];
  },
};
