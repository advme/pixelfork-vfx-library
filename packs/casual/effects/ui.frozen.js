/** The player is freezing: white-blue frost creeps into the four screen corners, snowflakes slide out of them and settle, and the frost shimmers slowly. Loops until stopped. */
export default {
  name: 'ui.frozen',
  category: 'ui',
  whenToUse: 'The player is frozen or freezing, shown on the whole screen: hit by a frost attack, caught in a freeze trap, standing in a cold zone or a blizzard. Start it once with no position (frost creeps into the corners of the whole screen) and stop it when they thaw. For a frozen character or enemy use state.frozen; for an ice hit use hit.ice.',
  duration: 3, loop: true, anchor: 'center', tint: '#9fdcff',
  tags: ['ui', 'frozen', 'freeze', 'frost', 'ice', 'cold', 'snowflake', 'vignette'],
  build(c) {
    const col = c.color('#9fdcff');
    const frost = c.lighten(col, 0.35), pale = c.lighten(col, 0.7);
    const W = c.view.w, H = c.view.h, m = Math.min(W, H), k = m / 400;
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    const around = (size, gap) => Math.max(12, Math.min(40, Math.round((2 * (W + H)) / (size * gap))));
    // a spray out of one corner, fanned across the quarter of the screen that corner looks into
    const corner = (sx, sy) => ({ shape: { type: 'cone', angle: 0.75, radius: 4 }, dir: Math.atan2(-sy, -sx), offset: [(sx * W) / 2, (sy * H) / 2] });
    // things slide out of the corner and come to rest: frost creeping in
    const settle = () => c.speedOverLife(c.curve([[0, 1], [0.25, 0.1], [1, 0.02]]));
    const perCorner = (sx, sy) => [
      // the frost itself: big pale glows growing in the corner
      c.sys(Object.assign(corner(sx, sy), { tex: 'glow', blend: 'normal', loop: true, duration: 3, rate: 2.4,
        speed: [0, 70 * k], life: [2.4, 3], size: [m * 0.55, m * 0.8], color: frost,
        behaviors: [settle(), c.sizeOverLife(c.curve([[0, 0.4], [0.5, 1], [1, 1.05]])), c.colorOverLife(solid([[0, 0], [0.55, 0.35], [0.55, 0.75], [0, 1]]))], order: 1 })),
      // snowflakes sliding out of the corner and settling
      c.sys(Object.assign(corner(sx, sy), { tex: 'snowflake', blend: 'normal', loop: true, duration: 3, rate: 3.2,
        speed: [40 * k, 280 * k], life: [2, 2.8], size: [12, 26], rotation: [0, 6.28], color: [pale, '#ffffff'],
        behaviors: [settle(), c.spin(-0.5, 0.5), c.sizeOverLife(c.curve([[0, 0], [0.12, 1], [0.85, 1], [1, 0]])), c.colorOverLife(c.fade(0.75))], order: 3 })),
      // glints catching the light
      c.sys(Object.assign(corner(sx, sy), { tex: 'spark', blend: 'add', loop: true, duration: 3, rate: 3,
        speed: [30 * k, 260 * k], life: [0.5, 0.9], size: [10, 20], color: ['#ffffff', pale],
        behaviors: [c.speedOverLife(c.decel(0.02)), c.spin(-2, 2), c.sizeOverLife(c.pop(0.35, 0.5))], order: 4 })),
    ];
    return [
      // a thin frosted rim all round the screen, weaker than the corners: one evenly spaced set per cycle,
      // each set fading in over 0.6 s while the last one fades out, so the rim stays smooth and never blinks
      c.sys({ tex: 'glow', blend: 'normal', loop: true, duration: 3, bursts: [{ count: around(m * 0.4, 0.4) }], shape: { type: 'rect', w: W, h: H, even: true },
        life: 3.6, size: m * 0.4, color: frost,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.17, 1], [1, 1]])), c.colorOverLife(solid([[0, 0], [0.3, 0.17], [0.3, 0.83], [0, 1]]))], order: 0 }),
      // the slow shimmer: small soft lights coming and going along the frost
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 3, rate: 10, shape: { type: 'rect', w: W, h: H },
        life: [1.2, 1.8], size: [m * 0.12, m * 0.2], color: pale,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.5, 1], [1, 0.7]])), c.colorOverLife(solid([[0, 0], [0.4, 0.5], [0, 1]]))], order: 2 }),
      ...perCorner(-1, -1), ...perCorner(1, -1), ...perCorner(1, 1), ...perCorner(-1, 1),
    ];
  },
};
