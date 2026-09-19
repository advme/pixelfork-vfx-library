/** A parry or perfect block: a sharp white clang with a spray of sparks. */
export default {
  name: 'hit.parry',
  category: 'hit',
  whenToUse: 'A parry, a perfect block, a deflected bullet, swords clashing, a counter. Sharp and bright. Aim the spark spray: dir (degrees) in 2D, direction: [x, y, z] in 3D (default up).',
  duration: 0.45, loop: false, tint: '#ffffff',
  tags: ['parry', 'block', 'clang', 'counter', 'deflect', 'clash'],
  build(c) {
    const col = c.color('#ffffff');
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    return [
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 170, color: col, rotation: 0.78,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.15, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 120, color: col, rotation: 0,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 18] }], shape: { type: 'cone', radius: 4, angle: 0.7 }, dir,
        speed: [400, 900], life: [0.2, 0.4], size: [5, 9], color: [col, '#ffd580'],
        stretch: { speed: 0.025, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 })),
    ];
  },
};
