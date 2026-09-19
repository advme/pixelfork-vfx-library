/** A small bullet or arrow impact: quick sparks, tiny flash. */
export default {
  name: 'hit.bullet',
  category: 'hit',
  whenToUse: 'A bullet, arrow, laser bolt or thrown pebble hits a surface or an enemy. Small and fast; can fire many times a second.',
  duration: 0.3,
  loop: false,
  tint: '#ffd580',
  tags: ['bullet', 'arrow', 'shot', 'ricochet', 'laser', 'small'],
  build(c) {
    const col = c.color('#ffd580');
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 36, color: c.lighten(col, 0.6),
        behaviors: [c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [5, 8] }], shape: { type: 'circle', radius: 3, thickness: 0 },
        speed: [250, 500], life: [0.15, 0.28], size: [4, 7], color: col,
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(700), c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())] }),
    ];
  },
};
