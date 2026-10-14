/** A new high score: golden rays turn behind a flash, a ring bursts, gold stars spray out and sparkles rise in a column. */
export default {
  name: 'reward.record',
  category: 'reward',
  whenToUse: 'A new high score or personal best: a NEW RECORD banner on the results screen, beating your best distance, time or score, reaching the top of the leaderboard. Play it on the score. For a rank or league promotion use reward.rankup; for a whole-screen level win use reward.clear.',
  duration: 1.4, loop: false, tint: '#ffd23a',
  tags: ['record', 'high score', 'best', 'new best', 'leaderboard', 'score', 'gold', 'reward'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // golden rays turning slowly behind everything: two crosses an eighth-turn apart, spinning together, make an even eight-point burst
    const rays = (turn) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 1.38, size: 340, rotation: turn, color: col,
      behaviors: [c.spin(0.6, 0.6), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 0.9]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0.6, 0.7], [0, 1]]))], order: 0 });
    return [
      rays(0.2), rays(0.2 + Math.PI / 4),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 240, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 260, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // a few beams shooting up the column (raised so their tails start at the score)
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 3 }, { time: 0.08, count: 3 }], shape: { type: 'cone', radius: 18, angle: 0.05 }, offset: [0, 50],
        speed: [450, 650], life: [0.35, 0.45], size: [8, 12], color: light, stretch: { speed: 0.008, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 3 }, 'up')),
      // the gold star burst
      c.sys(c.vol({ tex: 'star', blend: 'normal', bursts: [{ count: [14, 16] }], shape: { type: 'circle', radius: 24 },
        speed: [220, 420], life: [0.6, 0.9], size: [14, 24], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.gravity(450), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.8, 1], [1, 0]]))], order: 4 })),
      // sparkles rising in a column above the score
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 46, duration: 0.65, shape: c.is3d ? { type: 'circle', radius: 30 } : { type: 'rect', w: 70, h: 0 },
        speed: 0, life: [0.5, 0.75], size: [11, 17], color: [light, '#ffffff'],
        behaviors: [c.force(0, 520), c.limitSpeed(380, 1), c.noise(2, 10), c.sizeOverLife(c.pop(0.2, 0.6))], order: 5 })),
    ];
  },
};
