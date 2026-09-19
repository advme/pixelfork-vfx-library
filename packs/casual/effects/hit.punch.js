/** A comic-book POW: big four-point flash, double ring, puff. */
export default {
  name: 'hit.punch',
  category: 'hit',
  whenToUse: 'A punch, kick, headbutt or blunt hit lands. Bigger and rounder than hit.impact; good for boxing, brawlers, cartoon fights.',
  duration: 0.5,
  loop: false,
  tint: '#ffe66d',
  tags: ['punch', 'kick', 'pow', 'blunt', 'comic', 'fight'],
  build(c) {
    const col = c.color('#ffe66d');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 150, color: light, rotation: 0.4,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.25))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.08, count: 1 }], life: 0.3, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // white puffs flying out
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 10 },
        speed: [200, 380], life: [0.3, 0.45], size: [22, 34], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.05)), c.sizeOverLife(c.curve([[0, 0.6], [0.4, 1], [1, 0.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.8, 0.5], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ count: [5, 7] }], shape: { type: 'circle', radius: 6 },
        speed: [220, 420], life: [0.35, 0.5], size: [14, 22], rotation: [0, 6.28], color: light,
        behaviors: [c.spin(-8, 8), c.gravity(900), c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 1], [0.6, 1], [1, 0]]))], order: 4 }),
    ];
  },
};
