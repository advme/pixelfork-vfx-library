/** A supernova: a blinding white flash and star flare, huge rings of light racing out, sparks shooting off and glowing pink and violet gas drifting away. */
export default {
  name: 'explosion.supernova',
  category: 'explosion',
  whenToUse: 'A star or a giant space object explodes: a sun going supernova, a planet or space station destroyed in a space game, a cosmic super attack, a galaxy-level boss finally dying; play it at the centre (for an ordinary spaceship blowing up use explosion.ship, for a screen-clearing bomb use explosion.nuke).',
  duration: 1.9, loop: false, tint: null,
  tags: ['supernova', 'star', 'space', 'cosmic', 'explosion', 'nova', 'sci-fi', 'shockwave'],
  build(c) {
    // its own palette (cyan rings, violet and pink gas, gold sparks), or shades of the tint
    const ring = c.tint ? c.lighten(c.tint, 0.35) : c.rgb('#6fd8ff');
    const gasA = c.tint || c.rgb('#b45cff');
    const gasB = c.tint ? c.darken(c.tint, 0.3) : c.rgb('#ff5fa8');
    const spark = c.tint ? c.lighten(c.tint, 0.65) : c.rgb('#ffd36a');
    const core = '#fff6dc';
    // rings race out fast, then slow down
    const expand = (from) => c.sizeOverLife(c.curve([[0, from], [0.3, 0.72], [1, 1]]));
    return [
      // the blinding flash: a white burst and a coloured bloom that lingers a little longer
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 360, color: core,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.1))], order: 5 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: 520, color: ring,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.4, 0.3], [0, 1]]))], order: 0 }),
      // a four-point star flare and a smaller diagonal one
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 440, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1], [1, 0]]))], order: 5 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 260, rotation: Math.PI / 4, color: spark,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 0]]))], order: 5 }),
      // the huge ring of light, a white inner ring, and a flat equatorial ring (in 2D a third, later ring)
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 1.1, size: 560, color: ring,
        behaviors: [expand(0.05), c.colorOverLife(c.fade(0.3))], order: 4 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.06, count: 1 }], life: 0.7, size: 400, color: '#ffffff',
        behaviors: [expand(0.05), c.colorOverLife(c.fade(0.1))], order: 5 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ time: 0.12, count: 1 }], life: 1.3, size: 680, color: gasA,
        behaviors: [expand(0.05), c.colorOverLife(c.fade(0.2))], order: 3 }, { snap: false })),
      // glowing gas billowing out and drifting
      c.sys(c.vol({ tex: 'puff', blend: 'add', bursts: [{ count: [16, 20] }], shape: { type: 'circle', radius: 30 },
        speed: [50, 160], life: [1.3, 1.9], size: [70, 130], rotation: [0, 6.28], color: [gasA, gasB],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 1.35]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.55, 0.1], [0.35, 0.5], [0, 1]]))], order: 1 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 24 },
        speed: [40, 120], life: [1.2, 1.8], size: [90, 150], color: [gasB, gasA],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.1], [0.25, 0.5], [0, 1]]))], order: 1 })),
      // sparks shooting off
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [26, 32] }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [450, 900], life: [0.5, 0.8], size: [4, 7], color: ['#ffffff', spark], stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 5 })),
      // star dust left twinkling where the star was
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.1, count: [12, 14] }], shape: { type: 'circle', radius: 60 },
        speed: [30, 120], life: [1.2, 1.8], size: [8, 14], rotation: [0, 0.8], color: ['#ffffff', spark],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.noise(1, 15), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.4, 0.5], [0.6, 1], [1, 0]]))], order: 5 })),
      // the afterglow of the dead star, and its white-hot remnant shrinking away
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 1.9, size: 220, color: gasA,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.45, 0.3], [0, 1]]))], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 1.2, size: 80, color: core,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.2], [0.2, 1], [1, 0]]))], order: 5 }),
    ];
  },
};
