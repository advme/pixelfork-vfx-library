/** Off-road driving: mud clods and dirt flung up behind the wheel in a rooster tail, with a haze of dust. Loops until stopped. */
export default {
  name: 'vehicle.offroad',
  category: 'vehicle',
  whenToUse: 'A car, truck, quad, dirt bike or tractor is driving fast over mud, dirt, sand or snow, spraying it up behind its wheels. Follow a rear wheel where it touches the ground; in 2D set dir (degrees, default 145 = backward and up for a vehicle driving right) and in 3D pass direction backward from the wheel and tilted up, keeping it current with handle.aim(v). Stop it when it stops or reaches a road. Tint it for the ground (brown mud, sand, snow). For light dust on a road use move.dust.',
  duration: 1, loop: true, tint: '#7a5534',
  tags: ['offroad', 'mud', 'dirt', 'rally', 'wheels', 'spray', 'truck', 'vehicle'],
  build(c) {
    const col = c.color('#7a5534');
    const dir = c.dir === undefined ? Math.PI * 0.8 : c.dir;
    return [
      // mud clods tumbling out in an arc (lives end about when they land, so the stream
      // does not keep falling through the ground behind the wheel)
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', loop: true, world: true, rate: 18, dir, shape: { type: 'cone', radius: 6, angle: 0.32 },
        speed: [280, 440], life: [0.34, 0.5], size: [5, 10], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.6))], order: 3 }), 'box')),
      // the fine spray of mud drops
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, world: true, rate: 40, dir, shape: { type: 'cone', radius: 5, angle: 0.42 },
        speed: [300, 540], life: [0.22, 0.34], size: [2.5, 5], color: c.darken(col, 0.15),
        behaviors: [c.gravity(1700), c.colorOverLife(c.fade(0.55))], order: 4 })),
      // a few big wet splats lobbed higher
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 5, dir, shape: { type: 'cone', radius: 4, angle: 0.2 },
        speed: [220, 340], life: [0.32, 0.45], size: [10, 16], rotation: [0, 6.28], color: c.darken(col, 0.2),
        behaviors: [c.gravity(1400), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.6))], order: 2 })),
      // a haze of dirt dust hanging behind (3D: c.ground turns the half-sphere to open upward)
      c.sys(c.ground(c.vol({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 9, shape: { type: 'circle', radius: 10, arc: Math.PI },
        speed: [30, 90], life: [0.6, 0.9], size: [20, 32], rotation: [0, 6.28], color: c.lighten(col, 0.45),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 40), c.noise(1.5, 8), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.45, 0.5], [0, 1]]))], order: 1 }))),
    ];
  },
};
