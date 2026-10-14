/** A meteor strike: a blazing rock streaks down from the sky and slams in with fire, a shockwave and flying rubble. */
export default {
  name: 'magic.meteor',
  category: 'magic',
  whenToUse: 'A meteor, comet or fiery boulder falls from the sky onto a spot: a meteor spell, an airstrike, a falling star attack, an asteroid in space. Play it at the impact point; the fall takes half a second before the hit.',
  duration: 1.4, loop: false, tint: '#ff7a1f',
  tags: ['meteor', 'comet', 'airstrike', 'sky', 'fire', 'impact', 'spell', 'asteroid'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.6);
    // the fall: from 260 right, 420 up, straight at the impact point, landing at 0.5 s
    const sx = 260, sy = 420, fall = Math.atan2(-sy, -sx), speed = Math.hypot(sx, sy) / 0.5;
    const falling = (p) => c.sys(Object.assign({ shape: { type: 'cone', radius: 1, angle: 0.001 }, dir: fall, offset: [sx, sy], speed, blend: 'add' }, p));
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      falling({ tex: 'glow', bursts: [{ count: 1 }], life: 0.5, size: 60, color: light, order: 5 }),
      falling({ tex: 'glow', bursts: [{ count: 1 }], life: 0.5, size: 26, color: '#ffffff', order: 6 }),
      // the fiery tail: launched with the head but a little slower, so it strings out behind it like a comet
      falling({ tex: 'flame', bursts: [{ count: 16 }], speed: [speed * 0.7, speed * 0.98], life: 0.5, size: [26, 42], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.colorOverLife(c.fade(0.6))], order: 4 }),
      falling({ tex: 'puff', blend: 'normal', bursts: [{ count: 10 }], speed: [speed * 0.45, speed * 0.75], life: 0.5, size: [22, 34], rotation: [0, 6.28], color: '#555555',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [1, 1.4]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 3 }),
      // impact at 0.5 s
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.5, count: 1 }], life: 0.3, size: 320, color: '#fff2c4',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      ring({ blend: 'add', bursts: [{ time: 0.5, count: 1 }], life: 0.5, size: 380, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys(c.vol({ tex: 'flame', blend: 'add', bursts: [{ time: 0.5, count: [10, 12] }], shape: { type: 'circle', radius: 20, arc: Math.PI },
        speed: [100, 260], life: [0.4, 0.6], size: [40, 64], rotation: [-0.4, 0.4], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 200), c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 })),
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ time: 0.5, count: [10, 12] }], shape: { type: 'cone', radius: 20, angle: 0.7 },
        speed: [320, 620], life: [0.6, 0.85], size: [8, 15], rotation: [0, 6.28], color: ['#5a4234', '#2e221b'],
        behaviors: [c.gravity(1700), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 4 }, 'up'), 'box')),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.58, count: [8, 10] }], shape: { type: 'circle', radius: 30, arc: Math.PI },
        speed: [60, 160], life: [0.7, 0.9], size: [60, 90], rotation: [0, 6.28], color: ['#5a5a5a', '#3a3a3a'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 60), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0, 1]]))], order: 0 })),
    ];
  },
};
