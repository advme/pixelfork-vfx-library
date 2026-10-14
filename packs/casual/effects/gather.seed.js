/** Planting a seed: a little puff of soil, crumbs of earth hop up, a ring on the ground and a tiny green sparkle. */
export default {
  name: 'gather.seed',
  category: 'gather',
  whenToUse: 'A seed, sapling or bulb is planted or sown in a farming or garden game: tapping an empty plot, placing a crop, sowing a field tile. Play it on the soil where it goes in. For picking a grown crop use gather.harvest; for a shovel digging or a hit into the ground use hit.dirt.',
  duration: 0.6, loop: false, anchor: 'feet', tint: '#6fe05a',
  tags: ['seed', 'plant', 'sow', 'farm', 'garden', 'soil', 'crop', 'farming'],
  build(c) {
    const col = c.color('#6fe05a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.32, size: 74, color: '#a8825a',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0, 1]]))], order: 0 }),
      // the puff of soil
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 8, arc: Math.PI },
        speed: [50, 110], life: [0.4, 0.55], size: [18, 28], rotation: [0, 6.28], color: ['#c9a57c', '#b48d64'],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.force(0, 30), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.35, 1], [1, 1.15]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // crumbs of earth
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'cone', radius: 6, angle: 0.7 }, dir: Math.PI / 2,
        speed: [110, 210], life: [0.24, 0.34], size: [3, 6], color: ['#7a5534', '#5a3d24'],
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.6))], order: 2 }, 'up')),
      // the tiny green sparkle: a soft glow and a few glints rising out of the soil
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.08, count: 1 }], offset: [0, 10], life: 0.3, size: 50, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.08, count: [3, 4] }], shape: { type: 'circle', radius: 10, arc: Math.PI }, offset: [0, 6],
        speed: [30, 70], life: [0.35, 0.5], size: [9, 15], color: [light, '#ffffff'],
        behaviors: [c.force(0, 100), c.sizeOverLife(c.pop(0.25, 0.55))], order: 4 })),
    ];
  },
};
