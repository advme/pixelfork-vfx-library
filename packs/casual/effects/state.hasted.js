/** Hasted: green speed streaks rush up past the body, little chevrons flick upward, a speed ring slides up and a quick glow pulses. Loops until stopped. */
export default {
  name: 'state.hasted',
  category: 'state',
  whenToUse: 'A character is hasted or has a speed buff for a while: a haste spell, a speed potion, sprint boots, an energy drink, an attack-speed boost. Follow the body; stop it when the buff ends. For the moment a buff is cast use magic.buff; for lines streaming behind something that is actually moving fast use move.speed.',
  duration: 0.5, loop: true, tint: '#3dff8a',
  tags: ['haste', 'speed', 'fast', 'quick', 'buff', 'sprint', 'agility', 'status'],
  build(c) {
    const col = c.color('#3dff8a');
    const light = c.lighten(col, 0.6);
    const base = (r, w) => (c.is3d ? { type: 'circle', radius: r } : { type: 'rect', w, h: 0 });
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // a quick, eager pulse
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.5, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.06], [0.4, 0.94], [1, 1.06]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.4, 0], [0.22, 0.6], [0.4, 1]]))], order: 0 }),
      // a speed ring that slides up the body twice a second
      ring({ blend: 'add', loop: true, duration: 0.5, bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir: Math.PI / 2, offset: [0, -38],
        speed: 230, life: 0.36, size: 84, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.55]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.2], [0, 1]]))], order: 1 }),
      // streaks rushing up past the body: a wide upward cone is a line in 2D and a ring round the body in 3D, and
      // most streaks start near its rim, so they run up the body's sides; they fade in while their tails clear the feet
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, rate: 48, shape: { type: 'cone', radius: 40, angle: 0.04, thickness: 0.3 }, dir: Math.PI / 2, offset: [0, -22],
        speed: [380, 560], life: [0.18, 0.24], size: [5, 8], color: [light, col], stretch: { speed: 0.007, length: 1.5 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.25, 0.6))], order: 2 }, 'up')),
      // little chevrons flicking upward
      c.sys(c.ground({ tex: 'arrow', blend: 'add', loop: true, rate: 7, shape: base(24, 50), offset: [0, -6],
        speed: 0, life: [0.32, 0.4], size: [16, 22], color: [light, col],
        behaviors: [c.force(0, 1400), c.limitSpeed(300, 1), c.sizeOverLife(c.curve([[0, 0], [0.15, 1.2], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.6))], order: 3 })),
    ];
  },
};
