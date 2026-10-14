/** A torch: a tall flickering flame with a warm glow, a few embers and a thread of smoke. Loops until stopped. */
export default {
  name: 'world.torch',
  category: 'world',
  whenToUse: 'A wall torch, a hand-held torch, a lantern flame, a candle (size 0.4), a brazier in a dungeon, castle or cave. Play it where the flame sits on top of the torch and leave it running; follow a carried torch.',
  duration: 1, loop: true, tint: '#ff8a2a',
  tags: ['torch', 'flame', 'candle', 'lantern', 'dungeon', 'castle', 'fire', 'light', 'medieval'],
  build(c) {
    const col = c.color('#ff8a2a');
    const light = c.lighten(col, 0.55);
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.4, bursts: [{ count: 1 }], life: 0.4, size: 110, offset: [0, 18], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.06], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.4, 0], [0.55, 0.5], [0.4, 1]]))], order: 0 }),
      c.sys({ tex: 'flame', blend: 'add', loop: true, rate: 22, shape: { type: 'circle', radius: 5 },
        speed: [5, 20], life: [0.35, 0.5], size: [22, 34], color: [light, col],
        behaviors: [c.force(0, 280), c.limitSpeed(200, 1), c.noise(4, 6), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.45))], order: 2 }),
      c.sys({ tex: 'flame', blend: 'add', loop: true, rate: 14, shape: { type: 'circle', radius: 3 },
        speed: [2, 10], life: [0.25, 0.35], size: [12, 18], color: '#fff2c4',
        behaviors: [c.force(0, 240), c.limitSpeed(160, 1), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 4, shape: { type: 'circle', radius: 6 },
        speed: [20, 50], life: [0.9, 1.4], size: [3, 5], color: light,
        behaviors: [c.force(0, 140), c.limitSpeed(110, 1), c.noise(2, 20), c.colorOverLife(c.fade(0.6))], order: 4 }),
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 2, shape: { type: 'circle', radius: 4 }, offset: [0, 44],
        speed: [5, 15], life: [1.2, 1.8], size: [14, 22], rotation: [0, 6.28], color: '#5a5a5a',
        behaviors: [c.force(0, 50), c.limitSpeed(60, 1), c.noise(0.8, 12), c.sizeOverLife(c.curve([[0, 0.5], [1, 2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.3, 0.2], [0, 1]]))], order: 1 }),
    ];
  },
};
