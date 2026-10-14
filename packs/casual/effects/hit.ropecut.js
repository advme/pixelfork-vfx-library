/** A rope snaps: a quick white snap flash and glint, a tiny ring, two short streaks recoiling up and down the rope, and frayed fibre bits fluttering away. */
export default {
  name: 'hit.ropecut',
  category: 'hit',
  whenToUse: 'A rope, string, thread, vine or cable holding something is cut by a swipe in a rope-cutting physics puzzle (Cut the Rope style), a balloon string snipped, a hanging sign, cage or bridge rope cut: play it at the cut point, set dir along the swipe (degrees, default 0 = right; direction: [x, y, z] in 3D) and tint it the rope colour. For a fruit sliced use hit.slice; for a sword hitting an enemy use hit.slash.',
  duration: 0.55, loop: false, tint: '#d8b46a',
  tags: ['rope', 'cut', 'snap', 'string', 'snip', 'fibre', 'physics', 'hit'],
  build(c) {
    const col = c.color('#d8b46a');
    const light = c.lighten(col, 0.45);
    const deep = c.darken(col, 0.25);
    const dir = c.dir === undefined ? 0 : c.dir;
    const fibres = () => [c.speedOverLife(c.decel(0.3)), c.gravity(450), c.noise(3, 25), c.spin(-10, 10), c.colorOverLife(c.fade(0.6))];
    // the two cut ends whipping apart along the rope, square to the swipe (in 3D the rope hangs straight down)
    const recoil = (d, which) => c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 2 }], shape: { type: 'cone', radius: 2, angle: 0.06 }, dir: d,
      speed: [380, 520], life: [0.1, 0.14], size: [6, 8], color: light, stretch: { speed: 0.015, length: 1.5 },
      behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.3))], order: 3 }, which));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 70, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // fibre dust
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 6 },
        speed: [60, 160], life: [0.3, 0.45], size: [3, 5], color: light,
        behaviors: [c.gravity(200), c.colorOverLife(c.fade(0.5))], order: 1 })),
      // frayed fibres fluttering away all round
      c.sys(c.vol({ tex: 'shard', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 6 },
        speed: [100, 240], life: [0.4, 0.55], size: [6, 10], rotation: [0, 6.28], color: [col, deep], behaviors: fibres(), order: 2 })),
      // and flicked along the swipe
      c.sys(c.spray({ tex: 'shard', blend: 'normal', bursts: [{ count: [5, 6] }], dir, shape: { type: 'cone', radius: 4, angle: 0.5 },
        speed: [200, 340], life: [0.4, 0.55], size: [7, 11], rotation: [0, 6.28], color: [col, light], behaviors: fibres(), order: 2 })),
      recoil(dir + Math.PI / 2, 'up'),
      recoil(dir - Math.PI / 2, 'down'),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 56, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0))], order: 4 }),
      // the snap glint
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 58, rotation: dir + Math.PI / 4, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0]]))], order: 5 }),
    ];
  },
};
