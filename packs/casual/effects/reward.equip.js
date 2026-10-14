/** Equipping new gear: a ring flashes on the floor, a glowing ring sweeps up the body from the feet to the head with sparkles riding along, and the new look pops with a burst of glints. */
export default {
  name: 'reward.equip',
  category: 'reward',
  whenToUse: 'The player equips a new weapon, armour, helmet, outfit or skin, or picks a new character in a shop, dressing room or loadout screen: play it at the character\'s feet the moment the new look appears and tint it by rarity. For upgrading an item use reward.upgrade; for levelling up use reward.levelup; for a magical change of shape use magic.transform; for a stat buff in battle use magic.buff.',
  duration: 0.9, loop: false, anchor: 'feet', tint: '#4fe3ff',
  tags: ['equip', 'gear', 'skin', 'outfit', 'armor', 'loadout', 'shop', 'rpg'],
  build(c) {
    const col = c.color('#4fe3ff');
    const light = c.lighten(col, 0.6);
    // rings that lie level around the body: side-on 'ellipse' in 2D, level rings in 3D that keep their own height
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const floor = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the sweep's motion: everything that rides it gets the same push and speed limit, so it all travels up together
    // (about 100 px in 0.55 s: from the feet to just over the head)
    const rise = () => [c.force(0, 1200), c.limitSpeed(170, 1)];
    return [
      // a flash ring on the floor as it starts
      floor({ blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // a soft column of light over the body
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.85, size: 160, offset: [0, 48], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.25], [0.3, 0.7], [0, 1]]))], order: 0 }),
      // the sweeping ring: a coloured band with a bright band inside it, narrowing a little toward the head
      ring({ blend: 'normal', bursts: [{ time: 0.02, count: 1 }], offset: [0, 4], life: 0.56, size: 96, color: col,
        behaviors: rise().concat([c.sizeOverLife(c.curve([[0, 1.1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.1], [0.9, 0.8], [0, 1]]))]), order: 2 }),
      ring({ blend: 'add', bursts: [{ time: 0.02, count: 1 }], offset: [0, 4], life: 0.56, size: 86, color: light,
        behaviors: rise().concat([c.sizeOverLife(c.curve([[0, 1.1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.1], [1, 0.8], [0, 1]]))]), order: 3 }),
      // sparkles riding the ring, winking out along the way
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ time: 0.02, count: [8, 10] }], shape: c.is3d ? { type: 'circle', radius: 44, thickness: 0 } : { type: 'rect', w: 92, h: 0 }, offset: [0, 4],
        speed: 0, life: [0.2, 0.56], size: [9, 15], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: rise().concat([c.sizeOverLife(c.pop(0.25, 0.6))]), order: 4 })),
      // twinkles winking on all over the new look
      c.sys({ tex: 'spark', blend: 'add', rate: 24, duration: 0.52, shape: { type: 'rect', w: 80, h: 92, thickness: 1 }, offset: [0, 46],
        speed: 0, life: [0.25, 0.38], size: [8, 14], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.4, 0.5))], order: 4 }),
      // the new look pops: glints bursting out round the body as the ring passes the head
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.5, count: [10, 12] }], shape: { type: 'circle', radius: 20 }, offset: [0, 56],
        speed: [140, 280], life: [0.3, 0.38], size: [10, 16], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.5, count: 1 }], life: 0.2, size: 110, offset: [0, 56], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
    ];
  },
};
