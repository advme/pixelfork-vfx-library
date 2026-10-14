/** A retro pixel explosion: hard-edged blocks of fire burst out and break up, no glow. */
export default {
  name: 'explosion.pixel',
  category: 'explosion',
  whenToUse: 'An explosion, enemy death or block break in a pixel-art, retro, 8-bit or arcade-style game, where soft glowing effects would look out of place. Tint it for non-fire blasts (null keeps the fire colours).',
  duration: 0.7, loop: false, tint: null,
  tags: ['pixel', 'retro', '8-bit', 'arcade', 'explosion', 'pixel art', 'blocks', 'enemy death'],
  build(c) {
    const a = c.tint || c.rgb('#ffe14d');
    const b = c.tint ? c.darken(c.tint, 0.25) : c.rgb('#ff8a2a');
    const d = c.tint ? c.darken(c.tint, 0.55) : c.rgb('#d6332a');
    const burst = (color, n, speed, size, life, order) => c.sys(c.vol({ tex: 'pixel', blend: 'normal', bursts: [{ count: n }], shape: { type: 'circle', radius: 10 },
      speed, life, size, color, behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(250), c.sizeOverLife(c.curve([[0, 1], [0.6, 0.8], [1, 0]]))], order }));
    return [
      c.sys({ tex: 'pixel', blend: 'normal', bursts: [{ count: 1 }], life: 0.08, size: 70, color: '#ffffff', order: 5 }),
      burst(d, [10, 12], [180, 340], [12, 18], [0.45, 0.65], 1),
      burst(b, [10, 12], [140, 300], [10, 16], [0.35, 0.55], 2),
      burst(a, [8, 10], [80, 220], [8, 14], [0.25, 0.45], 3),
      c.sys(c.vol({ tex: 'pixel', blend: 'normal', bursts: [{ time: 0.12, count: [5, 7] }], shape: { type: 'circle', radius: 14 },
        speed: [20, 60], life: [0.4, 0.55], size: [12, 18], color: '#5a5a5a',
        behaviors: [c.force(0, 80), c.sizeOverLife(c.curve([[0, 0.6], [0.5, 1], [1, 0]]))], order: 0 })),
    ];
  },
};
