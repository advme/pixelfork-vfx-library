/** A shadow step: a burst of near-black smoke swallows the character, purple sparks fly out, a blade glint flashes and dark wisps curl upward. */
export default {
  name: 'move.shadowstep',
  category: 'move',
  whenToUse: 'A ninja, rogue or assassin vanishes or appears in a quick burst of dark smoke: a shadow step, a stealth vanish, an assassin slipping behind an enemy, a vampire turning to mist; play it on the body at both ends of the move (for a thick grey smoke bomb use explosion.smokebomb, for a glitchy digital blink use move.blink, for a bright magical teleport use move.teleport, for a white cartoon poof use explosion.puff).',
  duration: 0.9, loop: false, tint: '#8a3fff',
  tags: ['shadow', 'ninja', 'assassin', 'smoke bomb', 'vanish', 'stealth', 'blink', 'rogue'],
  build(c) {
    const col = c.color('#8a3fff');
    const light = c.lighten(col, 0.55);
    const smoke = [c.darken(col, 0.78), c.darken(col, 0.9)];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the burst of dark smoke
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 16 },
        speed: [110, 250], life: [0.45, 0.7], size: [40, 62], rotation: [0, 6.28], color: smoke,
        behaviors: [c.speedOverLife(c.decel(0.06)), c.force(0, 40), c.spin(-2.5, 2.5), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.9, 0.45], [0, 1]]))], order: 2 })),
      // a dense core that hides the body for a moment (camera-facing, so in 3D it is pulled in front of the character)
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 8] }], shape: { type: 'circle', radius: 18 },
        speed: [10, 35], life: [0.45, 0.6], size: [72, 96], rotation: [0, 6.28], color: smoke,
        behaviors: [c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [1, 0.4], [0, 1]]))], order: 3 }),
      // dark wisps curling up out of the smoke
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.12, count: [5, 6] }], shape: { type: 'circle', radius: 26 },
        speed: [10, 40], life: [0.5, 0.75], size: [16, 26], rotation: [0, 6.28], color: smoke,
        behaviors: [c.force(0, 240), c.limitSpeed(150, 1), c.noise(2, 30), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.3]])),
          c.colorOverLife(c.fadeInOut(0.15, 0.5))], order: 4 })),
      // purple sparks flying out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 10 },
        speed: [260, 480], life: [0.22, 0.38], size: [4, 7], color: [light, col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4))], order: 5 })),
      // glowing motes rising after it
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: 0.08, count: [8, 10] }], shape: { type: 'circle', radius: 28 },
        speed: [10, 40], life: [0.5, 0.8], size: [5, 9], color: [col, light],
        behaviors: [c.force(0, 260), c.limitSpeed(170, 1), c.noise(2.5, 20), c.sizeOverLife(c.pop(0.2, 0.5))], order: 6 })),
      // two white blade glints
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], shape: { type: 'circle', radius: 20 }, speed: 0, life: 0.16, size: [40, 56], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]]))], order: 7 }),
    ];
  },
};
