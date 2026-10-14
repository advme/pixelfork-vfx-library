/** Metal scraping along a wall or rail: a flickering hot contact point, a steady stream of sparks thrown one way and a little smoke. Loops until stopped. */
export default {
  name: 'vehicle.scrape',
  category: 'vehicle',
  whenToUse: 'A car grinds along a wall or guard rail, a train brakes on its rails, a skateboard grinds a rail, a sword or plough drags on stone, a robot slides on metal: follow the point of contact, in 2D set dir (degrees, default 160 = back and up) and in 3D pass direction for where the sparks fly (backward along the car), and stop it when the contact ends (for one clang use hit.metal, for sparks from a broken machine world.sparks, for tyre smoke move.skid).',
  duration: 0.28, loop: true, tint: '#ffcf5a',
  tags: ['scrape', 'grind', 'sparks', 'metal', 'rail', 'wall', 'friction', 'vehicle'],
  build(c) {
    const col = c.color('#ffcf5a');
    const dir = c.dir === undefined ? Math.PI - 0.35 : c.dir;
    // 2D: start the stream just past the contact, so the spark tails do not reach back into the car
    const out = c.is3d ? undefined : [Math.cos(dir) * 10, Math.sin(dir) * 10];
    // an uneven flicker at the contact point
    const flick = [{ time: 0, count: 1 }, { time: 0.07, count: 1, probability: 0.7 }, { time: 0.13, count: 1, probability: 0.8 }, { time: 0.21, count: 1, probability: 0.6 }];
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.28, bursts: flick, life: 0.1, size: [50, 70], color: col,
        behaviors: [c.colorOverLife(c.fade(0.3))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 0.28, bursts: flick, life: 0.06, size: [34, 48], rotation: [0, 1.6], color: '#fffbe8',
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 4 }),
      // the spark stream, left behind in the air as the car moves on
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 70, dir, shape: { type: 'cone', radius: 4, angle: 0.22 }, offset: out,
        speed: [320, 640], life: [0.18, 0.36], size: [3, 6], color: ['#ffffff', col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1300), c.speedOverLife(c.decel(0.5)), c.colorOverLife(c.fade(0.5))], order: 3 })),
      // fat hot sparks that drop out of the stream
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 10, dir, shape: { type: 'cone', radius: 4, angle: 0.4 }, offset: out,
        speed: [200, 420], life: [0.35, 0.55], size: [5, 7], color: [col, '#ff8a2a'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1600), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.curve([[0, 1], [1, 0.4]]))], order: 2 })),
      // a little smoke from the hot metal
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 6, dir, shape: { type: 'cone', radius: 4, angle: 0.4 },
        speed: [30, 70], life: [0.5, 0.8], size: [12, 20], rotation: [0, 6.28], color: '#c8c8c8',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 50), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.25, 0.5], [0, 1]]))], order: 0 })),
    ];
  },
};
