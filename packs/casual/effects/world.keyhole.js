/** A key turns in a lock: golden sparkles spiral into the keyhole, the light gathers, then a gold flash, a click glint and a ring pop out with a few stars. */
export default {
  name: 'world.keyhole',
  category: 'world',
  whenToUse: 'A key the player carries is used on a lock (a locked door, chest, gate or padlock in an adventure, dungeon or escape-room game); play it on the lock, then world.dooropen or reward.chest for what opens, and use pickup.key for picking the key up or ui.unlock for an unlock on a menu screen.',
  duration: 0.85, loop: false, tint: '#ffcf3f',
  tags: ['key', 'lock', 'unlock', 'keyhole', 'door', 'padlock', 'adventure', 'escape room'],
  build(c) {
    const col = c.color('#ffcf3f');
    const light = c.lighten(col, 0.6);
    const pop = 0.3;
    return [
      // sparkles spiralling into the lock
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 80, thickness: 0, even: true },
        speed: -236, life: 0.32, size: [11, 15], rotation: [0, 6.28], color: light,
        behaviors: [c.orbit(2.5), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.4]]))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 10 }], shape: { type: 'circle', radius: 60, thickness: 0, even: true },
        speed: -200, life: 0.28, size: [5, 8], color: ['#ffffff', light],
        behaviors: [c.orbit(3), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.5]]))], order: 3 }),
      // the light gathering in the lock, then the gold flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: pop, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.grow(0.2)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.2, 0], [0.8, 1]]))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: pop, count: 1 }], life: 0.3, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: pop, count: 1 }], life: 0.4, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the click glint
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: pop, count: 1 }], life: 0.35, size: 110, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(2.5), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 0]]))], order: 4 }),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: pop, count: [6, 8] }], shape: { type: 'circle', radius: 8 },
        speed: [150, 280], life: [0.4, 0.55], size: [10, 15], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(450), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.6))], order: 5 })),
    ];
  },
};
