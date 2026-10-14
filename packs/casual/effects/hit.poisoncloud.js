/** A poison shot bursts: a green splat flash and ring, venom droplets flicked out, and a small sickly cloud that swells and hangs there for a moment while bubbles rise through it and pop. */
export default {
  name: 'hit.poisoncloud',
  category: 'hit',
  whenToUse: 'A poison or acid tower\'s shot bursts on an enemy and leaves a small green cloud hanging there for a moment: a poison tower in tower defense, a venom dart, an acid spit, a poison arrow or flask landing. Play it on the target (1.2 s), then use state.poison if the enemy stays poisoned. For a big gas grenade or toxic barrel blast use explosion.toxic and for a poison splash spell use magic.poison.',
  duration: 1.2, loop: false, tint: '#7fe83a',
  tags: ['poison', 'acid', 'venom', 'tower defense', 'cloud', 'gas', 'toxic', 'hit'],
  build(c) {
    const col = c.color('#7fe83a');
    const light = c.lighten(col, 0.5);
    const dark = c.darken(col, 0.35);
    return [
      // the splat flash and ring
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.28, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      // the cloud: puffs swell out, slow to a stop and hang there before thinning away
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 10] }, { time: 0.1, count: [4, 5] }], shape: { type: 'circle', radius: 14 },
        speed: [50, 120], life: [0.95, 1.1], size: [40, 62], rotation: [0, 6.28], color: [col, dark],
        behaviors: [c.speedOverLife(c.decel(0.04)), c.force(0, 14), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.85, 0.1], [0.7, 0.6], [0, 1]]))], order: 1 })),
      // a lighter core inside the cloud so it reads as toxic, not as smoke
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.05, count: 1 }], life: 1.0, size: 120, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.35, 0.15], [0.25, 0.6], [0, 1]]))], order: 2 }),
      // venom droplets flicked out of the splat
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 10 },
        speed: [180, 340], life: [0.35, 0.5], size: [5, 9], color: [col, light],
        behaviors: [c.gravity(1200), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 4 })),
      // bubbles rising through the cloud, swelling and popping
      c.sys(c.vol({ tex: 'ring', blend: 'normal', rate: 16, duration: 0.65, shape: { type: 'circle', radius: 34 },
        speed: [10, 30], life: [0.4, 0.55], size: [10, 18], color: light,
        behaviors: [c.force(0, 140), c.limitSpeed(70, 1), c.noise(2, 8), c.sizeOverLife(c.curve([[0, 0.3], [0.7, 1], [0.88, 1.3], [1, 0]])), c.colorOverLife(c.fade(0.85))], order: 5 })),
      // sickly glints drifting in the cloud
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.1, count: [5, 7] }], shape: { type: 'circle', radius: 30 },
        speed: [10, 40], life: [0.6, 0.9], size: [7, 12], color: light,
        behaviors: [c.force(0, 40), c.sizeOverLife(c.pop(0.2, 0.55))], order: 5 })),
    ];
  },
};
