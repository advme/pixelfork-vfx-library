/** Regenerating: a slow stream of green pluses and sparkles. Loops until stopped. */
export default {
  name: 'state.regen',
  category: 'state',
  whenToUse: 'Health regenerates over time, a healing zone is active, a medic aura. Follow the character; stop when healing ends. For a one-off heal use magic.heal.',
  duration: 1, loop: true, tint: '#7cf07c',
  tags: ['regen', 'heal over time', 'aura', 'status', 'health', 'zone'],
  build(c) {
    const col = c.color('#7cf07c');
    const light = c.lighten(col, 0.6);
    return [
      c.sys(c.ground({ tex: 'plus', blend: 'add', loop: true, rate: 7, shape: { type: 'circle', radius: 28 },
        speed: 0, life: [0.9, 1.3], size: [9, 15], color: [light, col],
        behaviors: [c.force(0, 120), c.limitSpeed(90, 1), c.noise(1.5, 6), c.sizeOverLife(c.pop(0.2, 0.6)), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 2 })),
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 10, shape: { type: 'circle', radius: 32 },
        speed: 0, life: [0.6, 1.0], size: [5, 10], color: light,
        behaviors: [c.force(0, 150), c.limitSpeed(110, 1), c.sizeOverLife(c.pop(0.2, 0.5))], order: 1 })),
    ];
  },
};
