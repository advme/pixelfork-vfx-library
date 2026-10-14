/** A fruit smashed to a pulp: a bright pop, a juice ring and fat gobs splashing out, juice drops and streaks flying and falling, pulp chunks, peel bits and a few seeds tumbling. */
export default {
  name: 'explosion.fruit',
  category: 'explosion',
  whenToUse: 'A whole fruit or vegetable is smashed, squished, crushed or bursts: a fruit hit by a hammer or a bomb, a watermelon dropped and splatting, fruit squashed in a merge or juice game, a fruit enemy popped. Play it at the fruit\'s centre and tint it the fruit colour (red apple, orange, green melon, purple grape). For a clean cut by a swipe use hit.slice; for slime, paint or a thrown tomato use hit.splat.',
  duration: 0.8, loop: false, tint: '#ff8a1f',
  tags: ['fruit', 'smash', 'squish', 'juice', 'pulp', 'splash', 'watermelon', 'explosion'],
  build(c) {
    const col = c.color('#ff8a1f');
    const light = c.lighten(col, 0.45);
    const deep = c.darken(col, 0.25);
    const seed = c.mix('#2a1810', col, 0.12);
    return [
      // the pop: behind the juice, so the splash reads through it instead of burning out to a white blob
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 160, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.3], [0, 1]]))], order: 0 }),
      // a ring of juice splashing out
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.3, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      // the crown: fat gobs of juice pushed out, swelling then shrinking
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 14 },
        speed: [90, 180], life: [0.3, 0.45], size: [26, 38], color: col,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.gravity(300), c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0]]))], order: 2 })),
      // juice streaks
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [420, 680], life: [0.22, 0.34], size: [4, 7], color: deep, stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 3 })),
      // juice drops flying and falling
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [16, 20] }], shape: { type: 'circle', radius: 12 },
        speed: [240, 540], life: [0.45, 0.75], size: [6, 12], color: [col, light],
        behaviors: [c.gravity(1100), c.speedOverLife(c.decel(0.5)), c.sizeOverLife(c.curve([[0, 1], [0.75, 0.85], [1, 0]]))], order: 3 })),
      // seeds
      c.sys(c.vol({ tex: 'drop', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 10 },
        speed: [160, 340], life: [0.45, 0.65], size: [7, 10], rotation: [0, 6.28], color: seed,
        behaviors: [c.gravity(1200), c.spin(-12, 12), c.colorOverLife(c.fade(0.8))], order: 4 })),
      // pulp chunks
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 12 },
        speed: [200, 420], life: [0.5, 0.75], size: [10, 16], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.gravity(1200), c.spin(-10, 10), c.colorOverLife(c.fade(0.8))], order: 5 }, 'box')),
      // peel bits
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 14 },
        speed: [180, 380], life: [0.5, 0.75], size: [10, 16], rotation: [0, 6.28], color: deep,
        behaviors: [c.gravity(1200), c.spin(-12, 12), c.colorOverLife(c.fade(0.8))], order: 5 }, 'plank')),
    ];
  },
};
