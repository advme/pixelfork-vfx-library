/** Sleeping: little Z letters float up and grow. Loops until stopped. */
export default {
  name: 'state.sleep',
  category: 'state',
  whenToUse: 'A character or pet is asleep, resting, idle for a long time, or knocked out cold. Follow the head; stop on waking.',
  duration: 1, loop: true, tint: '#9fc5ff',
  tags: ['sleep', 'zzz', 'rest', 'idle', 'nap', 'status'],
  build(c) {
    const col = c.color('#9fc5ff');
    return [
      c.sys({ tex: 'z', blend: 'normal', loop: true, rate: 1.3, shape: { type: 'circle', radius: 6 }, offset: [14, 10],
        speed: 0, life: [1.6, 2.0], size: 12, color: [c.lighten(col, 0.5), col],
        behaviors: [c.force(0, 90), c.limitSpeed(60, 1), c.force(25, 0), c.noise(0.8, 10), c.spin(-0.6, 0.6),
          c.sizeOverLife(c.curve([[0, 0.5], [0.6, 1.6], [1, 2.2]])), c.colorOverLife(c.fadeInOut(0.1, 0.7))], order: 1 }),
    ];
  },
};
