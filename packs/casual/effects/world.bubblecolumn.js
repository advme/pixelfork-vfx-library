/** A column of bubbles rising from one spot, wobbling and swelling as they climb, with a soft glow at the source. Loops until stopped. */
export default {
  name: 'world.bubblecolumn',
  category: 'world',
  whenToUse: 'Bubbles rise steadily from one spot under water: a vent or crack in the sea floor, a diver\'s or submarine\'s air, a fish-tank air stone, a sunken treasure chest, a hidden cave entrance, a bubbling swamp. Play it at the source and leave it running. For bubbles over the whole screen use env.bubbles; for a swimming character use move.swim.',
  duration: 1.6, loop: true, anchor: 'feet', tint: '#bfefff',
  tags: ['bubbles', 'underwater', 'vent', 'diver', 'aquarium', 'sea floor', 'air', 'swamp'],
  build(c) {
    const col = c.color('#bfefff');
    // 3D: a small patch on the sea floor; 2D: a short line, so the column starts from the floor
    const src = c.is3d ? { type: 'circle', radius: 10 } : { type: 'rect', w: 22, h: 0 };
    const rise = (p) => c.sys(c.ground(Object.assign({ loop: true, shape: src, speed: 0 }, p)));
    return [
      // the glow at the source, breathing
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 70, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.45, 0.5], [0.3, 1]]))], order: 0 }),
      // big bubbles: a steady stream, plus a gulp of a few now and then
      rise({ tex: 'ring', blend: 'normal', duration: 1.6, rate: 6, bursts: [{ time: 0.3, count: [3, 5], probability: 0.6 }, { time: 1.1, count: [2, 3], probability: 0.4 }],
        life: [1.6, 2.1], size: [10, 18], color: col,
        behaviors: [c.force(0, 320), c.limitSpeed(135, 1), c.noise(2, 26), c.sizeOverLife(c.curve([[0, 0.35], [0.8, 1], [1, 1.15]])), c.colorOverLife(c.fadeInOut(0.06, 0.85))], order: 2 }),
      // small fast bubbles
      rise({ tex: 'ring', blend: 'normal', rate: 14, life: [1.2, 1.6], size: [4, 8], color: c.lighten(col, 0.4),
        behaviors: [c.force(0, 380), c.limitSpeed(175, 1), c.noise(3, 18), c.colorOverLife(c.fadeInOut(0.06, 0.85))], order: 3 }),
      // shiny glints between them
      rise({ tex: 'glow', blend: 'add', rate: 10, life: [1.2, 1.8], size: [3, 6], color: col,
        behaviors: [c.force(0, 300), c.limitSpeed(150, 1), c.noise(2.5, 22), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 1 }),
    ];
  },
};
