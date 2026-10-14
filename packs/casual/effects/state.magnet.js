/** A coin magnet power-up: magnetic rings pulse around the character and sparkles get pulled in. Loops until stopped. */
export default {
  name: 'state.magnet',
  category: 'state',
  whenToUse: 'A magnet, vacuum or attract power-up is active: endless runners, coin collectors, auto-pickup buffs, a gravity field. Follow the character; stop it when the power-up runs out.',
  duration: 1, loop: true, tint: '#ff4f6b',
  tags: ['magnet', 'powerup', 'attract', 'coins', 'runner', 'vacuum', 'buff', 'status'],
  build(c) {
    const col = c.color('#ff4f6b');
    const light = c.lighten(col, 0.6);
    return [
      // rings closing in on the character
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }, { time: 0.5, count: 1 }], life: 0.6, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.35]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.3], [0, 1]]))], order: 1 }),
      // sparkles pulled inward
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 26, shape: { type: 'circle', radius: 90, thickness: 0 },
        speed: [-220, -180], life: [0.4, 0.48], size: [5, 8], color: light, stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.6, 1], [1, 0]]))], order: 2 })),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 90, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.5, 0.5], [0.3, 1]]))], order: 0 }),
    ];
  },
};
