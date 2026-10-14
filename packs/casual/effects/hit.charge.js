/** A charge slams home: a white flash and a big star, a shock ring, dust exploding forward and rolling along the ground, clods and pebbles flying and cartoon stars spinning out. */
export default {
  name: 'hit.charge',
  category: 'hit',
  whenToUse: 'A cavalry, knight, bull, rhino or boar charge crashes into enemies: a mounted lance charge breaking a line, a shield rush, a boss bull-rush, a battering ram knocking soldiers flying in a medieval, strategy or brawler game. Play it where the charge hits; in 2D set dir (degrees, the way the charge travels, default 0 = right), in 3D pass direction. For two sports players colliding use hit.tackle; for a slam into the ground use hit.heavy; for a spear point use hit.thrust.',
  duration: 0.65, loop: false, tint: '#ffd23a',
  tags: ['charge', 'cavalry', 'knight', 'bull rush', 'ram', 'impact', 'dust', 'medieval', 'hit'],
  build(c) {
    const col = c.color('#ffd23a');
    const dir = c.dir === undefined ? 0 : c.dir;
    const dust = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [a * 0.6, 0.5], [0, 1]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 220, color: '#fff6dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.22, size: 220, rotation: [0, 1.6], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 210, color: c.lighten(col, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      // dust exploding forward along the charge
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 10] }], dir, shape: { type: 'cone', radius: 14, angle: 0.65 },
        speed: [180, 380], life: [0.45, 0.62], size: [34, 54], rotation: [0, 6.28], color: ['#e6d5b4', '#cdb894'],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 40), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.45], [0.35, 1], [1, 1.3]])), dust(0.9)], order: 1 })),
      // dust rolling out along the ground
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [9, 10] }],
        shape: c.is3d ? { type: 'circle', radius: 18, thickness: 0, even: true } : { type: 'circle', radius: 18, thickness: 0, arc: Math.PI, even: true },
        speed: [180, 260], life: [0.45, 0.6], size: [30, 46], rotation: [0, 6.28], color: '#dccbab',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 25), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.25]])), dust(0.8)], order: 0 })),
      // clods and pebbles knocked flying
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 10] }], dir, shape: { type: 'cone', radius: 12, angle: 0.75 },
        speed: [300, 580], life: [0.45, 0.65], size: [7, 12], rotation: [0, 6.28], color: ['#8a6a4a', '#5a4430'],
        behaviors: [c.gravity(1600), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 4 }), 'box')),
      // cartoon stars spinning out
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [6, 7] }], shape: { type: 'circle', radius: 12, thickness: 0, even: true },
        speed: [260, 400], life: [0.45, 0.6], size: [18, 26], rotation: [0, 6.28], color: [col, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.gravity(400), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [0.7, 1], [1, 0]]))], order: 4 })),
    ];
  },
};
