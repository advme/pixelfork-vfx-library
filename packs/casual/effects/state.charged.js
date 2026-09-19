/** Electrified: sparks jump off the body at random. Loops until stopped. */
export default {
  name: 'state.charged',
  category: 'state',
  whenToUse: 'A character is electrified, stunned by a shock, or carrying a charged power. Also a live wire or a generator. Follow it; stop when it discharges.',
  duration: 1, loop: true, tint: '#9fd8ff',
  tags: ['electric', 'charged', 'shock', 'sparks', 'static', 'status', 'energy'],
  build(c) {
    const col = c.color('#9fd8ff');
    const light = c.lighten(col, 0.8);
    return [
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 18, shape: { type: 'circle', radius: 28, thickness: 0.4 },
        speed: [250, 500], life: [0.08, 0.16], size: [5, 9], color: light,
        stretch: { speed: 0.03, length: 2 },
        behaviors: [c.noise(40, 12), c.colorOverLife(c.fade(0.3))], order: 2 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 6, shape: { type: 'circle', radius: 30 },
        speed: 0, life: [0.1, 0.2], size: [16, 30], rotation: [0, 1], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]]))], order: 3 })),
      c.sys({ tex: 'glow', blend: 'add', loop: true, bursts: [{ count: 1 }], life: 1, size: 90, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.5, 0.5], [0.3, 1]]))], order: 0 }),
    ];
  },
};
