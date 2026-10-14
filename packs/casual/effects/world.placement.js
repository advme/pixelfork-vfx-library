/** A build-here marker on the ground: a bright ring pulsing in and out, a sonar ping sent out from it every second, glints twinkling on it and a few motes rising. Loops until stopped. */
export default {
  name: 'world.placement',
  category: 'world',
  whenToUse: 'A placement marker on the ground while the player chooses where to build: a tower spot or build slot in tower defense, a ghost building being dragged in a city builder, a free or blocked tile when placing a turret or trap. Play it at the spot on the ground and move it with the pointer, tint it green when the spot is free and red when it is blocked, and stop it when the player places or cancels (then play world.build). For a selected unit or placed tower use state.selected; for a go-here objective use world.beacon.',
  duration: 1.0, loop: true, anchor: 'feet', tint: '#4dff7a',
  tags: ['placement', 'build', 'tower defense', 'build spot', 'marker', 'valid', 'invalid', 'ghost'],
  build(c) {
    const col = c.color('#4dff7a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // the marker ring, pulsing in and out once a second
      ring({ blend: 'add', loop: true, cut: true, duration: 1.0, bursts: [{ count: 1 }], life: 1.0, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.06], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [1, 0.5], [0.75, 1]]))], order: 1 }),
      // 3D: a soft pool of colour filling the spot; 2D: a thin inner ring pulsing against the outer one
      c.is3d
        ? c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.0, bursts: [{ count: 1 }], life: 1.0, size: 120, color: col,
          behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.3, 0], [0.45, 0.5], [0.3, 1]]))], order: 0 }))
        : ring({ blend: 'add', loop: true, cut: true, duration: 1.0, bursts: [{ count: 1 }], life: 1.0, size: 84, color: light,
          behaviors: [c.sizeOverLife(c.curve([[0, 1.05], [0.5, 0.95], [1, 1.05]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.45, 0.5], [0.8, 1]]))], order: 0 }),
      // a sonar ping sent out from the ring every second
      ring({ blend: 'add', loop: true, cut: true, duration: 1.0, bursts: [{ count: 1 }], life: 0.7, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 2 }),
      // glints twinkling on the ring
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, cut: true, rate: 7, shape: c.is3d ? { type: 'circle', radius: 55, thickness: 0 } : { type: 'rect', w: 110, h: 18, thickness: 0 },
        speed: 0, offset: c.is3d ? [0, 4] : undefined, life: [0.35, 0.5], size: [12, 20], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.4, 1], [1, 0]]))], order: 4 })),
      // a few motes rising from the spot, showing where the building will stand
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, cut: true, rate: 9, shape: c.is3d ? { type: 'circle', radius: 50 } : { type: 'rect', w: 100, h: 0 },
        speed: 0, life: [0.7, 1.0], size: [6, 10], color: [light, col],
        behaviors: [c.force(0, 200), c.limitSpeed(90, 1), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.4))], order: 3 })),
    ];
  },
};
