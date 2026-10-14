/** Possessed: a dark aura of purple-black flames rises from the feet around the body, with violet tongues of fire, rising sparks, black smoke and an evil pulse. Loops until stopped. */
export default {
  name: 'state.possessed',
  category: 'state',
  whenToUse: 'A character is possessed, corrupted or taken over by evil: a demon inside, a dark-magic berserk, a cursed hero turning villain, a boss\'s dark phase, mind control by a dark power. Follow the body; stop it when the evil leaves. For a bright power-up aura use state.aura; for a lingering curse or hex use state.cursed; for ghosts circling someone use state.haunted.',
  duration: 1, loop: true, tint: '#8a3fff',
  tags: ['possessed', 'corrupted', 'demon', 'dark aura', 'evil', 'berserk', 'boss', 'status'],
  build(c) {
    const col = c.color('#8a3fff');
    const light = c.lighten(col, 0.5);
    // the effect sits on the middle of the body; the flames start at the feet, in a ring (3D) or a row (2D).
    // In 3D they start a little higher (shin height): born at the floor, the floor slices their round bottoms off into hard triangles.
    const feet = [0, c.is3d ? -26 : -36];
    const base = c.is3d ? { type: 'circle', radius: 30, thickness: 0.4 } : { type: 'rect', w: 70, h: 0 };
    return [
      // the evil pulse
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.5, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.08], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.35, 0], [0.55, 0.5], [0.35, 1]]))], order: 0 }),
      // black smoke curling off the top
      c.sys({ tex: 'puff', blend: 'normal', loop: true, rate: 5, shape: { type: 'circle', radius: 16 }, offset: [0, 40],
        speed: [5, 20], life: [0.8, 1.2], size: [24, 38], rotation: [0, 6.28], color: [c.darken(col, 0.85), c.darken(col, 0.93)],
        behaviors: [c.force(0, 90), c.limitSpeed(80, 1), c.noise(1.5, 12), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.25], [0, 1]]))], order: 1 }),
      // dark flames: the purple-black body of the aura (normal blend, so it can be dark)
      c.sys(c.ground({ tex: 'flame', blend: 'normal', loop: true, rate: 30, shape: base, offset: feet,
        speed: 0, life: [0.5, 0.72], size: [32, 52], rotation: [-0.2, 0.2], color: [c.darken(col, 0.72), c.darken(col, 0.9)],
        behaviors: [c.force(0, 480), c.limitSpeed(240, 1), c.noise(3, 10), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.5, 0.5], [0, 1]]))], order: 2 })),
      // violet tongues of fire
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 28, shape: base, offset: feet,
        speed: 0, life: [0.4, 0.6], size: [24, 40], rotation: [-0.2, 0.2], color: [light, col],
        behaviors: [c.force(0, 520), c.limitSpeed(280, 1), c.noise(3, 10), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.45))], order: 3 })),
      // sparks rising
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 12, shape: base, offset: feet,
        speed: 0, life: [0.5, 0.75], size: [4, 7], color: [light, '#ffffff'], stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.force(0, 620), c.limitSpeed(340, 1), c.colorOverLife(c.fade(0.5))], order: 4 })),
    ];
  },
};
