/** A spinning boomerang: two bright comet arcs with glinting tips whirl round it three times a second inside a faint motion-blur ring, and a glowing streak trails along its flight path. Loops until stopped. */
export default {
  name: 'weapon.boomerang',
  category: 'weapon',
  whenToUse: 'A spinning thrown weapon is in flight: a boomerang, a chakram, a thrown axe or shuriken, a spinning saw blade, a returning shield or disc. Play it on the projectile with follow; stop it when it is caught or hits (then play hit.slash or hit.metal). For a projectile that does not spin use move.trail.',
  duration: 1, loop: true, tint: '#ffd54a',
  tags: ['boomerang', 'chakram', 'spin', 'thrown', 'shuriken', 'disc', 'projectile', 'weapon'],
  build(c) {
    const col = c.color('#ffd54a');
    const light = c.lighten(col, 0.6);
    // three turns a second. Each spinning particle lives one turn (2% more, so there is no one-frame gap
    // before its rebirth, as in move.orbit) and is reborn at the same spot, so the whirl never jumps.
    // The whirl and ring are cut when the game stops it: they belong to the boomerang, only the trail lives out
    const T = 1 / 3;
    const w = c.TAU / T;
    const R = 30;
    // one frame apart: later bursts are born at the start angle while the earlier ones have already turned on,
    // so each pair strings out into an arc behind its head
    const f = 1 / 60;
    const rim = { type: 'circle', radius: R, thickness: 0, even: true };
    const whirl = (p) => c.sys(c.ground(Object.assign({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: T, shape: rim, speed: 0, life: T * 1.02 }, p)));
    return [
      // the faint motion-blur ring the blades sweep out
      c.sys(c.flat({ tex: 'ring', blend: 'add', loop: true, cut: true, bursts: [{ count: 1 }], life: 1, size: R * 2.2, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.96], [0.5, 1.04], [1, 0.96]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.2, 0], [0.3, 0.5], [0.2, 1]]))], order: 0 }, { snap: false })),
      // a glowing streak left in the air along its flight path
      c.sys({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 40, shape: { type: 'circle', radius: 8 },
        speed: [0, 10], life: [0.3, 0.4], size: [18, 26], color: [light, col],
        behaviors: [c.sizeOverLife(c.shrink()), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 1 }),
      // the arcs: a faint tail, a brighter middle and a white-hot head, two of each on opposite sides
      whirl({ bursts: [{ time: 3 * f, count: 2, cycle: 2, interval: f }], size: 16, color: c.darken(col, 0.25), behaviors: [c.orbit(w)], order: 2 }),
      whirl({ bursts: [{ time: f, count: 2, cycle: 2, interval: f }], size: 22, color: col, behaviors: [c.orbit(w)], order: 3 }),
      whirl({ bursts: [{ count: 2 }], size: 27, color: light, behaviors: [c.orbit(w)], order: 4 }),
      // a glint riding on each blade tip; it turns three quarter-turns a cycle, so its rebirth is invisible
      whirl({ tex: 'spark', bursts: [{ count: 2 }], size: 30, color: '#ffffff', behaviors: [c.orbit(w), c.spin(1.5 * Math.PI / T)], order: 5 }),
    ];
  },
};
