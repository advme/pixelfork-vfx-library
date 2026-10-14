/** A goo splat: a blob squashes flat, gobs fly out and fall, and drips run down. */
export default {
  name: 'hit.splat',
  category: 'hit',
  whenToUse: 'Something wet and sticky hits: a slime enemy squashed, a paint ball or paint shot, a tomato or egg thrown, ink, mud, honey or goo. Play it where it lands; tint it for the substance (green slime, paint colour, red tomato).',
  duration: 0.8, loop: false, tint: '#7ee83a',
  tags: ['splat', 'slime', 'paint', 'goo', 'ink', 'mud', 'tomato', 'squash', 'hit'],
  build(c) {
    const col = c.color('#7ee83a');
    const light = c.lighten(col, 0.4);
    const dark = c.darken(col, 0.2);
    return [
      // the central blob squashing out
      c.sys(c.flat({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 0.7, size: 74, color: dark,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1.15], [0.25, 0.95], [0.7, 1], [1, 0.85]])), c.colorOverLife(c.fade(0.6))], order: 1 })),
      c.sys(c.flat({ tex: 'disc', blend: 'normal', bursts: [{ count: [5, 7] }], shape: { type: 'circle', radius: 26 }, life: 0.7, size: [16, 28], color: dark,
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.12, 1], [1, 0.85]])), c.colorOverLife(c.fade(0.6))], order: 1 })),
      // gobs flung out
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 10 },
        speed: [220, 460], life: [0.4, 0.6], size: [7, 14], color: [col, light],
        behaviors: [c.gravity(1300), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 3 })),
      // drips
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ time: 0.1, count: [3, 5] }], shape: { type: 'cone', radius: 30, angle: 0.1 },
        speed: [20, 60], life: [0.5, 0.7], size: [8, 12], rotation: Math.PI, color: dark,
        behaviors: [c.gravity(600), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.7))], order: 2 }, 'down')),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 90, color: light,
        behaviors: [c.colorOverLife(c.fade(0.2))], order: 4 }),
    ];
  },
};
