/** A flaming blade strikes: a fiery swoosh cuts through with a white-hot core, flames burst up from the cut, embers spray along the swing and a puff of smoke rises. */
export default {
  name: 'hit.elementfire',
  category: 'hit',
  whenToUse: 'A fire-enchanted weapon strikes: a flaming sword slash, a fire axe chop, a burning spear thrust, a blow from a weapon playing weapon.flamesword. Aim it along the swing: in 2D set dir (degrees, default down-right); in 3D pass direction: [x, y, z]. For a fire hit that is not a blade (a fire punch, a fire arrow, a burn tick) use hit.fire; for a plain blade use hit.slash.',
  duration: 0.6, loop: false, tint: '#ff7a1f',
  tags: ['fire slash', 'flaming sword', 'fire', 'enchanted', 'slash', 'burn', 'blade', 'hit'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.55);
    const hot = c.lighten(col, 0.85);
    const dir = c.dir === undefined ? -Math.PI / 5 : c.dir;
    return [
      // a hot flash at the cut
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 140, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // a puff of smoke rising after the fire
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.08, count: [3, 4] }], shape: { type: 'circle', radius: 12 },
        speed: [20, 60], life: [0.38, 0.5], size: [24, 36], rotation: [0, 6.28], color: '#4a4a4a',
        behaviors: [c.force(0, 90), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.3], [0, 1]]))], order: 1 })),
      // the fiery swoosh: a fan of fat stretched blobs that cools from white-hot to deep orange
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 7 }], shape: { type: 'cone', radius: 14, angle: 0.12 }, dir,
        speed: [550, 700], life: [0.16, 0.24], size: [34, 46], color: '#ffffff', stretch: { speed: 0.007, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.7], [0.3, 1], [1, 0.2]])),
          c.colorOverLife(c.grad([[hot, 0], [col, 0.4], [c.darken(col, 0.25), 1]], [[1, 0], [0.9, 0.3], [0, 1]]))], order: 2 })),
      // flames bursting up from the cut
      c.sys(c.vol({ tex: 'flame', blend: 'add', bursts: [{ count: [8, 10] }, { time: 0.05, count: [4, 5] }], shape: { type: 'circle', radius: 16 },
        speed: [80, 200], life: [0.3, 0.45], size: [28, 44], rotation: [-0.4, 0.4], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 240), c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 3 })),
      // the white-hot core of the swoosh
      c.sys(c.spray({ tex: 'disc', blend: 'add', bursts: [{ count: 3 }], shape: { type: 'cone', radius: 6, angle: 0.06 }, dir,
        speed: [650, 800], life: [0.12, 0.16], size: [16, 22], color: '#fff6dc', stretch: { speed: 0.012, length: 2.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.2)), c.sizeOverLife(c.shrink())], order: 4 })),
      // embers spraying along the swing
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 16] }], shape: { type: 'cone', radius: 6, angle: 0.6 }, dir,
        speed: [250, 550], life: [0.25, 0.45], size: [3, 6], color: [hot, light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(500), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 5 })),
    ];
  },
};
