/** A special tile goes off: a flash, and four beams shoot out in a cross, row and column at once. */
export default {
  name: 'puzzle.blast',
  category: 'puzzle',
  whenToUse: 'A special tile, bomb or booster fires in a match-3 or block puzzle: a cross blast that clears a row and a column, a bomb candy, a rocket booster. Play it on the special tile.',
  duration: 0.6, loop: false, tint: '#ff7a2a',
  tags: ['bomb', 'booster', 'special', 'cross', 'blast', 'match3', 'puzzle', 'rocket'],
  build(c) {
    const col = c.color('#ff7a2a');
    const light = c.lighten(col, 0.6);
    const beam = (dir) => [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 5 }, { time: 0.04, count: 4 }], shape: { type: 'cone', radius: 2, angle: 0.02 }, dir,
        speed: [700, 1100], life: [0.28, 0.34], size: [18, 26], color: col, stretch: { speed: 0.06, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 3 }], shape: { type: 'cone', radius: 1, angle: 0.01 }, dir,
        speed: [900, 1200], life: [0.24, 0.3], size: [8, 10], color: '#ffffff', stretch: { speed: 0.06, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 3 }),
    ];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 150, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      ...beam(0), ...beam(Math.PI / 2), ...beam(Math.PI), ...beam(-Math.PI / 2),
      c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 12 },
        speed: [200, 380], life: [0.35, 0.5], size: [7, 11], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(600), c.spin(-8, 8), c.sizeOverLife(c.shrink())], order: 1 })),
    ];
  },
};
