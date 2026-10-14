/** A rocket in flight: a hot flame at the tail and a thick smoke trail left hanging in the air. Loops until stopped. */
export default {
  name: 'weapon.rocket',
  category: 'weapon',
  whenToUse: 'A rocket, missile, RPG round, firework rocket or jetpack is flying. Follow the projectile; in 3D pass direction (backward, out of the tail) and keep it current with handle.aim(v). On impact stop it and play explosion.big.',
  duration: 1, loop: true, tint: '#ff8a2a',
  tags: ['rocket', 'missile', 'rpg', 'smoke trail', 'projectile', 'military', 'jetpack', 'weapon'],
  build(c) {
    const col = c.color('#ff8a2a');
    const dir = c.dir === undefined ? Math.PI : c.dir;
    return [
      // smoke left hanging along the flight path
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 42, dir, shape: { type: 'cone', radius: 3, angle: 0.2 },
        speed: [30, 80], life: [1.1, 1.7], size: [14, 22], rotation: [0, 6.28], color: ['#d8d8d8', '#a8a8a8'],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 18), c.noise(0.8, 10), c.spin(-0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.4], [1, 2.6]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      // the tail flame
      c.sys(c.spray({ tex: 'flame', blend: 'add', loop: true, rate: 40, dir, shape: { type: 'cone', radius: 2, angle: 0.15 },
        speed: [120, 220], life: [0.08, 0.14], size: [22, 32], rotation: [-0.3, 0.3], color: [c.lighten(col, 0.5), col],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 })),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.25, bursts: [{ count: 1 }], life: 0.25, size: 60, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.1], [1, 0.85]]))], order: 2 }),
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 14, dir, shape: { type: 'cone', radius: 3, angle: 0.4 },
        speed: [150, 300], life: [0.2, 0.35], size: [3, 5], color: '#ffd27a', stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(400), c.colorOverLife(c.fade(0.4))], order: 4 })),
    ];
  },
};
