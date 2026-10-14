/** Feathers fly: a soft white poof, feathers burst out and then rock gently from side to side as they drift down, with a few down fluffs. */
export default {
  name: 'move.feathers',
  category: 'move',
  whenToUse: 'A bird flaps hard, takes off, is startled or gets hit: a chicken spooked on a farm, a pigeon scattering, a bird bumped in a flappy game, a pillow fight. Play it on the bird; tint it to the feather colour. For a bird that keeps flying use move.fly; for feathers floating over the whole screen use env.feathers.',
  duration: 1.4, loop: false, tint: '#ffffff',
  tags: ['feathers', 'bird', 'chicken', 'flap', 'startled', 'pillow', 'fluff', 'move'],
  build(c) {
    const col = c.color('#ffffff');
    const shade = c.mix(col, '#c9c2b8', 0.35);
    return [
      // the poof: soft clouds puffed out at once
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 12 },
        speed: [90, 170], life: [0.3, 0.42], size: [26, 38], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 0 })),
      // feathers: thrown out fast, braked hard by the air, then falling slowly and rocking
      c.sys(c.vol({ tex: 'leaf', blend: 'normal', bursts: [{ count: [9, 11] }], shape: { type: 'circle', radius: 12 },
        speed: [200, 340], life: [1.1, 1.45], size: [14, 20], rotation: [0, 6.28], color: [col, shade],
        behaviors: [c.gravity(260), c.limitSpeed([[0, 340], [0.12, 46], [1, 40]], 1), c.noise(1.4, 16), c.spin(-2.5, 2.5),
          c.sizeOverLife(c.curve([[0, 0.5], [0.08, 1], [1, 0.9]])), c.colorOverLife(c.fade(0.75))], order: 2 })),
      // tiny down fluffs floating a little longer in the air
      c.sys(c.vol({ tex: 'glow', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 18 },
        speed: [80, 180], life: [0.8, 1.1], size: [7, 11], color: col,
        behaviors: [c.gravity(120), c.limitSpeed([[0, 180], [0.15, 30], [1, 26]], 1), c.noise(1.8, 12),
          c.colorOverLife(c.fadeInOut(0.05, 0.6))], order: 1 })),
      // a couple of quick white glints at the start
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [2, 3] }], shape: { type: 'circle', radius: 22 },
        speed: [20, 50], life: [0.2, 0.28], size: [12, 16], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 3 }),
    ];
  },
};
