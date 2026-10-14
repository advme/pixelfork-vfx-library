/** A glowing crystal: a soft pulsing glow, twinkles appearing on its faces and motes drifting up. Loops until stopped. */
export default {
  name: 'world.crystal',
  category: 'world',
  whenToUse: 'A magic crystal, gem cluster, power core, energy stone or glowing ore in the world: cave crystals, a mana well, a sci-fi reactor core, a collectible that should catch the eye. Play it on the crystal and leave it running.',
  duration: 1.6, loop: true, tint: '#7ff0ff',
  tags: ['crystal', 'gem', 'glow', 'magic', 'ore', 'cave', 'energy', 'core', 'shiny'],
  build(c) {
    const col = c.color('#7ff0ff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 150, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.7, 0.5], [0.35, 1]]))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 5, shape: { type: 'rect', w: 50, h: 80, thickness: 1 },
        speed: 0, life: [0.35, 0.6], size: [12, 20], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 2 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 6, shape: { type: 'circle', radius: 30 },
        speed: [5, 20], life: [1.2, 1.8], size: [3, 6], color: light,
        behaviors: [c.force(0, 50), c.limitSpeed(40, 1), c.noise(1, 14), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]))], order: 1 })),
    ];
  },
};
