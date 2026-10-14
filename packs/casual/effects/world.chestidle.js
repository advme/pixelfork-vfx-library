/** A treasure chest waiting to be opened: a warm glow breathing behind it, golden glints twinkling around the box and motes of light leaking up from the lid. Loops until stopped. */
export default {
  name: 'world.chestidle',
  category: 'world',
  whenToUse: 'An unopened treasure chest, loot crate or reward box sits in the level waiting to be found or opened (a dungeon chest, a hidden chest, a daily chest on the map); play it on the chest and leave it running, stop it and play reward.chest when it opens, and use state.sparkle for any other item that wants attention.',
  duration: 1.6, loop: true, tint: '#ffcf4a',
  tags: ['chest', 'treasure', 'loot', 'idle', 'sparkle', 'reward', 'dungeon', 'waiting'],
  build(c) {
    const col = c.color('#ffcf4a');
    const light = c.lighten(col, 0.6);
    return [
      // a warm glow breathing behind the chest
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.06], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.25, 0], [0.45, 0.5], [0.25, 1]]))], order: 0 }),
      // motes of light leaking up out of the lid
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 6, shape: { type: 'circle', radius: 26 }, offset: [0, 12],
        speed: [5, 15], life: [1.0, 1.4], size: [3, 6], color: light,
        behaviors: [c.force(0, 60), c.limitSpeed(45, 1), c.noise(1, 12), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]))], order: 1 })),
      // glints twinkling on and around the box
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 5, shape: { type: 'rect', w: 90, h: 70, thickness: 1 },
        speed: 0, life: [0.45, 0.7], size: [10, 18], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.spin(0.8), c.sizeOverLife(c.pop(0.4, 0.4))], order: 2 }),
      // now and then a bigger star twinkle on a corner
      c.sys({ tex: 'star', blend: 'add', loop: true, rate: 1.2, shape: { type: 'rect', w: 80, h: 60, thickness: 0 },
        speed: 0, life: 0.7, size: [16, 22], rotation: [0, 6.28], color: light,
        behaviors: [c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.6, 0.9], [1, 0]]))], order: 3 }),
    ];
  },
};
