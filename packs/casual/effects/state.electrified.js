/** Electrified: sparks crackle and jump across the body, little bolts flicker, a cold blue glow flickers. Loops until stopped. */
export default {
  name: 'state.electrified',
  category: 'state',
  whenToUse: 'A character or object is charged with electricity or being shocked over time: stunned by a taser, standing in electric water, an overloaded robot, a powered-up machine, a lightning buff. Follow it; stop it when it ends.',
  duration: 1, loop: true, tint: '#7fd8ff',
  tags: ['electric', 'shock', 'sparks', 'crackle', 'charged', 'robot', 'stun', 'status'],
  build(c) {
    const col = c.color('#7fd8ff');
    return [
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 36, shape: { type: 'circle', radius: 34 },
        speed: [200, 420], life: [0.05, 0.1], size: [3, 6], color: ['#ffffff', col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.noise(40, 30)], order: 2 })),
      c.sys(c.vol({ tex: 'bolt', blend: 'add', loop: true, rate: 4, shape: { type: 'circle', radius: 36 },
        speed: 0, life: [0.1, 0.16], size: [16, 24], rotation: [-0.6, 0.6], color: col, order: 3 })),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.3, bursts: [{ count: 1 }, { time: 0.1, count: 1 }], life: 0.12, size: 120, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0, 1]]))], order: 0 }),
    ];
  },
};
