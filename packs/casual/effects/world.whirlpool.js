/** A whirlpool seen from above: four arms of white foam swirl into a dark eye, foam spins faster near the middle, rings are sucked inward. Loops until stopped. */
export default {
  name: 'world.whirlpool',
  category: 'world',
  whenToUse: 'A whirlpool, maelstrom or drain swirls on the water: a sea hazard that pulls boats in, a plug-hole draining a bath or sink, a vortex in a river, a sea monster about to rise, a water portal. Play it at the centre on the water surface and leave it running; it is seen from above (in 3D it lies flat on the water). For a magic or space vortex use magic.blackhole; for a tornado use magic.tornado.',
  duration: 1.2, loop: true, tint: '#2f8fe0',
  tags: ['whirlpool', 'vortex', 'maelstrom', 'drain', 'swirl', 'water', 'sea', 'hazard'],
  build(c) {
    const col = c.color('#2f8fe0');
    const foam = c.lighten(col, 0.88);
    // 3D: everything lies flat on the water where it was played (not snapped to the ground: the water is above it)
    const still = (p) => c.sys(c.flat(p, { snap: false }));
    const swirl = (p) => c.sys(c.flat(c.ground(Object.assign({ loop: true, speed: 0 }, p)), { snap: false }));
    // an arm: pieces born on the rim at radius R, moving in at speed V while orbiting at W, curve a quarter turn
    // and reach the edge of the eye (about 50 px from the centre) after about 0.85 s
    const R = 105, W = 1.05, V = 89;
    const ringOf = (r) => ({ type: 'circle', radius: r, thickness: 0 });
    return [
      // the darker water of the funnel, and its eye
      still({ tex: 'glow', blend: 'normal', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 250, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.45, 0.5], [0.35, 1]]))], order: 0 }),
      still({ tex: 'glow', blend: 'normal', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 140, color: c.darken(col, 0.55),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.95], [0.5, 1.05], [1, 0.95]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.9, 0.5], [0.8, 1]]))], order: 1 }),
      // rings of foam pulled in toward the eye
      still({ tex: 'ring', blend: 'normal', loop: true, duration: 1.2, bursts: [{ count: 1 }, { time: 0.6, count: 1 }], life: 1.2, size: 250, color: foam,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.35]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.3], [0, 1]]))], order: 2 }),
      // four arms: puffs born at four fixed points on the rim all follow the same curve into the eye
      swirl({ tex: 'puff', blend: 'normal', duration: 1.2, bursts: [{ count: 4, cycle: 24, interval: 0.05 }], shape: { type: 'circle', radius: R, thickness: 0, even: true },
        speed: [-V - 6, -V + 4], life: [0.82, 0.9], size: [16, 26], rotation: [0, 6.28], color: foam,
        behaviors: [c.orbit(W), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.35]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.95, 0.15], [0.8, 0.75], [0, 1]]))], order: 3 }),
      // foam spinning round: slow at the rim, fast around the eye
      swirl({ tex: 'puff', blend: 'normal', rate: 10, shape: ringOf(R + 8), life: [0.8, 1.1], size: [14, 22], rotation: [0, 6.28], color: foam,
        behaviors: [c.orbit(W), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.3], [0, 1]]))], order: 3 }),
      swirl({ tex: 'puff', blend: 'normal', rate: 24, shape: ringOf(56), life: [0.5, 0.75], size: [10, 16], rotation: [0, 6.28], color: foam,
        behaviors: [c.orbit(W * 4), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.85, 0.3], [0, 1]]))], order: 3 }),
      // glints of light riding the arms in
      swirl({ tex: 'spark', blend: 'add', rate: 12, shape: ringOf(R), speed: [-V - 4, -V + 4], life: [0.75, 0.85], size: [10, 16], color: '#ffffff',
        behaviors: [c.orbit(W), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.6, 0.6], [1, 0]]))], order: 4 }),
      // spray hopping up around the rim (3D); in 2D, from above, little splashes popping round the rim
      c.is3d
        ? c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, rate: 10, shape: { type: 'cone', radius: 90, angle: 0.3, thickness: 0 },
          speed: [110, 190], life: [0.3, 0.45], size: [4, 7], color: foam,
          behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.6))], order: 5 }, 'up'))
        : swirl({ tex: 'disc', blend: 'normal', rate: 10, shape: ringOf(R - 8), speed: [20, 50], life: [0.3, 0.45], size: [4, 7], color: foam,
          behaviors: [c.orbit(W), c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 }),
    ];
  },
};
