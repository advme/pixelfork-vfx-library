/** Cursed: dark purple wisps curl up from the body inside a faint shadowy glow, over a slowly breathing ring at the feet. Loops until stopped. */
export default {
  name: 'state.cursed',
  category: 'state',
  whenToUse: 'A character carries a lasting curse or hex: a cursed hero, a doom mark, a haunted item being held, a vampire\'s drain, a dark damage-over-time debuff. Follow the body; stop it when the curse is lifted. For the moment a curse lands use magic.curse; for a character taken over by evil use state.possessed; for a scared character use state.fear; for poison use state.poison.',
  duration: 1.6, loop: true, tint: '#8a3cff',
  tags: ['curse', 'cursed', 'hex', 'doom', 'dark', 'shadow', 'debuff', 'status'],
  build(c) {
    const col = c.color('#8a3cff');
    const light = c.lighten(col, 0.4);
    const base = c.is3d ? { type: 'circle', radius: 28 } : { type: 'rect', w: 70, h: 0 };
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const breathe = () => c.sizeOverLife(c.curve([[0, 0.94], [0.5, 1.05], [1, 0.94]]));
    // 3D: the wisps also spiral around the body; in 2D they curl with the wobble alone
    const curl = () => (c.is3d ? [c.orbit(2)] : []);
    return [
      // the faint dark glow is a shadow, so it is drawn with normal blending
      c.sys({ tex: 'glow', blend: 'normal', loop: true, cut: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 150, color: c.darken(col, 0.75),
        behaviors: [breathe(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.22, 0], [0.34, 0.5], [0.22, 1]]))], order: 0 }),
      // a slowly breathing ring at the feet
      ring({ blend: 'add', loop: true, cut: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 92, offset: [0, -42], color: col,
        behaviors: [breathe(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.8, 0.5], [0.45, 1]]))], order: 1 }),
      // dark wisps curling up
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 9, shape: base, offset: [0, -34],
        speed: 0, life: [1.2, 1.6], size: [18, 30], rotation: [0, 6.28], color: [c.darken(col, 0.35), c.darken(col, 0.6)],
        behaviors: [c.force(0, 300), c.limitSpeed(90, 1), c.noise(1.2, 14), c.spin(-1.5, 1.5)].concat(curl(), [
          c.sizeOverLife(c.curve([[0, 0.4], [0.5, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.25], [0, 1]]))]), order: 2 })),
      // purple glowing wisps between them
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 14, shape: base, offset: [0, -34],
        speed: 0, life: [1.0, 1.4], size: [10, 18], color: [light, col],
        behaviors: [c.force(0, 320), c.limitSpeed(100, 1), c.noise(1.4, 12)].concat(curl(), [
          c.sizeOverLife(c.curve([[0, 0.3], [0.4, 1], [1, 0]])), c.colorOverLife(c.fadeInOut(0.2, 0.6))]), order: 3 })),
      // tiny motes drifting off
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 6, shape: { type: 'circle', radius: 34 },
        speed: [5, 15], life: [0.8, 1.2], size: [3, 5], color: light,
        behaviors: [c.force(0, 50), c.colorOverLife(c.fade(0.4))], order: 4 })),
    ];
  },
};
