/** Life around an undersea plant: a faint sea-green glow breathing over it, small bubbles slipping out of the leaves and wobbling up, glowing motes drifting in the current and a glint now and then. Loops until stopped. */
export default {
  name: 'world.seaweed',
  category: 'world',
  whenToUse: 'Seaweed, kelp, coral, an anemone or a reef plant on the sea floor in an underwater, aquarium or mermaid level: play it at the base of the plant and leave it running to make it feel alive. For a strong stream of bubbles from a vent or a diver use world.bubblecolumn; for ambience over the whole screen use env.underwater; for a flower blooming on land use world.bloom.',
  duration: 2, loop: true, anchor: 'feet', tint: '#5ff0b8',
  tags: ['seaweed', 'kelp', 'coral', 'reef', 'underwater', 'plant', 'bubbles', 'aquarium'],
  build(c) {
    const col = c.color('#5ff0b8');
    const light = c.lighten(col, 0.55);
    const water = '#cdf4ff';
    // the plant stands about 100 px tall on its base
    const leaves = c.is3d ? { type: 'circle', radius: 30 } : { type: 'rect', w: 50, h: 80, thickness: 1 };
    const around = c.is3d ? { type: 'circle', radius: 70 } : { type: 'rect', w: 130, h: 130, thickness: 1 };
    // a bubble swells as it rises and pops at the end
    const bubble = () => c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [0.85, 1.1], [0.93, 1.35], [1, 0]]));
    return [
      // a faint glow over the plant, breathing like the current
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: 150, offset: [0, 55], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.94], [0.5, 1.06], [1, 0.94]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.14, 0], [0.24, 0.5], [0.14, 1]]))], order: 0 }),
      // glowing motes drifting in a slow current round the plant
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 5, shape: around, offset: [0, 60],
        speed: c.is3d ? [2, 6] : 0, life: [2.5, 3.5], size: [3, 6], color: [light, col],
        behaviors: [c.force(10, 4), c.limitSpeed(14, 1), c.noise(0.6, 18), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.5, 0.6], [0.85, 1], [1, 0]])), c.colorOverLife(c.fadeInOut(0.15, 0.8))], order: 1 })),
      // small bubbles slipping out of the leaves, now and then a little gulp of them
      c.sys(c.vol({ tex: 'ring', blend: 'normal', loop: true, world: true, duration: 2, rate: 3, bursts: [{ time: 0.9, count: [2, 3], probability: 0.5 }], shape: leaves, offset: [0, 50],
        speed: c.is3d ? [2, 8] : 0, life: [1.6, 2.4], size: [5, 11], color: water,
        behaviors: [c.force(0, 200), c.limitSpeed(60, 1), c.noise(1.5, 14), bubble(), c.colorOverLife(c.fadeInOut(0.08, 0.9))], order: 2 })),
      // a glint on the leaves now and then
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 1.5, shape: { type: 'rect', w: 60, h: 90, thickness: 1 }, offset: [0, 50],
        speed: 0, life: [0.45, 0.65], size: [9, 14], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.spin(0.8), c.sizeOverLife(c.pop(0.35, 0.5))], order: 3 }),
    ];
  },
};
