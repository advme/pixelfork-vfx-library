/** A ground pound: a flash, a big shockwave ring across the ground, dust jets blasting out to both sides, chunks of ground and stars popping up. */
export default {
  name: 'move.groundpound',
  category: 'move',
  whenToUse: 'A character drops out of the air in a ground pound, a butt stomp, a dive slam or a plunge attack and smashes into the floor in a platformer; play it once at the feet on impact, and use move.land for an ordinary heavy landing, hit.stomp for jumping on an enemy\'s head, hit.heavy for a hammer or boss slam.',
  duration: 0.6, loop: false, anchor: 'feet', tint: '#ffd23f',
  tags: ['ground pound', 'butt stomp', 'slam', 'dive', 'shockwave', 'stars', 'platformer', 'move'],
  build(c) {
    const col = c.color('#ffd23f');
    const dust = '#efe4d2';
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const jetBehaviors = () => [c.speedOverLife(c.decel(0.05)), c.force(0, 50), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.35, 1], [1, 1.2]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.7, 0.5], [0, 1]]))];
    const side = (dir) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 6, angle: 0.2 },
      speed: [320, 560], life: [0.45, 0.6], size: [28, 46], rotation: [0, 6.28], color: [dust, c.darken(dust, 0.12)],
      behaviors: jetBehaviors(), order: 1 });
    // 3D: one ring of dust rolling out over the floor in every direction; 2D: two jets along the ground
    const jets = c.is3d
      ? [c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [18, 22] }], shape: { type: 'circle', radius: 10, thickness: 0 },
          speed: [320, 560], life: [0.45, 0.6], size: [28, 46], rotation: [0, 6.28], color: [dust, c.darken(dust, 0.12)],
          behaviors: jetBehaviors(), order: 1 }))]
      : [side(0.08), side(Math.PI - 0.08)];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 170, color: '#fff6d0',
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0, 1]]))], order: 2 }),
      // a dust ring under the power ring, so it reads on light ground too
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.5, size: 230, color: c.lighten(dust, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ring({ blend: 'add', bursts: [{ count: 1 }, { time: 0.08, count: 1 }], life: 0.36, size: 290, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1.1]])), c.colorOverLife(c.fade(0.25))], order: 3 }),
      ...jets,
      // chunks of ground thrown up
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [10, 12] }], dir: Math.PI / 2, shape: { type: 'cone', radius: 24, angle: 0.75 },
        speed: [280, 480], life: [0.45, 0.62], size: [5, 9], rotation: [0, 6.28], color: [c.darken(dust, 0.35), c.darken(dust, 0.5)],
        behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 2 }, 'up'), 'box')),
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ count: [5, 6] }], dir: Math.PI / 2, shape: { type: 'cone', radius: 12, angle: 0.65 },
        speed: [260, 400], life: [0.45, 0.6], size: [16, 24], rotation: [0, 6.28], color: [col, '#ffffff'],
        behaviors: [c.gravity(1000), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [0.7, 1], [1, 0]]))], order: 4 }, 'up')),
    ];
  },
};
