/** Stirring: a glowing swirl turns in the bowl, coloured sparkles and bits of the mix circle round and spiral slowly in, and two bright lights lead the stir. Loops until stopped. */
export default {
  name: 'move.stir',
  category: 'move',
  whenToUse: 'Something is being stirred or mixed in a cooking, baking or crafting game: a spoon stirring a pot of soup, whisking batter in a bowl, mixing a drink or a dough, a stirring mini-game. Play it on the bowl\'s surface, stop it when the stirring stops and tint it to the mixture colour (it lies flat in the bowl in 3D). For a pot that is only boiling use world.boil; for a witch\'s potion use world.cauldron; for a water vortex use world.whirlpool.',
  duration: 1.2, loop: true, tint: '#ffcb47',
  tags: ['stir', 'mix', 'whisk', 'swirl', 'bowl', 'spoon', 'cooking', 'baking'],
  build(c) {
    const col = c.color('#ffcb47');
    const light = c.lighten(col, 0.55);
    // one turn of the spoon every T seconds
    const T = 1.2, w = (Math.PI * 2) / T, R = 40;
    // 3D: lies flat on the mixture (not snapped down to the floor); 2D: seen from above
    const still = (p) => (c.is3d ? c.sys(c.flat(p, { snap: false })) : c.sys(p));
    // circling things: the orbit lies level in the bowl in 3D (c.ground turns its axis to world up)
    const circling = (p) => c.sys(c.ground(Object.assign({ loop: true }, p)));
    // a standing glow lives a little past each cycle and fades in and out over that overlap, so it never blinks
    const steady = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.05], [a * 1.3, 0.5], [a, 0.95], [0, 1]]));
    const handOver = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.02], [1, 0.98], [0, 1]]));
    const lead = { type: 'circle', radius: R * 0.8, thickness: 0, even: true };
    return [
      // the swirl glowing in the bowl
      still({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: 1 }], life: T * 1.05, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.94], [0.5, 1.04], [1, 0.94]])), steady(0.22)], order: 0 }),
      still({ tex: 'ring', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: 1 }], life: T * 1.05, size: R * 2.6, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.96], [0.5, 1.03], [1, 0.96]])), steady(0.2)], order: 1 }),
      // bits of the mix going round
      circling({ tex: 'disc', blend: 'normal', rate: 8, shape: { type: 'circle', radius: R * 0.9, thickness: 0.6 }, speed: -8,
        life: [0.6, 0.9], size: [4, 6], color: [col, c.darken(col, 0.25)],
        behaviors: [c.orbit(w * 0.9), c.colorOverLife(c.fadeInOut(0.2, 0.7))], order: 2 }),
      // coloured sparkles circling and spiralling slowly in
      circling({ tex: 'glow', blend: 'add', rate: 28, shape: { type: 'circle', radius: R, thickness: 0.7 }, speed: -12,
        life: [0.5, 0.8], size: [6, 10], color: [col, light],
        behaviors: [c.orbit(w), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 3 }),
      circling({ tex: 'spark', blend: 'add', rate: 16, shape: { type: 'circle', radius: R, thickness: 0.4 }, speed: -10,
        life: [0.35, 0.55], size: [8, 13], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.orbit(w), c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 }),
      // two bright lights leading the stir round (reborn each turn exactly where the last ones finish)
      circling({ tex: 'glow', blend: 'add', cut: true, duration: T, bursts: [{ count: 2 }], shape: lead, speed: 0, life: T * 1.02, size: 24, color: col,
        behaviors: [c.orbit(w), handOver()], order: 5 }),
      circling({ tex: 'glow', blend: 'add', cut: true, duration: T, bursts: [{ count: 2 }], shape: lead, speed: 0, life: T * 1.02, size: 10, color: '#ffffff',
        behaviors: [c.orbit(w), handOver()], order: 5 }),
    ];
  },
};
