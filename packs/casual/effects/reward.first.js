/** First place: a gold flash, eight gold rays turning behind the winner, a fountain of gold and coloured confetti, a ring, a star burst and twinkles all around. */
export default {
  name: 'reward.first',
  category: 'reward',
  whenToUse: 'A player takes first place or is the last one standing: winning a battle royale (victory royale), finishing #1 in an .io match or a race, the top spot on the final leaderboard; play it once on the winner. For a whole-screen victory moment with no position use ui.victory; for crossing the finish line itself use reward.finish; for a trophy or cup being awarded use reward.trophy; while a player holds the lead use state.leader.',
  duration: 1.5, loop: false, tint: '#ffc83a',
  tags: ['first place', 'winner', 'number one', 'battle royale', 'last one standing', 'victory', 'gold', 'reward'],
  build(c) {
    const col = c.color('#ffc83a');
    const light = c.lighten(col, 0.6);
    // a lit 3D scene is brighter behind the effect than a 2D game screen, so the additive light is gentler there
    const k = c.is3d ? 0.7 : 1;
    // two 4-point ray sprites an eighth of a turn apart, turning the same way: eight even rays
    const rays = (size, rot, colour, peak) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 1.45, size, rotation: rot, color: colour,
      behaviors: [c.spin(0.5), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [peak * k, 0.15], [peak * k * 0.8, 0.7], [0, 1]]))], order: 1 });
    // a fast launch, then a slow flutter down; always straight up (a dir passed by the game must not tip the
    // fountain over in 2D, just as 'up' fixes it in 3D)
    const confetti = (colour, n, order) => c.sys(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: n }], shape: { type: 'cone', radius: 8, angle: 0.5 }, dir: Math.PI / 2, offset: [0, -30],
      speed: c.is3d ? [420, 700] : [600, 950], life: [1.1, 1.45], size: [8, 13], rotation: [0, 6.28], color: colour,
      behaviors: [c.gravity(900), c.limitSpeed([[0, 1300], [0.22, 1300], [0.38, 180], [1, 180]], 1.5), c.noise(2.5, 22), c.spin(-9, 9), c.colorOverLife(c.fade(0.8))], order }, 'up'));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 300, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9 * k, 0], [0.6 * k, 0.3], [0, 1]]))], order: 0 }),
      rays(380, 0, col, 0.5),
      rays(290, Math.PI / 4, light, 0.6),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.08, count: 1 }], life: 0.45, size: 320, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // gold-heavy confetti with a few bright colours
      confetti(col, 12, 3),
      confetti(light, 9, 3),
      confetti('#ffffff', 8, 3),
      confetti([c.rgb('#ff4f6b'), c.rgb('#ff8ad8')], 8, 3),
      confetti([c.rgb('#47b6ff'), c.rgb('#4dff9a')], 8, 3),
      // the star burst
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.1, count: [14, 16] }], shape: { type: 'circle', radius: 20 },
        speed: [180, 340], life: [0.8, 1.1], size: [11, 19], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.gravity(450), c.speedOverLife(c.decel(0.3)), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.12, 1], [0.8, 1], [1, 0]]))], order: 5 })),
      // twinkles flashing on all around the winner
      c.sys(c.vol({ tex: 'spark', blend: 'add', rate: 24, duration: 1, shape: { type: 'circle', radius: 140, thickness: 0.7 },
        speed: 0, life: [0.3, 0.5], size: [12, 22], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.35, 1], [1, 0]]))], order: 4 })),
    ];
  },
};
