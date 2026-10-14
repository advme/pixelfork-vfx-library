/** A campfire: dancing flames, a warm glow, embers rising and a lazy column of smoke. Loops until stopped. */
export default {
  name: 'world.campfire',
  category: 'world',
  whenToUse: 'A campfire, bonfire, fireplace, brazier, burning barrel or a torch in the world. Play it on the fire\'s base and leave it running; size 0.5 makes a torch or candle-sized flame.',
  duration: 2, loop: true, anchor: 'feet', tint: '#ff8a2a',
  tags: ['fire', 'campfire', 'bonfire', 'torch', 'flame', 'camp', 'survival', 'warm', 'night'],
  build(c) {
    const col = c.color('#ff8a2a');
    const light = c.lighten(col, 0.55);
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.5, size: 140, color: col, offset: [0, 24],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.5, 0.5], [0.35, 1]]))], order: 0 }),
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 30, shape: c.is3d ? { type: 'circle', radius: 14 } : { type: 'circle', radius: 16, arc: Math.PI },
        speed: [10, 40], life: [0.4, 0.65], size: [26, 46], color: [light, col],
        behaviors: [c.force(0, 260), c.limitSpeed(210, 1), c.noise(3, 10), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.45))], order: 2 })),
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 18, shape: { type: 'circle', radius: 8 },
        speed: [5, 20], life: [0.3, 0.45], size: [16, 26], color: '#fff2c4',
        behaviors: [c.force(0, 240), c.limitSpeed(180, 1), c.noise(3, 6), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // embers
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 9, shape: { type: 'circle', radius: 14 },
        speed: [20, 60], life: [1.0, 1.8], size: [3, 6], color: [light, '#ffd27a'],
        behaviors: [c.force(0, 160), c.limitSpeed(130, 1), c.noise(2, 26), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 4 })),
      // smoke column
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 4, shape: { type: 'circle', radius: 10 }, offset: [0, 70],
        speed: [5, 20], life: [2.0, 3.0], size: [26, 40], rotation: [0, 6.28], color: ['#6b6b6b', '#4a4a4a'],
        behaviors: [c.force(0, 55), c.limitSpeed(70, 1), c.noise(0.8, 16), c.spin(-0.5, 0.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.2], [0.3, 0.6], [0, 1]]))], order: 1 }),
    ];
  },
};
