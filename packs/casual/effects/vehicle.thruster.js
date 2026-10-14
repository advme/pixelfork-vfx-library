/** A hover or spaceship engine: a small steady blue jet with a white-hot core, a softly pulsing glow at the nozzle and a few drifting sparks. Loops until stopped. */
export default {
  name: 'vehicle.thruster',
  category: 'vehicle',
  whenToUse: 'A spaceship, drone, hover car, hover board, jetpack hover or robot thruster is running at cruising power: follow the nozzle with dir in 2D (degrees, default -90 = down; 180 for a ship flying right) or direction in 3D (out of the nozzle), keeping it current with handle.aim(v); for a roaring speed boost use vehicle.nitro, for a petrol engine use vehicle.exhaust.',
  duration: 1, loop: true, tint: '#4fb8ff',
  tags: ['thruster', 'engine', 'spaceship', 'hover', 'drone', 'jet', 'sci-fi', 'vehicle'],
  build(c) {
    const col = c.color('#4fb8ff');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? -Math.PI / 2 : c.dir;
    // streaks trail BACK toward the nozzle: start the jet a little past it (2D) so the tails stay outside the ship
    const out = c.is3d ? undefined : [Math.cos(dir) * 10, Math.sin(dir) * 10];
    const jet = (p) => c.sys(c.spray(Object.assign({ tex: 'glow', blend: 'add', loop: true, dir, offset: out }, p)));
    return [
      // the pulsing glow at the nozzle
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.5, size: 54, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.1], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.4, 0], [0.75, 0.5], [0.4, 1]]))], order: 0 }),
      // the jet: a coloured flame around a white-hot core, short and steady
      jet({ rate: 70, shape: { type: 'cone', radius: 3, angle: 0.07 }, speed: [250, 350], life: [0.17, 0.24], size: [16, 22], color: [col, light],
        stretch: { speed: 0.004, length: 0.6 }, behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [0.3, 1], [1, 0.35]])), c.colorOverLife(c.fade(0.45))], order: 1 }),
      jet({ rate: 60, shape: { type: 'cone', radius: 2, angle: 0.04 }, speed: [280, 360], life: [0.08, 0.12], size: [9, 12], color: '#ffffff',
        stretch: { speed: 0.003, length: 0.8 }, behaviors: [c.sizeOverLife(c.shrink())], order: 2 }),
      // a hot white point right at the nozzle
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.25, bursts: [{ count: 1 }], life: 0.25, size: 24, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.1], [1, 0.9]]))], order: 3 }),
      // a few small sparks left drifting behind
      jet({ world: true, rate: 10, shape: { type: 'cone', radius: 4, angle: 0.25 }, speed: [120, 220], life: [0.22, 0.38], size: [2, 4], color: light,
        stretch: { speed: 0.02, length: 1.5 }, behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 4 }),
    ];
  },
};
