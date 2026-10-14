/** A frost blade strikes: an icy swoosh cuts through with a white core, ice chips snap off along the swing, snowflakes burst out and a frosty puff hangs. */
export default {
  name: 'hit.elementice',
  category: 'hit',
  whenToUse: 'An ice-enchanted weapon strikes: a frost sword slash, an ice axe chop, a freezing spear thrust, a blow from a weapon playing weapon.frostblade. Aim it along the swing: in 2D set dir (degrees, default down-right); in 3D pass direction: [x, y, z]. For an ice hit that is not a blade (an ice arrow, a snowball, a freeze punch) use hit.ice; for a plain blade use hit.slash.',
  duration: 0.6, loop: false, tint: '#8fe3ff',
  tags: ['ice slash', 'frost sword', 'ice', 'frost', 'enchanted', 'slash', 'freeze', 'hit'],
  build(c) {
    const col = c.color('#8fe3ff');
    const light = c.lighten(col, 0.7);
    const dir = c.dir === undefined ? -Math.PI / 5 : c.dir;
    return [
      // a cold flash at the cut
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // a frosty puff hanging where it struck
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 10 },
        speed: [40, 110], life: [0.4, 0.55], size: [24, 38], rotation: [0, 6.28], color: '#eaf8ff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 1 })),
      // the icy swoosh: a fan of fat stretched blobs, white turning to frost blue
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 7 }], shape: { type: 'cone', radius: 14, angle: 0.12 }, dir,
        speed: [550, 700], life: [0.16, 0.24], size: [34, 46], color: '#ffffff', stretch: { speed: 0.007, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.7], [0.3, 1], [1, 0.2]])),
          c.colorOverLife(c.grad([[light, 0], [col, 0.5], [col, 1]], [[1, 0], [0.9, 0.3], [0, 1]]))], order: 2 })),
      // ice chips snapping off along the swing
      c.sys(c.chunks(c.spray({ tex: 'shard', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'cone', radius: 6, angle: 0.55 }, dir,
        speed: [250, 450], life: [0.4, 0.55], size: [8, 14], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1100), c.spin(-10, 10), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.7))], order: 3 }), 'shard')),
      // the white core of the swoosh
      c.sys(c.spray({ tex: 'disc', blend: 'add', bursts: [{ count: 3 }], shape: { type: 'cone', radius: 6, angle: 0.06 }, dir,
        speed: [650, 800], life: [0.12, 0.16], size: [16, 22], color: '#f4fcff', stretch: { speed: 0.012, length: 2.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.2)), c.sizeOverLife(c.shrink())], order: 4 })),
      // snowflakes bursting out of the cut
      c.sys(c.vol({ tex: 'snowflake', blend: 'add', bursts: [{ count: [5, 7] }], shape: { type: 'circle', radius: 14 },
        speed: [60, 160], life: [0.45, 0.6], size: [12, 20], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-3, 3), c.sizeOverLife(c.pop(0.15, 0.6))], order: 5 })),
    ];
  },
};
