/** A reactor core: a white-hot centre in a big glow that beats like a heart, a ring of energy around it, sparks orbiting both ways, a pulse wave on every beat and heat rising off the top. Loops until stopped. */
export default {
  name: 'world.reactor',
  category: 'world',
  whenToUse: 'A glowing reactor, power core, generator or energy engine runs in a sci-fi level (a ship\'s engine room, a power plant, a boss\'s power source, a fusion core to protect or destroy, a mech\'s chest core): play it on the core and leave it running; for a magic crystal or gem use world.crystal, for a sparking broken machine use world.sparks.',
  duration: 1.2, loop: true, tint: '#59ff9c',
  tags: ['reactor', 'core', 'power', 'generator', 'energy', 'engine', 'sci-fi', 'glow'],
  build(c) {
    const col = c.color('#59ff9c');
    const light = c.lighten(col, 0.6);
    const T = 1.2;
    // a ring that lies flat around the core: side-on 'ellipse' in 2D, a flat ring at the core's height in 3D
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the steady parts are re-laid at the start of each cycle only (so nothing new appears after stop()) and live
    // 0.06 s longer than the cycle, fading in and out, so each copy cross-fades into the next; they switch off at
    // once on stop(). at(s): seconds into the cycle as a fraction of their life
    const L = T + 0.06, at = (s) => s / L;
    const steady = (p) => Object.assign({ blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: 1 }], life: L }, p);
    // the heartbeat: two beats in the middle of every cycle, at 0.3 s and 0.55 s
    const beat = (lo, hi) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [lo, at(0.06)], [lo, at(0.3)], [hi, at(0.36)], [lo, at(0.5)],
      [hi * 0.85, at(0.58)], [lo, at(0.78)], [lo, at(T)], [0, 1]]));
    const swell = (a, b) => c.sizeOverLife(c.curve([[0, a], [at(0.3), a], [at(0.36), b], [at(0.5), a * 1.05], [at(0.58), b * 0.95], [at(0.78), a], [1, a]]));
    const solid = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, at(0.06)], [1, at(T)], [0, 1]]));
    // orbiters: an even burst on a circle's rim; each turns exactly a whole number of slots per cycle
    // (speed x T = 2 pi x m / n), so the new ones land where the old ones were and the loop is seamless
    const orbiters = (n, radius, m, p) => c.sys(steady(Object.assign({ tex: 'glow', bursts: [{ count: n }],
      shape: { type: 'circle', radius, thickness: 0, even: true }, speed: 0,
      behaviors: [c.orbit((2 * Math.PI * m) / n / T), solid()] }, p)));
    return [
      c.sys(steady({ tex: 'glow', size: 200, color: col, behaviors: [beat(0.3, 0.6)], order: 0 })),
      ring(steady({ size: 130, color: col, behaviors: [beat(0.55, 1)], order: 1 })),
      // a pulse wave sent out on the first beat (born with the cycle, it waits unseen until 0.3 s)
      c.sys({ tex: 'ring', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: 1 }], life: 0.85, size: 190, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.35], [0.35, 0.35], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0, 0.34], [0.55, 0.36], [0, 1]]))], order: 1 }),
      // the core: a bright glow and a white-hot centre, swelling on each beat
      c.sys(steady({ tex: 'glow', size: 80, color: light, behaviors: [swell(0.85, 1.1), solid()], order: 2 })),
      c.sys(steady({ tex: 'glow', size: 40, color: '#ffffff', behaviors: [swell(0.9, 1.15), solid()], order: 3 })),
      // energy orbiting: a fast inner ring one way, a slower outer ring the other
      orbiters(6, 34, 4, { size: 12, color: light, order: 4 }),
      orbiters(4, 54, -1, { size: 16, color: col, order: 4 }),
      // heat shimmering up off the top, with a few embers
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 8, shape: { type: 'circle', radius: 22 }, offset: [0, 24],
        speed: [5, 15], life: [0.9, 1.3], size: [22, 32], color: col,
        behaviors: [c.force(0, 90), c.limitSpeed(60, 1), c.noise(1.5, 12), c.sizeOverLife(c.curve([[0, 0.4], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.22, 0.25], [0, 1]]))], order: 1 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 6, shape: { type: 'circle', radius: 28 }, offset: [0, 10],
        speed: [10, 30], life: [0.7, 1.1], size: [3, 5], color: ['#ffffff', light],
        behaviors: [c.force(0, 120), c.limitSpeed(80, 1), c.noise(2, 16), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.8, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
