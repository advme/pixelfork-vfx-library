/** A gem or glass tile shatters: a sharp flash and crystal shards flying out and falling. */
export default {
  name: 'puzzle.shatter',
  category: 'puzzle',
  whenToUse: 'A gem, crystal, ice block or glass tile breaks: a locked or frozen tile freed in a puzzle, a crystal smashed, a glass obstacle broken. Tint it with the gem\'s colour.',
  duration: 0.75, loop: false, tint: '#7fd8ff',
  tags: ['shatter', 'glass', 'gem', 'crystal', 'ice', 'break', 'puzzle', 'smash'],
  build(c) {
    const col = c.color('#7fd8ff');
    const light = c.lighten(col, 0.65);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 110, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 90, rotation: [0, 1], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 12 },
        speed: [200, 460], life: [0.5, 0.75], size: [8, 15], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1300), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 3 }, 'shard')),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [250, 520], life: [0.25, 0.4], size: [3, 6], color: light,
        stretch: { speed: 0.02, length: 1.5 }, behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.5))], order: 5 })),
    ];
  },
};
