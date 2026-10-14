/** A slime splat: a green goo ball squashes and bursts, chunky goo blobs and droplets fly out and fall, a wet ring spreads and slime drips run down. */
export default {
  name: 'explosion.slime',
  category: 'explosion',
  whenToUse: 'A slime monster, goo ball or blob creature bursts apart into goo: a slime enemy defeated, a goo bomb or slime grenade, a slime toy squished flat in a kids or squishy game. Play it at the centre; tint it for other goo colours. For goo or paint landing on something use hit.splat; for poison gas use explosion.toxic; for a jelly or gummy block use explosion.jelly.',
  duration: 0.8, loop: false, tint: '#6fe03a',
  tags: ['slime', 'goo', 'splat', 'blob', 'monster', 'squishy', 'sticky', 'explosion'],
  build(c) {
    const col = c.color('#6fe03a');
    const light = c.lighten(col, 0.45);
    const dark = c.darken(col, 0.25);
    // a wobbly squash: pop in big, settle, shrink away
    const squash = () => c.curve([[0, 0.5], [0.1, 1.2], [0.22, 0.92], [0.34, 1.04], [0.8, 0.9], [1, 0]]);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 130, color: light,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the wet ring snapping out
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.32, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))], order: 1 }),
      // the goo ball itself splatting out and collapsing
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 0.3, size: 96, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [0.25, 1.1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 }),
      // chunky goo blobs
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [11, 13] }], shape: { type: 'circle', radius: 14 },
        speed: [220, 440], life: [0.55, 0.78], size: [14, 26], color: [col, dark],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(1100), c.sizeOverLife(squash())], order: 3 })),
      // small light droplets flung further
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [14, 16] }], shape: { type: 'circle', radius: 10 },
        speed: [320, 560], life: [0.38, 0.55], size: [5, 9], color: [light, col],
        behaviors: [c.gravity(1400), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.85], [1, 0]]))], order: 4 })),
      // slime dripping down from the burst (dir aims the 2D cone down, so a game's dir cannot turn the drips)
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ time: 0.1, count: [4, 5] }], shape: { type: 'cone', radius: 34, angle: 0.1 }, dir: -Math.PI / 2,
        speed: [20, 60], life: [0.5, 0.7], size: [9, 14], rotation: Math.PI, color: dark,
        behaviors: [c.gravity(700), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.7))], order: 2 }, 'down')),
      // a few slime bubbles floating off
      c.sys(c.vol({ tex: 'ring', blend: 'add', bursts: [{ time: 0.05, count: [3, 4] }], shape: { type: 'circle', radius: 24 },
        speed: [40, 90], life: [0.45, 0.6], size: [10, 16], color: light,
        behaviors: [c.force(0, 140), c.sizeOverLife(c.curve([[0, 0.3], [0.7, 1], [0.85, 1.25], [1, 0]]))], order: 5 })),
    ];
  },
};
