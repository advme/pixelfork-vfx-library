/** A sneak attack from behind: two dark purple slashes cross in an X, a red-purple crit star flares and shadow puffs curl away. */
export default {
  name: 'hit.backstab',
  category: 'hit',
  whenToUse: 'A rogue, assassin, ninja or thief lands a sneak attack from behind or out of stealth: a backstab, an ambush, a shadow strike, an instant-kill stab; play it on the victim and set dir (degrees, default down-right) for the first slash, and for an ordinary critical hit use hit.crit instead.',
  duration: 0.6, loop: false, tint: '#a040ff',
  tags: ['backstab', 'sneak attack', 'stealth', 'assassin', 'rogue', 'ninja', 'ambush', 'shadow'],
  build(c) {
    const col = c.color('#a040ff');
    const light = c.lighten(col, 0.55);
    const dark = c.darken(col, 0.4);
    const crit = c.mix(col, '#ff2d55', 0.55);
    const dir = c.dir === undefined ? -Math.PI / 5 : c.dir;
    const out = [
      // shadow puffs curling up behind everything
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 18 },
        speed: [50, 150], life: [0.45, 0.6], size: [34, 54], rotation: [0, 6.28], color: [c.darken(col, 0.55), c.darken(col, 0.72)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 70), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.6, 0.5], [0, 1]]))], order: 0 })),
    ];
    // two slashes crossing in an X: a dark smoky body with a thin glowing edge inside it
    [{ d: dir, t: 0 }, { d: dir - Math.PI / 2, t: 0.07 }].forEach((s) => {
      // streaks trail back from their particle, so the emitter starts ahead to centre the slash on the victim
      const offset = [Math.cos(s.d) * 48, Math.sin(s.d) * 48];
      const life = () => [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.35)), c.sizeOverLife(c.curve([[0, 0.7], [0.2, 1], [1, 0.25]]))];
      out.push(
        c.sys({ tex: 'glow', blend: 'normal', bursts: [{ time: s.t, count: 3 }], shape: { type: 'cone', radius: 2, angle: 0.01 }, dir: s.d, offset,
          speed: [650, 750], life: [0.2, 0.24], size: [22, 26], color: dark,
          stretch: { speed: 0.004, length: 5 }, behaviors: life(), order: 1 }),
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: s.t, count: 2 }], shape: { type: 'cone', radius: 1, angle: 0.01 }, dir: s.d, offset,
          speed: [680, 720], life: 0.21, size: 9, color: c.lighten(col, 0.3),
          stretch: { speed: 0.004, length: 18 }, behaviors: life(), order: 2 }),
      );
    });
    out.push(
      // the crit star when the X is complete
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.07, count: 1 }], life: 0.18, size: 110, color: crit,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.07, count: 2 }], life: 0.3, size: 120, rotation: [0, 6.28], color: crit,
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.25))], order: 4 }),
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ time: 0.07, count: [8, 11] }], shape: { type: 'cone', radius: 6, angle: 0.6 }, dir,
        speed: [300, 620], life: [0.2, 0.32], size: [4, 7], color: [crit, light],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(500), c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 5 })),
    );
    return out;
  },
};
