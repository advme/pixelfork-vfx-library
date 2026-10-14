/** An item being enchanted: rune-like motes circle it in two rings, a violet glow breathes, a ring draws in and glints, sparkles float up. Loops until stopped. */
export default {
  name: 'world.enchant',
  category: 'world',
  whenToUse: 'An item is being enchanted, imbued or infused with magic: an enchanting table or altar at work, a weapon receiving a rune, a gem being socketed, magic crafting in progress. Play it on the item and stop it when done (then play reward.upgrade, or hit.upgradefail if it failed). For a character charging a spell use magic.cast; for a glowing crystal in the level use world.crystal.',
  duration: 1.2, loop: true, tint: '#b45cff',
  tags: ['enchant', 'imbue', 'rune', 'crafting', 'magic', 'altar', 'infuse', 'upgrade'],
  build(c) {
    const col = c.color('#b45cff');
    const light = c.lighten(col, 0.6);
    // rune-like motes on a ring round the item. In 3D the ring lies level and slowly climbs the item (the orbit axis is
    // world up, so the lift stays a clean spiral); in 2D a lift would bend the circle, so they only circle.
    const runes = (tex, rotation, radius, turn, rate, order) => c.sys(c.ground({ tex, blend: 'add', loop: true, rate, shape: { type: 'circle', radius, thickness: 0 },
      offset: c.is3d ? [0, -35] : [0, 0], speed: 0, life: [1.2, 1.6], size: [10, 16], rotation, color: [light, col],
      behaviors: [c.orbit(turn)].concat(c.is3d ? [c.force(0, 50), c.limitSpeed(50, 1)] : [], [c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]])), c.colorOverLife(c.fadeInOut(0.15, 0.7))]), order }));
    return [
      // the breathing glow
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.08], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.65, 0.5], [0.35, 1]]))], order: 0 }),
      // a ring drawing the magic in, once a cycle, and the item glinting as it drinks it
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 0.85, size: 160, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.3]])), c.colorOverLife(c.fadeInOut(0.25, 0.75))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 1.2, bursts: [{ time: 0.8, count: 1 }], life: 0.35, size: 70, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(3), c.sizeOverLife(c.curve([[0, 0.2], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 5 }),
      runes('plus', [0, 0.5], 56, 2.2, 7, 3),
      runes('square', Math.PI / 4, 36, -3, 6, 3),
      // sparkles floating up off the item
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 10, shape: c.is3d ? { type: 'circle', radius: 36 } : { type: 'rect', w: 70, h: 0 }, offset: [0, -20],
        speed: 0, life: [0.8, 1.2], size: [6, 11], color: light,
        behaviors: [c.force(0, 140), c.limitSpeed(90, 1), c.noise(1.5, 10), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 })),
    ];
  },
};
