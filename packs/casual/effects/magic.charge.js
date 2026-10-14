/** Charging a big attack: streaks of energy rush in to a crackling white-hot core while swelling glows and shrinking rings gather power. Loops until stopped. */
export default {
  name: 'magic.charge',
  category: 'magic',
  whenToUse: 'A hero holds to charge a big energy attack: an energy ball growing in the hands, a hold-and-release special, a super punch winding up, a boss gathering power for a blast. Play it at the hands (follow it) and stop it when the attack fires, then play the attack (magic.beam fits). For a bow or gun charging its shot use weapon.chargebow; for gentle spell casting or crafting use magic.cast.',
  duration: 1, loop: true, tint: '#5cd6ff',
  tags: ['charge', 'charging', 'hold', 'power', 'energy ball', 'wind up', 'special', 'spell'],
  build(c) {
    const col = c.color('#5cd6ff');
    const light = c.lighten(col, 0.6);
    return [
      // glows that keep swelling up and fading, so the power always seems to grow
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 4, life: 0.75, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1.15]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.5], [0, 1]]))], order: 0 }),
      // rings closing in
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }, { time: 0.5, count: 1 }], life: 0.5, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.2]])), c.colorOverLife(c.fadeInOut(0.3, 0.75))], order: 1 }),
      // streaks rushing in from all around
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 42, shape: { type: 'circle', radius: 100, thickness: 0 },
        speed: [-430, -360], life: [0.22, 0.25], size: [4, 7], color: [light, '#ffffff'], stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.6, 1], [1, 0.2]]))], order: 2 })),
      // sparkles drifting in
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 16, shape: { type: 'circle', radius: 75, thickness: 0.25 },
        speed: [-180, -150], life: [0.32, 0.38], size: [8, 14], color: [light, col],
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.7))], order: 2 })),
      // the white-hot core, flickering
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.25, bursts: [{ count: 1 }], life: 0.25, size: 56, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1.1], [1, 0.85]]))], order: 4 }),
      // little arcs crackling off the core
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 10, shape: { type: 'circle', radius: 14, thickness: 0 },
        speed: [250, 400], life: [0.06, 0.12], size: [3, 5], color: light, stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.noise(40, 10), c.colorOverLife(c.fade(0.3))], order: 3 })),
    ];
  },
};
