/** A spaceship touchdown: the thruster blasts down one last time, a ring of dust is blown out across the ground, hot sparks skitter away and pebbles hop. */
export default {
  name: 'move.landing',
  category: 'move',
  whenToUse: 'A spaceship, lander, rocket, drone or hovering mech touches down on a planet, a moon or a landing pad: play it at the feet / landing legs at the moment of touchdown (tint it for the ground: grey moon dust, red Mars sand); for a character landing from a jump use move.land, for a car landing use vehicle.jump.',
  duration: 0.75, loop: false, anchor: 'feet', tint: '#d8ccbc',
  tags: ['landing', 'touchdown', 'spaceship', 'lander', 'rocket', 'dust', 'space', 'thruster'],
  build(c) {
    const col = c.color('#d8ccbc');
    const hot = '#ffd27a';
    // rings lying on the ground: flat in 3D, a side-on ellipse in 2D
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const dust = (p) => c.sys(Object.assign({ tex: 'puff', blend: 'normal', speed: [200, 380], life: [0.5, 0.8], size: [28, 46], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
      behaviors: [c.speedOverLife(c.decel(0.05)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.25]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))], order: 2 }, p));
    const sparks = (p) => c.sys(Object.assign({ tex: 'glow', blend: 'add', speed: [250, 520], life: [0.25, 0.45], size: [3, 5], color: ['#ffffff', hot],
      stretch: { speed: 0.015, length: 1.5 }, behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.5))], order: 4 }, p));
    // 3D: everything rolls outward over the floor in every direction (the dust lifted a little so the puffs sit on the
    // floor instead of half inside it); 2D: two sprays along the ground, left and right. Sparks start away from the
    // centre because their streaks trail back toward where they came from.
    const blown = c.is3d
      ? [dust(c.ground({ bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 10, thickness: 0 }, offset: [0, 10] })),
        sparks(c.ground({ bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 18, thickness: 0 }, offset: [0, 4] }))]
      : [dust({ bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 6, angle: 0.2 }, dir: 0.12, offset: [0, 8] }),
        dust({ bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 6, angle: 0.2 }, dir: Math.PI - 0.12, offset: [0, 8] }),
        sparks({ bursts: [{ count: [7, 9] }], shape: { type: 'cone', radius: 4, angle: 0.15 }, dir: 0.1, offset: [22, 4] }),
        sparks({ bursts: [{ count: [7, 9] }], shape: { type: 'cone', radius: 4, angle: 0.15 }, dir: Math.PI - 0.1, offset: [-22, 4] })];
    return [
      // the last thruster blast hitting the ground, and its light on the floor
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [5, 6] }], shape: { type: 'cone', radius: 6, angle: 0.15 }, dir: -Math.PI / 2, offset: [0, 46],
        speed: [380, 460], life: 0.1, size: [14, 20], color: ['#ffffff', hot], stretch: { speed: 0.004, length: 1 },
        behaviors: [c.colorOverLife(c.fade(0.3))], order: 3 }, 'down')),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.28, size: 150, offset: [0, 10], color: hot,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // the shock ring across the ground
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.4, size: 200, color: c.lighten(col, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ...blown,
      // pebbles hopping up: aimed upward and gone by the time they land, so none sink below the ground
      // (the slowest, most tilted one rises at 240 * cos(0.45) = 216 px/s and lands after 0.39 s, past the longest life)
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'cone', radius: 10, angle: 0.45 }, dir: Math.PI / 2,
        speed: [240, 340], life: [0.3, 0.38], size: [3, 6], color: c.darken(col, 0.3),
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.6))], order: 3 }, 'up')),
    ];
  },
};
