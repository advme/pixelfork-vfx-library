/** A garden sprinkler: jets of water arc out and rain down on both sides (in 3D an umbrella of jets all the way round), with droplets, a white churn at the head and a soft mist. Loops until stopped. */
export default {
  name: 'world.sprinkler',
  category: 'world',
  whenToUse: 'A lawn or garden sprinkler, an irrigation sprayer on a farm, a splash pad in a water park, a park water feature. Play it on the sprinkler head on the ground and leave it running. For a single jet straight up use world.fountain; for a leaking pipe use world.dripping.',
  duration: 1, loop: true, anchor: 'feet', tint: '#7fc8ff',
  tags: ['sprinkler', 'garden', 'lawn', 'farm', 'water', 'irrigation', 'park', 'spray', 'splash'],
  build(c) {
    const col = c.color('#7fc8ff');
    const light = c.lighten(col, 0.6);
    // jets leave 0.5 rad off vertical at about 340 px/s and land about 120 px out
    const tilt = 0.5;
    const jet = (p) => c.sys(c.spray(Object.assign({ tex: 'disc', blend: 'normal', loop: true, world: true, speed: [330, 350], life: [0.7, 0.76], size: [5, 7],
      color: [col, '#ffffff'], stretch: { speed: 0.006, length: 1.3 },
      behaviors: [c.gravity(800), c.colorOverLife(c.fade(0.85))], order: 2 }, p), 'up'));
    // 2D: one jet to each side; 3D: jets leave the head in every direction, an umbrella of water
    const jets = c.is3d
      ? [jet({ rate: 110, shape: { type: 'cone', radius: 3, angle: tilt, thickness: 0 }, dir: Math.PI / 2 })]
      : [jet({ rate: 42, shape: { type: 'cone', radius: 2, angle: 0.04 }, dir: Math.PI / 2 - tilt }), jet({ rate: 42, shape: { type: 'cone', radius: 2, angle: 0.04 }, dir: Math.PI / 2 + tilt })];
    return [
      // a soft mist where the water rains down
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: c.is3d ? 8 : 5, shape: c.is3d ? { type: 'circle', radius: 130 } : { type: 'rect', w: 300, h: 0 },
        speed: 0, life: [1.5, 2], size: [50, 80], rotation: [0, 6.28], color: c.lighten(col, 0.85),
        behaviors: [c.force(0, 20), c.noise(0.5, 14), c.spin(-0.3, 0.3), c.sizeOverLife(c.curve([[0, 0.6], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.22, 0.35], [0, 1]]))], order: 0 })),
      // finer droplets filling the spray
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, world: true, rate: c.is3d ? 36 : 24, shape: { type: 'cone', radius: 3, angle: 0.75 }, dir: Math.PI / 2,
        speed: [150, 300], life: [0.45, 0.6], size: [3, 5], color: [light, '#ffffff'],
        behaviors: [c.gravity(800), c.colorOverLife(c.fade(0.7))], order: 1 }, 'up')),
      ...jets,
      // white water churning at the head
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, rate: 12, shape: { type: 'cone', radius: 3, angle: 0.5 }, dir: Math.PI / 2,
        speed: [50, 90], life: [0.25, 0.35], size: [12, 18], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.2]])), c.colorOverLife(c.fade(0.4))], order: 3 }, 'up')),
    ];
  },
};
