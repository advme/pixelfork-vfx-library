/** Enraged: red steam and sparks boiling off the character. Loops until stopped. */
export default {
  name: 'state.rage',
  category: 'state',
  whenToUse: 'A character is angry, enraged, berserk or powered up with a damage boost. Follow the head; stop when it ends.',
  duration: 1, loop: true, tint: '#ff3b3b',
  tags: ['rage', 'angry', 'berserk', 'power', 'steam', 'status', 'buff'],
  build(c) {
    const col = c.color('#ff3b3b');
    const light = c.lighten(col, 0.5);
    return [
      c.sys(c.ground({ tex: 'puff', blend: 'add', loop: true, rate: 12, shape: { type: 'circle', radius: 18 },
        speed: [20, 60], life: [0.5, 0.8], size: [18, 30], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.force(0, 200), c.limitSpeed(150, 1), c.noise(3, 8), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 1 })),
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 16, shape: { type: 'circle', radius: 20 },
        speed: [60, 160], life: [0.3, 0.6], size: [4, 8], color: light,
        stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.force(0, 300), c.noise(5, 10), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 2 })),
    ];
  },
};
