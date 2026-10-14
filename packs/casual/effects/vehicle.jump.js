/** A car or bike slams down after a jump: a wide dust ring on the ground, sparks scraping out sideways and gravel thrown up. */
export default {
  name: 'vehicle.jump',
  category: 'vehicle',
  whenToUse: 'A car, truck, kart, bike or skateboard lands on the ground after a jump or ramp in a racing, stunt or monster-truck game. Play it under the wheels at the moment they touch down. Tint it for the ground (sand, snow, mud). For a vehicle hitting something use vehicle.crash; for a character landing use move.land.',
  duration: 0.65, loop: false, anchor: 'feet', tint: '#e3cfae',
  tags: ['land', 'jump', 'ramp', 'stunt', 'car', 'bike', 'monster truck', 'vehicle'],
  build(c) {
    const col = c.color('#e3cfae');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const dust = () => [c.speedOverLife(c.decel(0.06)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.25]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.65, 0.5], [0, 1]]))];
    const side = (dir) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 10, angle: 0.22 }, dir,
      speed: [260, 460], life: [0.45, 0.62], size: [32, 52], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)], behaviors: dust(), order: 1 });
    // 3D: one ring of dust rolling out over the floor in every direction; 2D: two clouds rolling out sideways
    const puffs = c.is3d
      ? [c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [14, 16] }], shape: { type: 'circle', radius: 16, thickness: 0, even: true },
          speed: [260, 440], life: [0.45, 0.62], size: [32, 52], rotation: [0, 6.28], color: [col, c.darken(col, 0.15)], behaviors: dust(), order: 1 }))]
      : [side(0.12), side(Math.PI - 0.12)];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 140, color: '#fff2d0',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.4, size: 240, color: c.lighten(col, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ...puffs,
      // the chassis scraping: sparks thrown out of the ground (3D: c.ground turns the half-sphere to open upward);
      // they grow as they fly, so a new spark's tail does not reach back under the ground
      c.sys(c.ground(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 14, arc: Math.PI },
        speed: [320, 600], life: [0.2, 0.38], size: [3, 6], color: ['#ffffff', '#ffc85a'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1500), c.speedOverLife(c.decel(0.4)), c.sizeOverLife(c.grow(0.3)), c.colorOverLife(c.fade(0.5))], order: 4 }))),
      // gravel thrown up
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'cone', radius: 20, angle: 0.75 },
        speed: [220, 440], life: [0.45, 0.65], size: [4, 8], rotation: [0, 6.28], color: [c.darken(col, 0.35), c.darken(col, 0.55)],
        behaviors: [c.gravity(1600), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 2 }, 'up'), 'box')),
    ];
  },
};
