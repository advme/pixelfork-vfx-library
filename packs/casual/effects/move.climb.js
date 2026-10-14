/** Climbing: with each grab of a hand a little dust puff blooms off the wall, grit and a pebble now and then drop away, a faint glint scuffs the grip and a thin sift of dust falls in between. Loops until stopped. */
export default {
  name: 'move.climb',
  category: 'move',
  whenToUse: 'A character climbs a wall, a cliff, a ladder, a rope, a vine or a tree trunk, or scrambles up a rock face; follow the hands while they climb and stop it when they stop or reach the top (tint it for the surface: snow, wood, moss), and use move.wallslide for sliding down a wall, move.ledge for grabbing the top edge.',
  duration: 0.6, loop: true, tint: '#e9dcc7',
  tags: ['climb', 'ladder', 'rope', 'wall', 'cliff', 'grit', 'dust', 'platformer', 'move'],
  build(c) {
    const col = c.color('#e9dcc7');
    const light = c.lighten(col, 0.35);
    // one grab per hand each cycle (0 s and 0.3 s), somewhere across the width of the hands
    const hands = { type: 'rect', w: 34, h: 0 };
    // a grab knocks things off the wall: they start inside a small circle around the hands and pop outward a little
    const knock = { type: 'circle', radius: 8 };
    return [
      // the dust puff of each grab: blooms out, hangs a moment, then sinks and thins
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, duration: 0.6,
        bursts: [{ time: 0, count: [2, 3], probability: 0.9 }, { time: 0.3, count: [2, 3], probability: 0.9 }], shape: knock,
        speed: [30, 70], life: [0.45, 0.65], size: [18, 28], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(120), c.limitSpeed(60, 1), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.45], [0.3, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.7, 0.45], [0, 1]]))], order: 0 }),
      // grit knocked off by each grab: kicked out, then dropping away
      c.sys({ tex: 'square', blend: 'normal', loop: true, world: true, duration: 0.6,
        bursts: [{ time: 0.02, count: [2, 4], probability: 0.95 }, { time: 0.32, count: [2, 4], probability: 0.95 }], shape: knock,
        speed: [50, 110], life: [0.4, 0.6], size: [3, 5], rotation: [0, 6.28], color: [c.darken(col, 0.1), c.darken(col, 0.3)],
        behaviors: [c.gravity(900), c.spin(-8, 8), c.colorOverLife(c.fade(0.7))], order: 2 }),
      // now and then a bigger pebble tumbling down
      c.sys({ tex: 'square', blend: 'normal', loop: true, world: true, duration: 0.6,
        bursts: [{ time: 0.04, count: 1, probability: 0.45 }, { time: 0.34, count: 1, probability: 0.45 }], shape: knock,
        speed: [30, 70], life: [0.55, 0.7], size: [6, 9], rotation: [0, 6.28], color: [c.darken(col, 0.2), c.darken(col, 0.35)],
        behaviors: [c.gravity(1000), c.spin(-6, 6), c.colorOverLife(c.fade(0.75))], order: 3 }),
      // a faint scuff glint where a hand bites into the surface
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: 0.6,
        bursts: [{ time: 0, count: 1, probability: 0.6 }, { time: 0.3, count: 1, probability: 0.6 }], shape: hands,
        speed: 0, life: [0.14, 0.2], size: [10, 14], rotation: [0, 0.8], color: light,
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.4)), c.colorOverLife(c.fade(0.3))], order: 4 }),
      // a thin, steady sift of dust in between
      c.sys({ tex: 'disc', blend: 'normal', loop: true, world: true, rate: 6, shape: hands,
        speed: 0, life: [0.5, 0.8], size: [2, 3.5], color: [col, c.darken(col, 0.15)],
        behaviors: [c.gravity(500), c.limitSpeed(160, 1), c.colorOverLife(c.fadeInOut(0.1, 0.6))], order: 1 }),
    ];
  },
};
