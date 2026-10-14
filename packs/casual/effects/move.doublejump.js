/** A mid-air jump: a ring of air under the feet, puffs pushed down and a couple of sparkles. */
export default {
  name: 'move.doublejump',
  category: 'move',
  whenToUse: 'A double jump, an air jump, a wing flap or a mid-air dash start in a platformer. Play it at the character\'s feet at the moment of the jump. For a jump off the ground use move.jump.',
  duration: 0.45, loop: false, anchor: 'feet', tint: '#ffffff',
  tags: ['double jump', 'air jump', 'jump', 'platformer', 'flap', 'air', 'move'],
  build(c) {
    const col = c.color('#ffffff');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.34, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1.15]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 8] }], shape: { type: 'cone', radius: 10, angle: 0.9 }, dir: -Math.PI / 2,
        speed: [140, 260], life: [0.32, 0.45], size: [24, 38], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 22 },
        speed: [50, 110], life: [0.28, 0.38], size: [12, 18], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 }),
    ];
  },
};
