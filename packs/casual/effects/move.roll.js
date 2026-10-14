/** A combat roll: a push-off ring, a cloud of dust strung out along the ground in the roll's direction and pebbles hopping ahead. */
export default {
  name: 'move.roll',
  category: 'move',
  whenToUse: 'A character does a combat roll, a dodge roll, a forward roll or a tumble along the ground: play it on the ground where the roll starts and set dir to the way it rolls (degrees, default right; direction: [x, y, z] in 3D), and for dust while running use move.dust instead.',
  duration: 0.7, loop: false, anchor: 'feet', tint: '#e3d2b4',
  tags: ['roll', 'dodge roll', 'combat roll', 'tumble', 'evade', 'dust', 'ground', 'move'],
  build(c) {
    const col = c.color('#e3d2b4');
    const dir = c.dir === undefined ? 0 : c.dir;
    // a little up from the roll direction (for sideways rolls), so dust and pebbles leave the ground instead of sinking into it
    const side = Math.cos(dir) >= 0 ? 1 : -1;
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const kickLife = () => [c.speedOverLife(c.decel(0.05)), c.force(0, 30), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.15]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.5, 0.5], [0, 1]]))];
    const pebbles = () => ({ tex: 'square', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 4, angle: 0.35 },
      speed: [180, 360], life: [0.28, 0.4], size: [5, 9], rotation: [0, 6.28], color: [c.darken(col, 0.4), c.darken(col, 0.55)],
      behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.6))], order: 2 });
    return [
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.32, size: 130, color: c.lighten(col, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the dust trail: one burst with a spread of speeds strings it out along the path of the roll
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [12, 14] }], shape: { type: 'cone', radius: 6, angle: 0.1 }, dir: dir + side * 0.08, offset: [0, 14],
        speed: [40, 440], life: [0.5, 0.68], size: [30, 48], rotation: [0, 6.28], color: [col, c.darken(col, 0.12)],
        behaviors: [c.speedOverLife(c.decel(0.05)), c.force(0, 25), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.35, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // a puff kicked back at the push-off (in 3D a small ring of puffs on the floor: a screen-plane cone
      // would ignore the game's world direction and could blow the same way as the roll)
      c.sys(c.is3d
        ? c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 6, thickness: 0 }, offset: [0, 10],
          speed: [70, 140], life: [0.35, 0.5], size: [22, 32], rotation: [0, 6.28], color: col, behaviors: kickLife(), order: 1 })
        : { tex: 'puff', blend: 'normal', bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: 4, angle: 0.3 }, dir: dir + Math.PI - side * 0.35, offset: [0, 10],
          speed: [70, 160], life: [0.35, 0.5], size: [22, 32], rotation: [0, 6.28], color: col, behaviors: kickLife(), order: 1 }),
      // pebbles hopping ahead in 2D; in 3D they hop up round the push-off (a spray along a flat world
      // direction would launch them level with the floor and gravity would sink them straight into it)
      c.sys(c.chunks(c.is3d
        ? c.spray(Object.assign(pebbles(), { shape: { type: 'cone', radius: 6, angle: 0.6 }, speed: [200, 340] }), 'up')
        : Object.assign(pebbles(), { dir: dir + side * 0.9 }), 'ball')),
    ];
  },
};
