/** A power aura: flames of energy roar up around the body, sparks lift off and a glow pulses. Loops until stopped. */
export default {
  name: 'state.aura',
  category: 'state',
  whenToUse: 'A character is powered up and blazing with energy: a super mode, a rage or limit break, a charged-up fighter, a boss phase two, a hero glowing with power. Follow the character (at the feet); stop it when the power ends. Tint it for the power\'s colour.',
  duration: 1, loop: true, anchor: 'feet', tint: '#ffd23a',
  tags: ['aura', 'power up', 'super', 'energy', 'charge', 'rage', 'fighting', 'anime', 'status'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    const base = c.is3d ? { type: 'circle', radius: 34 } : { type: 'rect', w: 76, h: 0 };
    return [
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 40, shape: base,
        speed: 0, life: [0.45, 0.65], size: [30, 48], rotation: [-0.2, 0.2], color: [light, col],
        behaviors: [c.force(0, 520), c.limitSpeed(300, 1), c.noise(3, 10), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 })),
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 14, shape: base,
        speed: 0, life: [0.5, 0.8], size: [4, 7], color: '#ffffff', stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.force(0, 620), c.limitSpeed(360, 1), c.colorOverLife(c.fade(0.5))], order: 3 })),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.5, size: 170, offset: [0, 45], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.08], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.4, 0], [0.6, 0.5], [0.4, 1]]))], order: 0 }),
    ];
  },
};
