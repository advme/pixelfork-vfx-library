/**
 * A hexagon-tiled energy dome over the character: a ring lights up on the ground, energy rises,
 * the dome builds itself tile by tile from the ground up, then stands there pulsing. The dome is
 * a real geodesic hemisphere of hexagon (and a few pentagon) tiles in both worlds: in 2D it is
 * seen from the front. Stopping it plays state.domebreak.
 */
export default {
  name: 'state.dome',
  category: 'state',
  whenToUse: 'A force field, energy dome or barrier shield goes up around a character, a base or an object and stays until it is switched off. Play it at the feet / on the ground; call stop() and the dome breaks apart on its own (state.domebreak).',
  duration: 3, loop: true, tint: '#4fb8ff',
  ending: 'state.domebreak',
  anchor: 'feet',
  tags: ['shield', 'dome', 'force field', 'barrier', 'hexagon', 'energy', 'bubble', 'protect', 'sci-fi'],
  build(c) {
    const col = c.color('#4fb8ff');
    const light = c.lighten(col, 0.6);
    const R = 100;
    // the ring under the dome: flat on the floor in 3D, an ellipse sprite in 2D
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // where glints sit: the dome's surface (its rim in 2D)
    const shell = { type: 'circle', radius: R, arc: Math.PI, thickness: 0 };
    // one tile system per tile kind; the tiles emitter places, turns and sizes every tile itself.
    // `lay`: seconds to lay the whole dome tile by tile; `bursts`: lay it all at once (count is filled in)
    const tiles = (kind, p) => {
      const n = c.tiles(kind);
      return c.sys(Object.assign({ render: 'mesh', geo: kind, tex: kind === 'hex' ? 'hexshard' : 'penttile', upright: true, in3d: true, blend: 'add', speed: 0, order: 3 }, p, {
        shape: Object.assign({ type: 'tiles', radius: R, kind }, p.shape || {}),
        rate: p.lay ? n / p.lay : 0,
        bursts: (p.bursts || []).map((b) => Object.assign({}, b, { count: n })),
      }));
    };
    const both = (p) => [tiles('hex', p), tiles('pent', p)];
    // the standing dome breathes: three pulses per 3 s cycle
    const pulse = c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.8, 0.083], [1, 0.1], [0.8, 0.16], [0.8, 0.283], [1, 0.3], [0.8, 0.36], [0.8, 0.483], [1, 0.5], [0.8, 0.56], [0.8, 1]]);
    return [
      // ---- 1-2  initiation: the ring appears, energy rises off it
      ring({ bursts: [{ count: 1 }], life: 0.5, size: 2.1 * R, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.35, 1.04], [1, 1]])), c.colorOverLife(c.fade(0.4))], order: 0 }),
      c.sys(c.ground({ tex: 'glow', blend: 'add', rate: 90, duration: 0.55, speed: 0, life: [0.4, 0.7], size: [5, 10], color: [col, light],
        shape: c.is3d ? { type: 'circle', radius: R, thickness: 0.15 } : { type: 'rect', w: 2 * R },
        behaviors: [c.force(0, 420), c.limitSpeed(240, 1), c.noise(2, 10), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 2 })),
      // ---- 3-5  forming: the tiles appear one after another from the ground up, each flashing white
      //           as it lands; at 0.75 s the standing dome below takes over the same tiles
      ...both({ lay: 0.55, duration: 0.6, life: 1, shape: { until: 0.76 }, color: '#ffffff',
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 0.05], [col, 0.16], [col, 1]]))] }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', rate: 40, duration: 0.6, shape: shell, speed: 0, life: [0.2, 0.4], size: [8, 16], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 })),
      // ---- 6-10  active: the whole dome, re-laid every cycle so the pulse repeats; ends at once on stop()
      ...both({ loop: true, duration: 3, bursts: [{ time: 0.75 }], life: 3, cut: true, color: col, behaviors: [c.colorOverLife(pulse)] }),
      ring({ loop: true, duration: 3, bursts: [{ time: 0.75, count: 1 }], life: 3, size: 2.1 * R, color: col, cut: true,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [1, 0.1], [0.7, 0.2], [1, 0.3], [0.7, 0.4], [1, 0.5], [0.7, 0.6], [0.7, 1]]))], order: 0 }),
      // each pulse sends a ring out across the floor
      ring({ loop: true, duration: 3, bursts: [{ time: 1.0, count: 1 }, { time: 1.6, count: 1 }, { time: 2.2, count: 1 }], life: 0.5, size: 2.1 * R, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 1.5]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      // glints wandering over the surface
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, duration: 1, rate: 7, shape: shell, speed: 0, life: [0.3, 0.6], size: [6, 12], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 })),
    ];
  },
};
