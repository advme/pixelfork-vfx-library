/** Gliding: soft wind streaks stream back off the wings, wisps of air trail behind and a feather drifts away now and then. Loops until stopped. */
export default {
  name: 'move.glide',
  category: 'move',
  whenToUse: 'A character glides or soars without flapping: a hang glider, a wingsuit, a cape or leaf glide, a paper plane, a bird or dragon riding the wind; follow the body and stop it on landing (in 2D dir is the way the streaks trail, default 180 = behind a glider flying right; in 3D pass direction pointing backward and keep it current with handle.aim(v)), and use move.fly for flapping wings, move.speed for plain speed lines.',
  duration: 1, loop: true, tint: '#ffffff',
  tags: ['glide', 'soar', 'wings', 'glider', 'wingsuit', 'feathers', 'wind', 'flying', 'move'],
  build(c) {
    const col = c.color('#ffffff');
    const dir = c.dir === undefined ? Math.PI : c.dir;
    // a streak trails BACK from its particle: in 2D start them 20 px behind the body's centre so they do not
    // reach forward across the glider
    const behind = c.is3d ? undefined : [Math.cos(dir) * 20, Math.sin(dir) * 20];
    return [
      // soft wind streaks peeling off the wings
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 20, dir, offset: behind, shape: { type: 'cone', radius: 28, angle: 0.04, thickness: 1 },
        speed: [260, 380], life: [0.3, 0.45], size: [4, 6], color: [col, c.lighten(col, 0.5)],
        stretch: { speed: c.is3d ? 0.012 : 0.022, length: 2 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.25], [0.5, 0.6], [0, 1]])),
          c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.5]]))], order: 2 })),
      // wisps of air drifting off behind
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 7, dir, shape: { type: 'cone', radius: 14, angle: 0.3 },
        speed: [60, 120], life: [0.55, 0.8], size: [18, 30], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.3)), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.4], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.25], [0, 1]]))], order: 0 })),
      // tiny motes in the air rushing past
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 8, dir, shape: { type: 'cone', radius: 36, angle: 0.1, thickness: 1 },
        speed: [160, 260], life: [0.4, 0.6], size: [2, 4], color: c.lighten(col, 0.4),
        behaviors: [c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 1 })),
      // a feather loosened now and then, see-sawing down
      c.sys(c.vol({ tex: 'leaf', blend: 'normal', loop: true, world: true, rate: 1.6, shape: { type: 'circle', radius: 18 },
        speed: [10, 30], life: [1.2, 1.7], size: [9, 13], rotation: [0, 6.28], color: [col, c.darken(col, 0.08)],
        behaviors: [c.gravity(160), c.limitSpeed(70, 1), c.noise(2, 16), c.spin(-4, 4), c.colorOverLife(c.fadeInOut(0.1, 0.7))], order: 3 })),
    ];
  },
};
