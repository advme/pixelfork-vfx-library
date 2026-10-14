/** Overheated: wavy orange heat wisps shimmer up off the body, sweat drops fly off the head, steam puffs rise from the top and a hot glow throbs. Loops until stopped. */
export default {
  name: 'state.overheat',
  category: 'state',
  whenToUse: 'A character is overheated or far too hot: a desert or lava level, a heatwave, a sauna, a fever, eating something too spicy, a runner worn out in the sun. Follow the body; stop it when they cool down. For actually being on fire use state.burning; for a quick nervous sweat use state.sweat.',
  duration: 1, loop: true, tint: '#ff8a1f',
  tags: ['overheat', 'hot', 'heat', 'sweat', 'steam', 'desert', 'spicy', 'status'],
  build(c) {
    const col = c.color('#ff8a1f');
    const sweat = (side) => c.sys({ tex: 'drop', blend: 'normal', loop: true, rate: 1.6, shape: { type: 'cone', radius: 4, angle: 0.4 },
      dir: side > 0 ? Math.PI * 0.32 : Math.PI * 0.68, offset: [side * 15, 28],
      speed: [120, 170], life: [0.5, 0.6], size: [9, 13], rotation: side > 0 ? -0.6 : 0.6, color: ['#8fd4ff', '#c4ebff'],
      behaviors: [c.gravity(700), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [0.8, 1], [1, 0]]))], order: 4 });
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, bursts: [{ count: 1 }], life: 1.03, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.06], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.18, 0], [0.34, 0.5], [0.18, 1]]))], order: 0 }),
      // heat wisps: short streaks that wriggle as they rise. In 3D they start on a ring just outside
      // the body (a 21 px capsule), or most would rise hidden inside the model
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, rate: 14, shape: c.is3d ? { type: 'cone', radius: 30, angle: 0.15, thickness: 0.5 } : { type: 'cone', radius: 24, angle: 0.15 }, dir: Math.PI / 2, offset: [0, -8],
        speed: [90, 130], life: [0.6, 0.8], size: [8, 13], color: [col, c.lighten(col, 0.35)], stretch: { speed: 0.01, length: 2 },
        behaviors: [c.force(0, 60), c.noise(3, 14), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fadeInOut(0.2, 0.5))], order: 1 }, 'up')),
      // steam rising off the top of the head
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, rate: 5, shape: { type: 'cone', radius: 12, angle: 0.4 }, dir: Math.PI / 2, offset: [0, 36],
        speed: [40, 70], life: [0.8, 1.1], size: [12, 18], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.4)), c.noise(1, 10), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.4], [1, 2.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0.35, 0.6], [0, 1]]))], order: 2 }, 'up')),
      sweat(1),
      sweat(-1),
    ];
  },
};
