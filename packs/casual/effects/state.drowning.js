/** Out of air underwater: a blue alarm pulse throbs round the head with a ring sent out each beat, a gulp of big bubbles escapes from the mouth every second and a trickle of small ones wobbles up after it. Loops until stopped. */
export default {
  name: 'state.drowning',
  category: 'state',
  whenToUse: 'A character is running out of air under water: a diver or swimmer whose oxygen meter is nearly empty, someone trapped in a flooding room or held under, a breath-holding challenge about to fail; follow the head and stop it when they surface or get air. For a calm swimming trail use move.swim; for being soaked after leaving the water use state.wet; for bubbles from a fixed spot use world.bubblecolumn.',
  duration: 1.2, loop: true, anchor: 'head', tint: '#4fc3ff',
  tags: ['drowning', 'oxygen', 'air', 'underwater', 'bubbles', 'diver', 'breath', 'status'],
  build(c) {
    const col = c.color('#4fc3ff');
    const light = c.lighten(col, 0.55);
    // the head anchor sits just above the head; the face is a little below it and the mouth just off to one side
    const face = [0, -14], mouth = [6, -18];
    const L = 1.2;
    // a bubble swells as it rises and pops at the end
    const bubble = () => c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [0.85, 1.1], [0.93, 1.35], [1, 0]]));
    return [
      // the blue alarm pulse round the head, one beat a cycle
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 110, offset: face, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [0.15, 1.12], [0.6, 0.85], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.15, 0], [0.5, 0.15], [0.2, 0.6], [0.15, 1]]))], order: 0 }),
      // a ring sent out with each beat
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: L, bursts: [{ count: 1 }], life: 0.6, size: 130, offset: face, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.35], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 1 }),
      // a gasp: a gulp of big bubbles escaping from the mouth once a cycle; they stay in the water when the character moves.
      // The upper half-circle in 2D; in 3D a wide cone aimed up (c.vol turns an upper half-circle into a hemisphere facing +z, not up)
      c.sys(c.spray({ tex: 'ring', blend: 'normal', loop: true, world: true, duration: L, bursts: [{ time: 0.1, count: [4, 6] }], shape: c.is3d ? { type: 'cone', radius: 6, angle: 1.0 } : { type: 'circle', radius: 6, arc: Math.PI }, offset: mouth,
        speed: [40, 90], life: [0.9, 1.2], size: [9, 16], color: light,
        behaviors: [c.force(0, 260), c.limitSpeed(110, 1), c.noise(2, 10), bubble(), c.colorOverLife(c.fade(0.9))], order: 3 }, 'up')),
      // a steady trickle of small bubbles after it
      c.sys(c.ground({ tex: 'ring', blend: 'normal', loop: true, world: true, rate: 6, shape: { type: 'circle', radius: 6 }, offset: mouth,
        speed: 0, life: [0.8, 1.1], size: [4, 8], color: light,
        behaviors: [c.force(0, 300), c.limitSpeed(130, 1), c.noise(2.5, 8), bubble()], order: 2 })),
      // shiny glints among the bubbles
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 4, shape: { type: 'circle', radius: 8 }, offset: mouth,
        speed: 0, life: [0.6, 0.9], size: [3, 6], color: '#ffffff',
        behaviors: [c.force(0, 280), c.limitSpeed(120, 1), c.noise(2.5, 8), c.colorOverLife(c.fadeInOut(0.1, 0.6))], order: 4 })),
    ];
  },
};
