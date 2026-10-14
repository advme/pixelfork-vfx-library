/** Sliding down a wall: dust scraped off the wall drifts up behind the character, specks fall away. Loops until stopped. */
export default {
  name: 'move.wallslide',
  category: 'move',
  whenToUse: 'A character slides down a wall, clings to a wall, grinds along a rail or scrapes along a surface in a platformer. Follow the hand or foot touching the wall; stop it when they let go. Tint it for the wall (stone dust, snow, sparks on metal).',
  duration: 1, loop: true, tint: '#e9dcc7',
  tags: ['wall slide', 'wall jump', 'slide', 'grind', 'scrape', 'platformer', 'dust', 'move'],
  build(c) {
    const col = c.color('#e9dcc7');
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    return [
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 16, dir, shape: { type: 'cone', radius: 4, angle: 0.5 },
        speed: [30, 70], life: [0.4, 0.6], size: [12, 20], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [1, 1.5]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.4, 0.5], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'disc', blend: 'normal', loop: true, world: true, rate: 10, dir: dir + Math.PI / 2, shape: { type: 'cone', radius: 3, angle: 0.8 },
        speed: [60, 140], life: [0.25, 0.4], size: [2, 4], color: c.darken(col, 0.3),
        behaviors: [c.gravity(700), c.colorOverLife(c.fade(0.6))], order: 2 }),
    ];
  },
};
