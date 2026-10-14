/** A crystal ball: a soft glow breathes around the glass, two colours of mist swirl round inside it in opposite ways, sparkles twinkle in the mist and a glossy highlight sits on the glass. Loops until stopped. */
export default {
  name: 'world.crystalball',
  category: 'world',
  whenToUse: 'A fortune teller\'s crystal ball, a seer\'s or wizard\'s scrying orb, a prophecy sphere, a magic snow globe or a glass orb glowing on a table or pedestal: play it on the centre of the ball and leave it running (size 1 fits a ball about 70 px across). For a glowing crystal or gem cluster use world.crystal; for a hologram projector use world.hologram; for a bubbling potion pot use world.cauldron.',
  duration: 2, loop: true, tint: '#c06bff',
  tags: ['crystal ball', 'fortune teller', 'orb', 'scrying', 'seer', 'mystic', 'magic', 'prophecy'],
  build(c) {
    const col = c.color('#c06bff');
    const light = c.lighten(col, 0.55);
    // the second mist colour leans to blue, so the swirl shows two tones whatever the tint
    const other = c.lighten(c.mix(col, '#4fc8ff', 0.5), 0.2);
    const L = 2;
    const breathe = (a, b) => c.sizeOverLife(c.curve([[0, a], [0.5, b], [1, a]]));
    const alpha = (a, b) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [b, 0.5], [a, 1]]));
    // mist swirling round inside the glass
    const mist = (color, turn, rate) => c.sys({ tex: 'puff', blend: 'add', loop: true, rate, shape: { type: 'circle', radius: 20, thickness: 0.6 },
      speed: 0, life: [1.2, 1.6], size: [22, 32], rotation: [0, 6.28], color,
      behaviors: [c.orbit(turn), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0.6], [0.5, 1], [1, 0.8]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.3], [0.4, 0.7], [0, 1]]))], order: 2 });
    // the standing parts are `cut`, so the glow goes the moment the game stops it
    return [
      // the soft glow around the ball, and a brighter heart inside it
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 160, color: col,
        behaviors: [breathe(0.9, 1.08), alpha(0.35, 0.55)], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 66, color: light,
        behaviors: [breathe(1.08, 0.9), alpha(0.5, 0.75)], order: 1 }),
      // a faint rim of the glass
      c.sys({ tex: 'ring', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 74, color: light,
        behaviors: [alpha(0.22, 0.35)], order: 1 }),
      mist(col, 2.2, 6),
      mist(other, -1.6, 5),
      // sparkles twinkling in the mist, carried round with it
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 6, shape: { type: 'circle', radius: 24 },
        speed: 0, life: [0.4, 0.7], size: [7, 12], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.orbit(2.2), c.sizeOverLife(c.pop(0.3, 0.55))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 8, shape: { type: 'circle', radius: 26 },
        speed: 0, life: [0.8, 1.2], size: [3, 5], color: light,
        behaviors: [c.orbit(-1.6), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 3 }),
      // the glossy highlight on the glass, upper left
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 18, offset: [-13, 14], color: '#ffffff',
        behaviors: [alpha(0.55, 0.75)], order: 4 }),
    ];
  },
};
