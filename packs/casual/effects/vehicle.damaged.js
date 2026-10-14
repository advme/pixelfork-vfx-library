/** A wrecked engine: thick black smoke pouring up, small flames licking at the base, the odd spark. Loops until stopped. */
export default {
  name: 'vehicle.damaged',
  category: 'vehicle',
  whenToUse: 'A car, tank, plane or machine is badly damaged or wrecked: low health, a burning wreck, a broken generator. Follow the engine or hood; stop it when it is repaired or removed.',
  duration: 2, loop: true, tint: '#ff7a1f',
  tags: ['damaged', 'wreck', 'smoke', 'fire', 'engine', 'burning', 'low health', 'vehicle'],
  build(c) {
    const col = c.color('#ff7a1f');
    return [
      // thick dark smoke
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 9, shape: { type: 'cone', radius: 10, angle: 0.25 },
        speed: [40, 90], life: [1.4, 2.0], size: [22, 34], rotation: [0, 6.28], color: ['#3a3a3a', '#222222'],
        behaviors: [c.force(0, 50), c.noise(1, 14), c.spin(-0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.85, 0.12], [0.55, 0.6], [0, 1]]))], order: 1 }),
      // flames at the base
      c.sys({ tex: 'flame', blend: 'add', loop: true, rate: 16, shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [15, 45], life: [0.3, 0.5], size: [14, 26], color: [c.lighten(col, 0.5), col],
        behaviors: [c.force(0, 200), c.limitSpeed(160, 1), c.noise(3, 8), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 }),
      // the odd spark
      c.sys({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 3, shape: { type: 'cone', radius: 6, angle: 0.6 },
        speed: [160, 300], life: [0.4, 0.7], size: [3, 5], color: '#ffd27a',
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(500), c.colorOverLife(c.fade(0.5))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.4, bursts: [{ count: 1 }], life: 0.4, size: 50, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [0.5, 1.05], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.7, 0.5], [0.45, 1]]))], order: 0 }),
    ];
  },
};
