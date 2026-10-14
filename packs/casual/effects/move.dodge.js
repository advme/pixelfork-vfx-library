/** A quick sidestep: a pale afterimage is left where the character stood and fades, speed streaks shoot sideways and dust puffs at the feet. */
export default {
  name: 'move.dodge',
  category: 'move',
  whenToUse: 'A character quickly sidesteps or dodges an attack, hopping a short way to the side and leaving an afterimage: play it on the character\'s centre where it stood and set dir to the way it dodges (degrees, default right; direction: [x, y, z] in 3D), and for a long fast dash or blink use move.dash instead.',
  duration: 0.45, loop: false, tint: '#8fd3ff',
  tags: ['dodge', 'sidestep', 'evade', 'afterimage', 'miss', 'quick', 'fighting', 'move'],
  build(c) {
    const col = c.color('#8fd3ff');
    const light = c.lighten(col, 0.6);
    const dust = '#e9dcc7';
    const dir = c.dir === undefined ? 0 : c.dir;
    const dustLife = () => [c.speedOverLife(c.decel(0.05)), c.force(0, 30), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.15]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.5, 0.5], [0, 1]]))];
    // dust at the feet (about 40 px below the centre): both ways along the floor in 2D, a little ring on it in 3D
    const dustPuffs = c.is3d
      ? [c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 7] }], shape: { type: 'circle', radius: 8, thickness: 0 }, offset: [0, -38],
        speed: [80, 180], life: [0.3, 0.42], size: [18, 28], rotation: [0, 6.28], color: dust, behaviors: dustLife(), order: 0 }))]
      : [0.15, Math.PI - 0.15].map((d) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [2, 3] }], shape: { type: 'cone', radius: 4, angle: 0.25 }, dir: d, offset: [0, -38],
        speed: [90, 200], life: [0.3, 0.42], size: [18, 28], rotation: [0, 6.28], color: dust, behaviors: dustLife(), order: 0 }));
    return [
      ...dustPuffs,
      // the afterimage: a soft column of the character's height that hangs where it stood and fades
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: 6 }], shape: { type: 'rect', w: 0, h: 48 },
        speed: 0, life: [0.32, 0.42], size: [54, 64], rotation: [0, 6.28], color: light,
        behaviors: [c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.9], [1, 1.15]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0.35, 0.5], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 3 }], shape: { type: 'rect', w: 0, h: 44 },
        speed: 0, life: [0.25, 0.32], size: [72, 84], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0, 1]]))], order: 2 }),
      // speed streaks shooting the way of the dodge; they trail back toward where the character stood
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'cone', radius: 34, angle: 0.03 }, dir,
        offset: c.is3d ? undefined : [Math.cos(dir) * 24, Math.sin(dir) * 24],
        speed: [650, 950], life: [0.16, 0.24], size: [7, 10], color: light,
        stretch: { speed: c.is3d ? 0.01 : 0.016, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.curve([[0, 1], [0.5, 0.8], [1, 0]]))], order: 3 })),
    ];
  },
};
