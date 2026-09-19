/** Damaged and smoking: grey smoke drifting up. Loops until stopped. */
export default {
  name: 'state.smoke',
  category: 'state',
  whenToUse: 'A damaged vehicle, machine or building smokes; a chimney; a snuffed candle; something overheating. Follow it; stop when repaired.',
  duration: 1, loop: true, tint: '#8a8a8a',
  tags: ['smoke', 'damaged', 'chimney', 'overheat', 'status', 'steam'],
  build(c) {
    const col = c.color('#8a8a8a');
    return [
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 8, shape: { type: 'circle', radius: 8 },
        speed: [10, 30], life: [1.2, 1.8], size: [18, 30], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.force(0, 110), c.limitSpeed(90, 1), c.noise(1.2, 14), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.4], [1, 1.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0.5, 0.6], [0, 1]]))], order: 1 }),
    ];
  },
};
