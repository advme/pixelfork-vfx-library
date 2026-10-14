/** Sizzling food: a warm glow flickers on the pan, bright steam wisps curl up off it while frying bubbles fizz, hot oil pops jump up and fall back and glints flicker. Loops until stopped. */
export default {
  name: 'world.cooking',
  category: 'world',
  whenToUse: 'Food is frying or sizzling: a pan or wok on the stove, a grill or barbecue, a griddle or hot plate in a cooking or restaurant game. Play it on the cooking surface and leave it running while the food cooks. For a boiling pot of soup or water use world.boil; for a bubbling potion pot use world.cauldron.',
  duration: 1, loop: true, tint: '#ffc94a',
  tags: ['cooking', 'frying', 'sizzle', 'pan', 'grill', 'kitchen', 'restaurant', 'food'],
  build(c) {
    const col = c.color('#ffc94a');
    const light = c.lighten(col, 0.55);
    const warm = c.mix(col, '#ff7a1a', 0.35);
    // across the pan: a row in 2D, a disc lying on the pan in 3D
    const area = () => (c.is3d ? { type: 'circle', radius: 34 } : { type: 'rect', w: 76, h: 0 });
    return [
      // the warm heat glow on the cooking surface: soft overlapping blobs that flicker
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 3, shape: area(), offset: [0, 4],
        speed: 0, life: [0.8, 1.1], size: [70, 95], color: warm,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.5, 1], [1, 0.9]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.42, 0.35], [0.3, 0.7], [0, 1]]))], order: 0 })),
      // bright steam wisps curling up off the food
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 9, shape: area(),
        speed: 0, life: [1.0, 1.4], size: [18, 28], rotation: [0, 6.28], color: ['#ffffff', '#f2f2f7'],
        behaviors: [c.force(0, 140), c.limitSpeed(90, 1), c.noise(1.2, 18), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.4], [1, 2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.95, 0.12], [0.65, 0.5], [0, 1]]))], order: 1 })),
      // frying bubbles fizzing on the surface
      c.sys(c.ground({ tex: 'ring', blend: 'normal', loop: true, rate: 14, shape: area(),
        speed: 0, life: [0.2, 0.35], size: [6, 11], color: '#fff7d6',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.8, 1], [0.9, 1.25], [1, 0]]))], order: 2 })),
      // drops of hot oil popping up at odd moments and falling back (raised a little so their short streaks do not dip into the pan)
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, shape: { type: 'cone', radius: 32, angle: 0.5 }, dir: Math.PI / 2, offset: [0, 8],
        bursts: [{ count: [2, 3], probability: 0.85 }, { time: 0.17, count: [1, 2], probability: 0.7 }, { time: 0.31, count: [2, 3], probability: 0.75 },
          { time: 0.52, count: [1, 2], probability: 0.7 }, { time: 0.66, count: [2, 3], probability: 0.75 }, { time: 0.84, count: [1, 2], probability: 0.7 }],
        speed: [170, 270], life: [0.4, 0.55], size: [5, 8], color: ['#ffffff', c.lighten(col, 0.25)], stretch: { speed: 0.012, length: 1.3 },
        behaviors: [c.gravity(1000), c.colorOverLife(c.fade(0.55))], order: 3 }, 'up')),
      // sizzle glints flickering on the food
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 10, shape: area(),
        speed: 0, life: [0.15, 0.25], size: [10, 16], rotation: [0, 1], color: [light, '#ffffff'],
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 })),
    ];
  },
};
