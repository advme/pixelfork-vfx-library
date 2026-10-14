/** A swing: a bright curved swoosh sweeps along a pendulum arc through the character, then a puff of wind and whoosh lines at the bottom. */
export default {
  name: 'move.swing',
  category: 'move',
  whenToUse: 'A character swings on a rope, a vine, a grappling hook, a web line or a monkey bar, or anything makes a big whooshing arc through the air; play it once on the character as the swing starts (dir 0 = swinging to the right, the default, 180 = to the left; the arc always faces the camera, so a 3D game passes dir too, not direction), and use hit.slash for a weapon swing that hits something, move.dash for a straight burst of speed.',
  duration: 0.55, loop: false, tint: '#ffffff',
  tags: ['swing', 'rope', 'vine', 'grapple', 'whoosh', 'pendulum', 'arc', 'platformer', 'move'],
  build(c) {
    const col = c.color('#ffffff');
    const dir = c.dir === undefined ? 0 : c.dir;
    const right = Math.cos(dir) >= 0;
    // The swoosh: particles born one after another at the top of one side of a circle whose pivot is R above the
    // character, each orbiting it, so together they sweep down through the character and up the other side.
    // A circle emitter starts its arc at angle 0 (the right side); a negative radius starts it at the left side.
    const R = 80;
    const arc = (p) => c.sys(Object.assign({ bursts: [{ count: 1, cycle: 18, interval: 0.009 }],
      shape: { type: 'circle', radius: right ? -R : R, thickness: 0, arc: 0.01 }, offset: [0, R], speed: 0 }, p));
    const spinDir = right ? 9 : -9;
    return [
      // the wide soft band of the swoosh
      arc({ tex: 'glow', blend: 'normal', life: 0.3, size: 30, color: col,
        behaviors: [c.orbit(spinDir), c.sizeOverLife(c.curve([[0, 0.25], [0.55, 1], [1, 0]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.45, 0.5], [0, 1]]))], order: 1 }),
      // its bright core
      arc({ tex: 'glow', blend: 'add', life: 0.28, size: 11, color: c.lighten(col, 0.6),
        behaviors: [c.orbit(spinDir), c.sizeOverLife(c.curve([[0, 0.3], [0.55, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 }),
      // a puff of wind as the swoosh passes the bottom of the arc
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.16, count: [5, 6] }], shape: { type: 'circle', radius: 10 },
        speed: [80, 160], life: [0.3, 0.42], size: [18, 30], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.45, 0.5], [0, 1]]))], order: 0 })),
      // whoosh lines flicked forward along the swing
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.15, count: [4, 5] }], dir: right ? 0.1 : Math.PI - 0.1, shape: { type: 'cone', radius: 16, angle: 0.25 },
        speed: [380, 560], life: [0.15, 0.22], size: [4, 6], color: c.lighten(col, 0.6),
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.3))], order: 3 }),
    ];
  },
};
