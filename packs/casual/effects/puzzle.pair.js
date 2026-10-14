/** A matched pair is cleared: two quick pops one after the other (glow, white core and ring each), then a burst of sparkles, stars and bright dots. */
export default {
  name: 'puzzle.pair',
  category: 'puzzle',
  whenToUse: 'A matching pair is cleared in mahjong solitaire, a memory or pairs (concentration) game, or a connect-the-pairs tile puzzle: play it on each tile of the pair as they vanish, tinted with the tile colour; for one tile cleared in a match-3 use puzzle.match, for two items merging into a better one use puzzle.merge, for a card just turned face up use ui.cardflip.',
  duration: 0.6, loop: false, tint: '#4fe39b',
  tags: ['pair', 'mahjong', 'memory', 'match', 'tiles', 'concentration', 'clear', 'puzzle'],
  build(c) {
    const col = c.color('#4fe39b');
    const light = c.lighten(col, 0.6);
    // the double pop: everything that pops fires twice, 0.1 s apart
    const pops = [{ count: 1 }, { time: 0.1, count: 1 }];
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ring' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: pops, life: 0.22, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'add', bursts: pops, life: 0.3, size: 125, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 12 },
        speed: [200, 320], life: [0.25, 0.35], size: [4, 7], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.shrink())], order: 2 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: pops, life: 0.12, size: 60, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      // the sparkle burst after the second pop
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.1, count: [9, 11] }], shape: { type: 'circle', radius: 16 },
        speed: [140, 300], life: [0.35, 0.48], size: [12, 18], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-3, 3), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.1, count: [5, 6] }], shape: { type: 'circle', radius: 12 },
        speed: [100, 220], life: [0.4, 0.5], size: [10, 15], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(300), c.spin(-5, 5), c.sizeOverLife(c.pop(0.2, 0.55))], order: 5 })),
    ];
  },
};
