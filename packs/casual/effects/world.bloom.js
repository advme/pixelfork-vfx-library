/** A flower blooms: a ring of petals pops open around a golden heart, loose petals and small leaves spring out and green sparkles float up. */
export default {
  name: 'world.bloom',
  category: 'world',
  whenToUse: 'A flower blooms or a plant grows in the world: a seed sprouts in a farming or garden game, a flower opens, a bush or tree finishes growing, a garden plot is planted, a dead plant comes back to life. Play it on the plant at that moment; tint it to the flower colour. For a plant that keeps growing over time use world.grow; for a nature spell use magic.nature; for picking a crop use gather.harvest.',
  duration: 1.05, loop: false, tint: '#ff7eb6',
  tags: ['bloom', 'flower', 'grow', 'plant', 'garden', 'farm', 'sprout', 'spring', 'blossom'],
  build(c) {
    const col = c.color('#ff7eb6');
    const light = c.lighten(col, 0.5);
    const green = '#6cd96a';
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // a soft glow behind the flower: big, so it stays at low alpha (additive pink burns out on a bright background)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.45, 0.3], [0, 1]]))], order: 0 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 160, color: '#b8ff9a',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the flower: eight petals snap open evenly, hold, then drift down and fade (lying open on the ground in 3D)
      c.sys(c.ground({ tex: 'petal', blend: 'normal', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 6, thickness: 0, even: true },
        speed: 260, life: [0.9, 1.05], size: [16, 20], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.curve([[0, 1], [0.25, 0.1], [1, 0]])), c.gravity(120), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [0.8, 1], [1, 0]])), c.colorOverLife(c.fade(0.7))], order: 2 })),
      // loose petals thrown out
      c.sys(c.vol({ tex: 'petal', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 10 },
        speed: [160, 260], life: [0.8, 1.0], size: [10, 14], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(180), c.spin(-6, 6), c.colorOverLife(c.fade(0.7))], order: 3 })),
      // small leaves springing up
      c.sys(c.spray({ tex: 'leaf', blend: 'normal', bursts: [{ time: 0.05, count: [5, 6] }], shape: { type: 'cone', radius: 6, angle: 0.7 }, dir: Math.PI / 2,
        speed: [240, 330], life: [0.7, 0.9], size: [10, 14], rotation: [0, 6.28], color: [green, c.darken(green, 0.25)],
        behaviors: [c.speedOverLife(c.decel(0.35)), c.gravity(360), c.spin(-6, 6), c.colorOverLife(c.fade(0.7))], order: 3 }, 'up')),
      // the golden heart of the flower
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 0.9, size: 24, color: '#ffd84a',
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.15, 1.25], [0.25, 1], [0.75, 1], [1, 0]]))], order: 4 }),
      // green sparkles floating up
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.1, count: [8, 10] }], shape: { type: 'circle', radius: 46 },
        speed: [10, 30], life: [0.6, 0.9], size: [9, 15], color: '#c8ff9e',
        behaviors: [c.force(0, 140), c.sizeOverLife(c.pop(0.25, 0.6))], order: 5 })),
    ];
  },
};
