/** Dice land: a pop of warm light, a ring, bright dots bouncing out, sparkles and a little dust puff kicked out at the base. */
export default {
  name: 'ui.dice',
  category: 'ui',
  whenToUse: 'Dice are rolled or land in a board, ludo, snakes-and-ladders, yahtzee, backgammon or casino game: play it on each die as it settles (el: the die), or where the roll lands. For a token moving on the board use ui.tap; for a big lucky win use reward.jackpot.',
  duration: 0.45, loop: false, tint: '#ffd447',
  tags: ['ui', 'dice', 'roll', 'board game', 'ludo', 'casino', 'land', 'luck'],
  build(c) {
    const col = c.color('#ffd447');
    const light = c.lighten(col, 0.6);
    // the die's half height: its element in 2D, else a die about 52 px tall. Without an element the target is the
    // default 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const base = plain ? 26 : Math.max(12, Math.min(70, c.target.h / 2));
    // in 3D the ring lies flat at the die's base, level with the dust (not snapped down to the floor: the
    // table may stand above it); the game plays it at the die's centre
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring', offset: [0, -20] }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ring' }, p)));
    const dustLife = () => [c.speedOverLife(c.decel(0.1)), c.force(0, 40), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.1]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))];
    // dust kicked out sideways at the die's base: a ring on the table in 3D, a puff to each side in 2D
    const puff = (d) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [2, 3] }], dir: d, shape: { type: 'cone', radius: 4, angle: 0.4 }, offset: [Math.cos(d) * 12, -base],
      speed: [70, 140], life: [0.35, 0.45], size: [16, 24], rotation: [0, 6.28], color: '#e6d9c4', behaviors: dustLife(), order: 0 });
    const dust = c.is3d
      ? [c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 14 }, offset: [0, -20],
        speed: [60, 120], life: [0.35, 0.45], size: [16, 24], rotation: [0, 6.28], color: '#e6d9c4', behaviors: dustLife(), order: 0 }))]
      : [puff(0.3), puff(Math.PI - 0.3)];
    return [
      ...dust,
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 100, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // bright dots bouncing out and dropping
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: 6 }], shape: { type: 'circle', radius: 12 },
        speed: [180, 300], life: [0.35, 0.45], size: [5, 8], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.gravity(900), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 3 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.03, count: [4, 5] }], shape: { type: 'circle', radius: 26 },
        speed: [40, 110], life: [0.35, 0.45], size: [10, 16], rotation: [0, 0.8], color: light,
        behaviors: [c.speedOverLife(c.decel(0.3)), c.force(0, 60), c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
    ];
  },
};
