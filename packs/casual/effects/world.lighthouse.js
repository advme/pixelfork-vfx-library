/** A lighthouse lamp: a warm glow breathing round the lamp, a soft beam sweeping all the way round (swinging out left and right in 2D, turning round the tower in 3D) with a flare each time it faces you, and sparkle motes twinkling in the light. Loops until stopped. */
export default {
  name: 'world.lighthouse',
  category: 'world',
  whenToUse: 'The lamp of a lighthouse shining over the sea: a coast, harbour, pirate island or night-sailing level, a lighthouse landmark the boat steers by; play it on the lamp at the top of the tower and leave it running, and the beam goes all the way round every 3 seconds. For a quest marker on the ground use world.beacon; for a flashing police or alarm light use vehicle.siren; for a lit torch use world.torch.',
  duration: 3, loop: true, tint: '#ffe36b',
  tags: ['lighthouse', 'lamp', 'beam', 'coast', 'harbour', 'searchlight', 'sea', 'night'],
  build(c) {
    const col = c.color('#ffe36b');
    const light = c.lighten(col, 0.6);
    // one full turn of the beam per cycle, R = how far it reaches
    const T = 3, R = 240;
    const alpha = (keys) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], keys));
    const lamp = [
      // the warm glow round the lamp, breathing
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: 1 }], life: T, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.94], [0.5, 1.06], [1, 0.94]])), alpha([[0.32, 0], [0.42, 0.5], [0.32, 1]])], order: 0 }),
      // the hot lamp itself
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: 1 }], life: T, size: 46, color: light,
        behaviors: [alpha([[0.75, 0], [0.9, 0.5], [0.75, 1]])], order: 3 }),
      // soft motes drifting in the light
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 4, shape: { type: 'circle', radius: 60 },
        speed: [3, 10], life: [1.4, 2], size: [3, 6], color: light,
        behaviors: [c.force(0, 10), c.limitSpeed(14, 1), c.noise(0.8, 10), c.colorOverLife(c.fadeInOut(0.2, 0.7))], order: 2 })),
      // sparkles twinkling round the lamp
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: { type: 'circle', radius: 46 },
        speed: [4, 12], life: [0.7, 1.1], size: [7, 12], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.noise(1, 8), c.spin(0.6), c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 })),
    ];
    if (c.is3d) {
      // 3D: a real beam turning round the tower. A line of glows is born together on a thin wedge of a level circle and
      // they all circle the lamp at the same rate, so the line stays a line; the next cycle's line is born where this one ends.
      const turn = (2 * Math.PI) / T;
      return lamp.concat([
        c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: 26 }], shape: { type: 'circle', radius: R, arc: 0.14, thickness: 0.9 },
          speed: 0, life: T + 0.03, size: [36, 56], color: col,
          behaviors: [c.orbit(turn), alpha([[0.3, 0], [0.3, 1]])], order: 1 })),
        // its brighter core
        c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: 16 }], shape: { type: 'circle', radius: R * 0.9, arc: 0.05, thickness: 0.9 },
          speed: 0, life: T + 0.03, size: [16, 26], color: light,
          behaviors: [c.orbit(turn), alpha([[0.5, 0], [0.5, 1]])], order: 2 })),
      ]);
    }
    // 2D, seen from the side: the beam swings out to the right, back in behind the lamp, out to the left and back to face us.
    // Every glow flies out along the beam and back again (speed over life runs from +1 to -1), each as far as its own speed takes it,
    // so the whole beam stretches and shrinks the way a turning beam looks from the side.
    const sweep = () => c.speedOverLife(c.curve([[0, 1], [0.25, 0.71], [0.5, 0], [0.75, -0.71], [1, -1]]));
    const beam = (d, t0, keys) => c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ time: t0, count: 30 }], shape: { type: 'cone', radius: 2, angle: 0.08 }, dir: d,
      speed: [20, 500], life: T / 2, size: [18, 52], color: [col, light],
      behaviors: [sweep(), alpha(keys)], order: 1 });
    return lamp.concat([
      // right half of the turn: from facing us, out to the right, round behind the lamp
      beam(0, 0, [[0.1, 0], [0.42, 0.3], [0.36, 0.6], [0, 1]]),
      // left half: from behind the lamp, out to the left, round to face us again
      beam(Math.PI, T / 2, [[0, 0], [0.36, 0.4], [0.42, 0.7], [0.1, 1]]),
      // the flare as the beam swings round to face us
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ time: T - 0.25, count: 1 }], life: 0.5, size: 210, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.5, 1], [1, 0.5]])), alpha([[0, 0], [0.55, 0.5], [0, 1]])], order: 5 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ time: T - 0.2, count: 1 }], life: 0.4, size: 120, rotation: 0.4, color: '#ffffff',
        behaviors: [c.spin(1.5), c.sizeOverLife(c.curve([[0, 0.2], [0.5, 1], [1, 0]]))], order: 6 }),
    ]);
  },
};
