/** Sick: a queasy green glow on the face, little green puffs swirling round the head and green bubbles wobbling up off it. Loops until stopped. */
export default {
  name: 'state.sick',
  category: 'state',
  whenToUse: 'A character feels sick, nauseous or queasy: ate bad food, has a cold or flu, about to throw up after a ride, a car-sick pet, a fever in a care game. Follow the body; stop it when they feel better. For a poison damage status use state.poison; for tipsy or confused use state.drunk.',
  duration: 1.2, loop: true, tint: '#8fd94a',
  tags: ['sick', 'nauseous', 'queasy', 'ill', 'green', 'nausea', 'bubbles', 'status'],
  build(c) {
    const col = c.color('#8fd94a');
    const light = c.lighten(col, 0.45);
    const murky = c.mix(col, '#c8c86a', 0.45);
    // the head sits about 26 px above the body's centre
    const head = [0, 26];
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], offset: head, life: 1.24, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.08], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.18, 0], [0.38, 0.5], [0.18, 1]]))], order: 0 }),
      // swirl puffs: spinning blobs that circle the head and drift up
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 6, shape: { type: 'circle', radius: 26, thickness: 0.3 }, offset: head,
        speed: 0, life: [0.9, 1.2], size: [12, 18], rotation: [0, 6.28], color: [col, murky],
        behaviors: [c.orbit(3), c.spin(-4, 4), c.force(0, 22), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 1.3]])), c.colorOverLife(c.fadeInOut(0.2, 0.55))], order: 1 })),
      // bubbles wobbling up and popping
      c.sys(c.ground({ tex: 'ring', blend: 'normal', loop: true, rate: 5, shape: { type: 'circle', radius: 16 }, offset: [0, 34],
        speed: 0, life: [0.8, 1.1], size: [8, 14], color: light,
        behaviors: [c.force(0, 120), c.limitSpeed(70, 1), c.noise(2, 6), c.sizeOverLife(c.curve([[0, 0.3], [0.8, 1], [0.92, 1.35], [1, 0]])), c.colorOverLife(c.fade(0.85))], order: 3 })),
      c.sys(c.ground({ tex: 'disc', blend: 'normal', loop: true, rate: 4, shape: { type: 'circle', radius: 18 }, offset: [0, 32],
        speed: 0, life: [0.6, 0.9], size: [4, 7], color: [col, light],
        behaviors: [c.force(0, 100), c.limitSpeed(60, 1), c.noise(2.5, 5), c.sizeOverLife(c.pop(0.2, 0.8)), c.colorOverLife(c.fade(0.8))], order: 2 })),
    ];
  },
};
