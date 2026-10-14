/** A harvest: a crop pops out of the soil with a burst of leaves, crumbs of earth and a sparkle. */
export default {
  name: 'gather.harvest',
  category: 'gather',
  whenToUse: 'A crop, fruit, flower or plant is harvested or picked: farming games, pulling a carrot, picking an apple, collecting herbs, a garden plot ready. Play it on the plant at the moment it is picked.',
  duration: 0.75, loop: false, tint: '#7bd44a',
  tags: ['harvest', 'farm', 'crop', 'pick', 'plant', 'garden', 'fruit', 'gather', 'farming'],
  build(c) {
    const col = c.color('#7bd44a');
    return [
      c.sys(c.spray({ tex: 'leaf', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'cone', radius: 10, angle: 0.7 },
        speed: [200, 340], life: [0.55, 0.7], size: [10, 16], rotation: [0, 6.28], color: [col, c.darken(col, 0.25)],
        behaviors: [c.gravity(900), c.spin(-8, 8), c.colorOverLife(c.fade(0.75))], order: 2 }, 'up')),
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'cone', radius: 12, angle: 0.8 },
        speed: [120, 240], life: [0.35, 0.5], size: [3, 6], color: ['#7a5534', '#5a3d24'],
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.6))], order: 1 }, 'up')),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [3, 4] }], shape: { type: 'circle', radius: 24 },
        speed: [20, 60], life: [0.35, 0.5], size: [12, 18], color: '#fff6c8',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 90, color: c.lighten(col, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
    ];
  },
};
