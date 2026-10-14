/** Blowing soap bubbles: a shimmering wand ring, shiny bubbles of all sizes puffed out along dir, slowing, wobbling and floating up until they pop, with glints. Loops until stopped. */
export default {
  name: 'magic.bubblewand',
  category: 'magic',
  whenToUse: 'A character blows soap bubbles for a while: a bubble wand or bubble toy in a kids or toddler game, a bath-time or garden play scene, a bubble gun or bubble machine, a cute bubble spell streaming out. Play it at the wand\'s ring, aim it with dir (degrees, default right) or direction in 3D, and stop it when the blowing stops. For bubbles over the whole screen use env.bubbles; for bubbles rising from one spot under water use world.bubblecolumn; for one bubble popping use puzzle.bubble.',
  duration: 1, loop: true, tint: '#8fe3ff',
  tags: ['bubbles', 'soap', 'wand', 'blow', 'kids', 'toy', 'bath', 'magic'],
  build(c) {
    const col = c.color('#8fe3ff');
    const light = c.lighten(col, 0.55);
    const pink = c.mix(light, '#ffc2ec', 0.45);
    const dir = c.dir === undefined ? 0 : c.dir;
    // a bubble's life: blown up fast, drifting at full size, then a quick swell as it pops
    const bubbleSize = () => c.curve([[0, 0.25], [0.12, 1], [0.88, 1], [0.95, 1.25], [1, 0]]);
    const bubbles = (colour, rate, size, speed, life, order) => c.sys(c.spray({ tex: 'ring', blend: 'normal', loop: true, world: true, rate, dir,
      shape: { type: 'cone', radius: 6, angle: 0.35 }, speed, life, size, color: colour,
      behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 36), c.noise(1.2, 26), c.sizeOverLife(bubbleSize()), c.colorOverLife(c.fadeInOut(0.04, 0.85))], order }));
    return [
      // the wand's soap film shimmering
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 34, color: light, cut: true,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.06], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [1, 0.5], [0.6, 1]]))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: 40, color: col, cut: true,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.25, 0], [0.45, 0.5], [0.25, 1]]))], order: 0 }),
      bubbles([col, light], 6, [16, 28], [90, 170], [1.3, 1.8], 2),
      bubbles([pink, light], 4, [10, 18], [110, 200], [1.0, 1.5], 2),
      bubbles(light, 6, [7, 11], [130, 230], [0.7, 1.1], 1),
      // glints catching the light on the stream
      c.sys(c.spray({ tex: 'spark', blend: 'add', loop: true, world: true, rate: 5, dir, shape: { type: 'cone', radius: 8, angle: 0.4 },
        speed: [80, 160], life: [0.35, 0.5], size: [9, 13], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.25)), c.force(0, 30), c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 })),
    ];
  },
};
