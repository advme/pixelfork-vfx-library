/** Charmed: pink hearts circle above the head with a ba-dum heartbeat, sending out a hypnotic pink ripple, with sparkles and tiny hearts floating off. Loops until stopped. */
export default {
  name: 'state.charmed',
  category: 'state',
  whenToUse: 'A character is charmed, hypnotised or mind-controlled for a while: a charm spell, a siren\'s song, an enemy turned to fight on your side, a love potion that makes them follow you. Play it over the head with follow; stop it when the charm breaks. For a happy or in-love pet use state.love; for dark, evil possession use state.possessed; for dizzy circling stars use state.stun.',
  duration: 1.2, loop: true, anchor: 'head', tint: '#ff4fa3',
  tags: ['charm', 'charmed', 'hypnotised', 'mind control', 'hearts', 'love spell', 'seduce', 'status'],
  build(c) {
    const col = c.color('#ff4fa3');
    const light = c.lighten(col, 0.5);
    const cy = 6;
    // ba-dum: two quick beats at the start of every turn
    const beat = () => c.sizeOverLife(c.curve([[0, 1], [0.08, 1.3], [0.16, 1], [0.24, 1.22], [0.34, 1], [1, 1]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 90, offset: [0, cy], color: col,
        behaviors: [beat(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.42, 0], [0.42, 0.3], [0.26, 1]]))], order: 0 }),
      // a hypnotic ripple sent out on each heartbeat
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.2, bursts: [{ time: 0.05, count: 1 }], life: 0.6, size: 96, offset: [0, cy], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0, 1]]))], order: 1 }),
      // three hearts circling, one full turn per cycle, so each replaces itself seamlessly
      c.sys(c.ground({ tex: 'heart', blend: 'normal', loop: true, duration: 1.2, bursts: [{ count: 3 }], shape: { type: 'circle', radius: 26, thickness: 0, even: true }, offset: [0, cy],
        speed: 0, life: 1.2, size: 20, color: col,
        behaviors: [c.orbit(c.TAU / 1.2), beat()], order: 2 })),
      // tiny hearts floating off
      c.sys(c.ground({ tex: 'heart', blend: 'normal', loop: true, rate: 1.6, shape: { type: 'circle', radius: 24 }, offset: [0, cy],
        speed: 0, life: [0.8, 1.1], size: [8, 11], color: light,
        behaviors: [c.force(0, 90), c.limitSpeed(60, 1), c.noise(1.5, 6), c.sizeOverLife(c.pop(0.2, 0.6)), c.colorOverLife(c.fade(0.6))], order: 3 })),
      // sparkles
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 8, shape: { type: 'circle', radius: 30 }, offset: [0, cy],
        speed: 0, life: [0.4, 0.65], size: [7, 12], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 30), c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
    ];
  },
};
