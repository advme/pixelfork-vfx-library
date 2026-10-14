/** A pressure plate pressed: the plate's edge lights up in a bright line (a glowing ring on the floor in 3D), dust puffs out around it and a few glints rise. */
export default {
  name: 'world.pressureplate',
  category: 'world',
  whenToUse: 'A pressure plate, floor button or weight switch is stepped on or pressed down by a crate in a platformer, dungeon or puzzle level; play it on the plate at floor level, and use world.switch for a lever or wall button, world.trap for a hidden trap that fires, or move.land for a plain heavy landing.',
  duration: 0.6, loop: false, anchor: 'feet', tint: '#5ce1ff',
  tags: ['pressure plate', 'floor button', 'step', 'switch', 'puzzle', 'dungeon', 'platformer', 'activate'],
  build(c) {
    const col = c.color('#5ce1ff');
    const light = c.lighten(col, 0.6);
    const dust = '#e2d4bc';
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const puffAlpha = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]));
    const puff = (p) => c.sys(Object.assign({ tex: 'puff', blend: 'normal', speed: [140, 260], life: [0.35, 0.5], size: [20, 32], rotation: [0, 6.28], color: dust,
      behaviors: [c.speedOverLife(c.decel(0.06)), c.force(0, 30), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.15]])), puffAlpha()], order: 1 }, p));
    // 3D: the plate's rim lights up as a ring lying on the floor; 2D: a bright line along the plate, a white core inside a coloured one
    const glowLine = c.is3d
      ? [ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 95, color: col,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.15, 1.05], [1, 1]])), c.colorOverLife(c.fade(0.4))], order: 2 }),
        c.sys(c.flat({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 110, color: col,
          behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.4], [0, 1]]))], order: 0 }))]
      : [c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: 0, offset: [62, 3],
          speed: 2, life: 0.45, size: 22, color: col, stretch: { speed: 0, length: 5.6 },
          behaviors: [c.colorOverLife(c.fade(0.35))], order: 2 }),
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: 0, offset: [55, 3],
          speed: 2, life: 0.35, size: 9, color: '#ffffff', stretch: { speed: 0, length: 12 },
          behaviors: [c.colorOverLife(c.fade(0.3))], order: 3 }),
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 120, offset: [0, 8], color: col,
          behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.3, 0.4], [0, 1]]))], order: 0 })];
    // the dust: a ring of puffs rolling out over the floor in 3D, two low side sprays in 2D
    const dustPuffs = c.is3d
      ? [puff(c.ground({ bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 34, thickness: 0, even: true } }))]
      : [puff({ bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: 4, angle: 0.2 }, dir: 0.12, offset: [40, 0] }),
        puff({ bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: 4, angle: 0.2 }, dir: Math.PI - 0.12, offset: [-40, 0] })];
    return [
      ...glowLine,
      ...dustPuffs,
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.35, size: 150, color: c.lighten(dust, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // glints lifting off the plate
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [5, 6] }], shape: c.is3d ? { type: 'circle', radius: 44, thickness: 0 } : { type: 'rect', w: 110, h: 0 },
        speed: 0, life: [0.35, 0.5], size: [8, 13], rotation: [0, 0.8], color: light,
        behaviors: [c.force(0, 320), c.limitSpeed(160, 1), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
