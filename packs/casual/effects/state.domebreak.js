/**
 * The energy dome switches off: its tiles flicker, then every tile lifts off the shell, tumbles
 * away and fades while sparks spray out, and the ring on the ground fades last. state.dome plays
 * this by itself when it is stopped; it can also be played alone on a broken shield.
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
    const tiles = (kind, p) => c.sys(Object.assign({ render: 'mesh', geo: kind, tex: kind === 'hex' ? 'hexshard' : 'penttile', in3d: true, blend: 'add', order: 3 }, p,
      { shape: { type: 'tiles', radius: R, kind }, bursts: p.bursts.map((b) => Object.assign({}, b, { count: c.tiles(kind) })) }));
    const both = (p) => [tiles('hex', p), tiles('pent', p)];
    return [
      // ---- 11  dissipating: the standing dome flickers and dims
      ...both({ upright: true, bursts: [{ count: 1 }], life: 0.36, speed: 0, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.45, 0.2], [0.9, 0.35], [0.3, 0.55], [0.7, 0.7], [0.2, 0.85], [0, 1]]))] }),
      // ---- 12-13  breaking apart: every tile lifts off along its own normal, tumbles and fades
      ...both({ bursts: [{ time: 0.36, count: 1 }], speed: [25, 90], life: [0.6, 0.95], color: [col, light],
        behaviors: [c.gravity(380), c.speedOverLife(c.decel(0.4)), c.sizeOverLife(c.curve([[0, 1], [0.6, 0.9], [1, 0]])), c.colorOverLife(c.fade(0.45))] }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.34, count: 16 }], shape: shell(0), speed: 0, life: [0.2, 0.35], size: [10, 18], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.5))], order: 5 })),
      // ---- 13-14  disintegrating: sparks spray outward, then the last motes sink
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: 0.42, count: 40 }], shape: shell(0.3), speed: [60, 220], life: [0.5, 0.9], size: [4, 9], color: [col, light],
        behaviors: [c.gravity(320), c.speedOverLife(c.decel(0.2)), c.noise(2, 12), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 4 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ time: 0.7, count: 22 }], shape: shell(0.5), speed: [0, 30], life: [0.6, 1.0], size: [3, 6], color: light,
        behaviors: [c.gravity(140), c.limitSpeed(90, 1), c.noise(1.5, 10), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.3))], order: 4 })),
      // ---- 15  end: the base ring flashes once as the dome goes, then fades out last
      ring({ bursts: [{ time: 0.36, count: 1 }], life: 0.45, size: 2.1 * R, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 1.35]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      ring({ bursts: [{ count: 1 }], life: 1.7, size: 2.1 * R, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.8, 0.2], [0.5, 0.5], [0, 1]]))], order: 0 }),
    ];
  },
};
