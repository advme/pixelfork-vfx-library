/** A drip: a water drop swells under the ceiling or pipe, lets go, falls about 120 px and lands with a tiny splash and a ripple ring. Loops until stopped. */
export default {
  name: 'world.dripping',
  category: 'world',
  whenToUse: 'Water dripping on its own from above: a cave ceiling or stalactite, a leaky pipe or tap, a wet rock, a melting icicle, a sewer or dungeon. Play it where the drop forms (the ceiling or the pipe end), about 120 px above the floor at size 1; size scales the fall. For rings on a water surface use world.ripple; for rain use env.rain; for a jet of water use world.fountain.',
  duration: 1.4, loop: true, tint: '#8fd3ff',
  tags: ['drip', 'water', 'cave', 'leak', 'pipe', 'dungeon', 'sewer', 'icicle', 'ambient'],
  build(c) {
    const col = c.color('#8fd3ff');
    const light = c.lighten(col, 0.6);
    // the timing: the drop swells for 0.7 s, then falls 120 px in 0.4 s (20 px/s start, gravity 1400)
    const swell = 0.7, fall = 0.4, v0 = 20, g = 1400, drop = 120, land = swell + fall;
    // everything is world-aligned in 3D, so the splash lands straight below the drop
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const falling = (p) => c.sys(c.spray(Object.assign({ loop: true, duration: 1.4, bursts: [{ time: swell, count: 1 }], shape: { type: 'cone', radius: 0.5, angle: 0.001 }, dir: -Math.PI / 2,
      speed: v0, life: fall }, p), 'down'));
    return [
      // the drop swelling where it hangs
      c.sys(c.vol({ tex: 'drop', blend: 'normal', loop: true, duration: 1.4, bursts: [{ count: 1 }], life: swell, size: 11, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [0.85, 1], [0.93, 1.12], [1, 1]]))], order: 1 })),
      // the falling drop and its light streak
      falling({ tex: 'drop', blend: 'normal', size: 11, color: col, behaviors: [c.gravity(g)], order: 2 }),
      falling({ tex: 'glow', blend: 'add', size: 4, color: '#ffffff', stretch: { speed: 0.012, length: 1 }, behaviors: [c.gravity(g)], order: 3 }),
      // the landing: a little flash, a ripple ring and droplets bouncing up
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, duration: 1.4, bursts: [{ time: land, count: 1 }], offset: [0, -drop], life: 0.15, size: 34, color: light,
        behaviors: [c.sizeOverLife(c.grow(0.4)), c.colorOverLife(c.fade(0.1))], order: 0 })),
      ring({ blend: 'normal', loop: true, duration: 1.4, bursts: [{ time: land, count: 1 }], offset: [0, -drop], life: 0.45, size: 50, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 0 }),
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, duration: 1.4, bursts: [{ time: land, count: [5, 7] }], shape: { type: 'cone', radius: 3, angle: 0.75 }, dir: Math.PI / 2, offset: [0, -drop],
        speed: [90, 170], life: [0.25, 0.35], size: [3, 5], color: [col, light],
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 3 }, 'up')),
    ];
  },
};
