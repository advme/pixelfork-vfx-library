/** Skidding: tyre smoke and a few sparks. Loops until stopped. */
export default {
  name: 'move.skid',
  category: 'move',
  whenToUse: 'A car drifts or brakes hard, a character slides to a stop, a cart skids. Follow the wheels; stop when grip returns.',
  duration: 1, loop: true, tint: '#e6e6e6',
  tags: ['skid', 'drift', 'tyre', 'smoke', 'brake', 'slide'],
  build(c) {
    const col = c.color('#e6e6e6');
    return [
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 24, shape: { type: 'circle', radius: 8 },
        speed: [20, 60], life: [0.5, 0.8], size: [18, 30], rotation: [0, 6.28], color: [col, c.darken(col, 0.25)],
        behaviors: [c.force(0, 70), c.noise(1.5, 10), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.5, 0.5], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 8, shape: { type: 'cone', radius: 4, angle: 0.6 },
        speed: [200, 400], life: [0.2, 0.35], size: [3, 5], color: '#ffd580',
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.4))], order: 2 }),
    ];
  },
};
