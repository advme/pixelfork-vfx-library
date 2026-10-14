/** Ripples: rings spread across the water one after another, with an occasional little splash. Loops until stopped. */
export default {
  name: 'world.ripple',
  category: 'world',
  whenToUse: 'Something disturbs still water over time: a fishing bobber, a duck or frog sitting in a pond, a drip into a puddle, a stone just dropped in, something swimming under the surface. Play it on the water surface and leave it running; for one big splash use move.splash.',
  duration: 1.2, loop: true, tint: '#d6f1ff',
  tags: ['ripple', 'water', 'pond', 'fishing', 'bobber', 'puddle', 'lake', 'calm', 'drip'],
  build(c) {
    const col = c.color('#d6f1ff');
    // 3D: rings lie on the water (not snapped to the ground: the water is above it)
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }, { time: 0.4, count: 1 }, { time: 0.8, count: 1 }], life: 1.2, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 0 }),
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, duration: 1.2, bursts: [{ count: [2, 3] }], shape: { type: 'cone', radius: 3, angle: 0.4 },
        speed: [80, 140], life: [0.25, 0.35], size: [3, 5], color: '#ffffff',
        behaviors: [c.gravity(1000), c.colorOverLife(c.fade(0.6))], order: 1 }, 'up')),
    ];
  },
};
