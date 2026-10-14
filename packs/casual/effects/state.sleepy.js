/** Sleepy: soft lavender Zs drift up slowly and sway, little dream bubbles float off and a dreamy glow breathes slowly over the head. Loops until stopped. */
export default {
  name: 'state.sleepy',
  category: 'state',
  whenToUse: 'A pet or cute character is drowsy, dozing or napping in a cosy, dreamy way: a sleepy kitten in its bed, bedtime in a kids or pet-care game, a pet whose energy is low and needs rest, a yawning baby animal. Follow the head; stop it when it wakes. For a plain asleep, idle or knocked-out status use state.sleep.',
  duration: 2.4, loop: true, anchor: 'head', tint: '#b8a4ff',
  tags: ['sleepy', 'drowsy', 'nap', 'tired', 'zzz', 'dream', 'pet', 'bedtime', 'status'],
  build(c) {
    const col = c.color('#b8a4ff');
    const light = c.lighten(col, 0.5);
    return [
      // a dreamy glow breathing slowly over the head
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 2.4, bursts: [{ count: 1 }], offset: [6, 4], life: 2.4, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.05], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.1, 0], [0.24, 0.5], [0.1, 1]]))], order: 0 }),
      // slow floating Zs, growing as they rise and drifting off to one side
      c.sys({ tex: 'z', blend: 'normal', loop: true, world: true, rate: 0.85, shape: { type: 'circle', radius: 5 }, offset: [16, 12],
        speed: 0, life: [2.2, 2.6], size: 14, rotation: [-0.25, 0.1], color: [light, col],
        behaviors: [c.force(10, 60), c.limitSpeed(30, 1), c.noise(0.7, 12), c.spin(-0.35, 0.35),
          c.sizeOverLife(c.curve([[0, 0.4], [0.12, 1], [0.7, 1.7], [1, 2]])), c.colorOverLife(c.fadeInOut(0.1, 0.7))], order: 2 }),
      // soft dream bubbles drifting up and away
      c.sys({ tex: 'ring', blend: 'normal', loop: true, world: true, rate: 1.1, shape: { type: 'circle', radius: 14 }, offset: [-6, 6],
        speed: 0, life: [1.6, 2.1], size: [9, 15], color: c.lighten(col, 0.25),
        behaviors: [c.force(-8, 50), c.limitSpeed(26, 1), c.noise(1, 14),
          c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.85, 1.1], [0.92, 1.3], [1, 0]])), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 1 }),
      // tiny twinkles of dream dust rising with them
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 1.6, shape: { type: 'circle', radius: 26 }, offset: [4, 14],
        speed: 0, life: [0.7, 1], size: [6, 9], color: '#ffffff',
        behaviors: [c.force(0, 30), c.limitSpeed(18, 1), c.sizeOverLife(c.pop(0.35, 0.55))], order: 3 }),
    ];
  },
};
