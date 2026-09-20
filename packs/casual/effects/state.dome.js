/**
 * A hexagon-tiled energy dome over the character: a ring lights up on the ground, energy rises,
 * the dome forms and then stands there pulsing. In 3D it is a real hemisphere mesh wrapped in a
 * glowing hex grid; in 2D a projected dome sprite. Stopping it plays state.domebreak.
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
    // where things sit on the dome's surface: its rim in 2D, the whole hemisphere shell in 3D
    const shell = (thickness) => ({ type: 'circle', radius: R, arc: Math.PI, thickness });
    // the dome itself: a textured hemisphere mesh in 3D, the projected sprite in 2D
    const dome = (p) => c.sys(Object.assign(c.is3d
      ? { render: 'mesh', geo: 'dome', tex: 'hexgrid', upright: true, in3d: true, size: 2 * R }
      : { tex: 'hexdome', size: R / 0.46 }, { blend: 'add', color: col, order: 3 }, p));
    return [
      // ---- 1-2  initiation: the ring appears, energy rises off it
      ring({ bursts: [{ count: 1 }], life: 0.5, size: 2.1 * R, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.35, 1.04], [1, 1]])), c.colorOverLife(c.fade(0.4))], order: 0 }),
      c.sys(c.ground({ tex: 'glow', blend: 'add', rate: 90, duration: 0.55, speed: 0, life: [0.4, 0.7], size: [5, 10], color: [col, light],
        shape: c.is3d ? { type: 'circle', radius: R, thickness: 0.15 } : { type: 'rect', w: 2 * R },
        behaviors: [c.force(0, 420), c.limitSpeed(240, 1), c.noise(2, 10), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 2 })),
      // ---- 3-5  forming: the dome inflates from the ground, over-bright, then settles
      dome({ bursts: [{ time: 0.15, count: 1 }], life: 0.55,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.05], [0.7, 1.04], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], [light, 0.6], [col, 1]], [[0.4, 0], [1, 0.6], [1, 1]]))] }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.3, count: 14 }, { time: 0.5, count: 10 }], shape: shell(0), speed: 0, life: [0.2, 0.4], size: [8, 16], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 })),
      // ---- 6-10  active: the standing dome, breathing, with three pulses per cycle; ends at once on stop()
      dome({ loop: true, duration: 3, bursts: [{ time: 0.7, count: 1 }], life: 3, cut: true,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [0.083, 1], [0.11, 1.03], [0.15, 1], [0.283, 1], [0.31, 1.03], [0.35, 1], [0.483, 1], [0.51, 1.03], [0.55, 1], [1, 1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.8, 0.083], [1, 0.1], [0.8, 0.16], [0.8, 0.283], [1, 0.3], [0.8, 0.36], [0.8, 0.483], [1, 0.5], [0.8, 0.56], [0.8, 1]]))] }),
      ring({ loop: true, duration: 3, bursts: [{ time: 0.7, count: 1 }], life: 3, size: 2.1 * R, color: col, cut: true,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [1, 0.1], [0.7, 0.2], [1, 0.3], [0.7, 0.4], [1, 0.5], [0.7, 0.6], [0.7, 1]]))], order: 0 }),
      // each pulse sends a ring out across the floor
      ring({ loop: true, duration: 3, bursts: [{ time: 0.95, count: 1 }, { time: 1.55, count: 1 }, { time: 2.15, count: 1 }], life: 0.5, size: 2.1 * R, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 1.5]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      // glints wandering over the surface
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, duration: 1, rate: 7, shape: shell(0), speed: 0, life: [0.3, 0.6], size: [6, 12], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 })),
    ];
  },
};
