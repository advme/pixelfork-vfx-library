/** An electric hit: a blue-white flash, jagged sparks crackling outward and little bolts popping. */
export default {
  name: 'hit.electric',
  category: 'hit',
  whenToUse: 'An electric or lightning attack lands: a taser, a shock trap, a thunder sword, a zapped enemy, an electric fence touched. Play it on the target. For a bolt from the sky use magic.lightning; for a shield being hit use hit.shieldzap.',
  duration: 0.55, loop: false, tint: '#7fd8ff',
  tags: ['electric', 'shock', 'zap', 'lightning', 'thunder', 'stun', 'spark', 'hit'],
  build(c) {
    const col = c.color('#7fd8ff');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }, { time: 0.08, count: 1 }], life: 0.12, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // jagged sparks: fast streaks shaken by heavy noise
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 16] }, { time: 0.08, count: [6, 8] }], shape: { type: 'circle', radius: 6, thickness: 0 },
        speed: [350, 700], life: [0.12, 0.22], size: [4, 7], color: ['#ffffff', col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.noise(40, 30), c.colorOverLife(c.fade(0.4))], order: 3 })),
      c.sys(c.vol({ tex: 'bolt', blend: 'add', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 20 },
        speed: [60, 140], life: [0.3, 0.42], size: [22, 32], rotation: [-0.5, 0.5], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.1], [0.3, 0.9], [0.5, 1.05], [1, 0]]))], order: 4 })),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.16, size: 120, rotation: [0, 1.6], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
    ];
  },
};
