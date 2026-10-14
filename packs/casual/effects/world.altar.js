/** A cursed altar fire: dark purple-black flames around a bright violet heart, an evil pulsing glow, embers drifting up and a thread of black smoke. Loops until stopped. */
export default {
  name: 'world.altar',
  category: 'world',
  whenToUse: 'A cursed altar, an evil brazier, a demon shrine, a witch\'s cauldron fire, a ritual candle stand or a dark-magic beacon in a dungeon, temple or haunted level. Play it where the flames sit on top of the altar and leave it running. For an ordinary warm fire use world.campfire or world.torch; for an altar or table enchanting an item use world.enchant.',
  duration: 1, loop: true, tint: '#b44dff',
  tags: ['altar', 'brazier', 'cursed', 'shrine', 'ritual', 'dark fire', 'dungeon', 'evil'],
  build(c) {
    const col = c.color('#b44dff');
    const light = c.lighten(col, 0.55);
    // the fire's base: a disc in 3D, the upper half of a circle in 2D so the flames fan up and out
    const base = c.is3d ? { type: 'circle', radius: 16 } : { type: 'circle', radius: 18, arc: Math.PI };
    return [
      // the evil glow, pulsing
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.6, bursts: [{ count: 1 }], life: 0.6, size: 160, offset: [0, 26], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.07], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.52, 0.5], [0.35, 1]]))], order: 0 }),
      // dark flames: the black-purple body of the fire (normal blend, so they can be dark)
      c.sys(c.ground({ tex: 'flame', blend: 'normal', loop: true, rate: 22, shape: base,
        speed: [10, 30], life: [0.5, 0.75], size: [34, 54], color: [c.darken(col, 0.72), c.darken(col, 0.88)],
        behaviors: [c.force(0, 240), c.limitSpeed(200, 1), c.noise(3, 10), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.75, 0.5], [0, 1]]))], order: 1 })),
      // violet tongues of fire inside
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 26, shape: { type: 'circle', radius: 12 },
        speed: [5, 20], life: [0.35, 0.55], size: [22, 38], color: [light, col],
        behaviors: [c.force(0, 270), c.limitSpeed(210, 1), c.noise(4, 8), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.45))], order: 2 })),
      // the pale hot core
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 14, shape: { type: 'circle', radius: 6 },
        speed: [2, 10], life: [0.25, 0.35], size: [12, 20], color: '#f3dcff',
        behaviors: [c.force(0, 240), c.limitSpeed(170, 1), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // embers drifting off
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 8, shape: { type: 'circle', radius: 14 },
        speed: [20, 50], life: [1.2, 2.0], size: [3, 6], color: [light, '#ff7ae0'],
        behaviors: [c.force(0, 130), c.limitSpeed(110, 1), c.noise(1.6, 30), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 4 })),
      // a thread of black smoke
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 3, shape: { type: 'circle', radius: 6 }, offset: [0, 62],
        speed: [5, 15], life: [1.4, 2.0], size: [18, 30], rotation: [0, 6.28], color: ['#2a1838', '#1a1024'],
        behaviors: [c.force(0, 50), c.limitSpeed(60, 1), c.noise(0.8, 14), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0.5], [1, 2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.2], [0.25, 0.6], [0, 1]]))], order: 1 }),
    ];
  },
};
