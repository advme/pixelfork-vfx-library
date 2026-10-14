/** A tiny food dot is eaten: a quick bright pop with a little ring, a glint and a few specks, about 30 px across. */
export default {
  name: 'pickup.pellet',
  category: 'pickup',
  whenToUse: 'A tiny food dot, pellet or orb is eaten in an .io game (snake.io, slither, agar.io, a pac-man dot): a very small, very fast pop that can fire many times a second; play it where the dot was and tint it with the dot\'s colour. For a coin or item use pickup.sparkle; for many dots pulled in by a magnet use pickup.vacuum; for experience orbs use pickup.xp.',
  duration: 0.2, loop: false, tint: '#5cf0ff',
  tags: ['pellet', 'food', 'dot', 'eat', 'io', 'snake', 'agar', 'orb'],
  build(c) {
    const col = c.color('#5cf0ff');
    const light = c.lighten(col, 0.6);
    return [
      // the glow pop
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 36, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 0 }),
      // a little ring
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 32, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // specks flicking out
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 3 },
        speed: [70, 130], life: [0.14, 0.2], size: [3, 5], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.shrink())], order: 2 })),
      // the white core and a glint
      c.sys({ tex: 'disc', blend: 'add', bursts: [{ count: 1 }], life: 0.09, size: 12, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.2]]))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 22, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.4))], order: 4 }),
    ];
  },
};
