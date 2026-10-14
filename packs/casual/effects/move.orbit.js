/** A little satellite circling a character: a bright glowing dot with a blinking light and a fading trail, along a faint orbit line. Loops until stopped. */
export default {
  name: 'move.orbit',
  category: 'move',
  whenToUse: 'Something small circles a character or object: a companion drone or satellite, an orbiting shield orb, a pet fairy light, an electron around an atom, a power-up orbiting the player; follow the character and stop it when the orbiter is gone (it circles in the screen plane in 2D and level around the body in 3D); for a whole ring of rocks around a planet use world.planetring, for stars circling a dazed head use state.stun.',
  duration: 1.6, loop: true, tint: '#7fe3ff',
  tags: ['orbit', 'satellite', 'drone', 'companion', 'circle', 'space', 'electron', 'orb'],
  build(c) {
    const col = c.color('#7fe3ff');
    const light = c.lighten(col, 0.6);
    const R = 58;
    // one turn every T seconds. The dot is re-born at the start angle every T seconds, exactly where the
    // last one ends its turn, so the circling never jumps. `even` makes every dot start at the same angle.
    const T = 1.6;
    const w = (Math.PI * 2) / T;
    const path = { type: 'circle', radius: R, thickness: 0, even: true };
    // Each dot lives a little past its turn: the old one fades out exactly on top of the new one fading in
    // (both are at the same angle then), so the hand-over never blinks.
    // c.ground lays the orbit level around the body in 3D (the orbit axis turns with it to world up).
    const handOver = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.02], [1, 0.98], [0, 1]]));
    const dot = (p) => c.sys(c.ground(Object.assign({ blend: 'add', loop: true, duration: T, bursts: [{ count: 1 }], life: T * 1.02, shape: path, speed: 0, cut: true }, p)));
    // The trail: with `even`, a steady rate is born at an angle that advances `arc` radians every second.
    // An arc of w keeps every new trail particle right under the dot.
    const trail = (p) => c.sys(c.ground(Object.assign({ blend: 'add', loop: true, duration: T, shape: { type: 'circle', radius: R, thickness: 0, arc: w, even: true }, speed: 0 }, p)));
    const orbitLine = { tex: 'ring', blend: 'add', loop: true, duration: T, bursts: [{ count: 1 }], life: T * 1.05, size: R * 2.53, color: col, cut: true,
      behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.16, 0.05], [0.16, 0.95], [0, 1]]))], order: 0 };
    return [
      // the faint orbit line: flat around the body in 3D
      c.is3d ? c.sys(c.flat(orbitLine, { snap: false })) : c.sys(orbitLine),
      trail({ tex: 'glow', rate: 45, life: 0.4, size: [7, 9], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 1 }),
      trail({ tex: 'spark', rate: 4, life: [0.4, 0.6], size: [6, 10], rotation: [0, 0.8], color: light,
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.4))], order: 1 }),
      // the orbiter: a coloured halo, a white core and a light blinking twice a turn
      dot({ tex: 'glow', size: 34, color: col, behaviors: [c.orbit(w), handOver()], order: 2 }),
      dot({ tex: 'glow', size: 13, color: '#ffffff', behaviors: [c.orbit(w), handOver()], order: 3 }),
      dot({ tex: 'spark', size: 24, color: light, behaviors: [c.orbit(w), handOver(), c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [0.5, 0.5], [0.75, 1], [1, 0.5]]))], order: 4 }),
    ];
  },
};
