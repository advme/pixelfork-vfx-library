/** Zero gravity: bubbles and tiny bits drift lazily around the body in every direction, little squares tumbling slowly, inside a faint cool glow. Loops until stopped. */
export default {
  name: 'state.zerog',
  category: 'state',
  whenToUse: 'A character or object is weightless: floating in zero gravity on a space station or a spacewalk, drifting in a low-gravity or anti-gravity zone, levitated by a gravity gun; follow the body and stop it when gravity returns (for underwater use env.bubbles, for a magical shimmer use state.sparkle).',
  duration: 3, loop: true, tint: '#9fe8ff',
  tags: ['zero gravity', 'weightless', 'float', 'space', 'anti-gravity', 'levitate', 'drift', 'status'],
  build(c) {
    const col = c.color('#9fe8ff');
    const light = c.lighten(col, 0.5);
    // nothing falls: everything starts near the body, creeps outward and wanders
    const drift = (amount) => [c.noise(0.8, amount), c.speedOverLife(c.decel(0.5))];
    return [
      // a faint cool glow on the body, breathing slowly
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 3, bursts: [{ count: 1 }], life: 3.15, size: 150, color: col, cut: true,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.16, 0.05], [0.24, 0.5], [0.16, 0.95], [0, 1]]))], order: 0 }),
      // bubbles
      c.sys(c.vol({ tex: 'ring', blend: 'normal', loop: true, rate: 5, shape: { type: 'circle', radius: 50 },
        speed: [6, 18], life: [2.2, 3.2], size: [10, 20], color: light,
        behaviors: drift(14).concat([c.sizeOverLife(c.pop(0.15, 0.8)), c.colorOverLife(c.fadeInOut(0.15, 0.8))]), order: 2 })),
      // little squares tumbling end over end
      c.sys(c.vol({ tex: 'square', blend: 'normal', loop: true, rate: 4, shape: { type: 'circle', radius: 55 },
        speed: [5, 15], life: [2, 3], size: [4, 7], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: drift(12).concat([c.spin(-2.5, 2.5), c.sizeOverLife(c.pop(0.15, 0.8))]), order: 3 })),
      // glowing motes
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 10, shape: { type: 'circle', radius: 55 },
        speed: [5, 15], life: [2, 3], size: [3, 6], color: [col, '#ffffff'],
        behaviors: drift(16).concat([c.colorOverLife(c.fadeInOut(0.2, 0.7))]), order: 1 })),
      // an occasional glint
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 2, shape: { type: 'circle', radius: 50 },
        speed: [3, 10], life: [0.8, 1.2], size: [8, 13], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.spin(1), c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 })),
    ];
  },
};
