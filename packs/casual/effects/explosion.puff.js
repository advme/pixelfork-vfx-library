/** A soft cartoon POOF of smoke, no fire. */
export default {
  name: 'explosion.puff',
  category: 'explosion',
  whenToUse: 'Something vanishes, pops or gets squashed without fire: an enemy poofing away, a balloon, a magic disappearance, a cartoon collision.',
  duration: 0.8,
  loop: false,
  tint: '#ffffff',
  tags: ['poof', 'puff', 'smoke', 'vanish', 'pop', 'cartoon'],
  build(c) {
    const col = c.color('#ffffff');
    return [
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [9, 12] }], shape: { type: 'circle', radius: 14 },
        speed: [80, 220], life: [0.45, 0.7], size: [40, 70], rotation: [0, 6.28], color: [col, c.darken(col, 0.12)],
        behaviors: [c.speedOverLife(c.decel(0.05)), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.1]])), c.spin(-2, 2),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.9, 0.5], [0, 1]]))], order: 1 })),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [5, 7] }], shape: { type: 'circle', radius: 10 },
        speed: [200, 380], life: [0.3, 0.45], size: [10, 18], color: col,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 2 })),
    ];
  },
};
