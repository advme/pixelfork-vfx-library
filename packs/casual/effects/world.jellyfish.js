/** A glowing jellyfish: a soft pink-violet glow that swells with each squeeze of the bell, a bright core, a ring of light sent out on every pulse and tiny sparkles trailing down from the tentacles. Loops until stopped. */
export default {
  name: 'world.jellyfish',
  category: 'world',
  whenToUse: 'A glowing jellyfish, a bioluminescent sea creature or a floating deep-sea light in an underwater, night-ocean or aquarium level: play it on the jellyfish\'s bell (follow it if it swims, the sparkles trail behind) and leave it running; tint it blue or green for other glowing creatures. For a glowing undersea plant use world.seaweed; for a magic crystal use world.crystal; for wandering fireflies on land use env.fireflies.',
  duration: 1.4, loop: true, tint: '#e07bff',
  tags: ['jellyfish', 'glow', 'bioluminescent', 'underwater', 'sea', 'deep sea', 'aquarium', 'creature'],
  build(c) {
    const col = c.color('#e07bff');
    const light = c.lighten(col, 0.55);
    // the pink-violet blend only for the default colour, so a blue or green tint stays clean
    const pink = c.tint ? c.lighten(col, 0.15) : c.mix(col, '#ff7fc8', 0.35);
    const L = 1.4;
    // the bell squeezes early in each cycle and slowly relaxes; the light swells on the squeeze
    const beat = (a, b) => c.sizeOverLife(c.curve([[0, a], [0.3, b], [1, a]]));
    const alpha = (keys) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], keys));
    // the tentacles hang just below the bell
    const tips = c.is3d ? { type: 'circle', radius: 22 } : { type: 'rect', w: 46, h: 0 };
    return [
      // the soft outer glow
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 150, color: pink,
        behaviors: [beat(0.9, 1.08), alpha([[0.2, 0], [0.42, 0.3], [0.2, 1]])], order: 0 }),
      // a soft ring of light sent out on each squeeze
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: L, bursts: [{ time: 0.3, count: 1 }], life: 0.8, size: 150, offset: [0, 6], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [1, 1]])), alpha([[0.5, 0], [0, 1]])], order: 1 }),
      // the bright core in the bell
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 70, offset: [0, 6], color: col,
        behaviors: [beat(0.85, 1.1), alpha([[0.45, 0], [0.8, 0.3], [0.45, 1]])], order: 2 }),
      // tiny sparkles trailing down from the tentacles; they stay where they are born, so they trail behind when it swims
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, world: true, rate: 9, shape: tips, offset: [0, -16],
        speed: 0, life: [1.0, 1.5], size: [6, 10], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.force(0, -50), c.limitSpeed(32, 1), c.noise(1.2, 8), c.spin(1), c.sizeOverLife(c.pop(0.2, 0.6))], order: 3 })),
      // glowing motes drifting down with them
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 8, shape: tips, offset: [0, -20],
        speed: 0, life: [1.2, 1.8], size: [3, 6], color: [pink, light],
        behaviors: [c.force(0, -40), c.limitSpeed(26, 1), c.noise(0.9, 10), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 3 })),
    ];
  },
};
