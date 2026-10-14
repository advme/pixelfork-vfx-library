/** A snake or cell bursts into its mass: a flash and a ring, then glowing food dots scatter out, settle, twinkle and fade. */
export default {
  name: 'explosion.pellets',
  category: 'explosion',
  whenToUse: 'A snake, worm or cell dies in an .io game (slither, snake.io, agar.io) and drops its mass as food: glowing dots scatter outward and linger before fading; play it at the middle of the body (for a long snake, play it a few times along the body at size 0.6) and tint it with the snake\'s colour. For a single dot being eaten use pickup.pellet; for an enemy simply poofing away use explosion.puff; for a fiery blast use explosion.small.',
  duration: 1.45, loop: false, tint: '#ff5ac8',
  tags: ['pellets', 'mass', 'food', 'death', 'io', 'snake', 'agar', 'scatter'],
  build(c) {
    const col = c.color('#ff5ac8');
    const light = c.lighten(col, 0.55);
    // shoot out fast, then settle: most of the distance is covered in the first fifth of the life
    const settle = () => c.speedOverLife(c.curve([[0, 1], [0.12, 0.35], [0.3, 0.04], [1, 0]]));
    // pop in, breathe gently while they lie there, then shrink away
    const twinkle = () => c.sizeOverLife(c.curve([[0, 0.3], [0.08, 1.25], [0.18, 1], [0.4, 0.85], [0.6, 1], [0.8, 0.85], [1, 0]]));
    // 3D: the dots lie on the floor, so lift them by about half their size or the floor hides their lower half
    const lift = c.is3d ? [0, 12] : undefined;
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.26, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 80, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.36, size: 190, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
      // the food dots: soft glowing blobs, scattered over the floor in 3D
      c.sys(c.ground({ tex: 'glow', blend: 'add', bursts: [{ count: [16, 20] }], shape: { type: 'circle', radius: 14 }, offset: lift,
        speed: [60, 650], life: [1.05, 1.45], size: [20, 30], color: [col, light],
        behaviors: [settle(), twinkle(), c.colorOverLife(c.fade(0.75))], order: 2 })),
      // smaller bright dots among them
      c.sys(c.ground({ tex: 'disc', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 14 }, offset: lift,
        speed: [40, 600], life: [0.95, 1.35], size: [7, 11], color: [light, '#ffffff'],
        behaviors: [settle(), twinkle(), c.colorOverLife(c.fade(0.75))], order: 3 })),
      // twinkles popping on the scattered dots while they linger
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ time: 0.3, count: 2 }, { time: 0.5, count: 2 }, { time: 0.7, count: 2 }, { time: 0.9, count: 2 }],
        shape: { type: 'circle', radius: 80 }, offset: lift, speed: 0, life: [0.25, 0.35], size: [12, 18], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.35, 0.5))], order: 4 })),
    ];
  },
};
