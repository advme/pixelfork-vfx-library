/** Low fog drifting across the bottom of the screen. Loops until stopped. */
export default {
  name: 'env.fog',
  category: 'env',
  whenToUse: 'A spooky graveyard, a swamp, a morning meadow, a haunted house. Sits along the bottom of the screen and drifts sideways.',
  duration: 8, loop: true, anchor: 'bottom', tint: '#c9d3e6',
  tags: ['fog', 'mist', 'spooky', 'swamp', 'ambient', 'haunted', 'morning'],
  build(c) {
    const col = c.color('#c9d3e6');
    if (c.is3d) {
      // 3D: a low blanket of fog rolling over the floor
      return [
        c.sys(c.env3d({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 5,
          speed: 0, life: [6, 9], size: [260, 420], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
          behaviors: [c.force(35, 0), c.limitSpeed(40, 1), c.noise(0.4, 40), c.spin(-0.15, 0.15),
            c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.3, 0.3], [0.3, 0.7], [0, 1]]))] }, { w: 1500, y: 45 })),
      ];
    }
    const w = c.view.w + 300;
    return [
      c.sys({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 3, shape: { type: 'rect', w, h: 0, thickness: 0 }, dir: Math.PI / 2, offset: [0, 40],
        speed: [0, 3], life: [6, 9], size: [180, 280], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)],
        behaviors: [c.force(35, 0), c.limitSpeed(45, 1), c.noise(0.4, 40), c.spin(-0.15, 0.15),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.35, 0.3], [0.35, 0.7], [0, 1]]))], order: 0 }),
    ];
  },
};
