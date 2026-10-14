/** A magic seal: a purple glow and a double seal ring breathe over the door, a sigil slowly turns in the middle, rune marks orbit slowly with glints flashing on them, and purple motes drift around. Loops until stopped. */
export default {
  name: 'world.seal',
  category: 'world',
  whenToUse: 'A door, gate, chest, tomb or passage is sealed by magic and cannot be opened yet: a locked boss door, a magic barrier blocking a corridor, a cursed seal on a crypt, a ward that needs a key, a switch or a puzzle to break. Play it on the middle of the door (size 1 is about 150 px across) and leave it running; stop it when the seal breaks, then play explosion.magic or world.dooropen. For a sci-fi energy wall use world.forcefield; for a magic circle on the floor use magic.rune; for a gate to walk through use magic.portal.',
  duration: 3, loop: true, tint: '#a35cff',
  tags: ['seal', 'sealed door', 'barrier', 'ward', 'rune', 'locked', 'dungeon', 'magic'],
  build(c) {
    const col = c.color('#a35cff');
    const light = c.lighten(col, 0.55);
    const L = 3, R = 62;
    const breathe = (a, b) => c.sizeOverLife(c.curve([[0, a], [0.5, b], [1, a]]));
    const alpha = (a, b) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [b, 0.5], [a, 1]]));
    // the standing parts are `cut`, so the seal goes the moment the game stops it instead of hanging on for up to 3 s
    return [
      // a soft purple glow over the doorway
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 190, color: col,
        behaviors: [breathe(0.95, 1.05), alpha(0.3, 0.45)], order: 0 }),
      // the seal: an outer and an inner ring breathing against each other
      c.sys({ tex: 'ring', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 150, color: col,
        behaviors: [breathe(0.98, 1.03), alpha(0.75, 1)], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 96, color: light,
        behaviors: [breathe(1.03, 0.97), alpha(0.9, 0.6)], order: 1 }),
      // a four-point sigil in the middle, a quarter turn per cycle
      c.sys({ tex: 'spark', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 1 }], life: L, size: 72, color: light,
        behaviors: [c.spin(Math.PI / 2 / L, Math.PI / 2 / L), alpha(0.55, 0.85)], order: 2 }),
      // six rune marks orbiting slowly between the rings (one slot per cycle, so each cycle carries on from the last)
      c.sys({ tex: 'plus', blend: 'add', loop: true, cut: true, duration: L, bursts: [{ count: 6 }], shape: { type: 'circle', radius: R, thickness: 0, even: true },
        speed: 0, life: L, size: 16, rotation: Math.PI / 4, color: light,
        behaviors: [c.orbit((2 * Math.PI) / 6 / L), alpha(0.75, 1)], order: 3 }),
      // glints flashing on the orbit now and then
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 2.5, shape: { type: 'circle', radius: R, thickness: 0 },
        speed: 0, life: [0.35, 0.5], size: [14, 22], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.orbit((2 * Math.PI) / 6 / L), c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 }),
      // purple motes drifting around the seal
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 9, shape: { type: 'circle', radius: 80 },
        speed: [4, 14], life: [1.4, 2.0], size: [4, 8], color: [light, col],
        behaviors: [c.force(0, 18), c.limitSpeed(20, 1), c.noise(1, 10), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 2 })),
    ];
  },
};
