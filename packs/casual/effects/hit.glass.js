/** Glass shatters: a sharp white flash and crack-star, then light-blue shards burst out and big pieces drop and rain down, glinting as they fall. */
export default {
  name: 'hit.glass',
  category: 'hit',
  whenToUse: 'A window, glass pane, bottle, mirror, windshield, lamp or display case shatters: a ball through a window, a bullet hitting glass, a jar smashed. Play it on the glass. For a gem or glass tile in a puzzle use puzzle.shatter; for ice breaking use magic.ice.',
  duration: 0.7, loop: false, tint: '#9fdcff',
  tags: ['glass', 'window', 'shatter', 'smash', 'bottle', 'mirror', 'break', 'hit'],
  build(c) {
    const col = c.color('#9fdcff');
    const light = c.lighten(col, 0.6);
    const deep = c.darken(col, 0.15);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 130, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      // the crack-star where it was struck
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.18, size: 130, rotation: [0, 1.6], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 4 }),
      // shards bursting out of the pane
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [12, 14] }], shape: { type: 'circle', radius: 14 },
        speed: [200, 440], life: [0.5, 0.7], size: [10, 18], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1400), c.spin(-14, 14), c.colorOverLife(c.fade(0.75))], order: 3 }, 'shard')),
      // big pieces dropping out of the frame
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 40 },
        speed: [20, 110], life: [0.55, 0.7], size: [16, 28], rotation: [0, 6.28], color: [deep, col],
        behaviors: [c.gravity(1500), c.spin(-6, 6), c.colorOverLife(c.fade(0.75))], order: 2 }, 'shard')),
      // glass dust; it and the glints stay camera-facing in 3D, so the thing that was hit never hides them
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [260, 540], life: [0.22, 0.38], size: [3, 5], color: light, stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.5))], order: 4 }),
      // glints twinkling on the falling glass
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [7, 9] }], shape: { type: 'circle', radius: 40 },
        speed: [30, 140], life: [0.45, 0.65], size: [11, 18], color: '#ffffff',
        behaviors: [c.gravity(1000), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.35, 0.2], [0.55, 1], [0.75, 0.2], [0.9, 0.8], [1, 0]]))], order: 5 }),
    ];
  },
};
