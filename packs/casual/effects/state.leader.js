/** The leader of the server: a crown of three gold stars floats above the head in a soft gold glow, with sparkles circling it and glints popping. Loops until stopped. */
export default {
  name: 'state.leader',
  category: 'state',
  whenToUse: 'A player is the leader, king or top player of the match: #1 on the leaderboard of an .io game (snake, agar, battle arena), the king in king of the hill, the crown holder, the MVP or the one with the most kills or points; follow the head and stop it when they lose the lead. For a one-off first-place win use reward.first; for a holy or blessed character use state.halo; for a leader buffing troops use state.rally.',
  duration: 1.2, loop: true, anchor: 'head', tint: '#ffcf3a',
  tags: ['leader', 'king', 'crown', 'top player', 'number one', 'mvp', 'io', 'status'],
  build(c) {
    const col = c.color('#ffcf3a');
    const light = c.lighten(col, 0.6);
    const L = 1.2;
    const breathe = (a, b) => c.sizeOverLife(c.curve([[0, a], [0.5, b], [1, a]]));
    const steady = (a, b) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [b, 0.5], [a, 1]]));
    // the standing parts are `cut`, so the crown goes the moment the game stops it
    // one star of the crown: solid gold with a lighter shine on top, the outer ones tilted outward
    const star = (x, y, size, rot) => [
      c.sys({ tex: 'star', blend: 'normal', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size, rotation: rot, offset: [x, y], color: col,
        behaviors: [breathe(0.94, 1.06)], order: 2 }),
      c.sys({ tex: 'star', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: size * 0.7, rotation: rot, offset: [x, y + size * 0.04], color: light,
        behaviors: [breathe(0.94, 1.06), steady(0.45, 0.75)], order: 3 }),
    ];
    return [
      // soft gold light around the crown
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 120, offset: [0, 12], color: col,
        behaviors: [breathe(0.9, 1.08), steady(0.3, 0.48)], order: 0 }),
      ...star(-20, 7, 22, 0.35),
      ...star(20, 7, 22, -0.35),
      ...star(0, 16, 32, 0),
      // four sparkles circling the crown, a quarter turn per cycle so each cycle carries on the last
      // (3D: around it like a halo; 2D: around it in the screen plane)
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 4 }], shape: { type: 'circle', radius: 40, thickness: 0, even: true },
        offset: [0, 10], speed: 0, life: L, size: 13, rotation: 0.4, color: '#ffffff',
        behaviors: [c.orbit(Math.PI / 2 / L), breathe(0.8, 1.15)], order: 4 })),
      // gold glitter left along the circle, drifting down
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 12, shape: { type: 'circle', radius: 40, thickness: 0 }, offset: [0, 10],
        speed: 0, life: [0.4, 0.6], size: [5, 8], color: [light, col],
        behaviors: [c.force(0, -40), c.limitSpeed(30, 1), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.3))], order: 1 })),
      // white glints popping on the crown
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 2.5, shape: { type: 'rect', w: 50, h: 14, thickness: 1 }, offset: [0, 11],
        speed: 0, life: 0.4, size: [12, 18], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.45))], order: 5 }),
    ];
  },
};
