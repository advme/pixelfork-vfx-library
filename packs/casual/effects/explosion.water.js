/** A water bomb: a big splash bursts up and out, droplets rain down and foam rings spread. */
export default {
  name: 'explosion.water',
  category: 'explosion',
  whenToUse: 'A water balloon or water bomb bursts, a big wave hits, something huge falls into water, a geyser erupts, a depth charge goes off. Play it at the centre (on the water surface for falls). For a small splash use move.splash.',
  duration: 1.2, loop: false, tint: '#4fb8ff',
  tags: ['water', 'splash', 'balloon', 'wave', 'geyser', 'sea', 'explosion', 'wet'],
  build(c) {
    const col = c.color('#4fb8ff');
    const light = c.lighten(col, 0.65);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'add', bursts: [{ count: 1 }, { time: 0.18, count: 1 }], life: 0.7, size: 300, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 0 }),
      // the column of water thrown up
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ count: [26, 32] }], shape: { type: 'cone', radius: 16, angle: 0.5 },
        speed: [380, 760], life: [0.7, 1.0], size: [10, 18], color: [col, light],
        behaviors: [c.gravity(1500), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.8], [1, 0]]))], order: 3 }, 'up')),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [16, 20] }], shape: { type: 'circle', radius: 14, arc: Math.PI },
        speed: [200, 480], life: [0.5, 0.8], size: [5, 9], color: '#ffffff',
        behaviors: [c.gravity(1400), c.colorOverLife(c.fade(0.6))], order: 4 })),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 20, arc: Math.PI },
        speed: [60, 160], life: [0.6, 0.9], size: [40, 70], rotation: [0, 6.28], color: '#f2fbff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 1 })),
    ];
  },
};
