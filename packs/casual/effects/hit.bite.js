/** A cartoon chomp: two glowing jaw arcs with white fangs snap shut on the target, then a pink flash, a ring and a burst of red-pink sparks. */
export default {
  name: 'hit.bite',
  category: 'hit',
  whenToUse: 'A bite or chomp attack lands: a zombie, vampire, wolf, shark, snake, monster or pet bites a target, a bear trap or plant snaps shut, a hungry creature takes a bite. Play it on the target. For a claw rake use hit.claw; for a sword or blade use hit.slash; for a bleeding wound use hit.blood.',
  duration: 0.4, loop: false, tint: '#ff4d6d',
  tags: ['bite', 'chomp', 'jaws', 'fangs', 'vampire', 'zombie', 'monster', 'hit'],
  build(c) {
    const col = c.color('#ff4d6d');
    const light = c.lighten(col, 0.55);
    // Each jaw moves 30 px in the first 45% of its 0.22 s life, then stops dead: the snap.
    // Fangs use the same motion as their jaw, so they stay attached to it.
    const snap = (down) => [c.force(0, down ? -4000 : 4000), c.speedOverLife(c.curve([[0, 1], [0.45, 1], [0.5, 0], [1, 0]]))];
    // a half circle of glowing dots, the ends included (15 dots, 14 gaps)
    const arc = (radius) => ({ type: 'circle', radius, arc: Math.PI * 15 / 14, thickness: 0, even: true });
    // two fangs, 13 px either side of the middle
    const pair = { type: 'circle', radius: 13, thickness: 0, even: true };
    const jaw = (down, p) => c.sys(Object.assign({ blend: 'add', speed: 0, life: 0.22, bursts: [{ count: 15 }], size: 18, color: light,
      behaviors: snap(down).concat([c.sizeOverLife(c.curve([[0, 0.6], [0.2, 1], [0.6, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.6))]) }, p));
    const fangs = (down, p) => c.sys(Object.assign({ tex: 'drop', blend: 'normal', speed: 0, life: 0.22, bursts: [{ count: 2 }], shape: pair, size: 18, color: '#ffffff',
      behaviors: snap(down).concat([c.sizeOverLife(c.curve([[0, 0.7], [0.2, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.6))]) }, p));
    return [
      // the upper jaw: the top half of a circle, coming down
      jaw(true, { tex: 'glow', shape: arc(36), offset: [0, 12], order: 2 }),
      // the lower jaw: a negative radius mirrors the half circle to the bottom; it comes up
      jaw(false, { tex: 'glow', shape: arc(-36), offset: [0, -12], order: 2 }),
      // fangs hanging from the upper jaw (teardrops turned point down) and standing on the lower one
      fangs(true, { rotation: Math.PI, offset: [0, 38], order: 3 }),
      fangs(false, { rotation: 0, offset: [0, -38], order: 3 }),
      // the flash and ring as the jaws meet
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.09, count: 1 }], life: 0.16, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.09, count: 1 }], life: 0.24, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // red-pink sparks bursting from the bite
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: 0.09, count: [12, 16] }], shape: { type: 'circle', radius: 10 },
        speed: [250, 450], life: [0.2, 0.3], size: [4, 8], color: [col, light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(500), c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 })),
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ time: 0.09, count: [5, 7] }], shape: { type: 'circle', radius: 12 },
        speed: [120, 240], life: [0.22, 0.3], size: [7, 11], color: col,
        behaviors: [c.gravity(700), c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.shrink())], order: 4 })),
    ];
  },
};
