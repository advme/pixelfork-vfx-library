/** A rocket launcher fires: a flash and flame at the front, a roaring backblast of fire, sparks and a big smoke cone out of the back, dust kicked up behind. */
export default {
  name: 'weapon.launch',
  category: 'weapon',
  whenToUse: 'A rocket launcher, bazooka, RPG, missile pod or recoilless cannon fires its round: play it once at the front of the tube, in 2D with dir (degrees, 0 = right; the backblast goes the opposite way) and in 3D with direction along the barrel, then follow the round with weapon.rocket (for a gun use weapon.muzzle, for a shotgun or cannon weapon.shotgun).',
  duration: 1.15, loop: false, tint: '#ffa83a',
  tags: ['rocket launcher', 'bazooka', 'rpg', 'backblast', 'missile', 'launch', 'military', 'weapon'],
  build(c) {
    const col = c.color('#ffa83a');
    const light = c.lighten(col, 0.55);
    const dir = c.dir === undefined ? 0 : c.dir;
    // 2D: offsets along the tube (forward is positive; the rear end of the tube is about 48 px back)
    const at = (d) => (c.is3d ? undefined : [Math.cos(dir) * d, Math.sin(dir) * d]);
    // The backblast sprays are aimed along dir like the rest but given NEGATIVE speeds, so they fly out
    // of the back: that keeps them opposite the shot in both worlds, also when a 3D game passes direction.
    return [
      // the front: a flash, a ring and a short flame
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.09, size: [80, 96], rotation: [0, 0.8], color: '#fff8e0', offset: at(10),
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 5 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 130, color: col, offset: at(10),
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 110, color: light, offset: at(14),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 3 }),
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: [4, 6] }], dir, shape: { type: 'cone', radius: 4, angle: 0.3 }, offset: at(10),
        speed: [260, 460], life: [0.08, 0.13], size: [30, 44], color: [light, col],
        behaviors: [c.sizeOverLife(c.shrink())], order: 4 })),
      // the back: a roar of fire out of the rear of the tube
      c.sys(c.spray({ tex: 'flame', blend: 'add', bursts: [{ count: [6, 8] }], dir, shape: { type: 'cone', radius: 4, angle: 0.3 }, offset: at(-48),
        speed: [-620, -380], life: [0.1, 0.16], size: [34, 50], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.7], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 4 })),
      c.sys(c.spray({ tex: 'glow', blend: 'add', world: true, bursts: [{ count: [10, 14] }], dir, shape: { type: 'cone', radius: 4, angle: 0.45 }, offset: at(-52),
        speed: [-800, -380], life: [0.15, 0.3], size: [3, 5], color: ['#ffffff', light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(700), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.fade(0.5))], order: 5 })),
      // the big backblast smoke cone
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ count: [10, 12] }, { time: 0.05, count: [5, 6] }], dir, shape: { type: 'cone', radius: 6, angle: 0.32 }, offset: at(-50),
        speed: [-520, -240], life: [0.8, 1.1], size: [26, 40], rotation: [0, 6.28], color: ['#ededed', '#c4c4c4'],
        behaviors: [c.speedOverLife(c.decel(0.05)), c.force(0, 35), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1.4], [1, 2.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // dust kicked up behind the shooter
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ time: 0.03, count: [5, 7] }], dir, shape: { type: 'cone', radius: 10, angle: 0.7 }, offset: at(-56),
        speed: [-260, -120], life: [0.7, 1.0], size: [30, 48], rotation: [0, 6.28], color: ['#d9c8a8', '#bfae8e'],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 25), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.45, 0.5], [0, 1]]))], order: 0 })),
      // a puff of smoke at the front
      c.sys(c.spray({ tex: 'puff', blend: 'normal', world: true, bursts: [{ time: 0.02, count: [3, 4] }], dir, shape: { type: 'cone', radius: 3, angle: 0.35 }, offset: at(12),
        speed: [100, 220], life: [0.5, 0.7], size: [18, 28], rotation: [0, 6.28], color: '#d6d6d6',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 40), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.65, 0], [0, 1]]))], order: 1 })),
    ];
  },
};
