/** A pillow-fight whump: a soft white puff and ring, feather flakes burst out all round and along the swing, brake in the air and rock gently down, with tiny down fluffs. */
export default {
  name: 'hit.pillow',
  category: 'hit',
  whenToUse: 'A pillow, cushion or soft toy hits someone in a soft, harmless way: a pillow fight, a sleepover or bedroom party game, a plush thrown at a friend, a cushion bop in a kids game. Play it on the one who is hit and aim it with dir (degrees, default up) or direction in 3D, the way the swing knocks the feathers; tint it for coloured feathers. For a bird flapping or scattering feathers use move.feathers; for feathers floating over the whole screen use env.feathers; for a furry creature hit use hit.fur.',
  duration: 0.7, loop: false, tint: '#ffffff',
  tags: ['pillow', 'feathers', 'pillow fight', 'soft', 'cushion', 'sleepover', 'fluff', 'hit'],
  build(c) {
    const col = c.color('#ffffff');
    const shade = c.mix(col, '#d4cdc4', 0.35);
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    // feathers: thrown out fast, braked hard by the air, then rocking down (a fresh list per system)
    const feather = () => [c.gravity(320), c.limitSpeed([[0, 380], [0.14, 60], [1, 50]], 1), c.noise(1.6, 18), c.spin(-3, 3),
      c.sizeOverLife(c.curve([[0, 0.5], [0.1, 1], [1, 0.85]])), c.colorOverLife(c.fade(0.65))];
    return [
      // the soft whump: a cloud of fluff puffed out at once
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 12 },
        speed: [90, 170], life: [0.3, 0.4], size: [30, 42], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 0 })),
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.24, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.5, 0.5], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 80, color: '#fff8f0',
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 4 }),
      // feather flakes knocked out all round
      c.sys(c.vol({ tex: 'leaf', blend: 'normal', bursts: [{ count: [6, 7] }], shape: { type: 'circle', radius: 12 },
        speed: [220, 340], life: [0.5, 0.68], size: [13, 19], rotation: [0, 6.28], color: [col, shade],
        behaviors: feather(), order: 3 })),
      // and a spray of them out the far side of the swing (dir, default up)
      c.sys(c.spray({ tex: 'leaf', blend: 'normal', bursts: [{ count: [6, 7] }], shape: { type: 'cone', radius: 10, angle: 0.6 }, dir,
        speed: [260, 380], life: [0.5, 0.68], size: [13, 19], rotation: [0, 6.28], color: [col, shade],
        behaviors: feather(), order: 3 })),
      // tiny down fluffs
      c.sys(c.vol({ tex: 'glow', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 18 },
        speed: [90, 200], life: [0.45, 0.62], size: [7, 11], color: col,
        behaviors: [c.gravity(140), c.limitSpeed([[0, 200], [0.18, 34], [1, 30]], 1), c.noise(1.8, 12),
          c.colorOverLife(c.fadeInOut(0.05, 0.55))], order: 2 })),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [2, 3] }], shape: { type: 'circle', radius: 24 },
        speed: [20, 50], life: [0.2, 0.26], size: [12, 16], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 }),
    ];
  },
};
