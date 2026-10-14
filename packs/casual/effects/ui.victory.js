/** Victory: golden light rays turn behind the middle of the screen with a flash and a ring, and multicolour confetti bursts out and rains down over the whole screen. Multicolour confetti by default. */
export default {
  name: 'ui.victory',
  category: 'ui',
  whenToUse: 'A short victory screen moment: the win or results screen appears, a match or battle is won, a boss is beaten. Play it once with no position: golden rays shine from the middle of the screen while confetti falls over all of it (1.5 s). For a longer level-clear party with fireworks use reward.clear; for a confetti cannon fired from one spot use reward.confetti; for rays turning behind one prize on a popup use ui.rays.',
  duration: 1.5, loop: false, anchor: 'center', tint: null,
  tags: ['ui', 'victory', 'win', 'results', 'rays', 'confetti', 'gold', 'celebration'],
  build(c) {
    const gold = c.tint || c.rgb('#ffd23f');
    const light = c.lighten(gold, 0.6);
    const palette = c.tint ? [c.tint, c.lighten(c.tint, 0.5), c.darken(c.tint, 0.25)] : ['#ff4d6d', '#ffd23f', '#3dd6ff', '#7cff6b', '#c77dff'];
    const W = c.view.w, H = c.view.h, m = Math.min(W, H), k = m / 400;
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    // three four-point glints, 30 degrees apart, make twelve turning rays
    const rays = (turn, size, alpha) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 1.45, size, rotation: turn, color: gold,
      behaviors: [c.spin(0.45, 0.45), c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1], [1, 1.05]])), c.colorOverLife(solid([[0, 0], [alpha, 0.1], [alpha * 0.8, 0.6], [0, 1]]))], order: 1 });
    const flutter = (fast) => [c.gravity(900), c.limitSpeed([[0, fast], [0.15, fast], [0.3, 200], [1, 170]], 1.5), c.noise(2.5, 22), c.spin(-9, 9)];
    const per = Math.round(40 / palette.length), rain = Math.round(48 / palette.length);
    return [
      // the golden flash in the middle
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: m * 0.9, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.25))], order: 0 }),
      // the three glints overlap in the middle and add up there: kept faint, or the middle (where the results text
      // sits) burned out to a solid yellow disc for the whole moment
      rays(0, m * 1.7, 0.38), rays(Math.PI / 6, m * 1.5, 0.3), rays(Math.PI / 3, m * 1.7, 0.38),
      // a gold ring bursting out
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: m * 1.1, color: gold,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      // glints round the middle
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 12 }], shape: { type: 'circle', radius: m * 0.3 },
        speed: [20, 70], life: [0.5, 0.9], size: [14, 26], color: [light, '#ffffff'],
        behaviors: [c.spin(-3, 3), c.sizeOverLife(c.pop(0.25, 0.55))], order: 3 }),
      // confetti bursting out of the middle across the screen
      ...palette.map((colour) => c.sys({ tex: 'square', blend: 'normal', bursts: [{ count: per }], shape: { type: 'circle', radius: 20 },
        speed: [350 * k, 1000 * k], life: [1.25, 1.45], size: [9, 15], rotation: [0, 6.28], color: colour,
        behaviors: flutter(1100 * k).concat([c.colorOverLife(c.fade(0.8))]), order: 4 })),
      // confetti raining in over the top half of the screen
      ...palette.map((colour) => c.sys({ tex: 'square', blend: 'normal', bursts: [{ count: rain }],
        shape: { type: 'rect', w: W + 40, h: H * 0.6, thickness: 1 }, offset: [0, H / 2],
        life: [1.2, 1.45], size: [9, 15], rotation: [0, 6.28], color: colour,
        behaviors: flutter(400).concat([c.sizeOverLife(c.curve([[0, 0], [0.08, 1], [1, 1]])), c.colorOverLife(c.fade(0.8))]), order: 5 })),
    ];
  },
};
