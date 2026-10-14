/** A furry bonk: a white impact flash, tufts of fur puff out and float down, short fur strands fly and cartoon stars spin off. */
export default {
  name: 'hit.fur',
  category: 'hit',
  whenToUse: 'A furry creature or pet gets bopped in a cartoon scuffle: a cat fight, a dog tussle, a bonk in whack-a-mole, a fluffy monster or plush toy hit, a bear swatted. Play it on the creature; tint it to the fur colour (ginger, grey, brown, white). For a slapstick bonk on the head use hit.bonk; for a plain punch use hit.punch; for squashing an enemy from above use hit.stomp.',
  duration: 0.6, loop: false, tint: '#e8a25c',
  tags: ['fur', 'fluff', 'pet', 'cat fight', 'scuffle', 'bonk', 'cartoon', 'hit'],
  build(c) {
    const col = c.color('#e8a25c');
    const light = c.lighten(col, 0.3);
    return [
      // the bonk: a four-point flash and a quick ring
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 120, color: '#fff6d8', rotation: 0.35,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.25))], order: 4 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.26, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // tufts of fur knocked loose: pop out, brake, then float down turning
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [9, 11] }], shape: { type: 'circle', radius: 10 },
        speed: [160, 280], life: [0.45, 0.62], size: [14, 22], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(320), c.limitSpeed([[0, 280], [0.25, 40], [1, 36]], 1), c.spin(-3, 3), c.noise(1.6, 6),
          c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1.1], [0.7, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.65))], order: 1 })),
      // short fur strands flicking out
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 8 },
        speed: [260, 420], life: [0.22, 0.32], size: [3, 4.5], color: [c.darken(col, 0.15), col], stretch: { speed: 0.012, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(500), c.colorOverLife(c.fade(0.6))], order: 2 })),
      // solid cartoon stars (normal blend, so they stay yellow on a bright sky or a pale coat)
      c.sys(c.vol({ tex: 'star', blend: 'normal', bursts: [{ time: 0.03, count: [3, 4] }], shape: { type: 'circle', radius: 8, arc: Math.PI },
        speed: [170, 280], life: [0.4, 0.5], size: [14, 20], rotation: [0, 6.28], color: ['#ffe45c', '#ffc21a'],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(700), c.spin(-7, 7), c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [0.7, 1], [1, 0]]))], order: 3 })),
    ];
  },
};
