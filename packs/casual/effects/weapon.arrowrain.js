/** An arrow volley: dark shafts with bright tips rain down slantwise onto an area, little dirt puffs and glints pop where they land and a dust ring marks the zone. */
export default {
  name: 'weapon.arrowrain',
  category: 'weapon',
  whenToUse: 'A volley of arrows rains down on an area: an archer tower or archer squad firing on a group, an arrow-rain skill in an RPG, tower defense or strategy game, a castle-siege volley. Play it on the ground at the centre of the target area (about 220 px wide at size 1); the arrows land from 0.4 s to 0.9 s. For a single arrow striking a target use hit.arrow; for a fireball from the sky use magic.meteor.',
  duration: 1.25, loop: false, anchor: 'feet', tint: '#7a5232',
  tags: ['arrows', 'volley', 'arrow rain', 'archer', 'medieval', 'siege', 'tower defense', 'barrage'],
  build(c) {
    const col = c.color('#7a5232');
    const tip = c.lighten(col, 0.8);
    // the arrows are born 340 px up and 100 px to the left and come down slantwise, landing after about 0.4 s
    const high = 340, back = -100, flight = 0.385;
    // they come in from rest high up, so they fade in over the first few frames instead of popping into view
    const fly = () => [c.force(1500, -5000), c.limitSpeed(1300, 2), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.15], [1, 1]]))];
    const sky = (p) => c.sys(c.is3d
      ? c.env3d(p, { w: 220, d: 160, x: back, y: high })
      : Object.assign({ shape: { type: 'rect', w: 220, h: 40, thickness: 1 }, offset: [back, high] }, p));
    const land = c.is3d ? { type: 'circle', radius: 100 } : { type: 'rect', w: 210, h: 40, thickness: 1 };
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the landings: a pair every 45 ms from the first arrow down to the last
    const landings = (count) => [{ time: flight, count, cycle: 12, interval: 0.045 }];
    return [
      // a dust ring marking the zone as the first arrows land
      ring({ blend: 'normal', bursts: [{ time: flight + 0.02, count: 1 }], life: 0.6, size: 270, color: '#d8c6a8',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.75], [1, 1.05]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0, 1]]))], order: 0 }),
      // the shafts
      sky({ tex: 'disc', blend: 'normal', rate: 76, duration: 0.5, speed: 0, life: flight, size: [4, 5], color: [col, c.darken(col, 0.3)],
        stretch: { speed: 0.012, length: 2 }, behaviors: fly(), order: 2 }),
      // bright arrowheads glinting among them
      sky({ tex: 'glow', blend: 'add', rate: 24, duration: 0.5, speed: 0, life: flight, size: [3, 4], color: tip,
        stretch: { speed: 0.008, length: 1.5 }, behaviors: fly(), order: 3 }),
      // little dirt puffs where they land
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: landings(2), shape: land,
        speed: 0, life: [0.28, 0.36], size: [16, 24], rotation: [0, 6.28], color: ['#cdb594', '#b49a78'],
        behaviors: [c.force(0, 70), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 1.25]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // a glint as an arrowhead bites into the ground
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: landings(1), shape: land,
        speed: 0, life: [0.12, 0.18], size: [12, 18], rotation: [0, 0.8], color: '#fff4d6',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.4))], order: 4 })),
    ];
  },
};
