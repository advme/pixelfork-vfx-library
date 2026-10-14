/** A planet ring: a band of golden dust, tumbling rocks and pebbles circling slowly around the centre, with a faint glow along the band and glints now and then. Loops until stopped. */
export default {
  name: 'world.planetring',
  category: 'world',
  whenToUse: 'A ringed planet, an asteroid belt around a moon or a space station, a debris ring circling a boss or a space base in a space game: play it at the planet\'s centre and leave it running (a flat ring about 240 px across: seen from above in 2D, lying level around the centre in 3D); for one satellite circling a character use move.orbit.',
  duration: 6, loop: true, tint: '#ffcf8a',
  tags: ['planet', 'ring', 'asteroid belt', 'orbit', 'space', 'rocks', 'saturn', 'debris'],
  build(c) {
    const col = c.color('#ffcf8a');
    const light = c.lighten(col, 0.5);
    const rock = c.mix(col, '#7d7268', 0.55);
    // the band runs from radius 78 to 120
    const band = { type: 'circle', radius: 120, thickness: 0.35 };
    // c.ground lays the band level around the centre in 3D; in 2D it is a circle on the screen
    const belt = (p) => c.sys(c.ground(Object.assign({ loop: true, prewarm: true, duration: 6, shape: band, speed: 0 }, p)));
    // a ring sprite of the band's glow: flat and at the centre's height in 3D
    const glowRing = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ring' }, p)));
    const steady = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.05], [a, 0.95], [0, 1]]));
    // rocks fade in and out by size, so the belt never pops
    const appear = () => c.sizeOverLife(c.curve([[0, 0], [0.12, 1], [0.88, 1], [1, 0]]));
    // 3D: solid lit pieces that tumble on their own; 2D: flat pieces that spin
    const solid = (geo) => (c.is3d ? { render: 'mesh', geo } : {});
    return [
      glowRing({ blend: 'add', loop: true, duration: 2, bursts: [{ count: 1 }], life: 2.1, size: 255, color: col, behaviors: [steady(0.22)], order: 0 }),
      glowRing({ blend: 'add', loop: true, duration: 2, bursts: [{ count: 1 }], life: 2.1, size: 205, color: light, behaviors: [steady(0.14)], order: 0 }),
      // fine dust, circling a little faster than the rocks
      belt({ tex: 'glow', blend: 'add', rate: 22, life: [3, 5], size: [3, 6], color: [col, light],
        behaviors: [c.orbit(0.7), c.colorOverLife(c.fadeInOut(0.2, 0.8))], order: 1 }),
      // rocks
      belt(Object.assign({ tex: 'square', blend: 'normal', rate: 7, life: [4, 6], size: [7, 13], rotation: [0, 6.28], color: [rock, c.darken(rock, 0.3)],
        behaviors: c.is3d ? [c.orbit(0.45), appear()] : [c.orbit(0.45), c.spin(-1.5, 1.5), appear()], order: 2 }, solid('box'))),
      // pebbles
      belt(Object.assign({ tex: 'disc', blend: 'normal', rate: 9, life: [3, 5], size: [3, 6], color: [c.lighten(rock, 0.2), rock],
        behaviors: [c.orbit(0.55), appear()], order: 2 }, solid('ball'))),
      // glints of sunlight on the ring
      belt({ tex: 'spark', blend: 'add', prewarm: false, rate: 3, life: [0.6, 1], size: [8, 14], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.orbit(0.55), c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }),
    ];
  },
};
