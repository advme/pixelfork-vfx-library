/** A lightning blade strikes: a crackling electric swoosh cuts through, jagged sparks spray along the swing, little bolts pop around the cut and the light flickers twice. */
export default {
  name: 'hit.elementshock',
  category: 'hit',
  whenToUse: 'A lightning-enchanted weapon strikes: a thunder sword slash, a shock spear thrust, an electric hammer blow, a hit from a weapon playing weapon.thunderhammer. Aim it along the swing: in 2D set dir (degrees, default down-right); in 3D pass direction: [x, y, z]. For an electric hit that is not a blade (a taser, a shock trap, a zap) use hit.electric; for a plain blade use hit.slash.',
  duration: 0.35, loop: false, tint: '#7fd8ff',
  tags: ['shock slash', 'thunder sword', 'electric', 'lightning', 'enchanted', 'slash', 'zap', 'hit'],
  build(c) {
    const col = c.color('#7fd8ff');
    const light = c.lighten(col, 0.7);
    const dir = c.dir === undefined ? -Math.PI / 5 : c.dir;
    return [
      // the light flickers twice
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }, { time: 0.08, count: 1 }], life: 0.12, size: 140, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the electric swoosh: a fan of fat stretched blobs, shaken a little so it crackles
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 7 }], shape: { type: 'cone', radius: 14, angle: 0.12 }, dir,
        speed: [550, 700], life: [0.14, 0.2], size: [32, 44], color: [light, col], stretch: { speed: 0.007, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.noise(30, 14), c.sizeOverLife(c.curve([[0, 0.7], [0.3, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.3))], order: 2 })),
      // a flash glint across the cut
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.16, size: 100, rotation: [0, 1.6], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      // the white core of the swoosh
      c.sys(c.spray({ tex: 'disc', blend: 'add', bursts: [{ count: 3 }], shape: { type: 'cone', radius: 6, angle: 0.06 }, dir,
        speed: [650, 800], life: [0.12, 0.16], size: [16, 22], color: '#ffffff', stretch: { speed: 0.012, length: 2.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.2)), c.sizeOverLife(c.shrink())], order: 4 })),
      // jagged sparks crackling along the swing, a second crackle a moment later
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 16] }, { time: 0.08, count: [5, 7] }], shape: { type: 'cone', radius: 6, angle: 0.6 }, dir,
        speed: [300, 650], life: [0.12, 0.22], size: [3, 6], color: ['#ffffff', col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.noise(40, 30), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // little bolts popping around the cut
      c.sys(c.vol({ tex: 'bolt', blend: 'add', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 24 },
        speed: [50, 120], life: [0.26, 0.34], size: [24, 34], rotation: [-0.6, 0.6], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.1], [0.3, 0.9], [0.5, 1.05], [1, 0]]))], order: 5 })),
    ];
  },
};
