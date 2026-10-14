/** A hologram projector: a widening column of pale cyan light rises from the projector, scan rings sweep up through it, data bits float and the light flickers. Loops until stopped. */
export default {
  name: 'world.hologram',
  category: 'world',
  whenToUse: 'A hologram, holo-display or projector is on in a sci-fi level (a mission briefing table, a holo-map, a shop terminal, a ghostly AI guide, a projected character): play it at the projector and leave it running, drawing the projected picture yourself on top; for a beam marking dropped loot use world.lootbeam, for a teleporter pad use world.teleporter.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#7ff2ff',
  tags: ['hologram', 'projector', 'holo', 'sci-fi', 'scan', 'display', 'terminal', 'futuristic'],
  build(c) {
    const col = c.color('#7ff2ff');
    const light = c.lighten(col, 0.5);
    // a ring that lies flat: side-on 'ellipse' in 2D, a flat ring in 3D that stays at the projector's height
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // a light flicker: mostly steady with two quick drop-outs per cycle
    const flick = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [a, 0.2], [a * 0.25, 0.23], [a, 0.27], [a, 0.62], [a * 0.35, 0.64], [a * 0.9, 0.67], [a, 1]]));
    return [
      // soft glow filling the column, and a brighter one on the lens
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 150, offset: [0, 80], color: col,
        behaviors: [flick(0.3)], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 54, offset: [0, 4], color: light,
        behaviors: [flick(0.9)], order: 3 }),
      // the column: faint streaks of light rising and spreading out
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, rate: 18, shape: { type: 'cone', radius: 10, angle: 0.24 }, dir: Math.PI / 2, offset: [0, 40],
        speed: [80, 110], life: [1.1, 1.4], size: [20, 30], color: col, stretch: { speed: 0.01, length: 2 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.32, 0.25], [0.22, 0.7], [0, 1]]))], order: 1 }, 'up')),
      // the lens ring at the base
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 56, color: col,
        behaviors: [flick(0.8)], order: 2 }),
      // scan rings rising steadily, and a bright sweep racing up once a cycle
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }, { time: 0.4, count: 1 }, { time: 0.8, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir: Math.PI / 2,
        speed: 105, life: 1.2, size: 64, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [1, 1.25]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.12], [0.55, 0.7], [0, 1]]))], order: 3 }),
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ time: 0.2, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir: Math.PI / 2,
        speed: 260, life: 0.55, size: 64, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.1], [0.6, 0.6], [0, 1]]))], order: 4 }),
      // data bits: little square pixels drifting up and blinking
      c.sys(c.ground({ tex: 'pixel', blend: 'add', loop: true, rate: 9, shape: c.is3d ? { type: 'circle', radius: 24 } : { type: 'rect', w: 50, h: 0 }, offset: [0, 14],
        speed: 0, life: [1.1, 1.5], size: [3, 6], color: [col, '#ffffff'],
        behaviors: [c.force(0, 120), c.limitSpeed(55, 1), c.sizeOverLife(c.curve([[0, 0], [0.1, 1], [0.4, 1], [0.42, 0.3], [0.5, 1], [0.85, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
