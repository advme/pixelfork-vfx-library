/** A dash: a burst of streaks and a puff in the direction of the move. */
export default {
  name: 'move.dash',
  category: 'move',
  whenToUse: 'A dodge, a dash, a blink or a sudden burst of speed. The streaks fly BACKWARD, opposite to the dash: in 2D set dir (degrees, default left = dashing right); in 3D pass direction: [x, y, z] (the opposite of the movement).',
  duration: 0.5,
  loop: false,
  tint: '#ffffff',
  tags: ['dash', 'dodge', 'burst', 'blink', 'sprint', 'streak'],
  build(c) {
    const col = c.color('#ffffff');
    const dir = c.dir === undefined ? Math.PI : c.dir;
    return [
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 14] }], shape: { type: 'cone', radius: 30, angle: 0.15 }, dir,
        speed: [700, 1100], life: [0.2, 0.32], size: [6, 12], color: col,
        // 3D: shorter streaks; in perspective long ones span half the screen
        stretch: { speed: c.is3d ? 0.012 : 0.03, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.3)), c.sizeOverLife(c.shrink())], order: 2 })),
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'cone', radius: 10, angle: 0.5 }, dir,
        speed: [100, 250], life: [0.3, 0.45], size: [22, 36], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.05)), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
    ];
  },
};
