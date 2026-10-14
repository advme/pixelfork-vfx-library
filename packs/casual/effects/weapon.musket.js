/** A musket shot: a hot flash and a short flame out of the barrel, burning powder sparks thrown forward and a big white cloud of black-powder smoke that billows out and hangs. */
export default {
  name: 'weapon.musket',
  category: 'weapon',
  whenToUse: 'A musket, flintlock pistol, arquebus or old black-powder rifle fires: a pirate pistol, a redcoat line volley, a duel, a western or colonial shooter. Play it at the barrel tip; in 2D set dir (degrees, 0 = right), in 3D pass direction along the barrel. The big white smoke cloud is the point of it; for modern guns use weapon.muzzle, for a cannon use weapon.cannon, for a blunderbuss spread use weapon.shotgun.',
  duration: 1.2, loop: false, tint: '#ffc24a',
  tags: ['musket', 'flintlock', 'pistol', 'pirate', 'black powder', 'smoke', 'historical', 'weapon'],
  build(c) {
    const col = c.color('#ffc24a');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    const smokeAlpha = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [a * 0.8, 0.5], [0, 1]]));
    return [
      // the flash at the muzzle
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.07, size: 100, rotation: [0, 0.8], color: '#fff8e0',
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 5 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.13, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      // a short tongue of flame
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: [4, 6] }], dir, shape: { type: 'cone', radius: 3, angle: 0.2 },
        speed: [320, 560], life: [0.06, 0.1], size: [26, 38], color: [light, '#ff8a2a'],
        behaviors: [c.sizeOverLife(c.shrink())], order: 4 })),
      // burning powder grains thrown forward, dropping as they slow
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 13] }], dir, shape: { type: 'cone', radius: 3, angle: 0.4 },
        speed: [300, 650], life: [0.2, 0.42], size: [3, 5], color: [light, '#ff8a2a'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(700), c.speedOverLife(c.decel(0.35)), c.colorOverLife(c.fade(0.55))], order: 6 })),
      // the big white smoke cloud rolling forward and hanging where it was fired
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ time: 0.02, count: [10, 12] }], dir, shape: { type: 'cone', radius: 6, angle: 0.32 },
        speed: [90, 330], life: [0.9, 1.2], size: [30, 50], rotation: [0, 6.28], color: ['#ffffff', '#e2e2e2'],
        behaviors: [c.speedOverLife(c.decel(0.05)), c.force(0, 26), c.noise(0.8, 10), c.spin(-0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1.25], [1, 1.9]])),
          smokeAlpha(0.95)], order: 2 })),
      // a puff bursting out around the barrel mouth
      c.sys(c.vol({ tex: 'puff', blend: 'normal', world: true, bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [50, 110], life: [0.6, 0.8], size: [20, 30], rotation: [0, 6.28], color: '#ececec',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.6]])),
          smokeAlpha(0.85)], order: 3 })),
    ];
  },
};
