/** A fruit sliced in half: a white slash streak through it, a juicy spray of drops and streaks flung along the cut, seeds tumbling out and a splash of juice mist. */
export default {
  name: 'hit.slice',
  category: 'hit',
  whenToUse: 'A fruit, vegetable or other soft juicy object is sliced by a swipe in a fruit-slicing game (Fruit Ninja style): play it on the fruit at the moment of the cut, set dir along the swipe (degrees, default 30 = up-right; direction: [x, y, z] in 3D) and tint it the juice colour (red watermelon, orange, green kiwi). For a whole fruit smashed or squished use explosion.fruit; for food chopped on a cutting board use hit.chop; for a sword slash on an enemy use hit.slash.',
  duration: 0.55, loop: false, tint: '#ff3d5a',
  tags: ['slice', 'fruit', 'cut', 'juice', 'swipe', 'ninja', 'chop', 'hit'],
  build(c) {
    const col = c.color('#ff3d5a');
    const light = c.lighten(col, 0.4);
    const deep = c.darken(col, 0.2);
    const seed = c.mix('#2a1810', col, 0.12);
    const dir = c.dir === undefined ? Math.PI / 6 : c.dir;
    return [
      // a pale splash of juice mist behind everything
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 0 }),
      // juicy drops spattered all round the cut
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 12 },
        speed: [120, 280], life: [0.3, 0.45], size: [4, 8], color: light,
        behaviors: [c.gravity(1100), c.sizeOverLife(c.shrink())], order: 1 })),
      // fat juice drops thrown out along the swipe, arcing down
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [12, 15] }], shape: { type: 'cone', radius: 10, angle: 0.5 }, dir,
        speed: [220, 520], life: [0.35, 0.55], size: [6, 13], color: [col, light],
        behaviors: [c.gravity(1300), c.speedOverLife(c.decel(0.5)), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.85], [1, 0]]))], order: 2 })),
      // fast juice streaks
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'cone', radius: 6, angle: 0.3 }, dir,
        speed: [420, 700], life: [0.2, 0.32], size: [4, 7], color: deep, stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 2 })),
      // seeds tumbling out
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'cone', radius: 8, angle: 0.8 }, dir,
        speed: [140, 320], life: [0.4, 0.55], size: [7, 10], rotation: [0, 6.28], color: seed,
        behaviors: [c.gravity(1400), c.spin(-12, 12), c.colorOverLife(c.fade(0.8))], order: 3 })),
      // the white slash: a fan of fat streaks along the swipe. Streaks trail BACK from their particle, so they are
      // fast enough to run on past the fruit while their tails still reach back through it: the cut crosses the fruit
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 5 }], shape: { type: 'cone', radius: 6, angle: 0.05 }, dir,
        speed: [1100, 1400], life: [0.12, 0.16], size: [16, 22], color: '#ffffff', stretch: { speed: 0.006, length: 3 },
        behaviors: [c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.2)), c.sizeOverLife(c.curve([[0, 0.8], [0.3, 1], [1, 0.2]]))], order: 4 })),
      // the glint of the blade
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 80, rotation: dir, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
    ];
  },
};
