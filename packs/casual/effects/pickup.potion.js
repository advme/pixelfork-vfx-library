/** Drinking a potion: a gulp of coloured glow, a ring pulsing out round the waist, bubbles fizzing up the body and a few white glints. */
export default {
  name: 'pickup.potion',
  category: 'pickup',
  whenToUse: 'A character drinks or uses a potion, elixir or flask of any colour in an RPG or dungeon crawler: a health potion, a strength or speed draught, an antidote, a mystery brew. Play it on the character and tint it the potion colour. For a blue mana or energy refill use pickup.mana; for a healing spell use magic.heal; for a stat buff that is cast use magic.buff.',
  duration: 0.6, loop: false, tint: '#ff3f7a',
  tags: ['potion', 'drink', 'elixir', 'flask', 'brew', 'bubbles', 'rpg', 'consumable'],
  build(c) {
    const col = c.color('#ff3f7a');
    const light = c.lighten(col, 0.55);
    // a ring that lies around the body: side-on 'ellipse' in 2D, a level ring in 3D that keeps its own height
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // the gulp: a coloured glow swells over the body
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.6, 0.4], [0, 1]]))], order: 0 }),
      // a short white pop at the start
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 80, offset: [0, 10], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      // the glow ring pulsing out round the waist, a solid band with a bright band inside it
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.42, size: 150, offset: [0, -12], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      ring({ blend: 'add', bursts: [{ time: 0.04, count: 1 }], life: 0.4, size: 132, offset: [0, -12], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      // bubbles fizzing up the body: outlined bubbles and small solid ones
      c.sys(c.vol({ tex: 'ring', blend: 'normal', bursts: [{ count: [7, 9] }, { time: 0.1, count: [4, 6] }], shape: { type: 'circle', radius: 30 },
        speed: [10, 40], life: [0.35, 0.5], size: [10, 18], color: [light, col],
        behaviors: [c.force(0, 600), c.limitSpeed(190, 1), c.noise(3, 14), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [0.85, 1], [0.92, 1.3], [1, 0]]))], order: 3 })),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 26 },
        speed: [10, 30], life: [0.3, 0.45], size: [5, 9], color: light,
        behaviors: [c.force(0, 700), c.limitSpeed(220, 1), c.noise(3, 10), c.colorOverLife(c.fade(0.6))], order: 3 })),
      // white glints popping as it takes effect
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.12, count: [4, 6] }], shape: { type: 'circle', radius: 34 },
        speed: [10, 40], life: [0.3, 0.45], size: [10, 16], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 100), c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 })),
    ];
  },
};
