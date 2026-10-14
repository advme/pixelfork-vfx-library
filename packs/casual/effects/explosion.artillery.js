/** An artillery shell lands: a flash, a dome of fire balls, a wide crown of dirt thrown out, a shockwave and dust rolling along the ground, clods and dark smoke. */
export default {
  name: 'explosion.artillery',
  category: 'explosion',
  whenToUse: 'An artillery, mortar or cannon shell lands and blasts a crater in the ground: a cannonball or catapult boulder impact in tower defense, an airstrike or bombardment hit, a bomb going off in the dirt. Play it on the ground where it lands. It is wide and low with a crown of dirt; for a tall column straight up out of the ground (a landmine, a fire geyser) use explosion.mine, and for a blast in the air or of an object (a barrel, an enemy) use explosion.small.',
  duration: 1.1, loop: false, anchor: 'feet', tint: '#ff8a2a',
  tags: ['artillery', 'mortar', 'cannonball', 'shell', 'tower defense', 'airstrike', 'crater', 'explosion'],
  build(c) {
    const col = c.color('#ff8a2a');
    const up = Math.PI / 2;
    const fire = c.grad([[c.lighten(col, 0.75), 0], [col, 0.3], [c.darken(col, 0.6), 0.8], [c.darken(col, 0.8), 1]], [[1, 0], [1, 0.6], [0, 1]]);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // dust rolling out along the ground: a ring of puffs on the floor in 3D (lifted so they do not sink into it),
    // and in 2D two low sprays, left and right, because a circle there would throw the dust up in a dome
    const dust = (p) => c.sys(c.ground(Object.assign({ tex: 'puff', blend: 'normal', speed: [220, 320], life: [0.55, 0.75], size: [34, 52], rotation: [0, 6.28], color: '#cdb594',
      behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.3]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 1 }, p)));
    const dustRoll = c.is3d
      ? [dust({ bursts: [{ count: [12, 14] }], shape: { type: 'circle', radius: 24, thickness: 0, even: true }, offset: [0, 16] })]
      : [0.22, Math.PI - 0.22].map((d) => dust({ bursts: [{ count: [6, 7] }], dir: d, shape: { type: 'cone', radius: 10, angle: 0.2 } }));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 240, offset: [0, 20], color: '#fff2c4',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.25))], order: 5 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 300, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.12], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // fire balls bursting up out of the ground in a wide dome (an upward cone: a half circle in c.vol would aim sideways in 3D)
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [9, 11] }], dir: up, shape: { type: 'cone', radius: 14, angle: 1.1 },
        speed: [110, 260], life: [0.35, 0.55], size: [42, 66], rotation: [0, 6.28],
        behaviors: [c.colorOverLife(fire), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.15]])), c.speedOverLife(c.decel(0.1)), c.force(0, 120), c.spin(-2, 2)], order: 2 }, 'up')),
      // a wide crown of dirt thrown up and out of the crater, falling back
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [12, 14] }], dir: up, shape: { type: 'cone', radius: 16, angle: 0.55 },
        speed: [300, 520], life: [0.55, 0.8], size: [26, 44], rotation: [0, 6.28], color: ['#9a7650', '#6a4c34'],
        behaviors: [c.gravity(1100), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.9, 0.6], [0, 1]]))], order: 3 }, 'up')),
      ...dustRoll,
      // dark smoke left behind, rising
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.1, count: [6, 8] }], dir: up, shape: { type: 'cone', radius: 24, angle: 0.9 },
        speed: [50, 130], life: [0.75, 1.0], size: [55, 85], rotation: [0, 6.28], color: ['#5a5550', '#3c3834'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 70), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.35]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0.45, 0.6], [0, 1]]))], order: 0 }, 'up')),
      // clods of earth thrown wide
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [10, 12] }], dir: up, shape: { type: 'cone', radius: 18, angle: 0.75 },
        speed: [350, 650], life: [0.6, 0.85], size: [7, 13], rotation: [0, 6.28], color: ['#6e5038', '#3e2c1e'],
        behaviors: [c.gravity(1700), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 4 }, 'up'), 'box')),
      // sparks (born above the ground with short tails, because a streak trails back toward where it came from)
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 16] }], dir: up, shape: { type: 'cone', radius: 24, angle: 1.0 }, offset: [0, 30],
        speed: [300, 600], life: [0.3, 0.55], size: [5, 9], color: ['#fff2a8', col], stretch: { speed: 0.01, length: 1.2 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 5 }, 'up')),
    ];
  },
};
