/** Haunted: three pale ghost wisps with glowing heads and fading tails circle the body, cold motes drift up and a chilly glow breathes. Loops until stopped. */
export default {
  name: 'state.haunted',
  category: 'state',
  whenToUse: 'A character or object is haunted or followed by ghosts: a ghost-marked player, a haunted doll, painting or chest, a spooky villager, a spirit-bound companion. Follow the body; stop it when the haunting ends. For a dark evil aura use state.possessed; for a lasting curse or hex use state.cursed; for a scared, panicking character use state.fear.',
  duration: 1.5, loop: true, tint: '#a8f0ff',
  tags: ['haunted', 'ghost', 'spirit', 'wisp', 'spooky', 'cursed', 'horror', 'status'],
  build(c) {
    const col = c.color('#a8f0ff');
    const light = c.lighten(col, 0.65);
    const turn = (Math.PI * 2) / 1.5;
    // a ring around the body (lying flat around it in 3D); one full turn per cycle, so every dot is reborn where the old one dies
    const ring = { type: 'circle', radius: 38, thickness: 0, even: true };
    // a ghostly shimmer that ends where it starts, so the hand-over each cycle cannot be seen
    const shimmer = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [a * 0.55, 0.2], [a, 0.45], [a * 0.7, 0.7], [a, 1]]));
    const wisp = (p) => c.sys(c.ground(Object.assign({ blend: 'add', loop: true, duration: 1.5, shape: ring, offset: [0, 6], speed: 0, life: 1.5 }, p)));
    return [
      // the chill glow breathing behind the body
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.5, bursts: [{ count: 1 }], life: 1.5, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.06], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.2, 0], [0.34, 0.5], [0.2, 1]]))], order: 0 }),
      // the wisps: three bright heads; their tails are born a moment later, so they lag behind the heads
      wisp({ tex: 'glow', bursts: [{ count: 3 }], size: 24, color: light,
        behaviors: [c.orbit(turn), shimmer(1)], order: 4 }),
      wisp({ tex: 'glow', bursts: [{ time: 0.025, count: 3, cycle: 5, interval: 0.025 }], size: 15, color: col,
        behaviors: [c.orbit(turn), shimmer(0.7)], order: 3 }),
      wisp({ tex: 'glow', bursts: [{ time: 0.15, count: 3, cycle: 5, interval: 0.03 }], size: 8, color: col,
        behaviors: [c.orbit(turn), shimmer(0.45)], order: 2 }),
      // cold motes drifting up off the body
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 9, shape: { type: 'circle', radius: 32 },
        speed: [4, 14], life: [1.0, 1.6], size: [3, 6], color: light,
        behaviors: [c.force(0, 40), c.limitSpeed(34, 1), c.noise(1.5, 12), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.7, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
