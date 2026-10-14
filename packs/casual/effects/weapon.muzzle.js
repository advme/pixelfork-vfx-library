/** A gun's muzzle flash: a star-shaped flash, a short flame forward, sparks and a wisp of smoke. */
export default {
  name: 'weapon.muzzle',
  category: 'weapon',
  whenToUse: 'A gun, cannon or blaster fires: every shot. Play it at the barrel tip; in 2D set dir (degrees, 0 = right), in 3D pass direction along the barrel. Tiny and fast: fine at full-auto rates.',
  duration: 0.5, loop: false, tint: '#ffcf5a',
  tags: ['muzzle', 'gun', 'shot', 'fire', 'shoot', 'weapon', 'flash', 'rifle', 'pistol'],
  build(c) {
    const col = c.color('#ffcf5a');
    const dir = c.dir === undefined ? 0 : c.dir;
    return [
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.06, size: [52, 64], rotation: [0, 0.8], color: '#fff8e0',
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 4 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.08, size: 70, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      // the flame tongue out of the barrel
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [4, 6] }], dir, shape: { type: 'cone', radius: 2, angle: 0.18 },
        speed: [420, 780], life: [0.05, 0.08], size: [16, 24], color: [col, '#ff8a2a'],
        stretch: { speed: 0.004, length: 0.6 }, behaviors: [c.sizeOverLife(c.shrink())], order: 3 })),
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [5, 8] }], dir, shape: { type: 'cone', radius: 2, angle: 0.45 },
        speed: [500, 1000], life: [0.08, 0.16], size: [3, 5], color: '#ffe9a8',
        stretch: { speed: 0.02, length: 1.5 }, behaviors: [c.gravity(900), c.colorOverLife(c.fade(0.5))], order: 5 })),
      // a wisp of smoke that drifts off
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ time: 0.02, count: [2, 3] }], dir, shape: { type: 'cone', radius: 2, angle: 0.35 },
        speed: [40, 90], life: [0.35, 0.5], size: [12, 20], rotation: [0, 6.28], color: '#bdbdbd',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 50), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 1 })),
    ];
  },
};
