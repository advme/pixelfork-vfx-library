/** Extra time grabbed: a clock face of twelve dots pops out and turns, a hand sweeps round, rings pulse and blue sparkles fly. */
export default {
  name: 'pickup.time',
  category: 'pickup',
  whenToUse: 'Extra time is picked up in a timed level: a clock, an hourglass, a stopwatch or a "+5 s" item in a runner, puzzle or arcade game. Play it where the item was. For a slow-motion, rewind or time-stop spell use magic.time.',
  duration: 0.6, loop: false, tint: '#4fb8ff',
  tags: ['time', 'clock', 'extra time', 'timer', 'hourglass', 'stopwatch', 'bonus', 'pickup'],
  build(c) {
    const col = c.color('#4fb8ff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the ring pulse, twice
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.15, count: 1 }], life: 0.35, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // a clock hand sweeping round
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 100, rotation: 0.3, color: light,
        behaviors: [c.spin(-8, -8), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.12], [0.7, 0.55], [0, 0.85]]))], order: 2 }),
      // the twelve marks of a clock face popping out and turning
      c.sys({ tex: 'disc', blend: 'add', bursts: [{ count: 12 }], shape: { type: 'circle', radius: 40, thickness: 0, even: true },
        speed: 50, life: 0.6, size: 9, color: light,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.orbit(1.5), c.sizeOverLife(c.curve([[0, 0], [0.15, 1.3], [0.3, 1], [0.8, 1], [1, 0]]))], order: 3 }),
      // blue sparkles
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 14 },
        speed: [120, 240], life: [0.35, 0.55], size: [8, 14], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 120), c.sizeOverLife(c.pop(0.2, 0.55))], order: 4 })),
    ];
  },
};
