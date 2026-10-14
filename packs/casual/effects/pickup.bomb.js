/** A bomb picked up: the fuse fizzes with spurts of sparks and a little smoke puff while a ring flashes. Nothing explodes. */
export default {
  name: 'pickup.bomb',
  category: 'pickup',
  whenToUse: 'A bomb, dynamite, TNT or grenade item is collected into the inventory, or a bomb power-up is picked up (nothing explodes). Play it where the item was. For the blast itself use explosion.small or explosion.big; for a thrown smoke bomb use weapon.smoke.',
  duration: 0.65, loop: false, tint: '#ffb03a',
  tags: ['bomb', 'dynamite', 'tnt', 'grenade', 'fuse', 'item', 'powerup', 'pickup'],
  build(c) {
    const col = c.color('#ffb03a');
    const light = c.lighten(col, 0.6);
    // where the fuse sits on a bomb picture about 50 px wide. In 3D straight up: the spurts and smoke
    // live in the world and the glow in the camera-facing plane, and only "up" is the same in both
    const fuse = c.is3d ? [0, 24] : [12, 24];
    const fizz = [{ count: 1 }, { time: 0.12, count: 1 }, { time: 0.24, count: 1 }];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // a little smoke puff off the fuse
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 8 }, offset: fuse,
        speed: [30, 70], life: [0.45, 0.65], size: [16, 26], rotation: [0, 6.28], color: ['#6a6a6a', '#8a8a8a'],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.force(0, 90), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0, 1]]))], order: 2 })),
      // the hot glow at the fuse, flaring with each fizz
      c.sys({ tex: 'glow', blend: 'add', bursts: fizz, life: 0.14, size: 60, offset: fuse, color: col,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 3 }),
      // spurts of fuse sparks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }, { time: 0.12, count: [6, 8] }, { time: 0.24, count: [4, 6] }], shape: { type: 'circle', radius: 2, thickness: 0 }, offset: fuse,
        speed: [180, 380], life: [0.2, 0.4], size: [3, 5], color: ['#ffffff', light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.5))], order: 4 })),
      c.sys({ tex: 'spark', blend: 'add', bursts: fizz, life: 0.1, size: 46, rotation: [0, 0.8], offset: fuse, color: '#ffffff',
        behaviors: [c.colorOverLife(c.fade(0.3))], order: 5 }),
    ];
  },
};
