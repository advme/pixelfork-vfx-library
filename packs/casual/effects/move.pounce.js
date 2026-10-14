/** A pounce take-off: a dust ring squashes out on the ground, puffs kick out to both sides, quick action lines shoot along the leap and bits of grass flick up. */
export default {
  name: 'move.pounce',
  category: 'move',
  whenToUse: 'An animal springs off the ground: a cat pouncing on a toy, a frog or bunny hopping, a puppy leaping at a ball, a fox diving. Play it at the feet at the moment of the leap; aim the action lines along the leap with dir (degrees, default straight up) in 2D or direction: [x, y, z] in 3D. Tint it for snow, sand or mud. For a character\'s ordinary jump use move.jump; for a spring or trampoline use move.bounce.',
  duration: 0.5, loop: false, anchor: 'feet', tint: '#e9dcc7',
  tags: ['pounce', 'leap', 'hop', 'frog', 'cat', 'pet', 'jump', 'move'],
  build(c) {
    const col = c.color('#e9dcc7');
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const puffLife = () => [c.speedOverLife(c.decel(0.08)), c.force(0, 50), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.45], [0.35, 1], [1, 1.15]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))];
    // dust kicked out along the ground: two low side bursts in 2D, a ring of puffs on the floor in 3D
    const side = (d) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: 6, angle: 0.3 }, dir: d,
      speed: [160, 280], life: [0.32, 0.45], size: [22, 34], rotation: [0, 6.28], color: [col, c.darken(col, 0.12)], behaviors: puffLife(), order: 1 });
    const puffs = c.is3d
      ? [c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 8, thickness: 0 },
          speed: [160, 280], life: [0.32, 0.45], size: [22, 34], rotation: [0, 6.28], color: [col, c.darken(col, 0.12)], behaviors: puffLife(), order: 1 }))]
      : [side(0.12), side(Math.PI - 0.12)];
    return [
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.3, size: 120, color: c.lighten(col, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0, 1]]))], order: 0 }),
      ...puffs,
      // little action lines fanning out from the take-off along the leap. A streak trails back from its particle, so they start
      // 30 px forward and fade in over their first frames: the long first-frame tails never show below the feet
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [6, 7] }], shape: { type: 'cone', radius: 16, angle: 0.75 }, dir,
        offset: [Math.cos(dir) * 30, Math.sin(dir) * 30],
        speed: [280, 380], life: [0.16, 0.22], size: [6, 8], color: '#ffffff', stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.22], [1, 0.5], [0, 1]]))], order: 3 })),
      // bits of grass flicked up off the ground (light gravity and short lives keep them up in view, not falling through the floor)
      c.sys(c.spray({ tex: 'leaf', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 14, angle: 0.75 }, dir: Math.PI / 2,
        speed: [190, 300], life: [0.4, 0.5], size: [8, 13], rotation: [0, 6.28], color: ['#7bdc4a', '#3fae3a'],
        behaviors: [c.gravity(800), c.spin(-9, 9), c.colorOverLife(c.fade(0.7))], order: 2 }, 'up')),
      // a few grit specks
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 8, arc: Math.PI },
        speed: [150, 260], life: [0.26, 0.36], size: [3, 5], color: c.darken(col, 0.3),
        behaviors: [c.gravity(800), c.colorOverLife(c.fade(0.6))], order: 2 })),
    ];
  },
};
