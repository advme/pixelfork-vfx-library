/** An erupting volcano: a fiery plume roars out of the crater, glowing lava bombs arc out and fall, embers shower up and a thick dark smoke column climbs. Loops until stopped. */
export default {
  name: 'world.volcano',
  category: 'world',
  whenToUse: 'A volcano erupting in the world: a volcano island or level, a lava boss arena, a dinosaur or prehistoric scene, a fire mountain in the background, a crater spewing molten rock. Play it on the crater and leave it running; size 2-3 for a volcano in the background. For a pool of lava use world.lava; for ash falling over the whole screen use env.ash; for one fire ball from the sky use magic.meteor.',
  duration: 2, loop: true, tint: '#ff5a1f',
  tags: ['volcano', 'eruption', 'lava', 'magma', 'island', 'dinosaur', 'fire', 'smoke', 'disaster'],
  build(c) {
    const col = c.color('#ff5a1f');
    const light = c.lighten(col, 0.6);
    return [
      // the crater glow, swelling with each eruption
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.95], [0.08, 1.2], [0.5, 0.95], [1, 0.95]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.75, 0.08], [0.5, 0.5], [0.5, 1]]))], order: 0 }),
      // the smoke column, about 300 px tall at size 1
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 7, shape: { type: 'cone', radius: 14, angle: 0.22 }, dir: Math.PI / 2, offset: [0, 20],
        speed: [60, 100], life: [2.6, 3.4], size: [46, 70], rotation: [0, 6.28], color: ['#5a514e', '#3b3533'],
        behaviors: [c.force(0, 70), c.limitSpeed(95, 1), c.noise(0.6, 18), c.spin(-0.5, 0.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 2.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.1], [0.8, 0.55], [0, 1]]))], order: 1 }, 'up')),
      // lava bombs: a steady spit plus a big throw at each eruption (every 2 s, in step with the glow), cooling from white-hot to dark red
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, duration: 2, world: true, rate: 3, bursts: [{ count: [2, 4], probability: 0.85 }], shape: { type: 'cone', radius: 10, angle: 0.42 }, dir: Math.PI / 2,
        speed: [360, 500], life: [0.9, 1.15], size: [9, 14], color: '#ffffff', stretch: { speed: 0.004, length: 1.2 },
        behaviors: [c.gravity(1000), c.colorOverLife(c.grad([['#fff2c4', 0], [light, 0.2], [col, 0.6], [c.darken(col, 0.45), 1]], [[1, 0], [1, 0.85], [0, 1]]))], order: 2 }, 'up')),
      // the fiery plume, surging at each eruption
      c.sys(c.spray({ tex: 'flame', blend: 'add', loop: true, duration: 2, rate: 22, bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 14, angle: 0.3 }, dir: Math.PI / 2,
        speed: [140, 240], life: [0.35, 0.55], size: [30, 52], rotation: [-0.3, 0.3], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 }, 'up')),
      // a fountain of embers
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 30, shape: { type: 'cone', radius: 10, angle: 0.4 }, dir: Math.PI / 2,
        speed: [220, 420], life: [0.8, 1.3], size: [3, 6], color: [light, '#ffd27a'],
        behaviors: [c.gravity(420), c.noise(1.5, 30), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
    ];
  },
};
