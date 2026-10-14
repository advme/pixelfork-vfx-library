/** A charging shot: streaks of light rush in from all around and gather into a bright, swelling point with a spinning glint, while rings close in on it. Loops until stopped. */
export default {
  name: 'weapon.chargebow',
  category: 'weapon',
  whenToUse: 'A ranged weapon is charging up before the shot: a bow being drawn, a charged arrow, a charge shot on a blaster, a slingshot pulled back, a power shot held. Play it at the arrow tip or barrel while the player holds; stop it on release and play the shot (move.trail on the flying arrow, weapon.laser or weapon.muzzle for a gun). For a hero charging a big energy attack in the hands use magic.charge, for casting a spell magic.cast.',
  duration: 0.6, loop: true, tint: '#66e3ff',
  tags: ['charge', 'bow', 'arrow', 'charged shot', 'draw', 'power shot', 'gather', 'weapon'],
  build(c) {
    const col = c.color('#66e3ff');
    const light = c.lighten(col, 0.65);
    // a 4-point glint looks the same every quarter turn: one quarter turn per cycle keeps the loop seamless
    const quarter = Math.PI / 2 / 0.6;
    return [
      // the gathering glow, swelling and settling
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.6, bursts: [{ count: 1 }], life: 0.6, size: 80, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [0.5, 1.1], [1, 0.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.65, 0], [0.9, 0.5], [0.65, 1]]))], order: 0 }),
      // rings closing in on the tip
      c.sys({ tex: 'ring', blend: 'add', loop: true, cut: true, duration: 0.6, bursts: [{ count: 1 }], life: 0.5, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.15]])), c.colorOverLife(c.fadeInOut(0.3, 0.7))], order: 1 }),
      // streaks of light rushing inward
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 46, shape: { type: 'circle', radius: 80, thickness: 0.25 },
        speed: [-300, -240], life: [0.22, 0.26], size: [4, 7], color: [light, col], stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.7, 1], [1, 0]])), c.colorOverLife(c.fadeInOut(0.2, 0.8))], order: 2 })),
      // sparkles drifting inward
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 14, shape: { type: 'circle', radius: 60, thickness: 0.3 },
        speed: [-160, -120], life: [0.35, 0.42], size: [8, 14], color: light,
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.6))], order: 3 })),
      // the hot white point at the tip
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.6, bursts: [{ count: 1 }], life: 0.6, size: 28, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.15], [1, 0.85]]))], order: 4 }),
      // a spinning glint on the point
      c.sys({ tex: 'spark', blend: 'add', loop: true, cut: true, duration: 0.6, bursts: [{ count: 1 }], life: 0.6, size: 54, color: light,
        behaviors: [c.spin(quarter), c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.15], [1, 0.9]]))], order: 5 }),
    ];
  },
};
