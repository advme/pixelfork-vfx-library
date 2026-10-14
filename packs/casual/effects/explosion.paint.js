/** A paint bomb: a wet pop, gobs of four bright paint colours fly out, and big paint blobs splat down all around it (flat on the floor in 3D). */
export default {
  name: 'explosion.paint',
  category: 'explosion',
  whenToUse: 'A paint bomb, paint balloon or paint bucket bursts: a paintball or splat game, a colour-war or Holi festival moment, an art or painting game, a cute monster popping into paint. Tint it for one colour or leave it multicolour. For a single goo or paint hit use hit.splat; for a colour bomb in a match-3 game use explosion.candy.',
  duration: 1.2, loop: false, tint: null,
  tags: ['paint', 'colour', 'splat', 'paintball', 'holi', 'paint bomb', 'art', 'explosion'],
  build(c) {
    const palette = c.tint
      ? [c.tint, c.lighten(c.tint, 0.35), c.darken(c.tint, 0.25), c.lighten(c.tint, 0.6)]
      : ['#ff3d8b', '#ffd23a', '#2ec5ff', '#6ee84a'].map(c.rgb);
    const splat = (colour, i) => [
      // gobs flung out
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 12 },
        speed: [240, 520], life: [0.45, 0.65], size: [9, 16], color: [colour, c.lighten(colour, 0.25)],
        behaviors: [c.gravity(1300), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 3 })),
      // blobs landing all around, one colour after another; they lie flat on the floor in 3D
      c.sys(c.flat(c.ground({ tex: 'disc', blend: 'normal', bursts: [{ time: 0.1 + i * 0.05, count: [3, 4] }], shape: { type: 'circle', radius: 90, thickness: 0.55 }, speed: 0,
        life: [0.8, 0.95], size: [16, 46], color: c.darken(colour, 0.08),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.1, 1.2], [0.2, 0.95], [0.3, 1], [1, 0.9]])), c.colorOverLife(c.fade(0.7))], order: 1 }))),
    ];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 150, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 200, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 4 }),
      // the big central splat squashing out
      c.sys(c.flat({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 1.0, size: 90, color: c.darken(palette[0], 0.08),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.1, 1.15], [0.2, 0.95], [0.6, 1], [1, 0.85]])), c.colorOverLife(c.fade(0.7))], order: 0 })),
      ...palette.flatMap(splat),
    ];
  },
};
