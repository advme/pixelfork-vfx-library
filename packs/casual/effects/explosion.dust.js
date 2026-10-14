/** A building collapses: a huge dust cloud rolls out along the ground and billows up, with rubble chunks and gravel tumbling out of it. */
export default {
  name: 'explosion.dust',
  category: 'explosion',
  whenToUse: 'A building, tower, wall or bridge collapses, a cave or tunnel caves in, a demolition, a rockslide or giant boulder crashes down: a big rolling dust cloud with rubble and no fire. Play it on the ground at the base. For a fiery blast use explosion.big; for a small landing puff use move.land.',
  duration: 1.5, loop: false, anchor: 'feet', tint: '#d8c6a8',
  tags: ['dust', 'collapse', 'building', 'demolition', 'rubble', 'cave-in', 'crumble', 'explosion'],
  build(c) {
    const col = c.color('#d8c6a8');
    const light = c.lighten(col, 0.4);
    const dark = c.darken(col, 0.22);
    const rock = c.darken(col, 0.5);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const dustAlpha = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.95, 0.08], [0.8, 0.55], [0, 1]]));
    // the cloud rolling out along the ground: a ring of puffs on the floor in 3D, two low side sprays in 2D
    const roll = (p) => c.sys(Object.assign({ tex: 'puff', blend: 'normal', speed: [200, 380], life: [1.0, 1.35], size: [50, 90], rotation: [0, 6.28], color: [col, dark],
      behaviors: [c.speedOverLife(c.decel(0.04)), c.force(0, 18), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.5]])), dustAlpha()], order: 1 }, p));
    const rolling = c.is3d
      ? [roll(c.ground({ bursts: [{ count: [18, 22] }], shape: { type: 'circle', radius: 30, thickness: 0, even: true }, offset: [0, 24] }))]
      : [roll({ bursts: [{ count: [7, 9] }], shape: { type: 'cone', radius: 10, angle: 0.15 }, dir: 0.06 }),
        roll({ bursts: [{ count: [7, 9] }], shape: { type: 'cone', radius: 10, angle: 0.15 }, dir: Math.PI - 0.06 })];
    return [
      // a dull thump of light at the base
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 220, offset: [0, 30], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 0 }),
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.55, size: 420, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ...rolling,
      // the cloud billowing up over the rubble
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [9, 11] }, { time: 0.1, count: [5, 7] }], shape: { type: 'circle', radius: 40, arc: Math.PI },
        speed: [40, 150], life: [1.05, 1.35], size: [80, 130], rotation: [0, 6.28], color: [col, dark],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.force(0, 40), c.spin(-0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.45], [0.3, 1], [1, 1.4]])), dustAlpha()], order: 2 })),
      // rubble chunks thrown up and out
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [12, 14] }], shape: { type: 'cone', radius: 30, angle: 0.75 }, dir: Math.PI / 2,
        speed: [260, 560], life: [0.8, 1.1], size: [9, 18], rotation: [0, 6.28], color: [rock, c.darken(col, 0.65)],
        behaviors: [c.gravity(1700), c.spin(-9, 9), c.colorOverLife(c.fade(0.8))], order: 3 }, 'up'), 'box')),
      // gravel and small stones
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 20, arc: Math.PI },
        speed: [180, 420], life: [0.6, 0.9], size: [4, 7], color: [dark, rock],
        behaviors: [c.gravity(1400), c.colorOverLife(c.fade(0.7))], order: 3 })),
    ];
  },
};
