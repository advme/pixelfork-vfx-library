/** Exhaust puffs from a car's tailpipe, left behind in the air as it drives. Loops until stopped. */
export default {
  name: 'vehicle.exhaust',
  category: 'vehicle',
  whenToUse: 'A car, truck, motorbike or boat engine is running. Follow the exhaust pipe; in 3D pass direction (pointing backward out of the pipe) and keep it current with handle.aim(v) while the vehicle turns. Stop it when the engine stops.',
  duration: 1, loop: true, tint: '#d4d4d4',
  tags: ['car', 'exhaust', 'smoke', 'engine', 'vehicle', 'driving', 'tailpipe'],
  build(c) {
    const col = c.color('#d4d4d4');
    const dir = c.dir === undefined ? Math.PI : c.dir;
    return [
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 14, dir, shape: { type: 'cone', radius: 3, angle: 0.25 },
        speed: [60, 120], life: [0.6, 1.0], size: [10, 16], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 40), c.noise(1.5, 8), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.4, 0.5], [0, 1]]))], order: 1 })),
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 5, dir, shape: { type: 'cone', radius: 2, angle: 0.2 },
        speed: [80, 140], life: [0.4, 0.6], size: [7, 11], rotation: [0, 6.28], color: c.darken(col, 0.55),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 30), c.sizeOverLife(c.curve([[0, 0.6], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 0 })),
    ];
  },
};
