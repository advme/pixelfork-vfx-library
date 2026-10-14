/** A spiky virus pops: a green flash with a star-shaped glare, a ring of sharp spikes shooting out, spinning shards, goo blobs and two pop rings. */
export default {
  name: 'explosion.virus',
  category: 'explosion',
  whenToUse: 'A player runs into or shoots a spiky virus in an agar.io-style game, a spiky mine or sea urchin bursts, a germ or spiky blob enemy pops: a spiky green burst and a pop ring; play it on the virus and tint it if the virus is not green. For a toxic gas cloud use explosion.toxic; for a slime squashed flat use hit.splat; for a hidden landmine use explosion.mine.',
  duration: 0.6, loop: false, tint: '#62f23a',
  tags: ['virus', 'spiky', 'agar', 'io', 'germ', 'urchin', 'pop', 'explosion'],
  build(c) {
    const col = c.color('#62f23a');
    const light = c.lighten(col, 0.55);
    const dark = c.darken(col, 0.3);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // a spiky eight-point glare in the middle (two 4-point glints an eighth of a turn apart)
      ...[0, Math.PI / 4].map((rot) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 190, rotation: rot, color: col,
        behaviors: [c.spin(1.5), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1.1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 100, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 6 }),
      // two pop rings
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.06, count: 1 }], life: 0.4, size: 260, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.4], [0, 1]]))], order: 2 }),
      // the spikes: fourteen evenly spaced bold streaks facing the camera, so they always read as a spiky star.
      // Streaks trail BACK from the particle, so they start at the virus rim and fade in over their first
      // frames: their tails never reach back across the middle
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 14 }], shape: { type: 'circle', radius: 40, thickness: 0, even: true },
        speed: 420, life: 0.32, size: 12, color: light, stretch: { speed: 0.008, length: 1.8 },
        behaviors: [c.speedOverLife(c.decel(0.08)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.1], [1, 0.5], [0, 1]]))], order: 4 }),
      // more spikes in every direction, also from the rim
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 34, thickness: 0.2 },
        speed: [300, 520], life: [0.22, 0.32], size: [5, 8], color: [col, light], stretch: { speed: 0.008, length: 1.4 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.12], [1, 0.4], [0, 1]]))], order: 4 })),
      // broken spike shards spinning away
      c.sys(c.vol({ tex: 'shard', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 14 },
        speed: [220, 420], life: [0.45, 0.6], size: [16, 24], rotation: [0, 6.28], color: [col, dark],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(-8, 8), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.9], [1, 0]]))], order: 3 })),
      // green goo blobs
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 12 },
        speed: [160, 320], life: [0.35, 0.5], size: [10, 16], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 1], [0.6, 0.9], [1, 0]]))], order: 5 })),
    ];
  },
};
