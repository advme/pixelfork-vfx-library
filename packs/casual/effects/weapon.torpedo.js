/** A torpedo running: a stream of bubbles pours out of the tail and hangs in the water, with churned white water just behind the propeller. Loops until stopped. */
export default {
  name: 'weapon.torpedo',
  category: 'weapon',
  whenToUse: 'A torpedo, underwater missile, submarine drone or anything with a propeller speeding under water. Follow its tail; in 2D set dir to the way the trail streams out (degrees, default 180 = to the left, for a torpedo heading right); in 3D pass direction (backward, out of the tail) and keep it current with handle.aim(v). On impact stop it and play explosion.water. For a missile in the air use weapon.rocket; for a boat on the surface use vehicle.wake.',
  duration: 1, loop: true, tint: '#c4f1ff',
  tags: ['torpedo', 'submarine', 'underwater', 'missile', 'bubbles', 'trail', 'navy', 'weapon'],
  build(c) {
    const col = c.color('#c4f1ff');
    const dir = c.dir === undefined ? Math.PI : c.dir;
    // every part streams out backward and is left behind in the water
    const trail = (p) => c.sys(c.spray(Object.assign({ loop: true, world: true, dir }, p)));
    return [
      // a faint glow from the motor
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.3, bursts: [{ count: 1 }], life: 0.3, size: 50, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.1], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.55, 0.5], [0.35, 1]]))], order: 0 }),
      // churned white water right behind the propeller
      trail({ tex: 'puff', blend: 'normal', rate: 24, shape: { type: 'cone', radius: 3, angle: 0.25 },
        speed: [70, 130], life: [0.35, 0.55], size: [10, 16], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0, 1]]))], order: 1 }),
      // the bubble trail: shot back, slowed by the water, then drifting up and wobbling
      trail({ tex: 'ring', blend: 'normal', rate: 36, shape: { type: 'cone', radius: 4, angle: 0.35 },
        speed: [90, 200], life: [0.8, 1.3], size: [4, 10], color: col,
        behaviors: [c.limitSpeed(30, 0.3), c.force(0, 70), c.noise(2, 8), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 1.1]])), c.colorOverLife(c.fadeInOut(0.05, 0.7))], order: 2 }),
      // tiny bright fizz
      trail({ tex: 'glow', blend: 'add', rate: 22, shape: { type: 'cone', radius: 3, angle: 0.4 },
        speed: [120, 240], life: [0.25, 0.45], size: [3, 5], color: c.lighten(col, 0.5),
        behaviors: [c.limitSpeed(40, 0.4), c.noise(3, 6), c.colorOverLife(c.fade(0.4))], order: 3 }),
    ];
  },
};
