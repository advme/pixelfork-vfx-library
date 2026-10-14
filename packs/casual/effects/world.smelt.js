/** A furnace at work: an orange glow flickers, small flames lick at the mouth, embers pop out and fall, faint heat wisps rise. Loops until stopped. */
export default {
  name: 'world.smelt',
  category: 'world',
  whenToUse: 'A furnace, smelter, forge, kiln, oven or blacksmith hearth is working: ore being smelted, metal heating, a crafting station busy in an idle, factory or survival game. Play it at the furnace opening and leave it running; stop it when the fire goes out. For an open campfire use world.campfire; for a pool of molten metal use world.lava.',
  duration: 1, loop: true, tint: '#ff7a1f',
  tags: ['furnace', 'smelter', 'forge', 'kiln', 'crafting', 'blacksmith', 'factory', 'fire'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.55);
    const mouth = c.is3d ? { type: 'circle', radius: 18 } : { type: 'rect', w: 50, h: 0 };
    return [
      // the flickering glow and its hot core
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.35, bursts: [{ count: 1 }], life: 0.35, size: [160, 185], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.6, 0.4], [0.45, 1]]))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.25, bursts: [{ count: 1 }], life: 0.25, size: [60, 75], color: '#fff2c4',
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.7, 0.5], [0.5, 1]]))], order: 2 }),
      // heat wisps: faint warm haze curling upward
      c.sys({ tex: 'puff', blend: 'add', loop: true, rate: 5, shape: { type: 'circle', radius: 18 }, offset: [0, 40],
        speed: [10, 30], life: [1.0, 1.4], size: [26, 40], rotation: [0, 6.28], color: c.darken(col, 0.55),
        behaviors: [c.force(0, 90), c.limitSpeed(80, 1), c.noise(1.2, 18), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.35, 0.3], [0, 1]]))], order: 1 }),
      // small flames licking up at the mouth
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 18, shape: mouth,
        speed: 0, life: [0.3, 0.45], size: [18, 30], color: [light, col],
        behaviors: [c.force(0, 300), c.limitSpeed(160, 1), c.noise(3, 8), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // embers popping out and falling, with now and then a little crackle of several at once
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, rate: 6, bursts: [{ time: 0.4, count: [3, 5], probability: 0.4 }], shape: { type: 'cone', radius: 10, angle: 0.8 }, dir: Math.PI / 2,
        speed: [140, 280], life: [0.6, 0.9], size: [4, 7], color: [light, '#ffd27a'],
        behaviors: [c.gravity(700), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
      // embers drifting up on the heat
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 6, shape: mouth, offset: [0, 20],
        speed: 0, life: [1.0, 1.5], size: [2.5, 5], color: [light, '#ffd27a'],
        behaviors: [c.force(0, 120), c.limitSpeed(90, 1), c.noise(2, 22), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 4 })),
    ];
  },
};
