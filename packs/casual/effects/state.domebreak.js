/**
 * The energy dome switches off: it flickers, breaks into hexagon tiles that fly apart and
 * dissolve into sparks, and the ring on the ground fades last. state.dome plays this by itself
 * when it is stopped; it can also be played alone on a broken shield.
 */
export default {
  name: 'state.domebreak',
  category: 'state',
  whenToUse: 'An energy dome or force field is switched off or destroyed. Played automatically when state.dome is stopped; play it yourself only for a dome the game drew itself.',
  duration: 1.7, loop: false, tint: '#4fb8ff',
  anchor: 'feet',
  tags: ['shield', 'dome', 'break', 'shatter', 'force field', 'hexagon', 'off', 'destroyed'],
  build(c) {
    const col = c.color('#4fb8ff');
    const light = c.lighten(col, 0.6);
    const R = 100;
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const shell = (thickness) => ({ type: 'circle', radius: R, arc: Math.PI, thickness });
    return [
      // ---- 11  dissipating: the dome flickers and dims
      c.sys(Object.assign(c.is3d
        ? { render: 'mesh', geo: 'dome', tex: 'hexgrid', upright: true, in3d: true, size: 2 * R }
        : { tex: 'hexdome', size: R / 0.46 },
      { blend: 'add', bursts: [{ count: 1 }], life: 0.4, color: col, order: 3,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 1.03]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.45, 0.2], [0.9, 0.35], [0.3, 0.55], [0.7, 0.7], [0.2, 0.85], [0, 1]]))] })),
      // ---- 12-13  breaking apart: hexagon tiles peel off the shell, drift out and fall
      c.sys(c.chunks({ tex: 'hexshard', blend: 'add', bursts: [{ time: 0.3, count: 26 }, { time: 0.42, count: 18 }], shape: shell(0), speed: [30, 110], life: [0.6, 0.95], size: [16, 28], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(420), c.speedOverLife(c.decel(0.4)), c.spin(-4, 4), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.9], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 4 }, 'hex')),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.3, count: 16 }], shape: shell(0), speed: 0, life: [0.2, 0.35], size: [10, 18], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
      // ---- 13-14  disintegrating: sparks spray outward, then the last motes sink
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: 0.38, count: 40 }], shape: shell(0.3), speed: [60, 220], life: [0.5, 0.9], size: [4, 9], color: [col, light],
        behaviors: [c.gravity(320), c.speedOverLife(c.decel(0.2)), c.noise(2, 12), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 4 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: 0.65, count: 22 }], shape: shell(0.5), speed: [0, 30], life: [0.6, 1.0], size: [3, 6], color: light,
        behaviors: [c.gravity(140), c.limitSpeed(90, 1), c.noise(1.5, 10), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.3))], order: 4 })),
      // ---- 15  end: the base ring flashes once as the dome goes, then fades out last
      ring({ bursts: [{ time: 0.3, count: 1 }], life: 0.45, size: 2.1 * R, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 1.35]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      ring({ bursts: [{ count: 1 }], life: 1.7, size: 2.1 * R, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.8, 0.2], [0.5, 0.5], [0, 1]]))], order: 0 }),
    ];
  },
};
