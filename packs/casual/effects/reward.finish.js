/** Crossing the finish line: a bright flash, a line of light flaring across, chequered and coloured confetti fired from both sides, and stars bursting out. */
export default {
  name: 'reward.finish',
  category: 'reward',
  whenToUse: 'A racer crosses the finish line: the end of a car, kart, bike, horse or running race, a final lap, a swim or ski race finish, a runner game reaching the goal. Play it on the finish line (or the centre of the screen) as the winner crosses. For a goal, basket or touchdown use reward.goal; for a plain level win use reward.clear.',
  duration: 1.3, loop: false, tint: null,
  tags: ['finish', 'finish line', 'race', 'racing', 'win', 'chequered', 'confetti', 'reward'],
  build(c) {
    const gold = c.tint || c.rgb('#ffd23a');
    const light = c.lighten(gold, 0.6);
    // a confetti cannon of one colour, fired from one side
    const cannon = (dir, x, colour, n) => c.sys(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: n }], shape: { type: 'cone', radius: 6, angle: 0.28 }, dir, offset: [x, -50],
      speed: [480, 800], life: [1.0, 1.32], size: [7, 11], rotation: [0, 6.28], color: colour,
      behaviors: [c.gravity(900), c.limitSpeed([[0, 900], [0.3, 240], [1, 160]], 1.5), c.noise(2, 28), c.spin(-10, 10), c.colorOverLife(c.fade(0.8))], order: 3 }));
    // both sides fire black and white (the chequered flag) plus two bright colours
    const side = (dir, x) => [
      cannon(dir, x, '#ffffff', [8, 10]),
      cannon(dir, x, '#26262e', [8, 10]),
      cannon(dir, x, [c.rgb('#ff4f6b'), c.rgb('#ffd23a')], [7, 9]),
      cannon(dir, x, [c.rgb('#47b6ff'), c.rgb('#4dff9a')], [7, 9]),
    ];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.32, size: 320, color: '#fff6dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the finish line flaring: glints popping along a horizontal line
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [12, 14] }], shape: { type: 'rect', w: 300, h: 0 },
        speed: 0, life: [0.35, 0.55], size: [22, 36], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.5)), c.colorOverLife(c.fade(0.6))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 300, color: gold,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the cannons stand at both ends of the line and fire up and inward, so the confetti
      // crosses over the winner and stays on a phone screen (outward cannons threw half of it off)
      ...side(Math.PI * 0.42, -130),
      ...side(Math.PI * 0.58, 130),
      // stars bursting out a beat later
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.15, count: [14, 18] }], shape: { type: 'circle', radius: 20 },
        speed: [180, 360], life: [0.8, 1.1], size: [12, 20], rotation: [0, 6.28], color: [gold, light],
        behaviors: [c.gravity(450), c.speedOverLife(c.decel(0.3)), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.12, 1], [0.8, 1], [1, 0]]))], order: 4 })),
    ];
  },
};
