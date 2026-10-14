/** A bubblegum bubble pops: a pink skin ring snaps out, sticky gum strands whip out and spring back, and chewy gum bits fly and drop with a few glints. */
export default {
  name: 'explosion.bubblegum',
  category: 'explosion',
  whenToUse: 'A bubblegum bubble pops: a character blowing a gum bubble until it bursts in their face, a gum-bubble enemy or bubble trap popping, a sticky pink blob bursting in a candy or kids game. Play it on the bubble; tint it for other gum flavours. For a rubber party balloon use explosion.balloon; for a soap bubble or a bubble-shooter pop use puzzle.bubble; for green slime use explosion.slime.',
  duration: 0.6, loop: false, tint: '#ff6fb8',
  tags: ['bubblegum', 'gum', 'pop', 'bubble', 'pink', 'sticky', 'candy', 'burst'],
  build(c) {
    const col = c.color('#ff6fb8');
    const light = c.lighten(col, 0.5);
    const dark = c.darken(col, 0.15);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 110, color: light,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the gum skin snapping outward: a solid pink ring, then a light one just after
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.22, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [0.35, 1], [1, 1.12]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.03, count: 1 }], life: 0.24, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      // sticky gum strands: stretched while fast, then they brake hard and snap back short
      // (born on the skin, about 40 px out, and at most ~46 px long, so the tails do not cross the centre)
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: 9 }], shape: { type: 'circle', radius: 40, thickness: 0, even: true },
        speed: [300, 420], life: [0.22, 0.3], size: [5, 7], color: col, stretch: { speed: 0.012, length: 1.6 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.fade(0.6)), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 3 })),
      // chewy gum bits: rounded flaps flung out, slowed by their stickiness, then dropping
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 26, thickness: 0.4 },
        speed: [200, 360], life: [0.45, 0.62], size: [10, 17], color: [col, dark],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.gravity(800), c.sizeOverLife(c.curve([[0, 0.4], [0.1, 1.15], [0.2, 0.95], [0.8, 0.95], [1, 0]]))], order: 4 })),
      c.sys(c.vol({ tex: 'shard', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 26, thickness: 0.4 },
        speed: [180, 320], life: [0.4, 0.58], size: [12, 18], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(800), c.spin(-10, 10), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 4 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.03, count: [3, 4] }], shape: { type: 'circle', radius: 40 },
        speed: [30, 80], life: [0.22, 0.32], size: [12, 16], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.45))], order: 5 })),
    ];
  },
};
