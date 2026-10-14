/** A lava pool: a hot glow, bubbles swelling and popping across the surface, embers spat into the air. Loops until stopped. */
export default {
  name: 'world.lava',
  category: 'world',
  whenToUse: 'A pool or river of lava, a bubbling cauldron of fire, a volcano crater, molten metal in a forge, a hazard floor. Play it at the centre of the pool and leave it running; size it to the pool (size 2 for a big one).',
  duration: 1, loop: true, anchor: 'feet', tint: '#ff5a1f',
  tags: ['lava', 'magma', 'volcano', 'molten', 'hazard', 'fire', 'cauldron', 'forge', 'hell'],
  build(c) {
    const col = c.color('#ff5a1f');
    const light = c.lighten(col, 0.6);
    const area = c.is3d ? { type: 'circle', radius: 70 } : { type: 'rect', w: 150, h: 0 };
    return [
      c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 220, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0.75, 0.5], [0.55, 1]]))], order: 0 })),
      // bubbles: swell, then pop
      c.sys(c.ground({ tex: 'disc', blend: 'add', loop: true, rate: 6, shape: area,
        speed: 0, life: [0.5, 0.8], size: [12, 22], color: [light, col],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [0.85, 1], [0.92, 1.3], [1, 0]]))], order: 2 })),
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 10, shape: area,
        speed: 0, life: [0.5, 0.9], size: [4, 7], color: [light, '#ffd27a'],
        behaviors: [c.force(0, 120), c.noise(2, 12), c.colorOverLife(c.fade(0.5))], order: 3 })),
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 3, shape: area,
        speed: [180, 300], life: [0.4, 0.6], size: [4, 7], color: light, stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.5))], order: 4 })),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 2, shape: area,
        speed: [5, 15], life: [1.2, 1.8], size: [26, 40], rotation: [0, 6.28], color: '#4a3a34',
        behaviors: [c.force(0, 50), c.limitSpeed(60, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.35, 0.3], [0, 1]]))], order: 1 })),
    ];
  },
};
