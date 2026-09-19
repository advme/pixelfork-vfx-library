/** A sword swoosh: one long streak with sparks along a direction. */
export default {
  name: 'hit.slash',
  category: 'hit',
  whenToUse: 'A sword, claw or blade slash hits. Aim it along the swing: in 2D set dir (degrees, default down-right); in 3D pass direction: [x, y, z].',
  duration: 0.4,
  loop: false,
  tint: '#ffffff',
  tags: ['slash', 'sword', 'blade', 'swoosh', 'cut', 'claw'],
  build(c) {
    const col = c.color('#ffffff');
    const dir = c.dir === undefined ? -Math.PI / 5 : c.dir;
    return [
      // the streak: a fan of fat stretched blobs, so it reads as one thick swoosh
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 7 }], shape: { type: 'cone', radius: 14, angle: 0.12 }, dir,
        speed: [700, 900], life: [0.16, 0.24], size: [40, 60], color: col,
        stretch: { speed: 0.012, length: 2.5 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.fade(0.25)), c.sizeOverLife(c.curve([[0, 0.7], [0.3, 1], [1, 0.2]]))], order: 2 })),
      c.sys(c.spray({ tex: 'disc', blend: 'add', bursts: [{ count: 4 }], shape: { type: 'cone', radius: 8, angle: 0.08 }, dir,
        speed: [800, 1000], life: [0.12, 0.18], size: [22, 30], color: col,
        stretch: { speed: 0.02, length: 3 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.2)), c.sizeOverLife(c.shrink())], order: 3 })),
      // sparks flying off
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 12] }], shape: { type: 'cone', radius: 4, angle: 0.5 }, dir,
        speed: [300, 700], life: [0.2, 0.35], size: [5, 9], color: [col, c.darken(col, 0.2)],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(400), c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 1 })),
      // small flash at the origin
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 60, color: col, rotation: dir,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
    ];
  },
};
