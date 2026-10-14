/** A force-field wall or door: a shimmering honeycomb sheet of glowing hexagon tiles, a wave of light running up it, soft energy inside and sparks crackling off it. Loops until stopped. */
export default {
  name: 'world.forcefield',
  category: 'world',
  whenToUse: 'A force-field wall or energy door blocks a doorway, gate or corridor in a sci-fi level (a locked door, a barrier the player must switch off, a containment cell, a safe-zone wall): play it at the centre of the opening (size 1 is about 120 x 150 px) and stop it when the field goes down; for a dome around a character or base use state.dome, for a hit on the field use hit.shieldzap.',
  duration: 1.6, loop: true, tint: '#4fc3ff',
  tags: ['force field', 'energy wall', 'door', 'barrier', 'hexagon', 'sci-fi', 'gate', 'shield'],
  build(c) {
    const col = c.color('#4fc3ff');
    const light = c.lighten(col, 0.5);
    const T = 1.6;
    // pointy-top hexagon tiles in a honeycomb: S is the sprite size, hs / vs the spacing across / between rows
    const S = 26, hs = 23.4, vs = 20.3;
    // one row of tiles: an even burst on a flat line puts tiles at equal steps (the inner ones twice, so the
    // honeycomb is brighter inside and softer at its edges). Every row is re-laid at the start of each cycle
    // (bursts only at time 0, so nothing new appears after stop()) and lives a little longer than a cycle, fading
    // in and out so old and new tiles cross-fade. A row flashes when the wave of light reaches it (k x 0.07 s);
    // the tiles vanish at once when the field is switched off
    const L = T + 0.06, x = 0.06 / L;
    const row = (k) => {
      const wide = k % 2 === 0;
      const f = x + 0.01 + (k * 0.07) / L;
      return c.sys({ tex: 'hexshard', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: wide ? 8 : 6 }],
        shape: { type: 'rect', w: (wide ? 4 : 3) * hs, h: 0, even: true }, offset: [0, (k - 3) * vs],
        speed: 0, life: L, size: S, rotation: Math.PI / 6, color: [col, light],
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, x], [0.5, f - 0.005], [1, f + 0.02], [0.5, f + 0.12], [0.5, 1 - x], [0, 1]]))], order: 2 });
    };
    return [
      // soft energy filling the sheet: a few big glows laid each cycle, slowly cross-fading into the next few
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: T, bursts: [{ count: 5 }], shape: { type: 'rect', w: 96, h: 124, thickness: 1 },
        speed: 0, life: T + 0.6, size: [64, 84], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.26, 0.27], [0.26, 0.73], [0, 1]]))], order: 0 }),
      ...[0, 1, 2, 3, 4, 5, 6].map(row),
      // little white snaps crackling over the surface
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 5, shape: { type: 'rect', w: 100, h: 130, thickness: 1 },
        speed: 0, life: [0.12, 0.2], size: [14, 24], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.4))], order: 3 }),
      // sparks spitting off the field
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 9,
        shape: { type: 'circle', radius: 56 }, speed: [140, 300], life: [0.25, 0.42], size: [3, 5], color: ['#ffffff', light],
        stretch: { speed: 0.02, length: 1.5 }, behaviors: [c.speedOverLife(c.decel(0.4)), c.gravity(900), c.colorOverLife(c.fade(0.5))], order: 4 })),
    ];
  },
};
