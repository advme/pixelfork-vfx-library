/** A shotgun blast: a wide flash, a cone of pellets tearing forward and a thick puff of smoke. */
export default {
  name: 'weapon.shotgun',
  category: 'weapon',
  whenToUse: 'A shotgun, blunderbuss, cannon or scatter gun fires: one big spread shot. Play it at the barrel; in 2D set dir (degrees, 0 = right), in 3D pass direction along the barrel. For ordinary guns use weapon.muzzle.',
  duration: 0.7, loop: false, tint: '#ffcf5a',
  tags: ['shotgun', 'blast', 'spread', 'cannon', 'pellets', 'gun', 'shooter', 'weapon'],
  build(c) {
    const col = c.color('#ffcf5a');
    const dir = c.dir === undefined ? 0 : c.dir;
    return [
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.08, size: 110, rotation: [0, 0.8], color: '#fff8e0',
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 4 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: [5, 7] }], dir, shape: { type: 'cone', radius: 4, angle: 0.35 },
        speed: [300, 520], life: [0.07, 0.12], size: [30, 44], color: [col, '#ff8a2a'],
        behaviors: [c.sizeOverLife(c.shrink())], order: 3 })),
      // pellets
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], dir, shape: { type: 'cone', radius: 3, angle: 0.25 },
        speed: [1100, 1500], life: [0.12, 0.18], size: [4, 6], color: '#fff2c4', stretch: { speed: 0.004, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.6))], order: 5 })),
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ time: 0.03, count: [5, 6] }], dir, shape: { type: 'cone', radius: 4, angle: 0.4 },
        speed: [80, 180], life: [0.5, 0.7], size: [22, 34], rotation: [0, 6.28], color: '#c4c4c4',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 40), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.65, 0], [0, 1]]))], order: 2 })),
    ];
  },
};
