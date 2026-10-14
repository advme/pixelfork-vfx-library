/** Freezing cold: frosty breath puffs out of the mouth, snowflakes drift down around the body, blue shiver sparkles flicker and a cold glow breathes. Loops until stopped. */
export default {
  name: 'state.freezing',
  category: 'state',
  whenToUse: 'A character is freezing cold and shivering: out in a blizzard, a snowy level without a coat, just out of an icy lake, a cold damage-over-time, a chilly pet. Follow the body; stop it when they warm up. The breath blows right: in 2D set dir (degrees, 180 = left), in 3D pass direction: [x, y, z], the way they face. For frozen solid or slowed by ice use state.frozen.',
  duration: 1.2, loop: true, tint: '#6fc8ff',
  tags: ['freezing', 'cold', 'shiver', 'chilly', 'winter', 'frost', 'breath', 'status'],
  build(c) {
    const col = c.color('#6fc8ff');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0.3 : c.dir;
    // the mouth, just below the eyes (they sit about 15 px above the body's centre): a little in front of the face in 2D;
    // in 3D the spray starts inside the head and is aimed for us
    const mouth = c.is3d ? [0, 10] : [Math.cos(dir) * 12, 10 + Math.sin(dir) * 6];
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.25, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.12, 0], [0.28, 0.5], [0.12, 1]]))], order: 0 }),
      // one shaky breath per cycle: three quick puffs
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, duration: 1.2, bursts: [{ time: 0.1, count: 1, cycle: 3, interval: 0.07 }],
        shape: { type: 'cone', radius: 2, angle: 0.3 }, dir, offset: mouth,
        speed: [80, 120], life: [0.75, 0.95], size: [9, 13], rotation: [0, 6.28], color: ['#ffffff', c.lighten(col, 0.75)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 18), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1.6], [1, 3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 3 })),
      c.sys(c.ground({ tex: 'snowflake', blend: 'normal', loop: true, rate: 5, shape: c.is3d ? { type: 'circle', radius: 50 } : { type: 'rect', w: 110, h: 0 }, offset: [0, 58],
        speed: 0, life: [2.2, 2.6], size: [8, 13], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.gravity(80), c.limitSpeed(38, 1), c.noise(0.8, 12), c.spin(-1.5, 1.5), c.colorOverLife(c.fadeInOut(0.12, 0.75))], order: 2 })),
      // shiver: quick blue glints flickering on and off all over the body
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 10, shape: { type: 'circle', radius: 36 },
        speed: 0, life: [0.25, 0.4], size: [7, 12], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.4], [0.7, 1], [1, 0]]))], order: 4 })),
      c.sys(c.vol({ tex: 'disc', blend: 'add', loop: true, rate: 8, shape: { type: 'circle', radius: 34 },
        speed: [5, 15], life: [0.8, 1.2], size: [3, 5], color: col,
        behaviors: [c.gravity(25), c.noise(1.2, 6), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 1 })),
    ];
  },
};
