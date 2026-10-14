/** A clang on metal: a hard white star, a spray of bright sparks and a ringing flash. */
export default {
  name: 'hit.metal',
  category: 'hit',
  whenToUse: 'Metal hits metal: a sword on armour, a bullet on a steel wall, a robot struck, a shield bash, a pipe whacked, a blocked blade. Play it at the point of contact. For a successful parry use hit.parry.',
  duration: 0.45, loop: false, tint: '#ffe9a8',
  tags: ['metal', 'clang', 'armor', 'steel', 'sparks', 'robot', 'sword', 'ricochet', 'hit'],
  build(c) {
    const col = c.color('#ffe9a8');
    return [
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 110, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 4 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 90, color: col,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [16, 22] }], shape: { type: 'circle', radius: 4, thickness: 0 },
        speed: [400, 900], life: [0.18, 0.35], size: [3, 6], color: ['#ffffff', col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1400), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.4))], order: 3 })),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 90, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 2 }),
    ];
  },
};
