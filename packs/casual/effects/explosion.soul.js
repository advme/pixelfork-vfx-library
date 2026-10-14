/** Souls set free: a pale flash and rings, then glowing teardrop wisps with soft halos burst outward, slow down and float up into the sky among cold motes. */
export default {
  name: 'explosion.soul',
  category: 'explosion',
  whenToUse: 'Souls or spirits are released: a ghost or undead enemy is destroyed, a haunted object is purified, a spirit jar or cursed vessel shatters, a soul-collecting attack bursts, a curse is broken. Play it at the centre. For a magic blast use explosion.magic; for a few soul orbs being collected use pickup.xp.',
  duration: 1.4, loop: false, tint: '#aef4ff',
  tags: ['soul', 'spirit', 'ghost', 'release', 'purify', 'undead', 'wisp', 'explosion'],
  build(c) {
    const col = c.color('#aef4ff');
    const light = c.lighten(col, 0.6);
    // One ring of souls = two systems: the teardrop (point down, so its tail trails below) and its halo.
    // Both fire the same even angles at the same speed with the same forces, so every halo stays on its soul.
    const souls = (count, speed, size, life, order) => {
      const path = () => [c.force(0, 260), c.limitSpeed([[0, speed], [0.06, speed], [0.22, 60], [1, 60]], 1)];
      const shape = { type: 'circle', radius: 10, thickness: 0, even: true };
      return [
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ count }], shape, speed, life, size: size * 2.6, color: col,
          behaviors: path().concat([c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1], [0.7, 0.9], [1, 0]])),
            c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.3, 0.6], [0, 1]]))]), order }),
        c.sys({ tex: 'drop', blend: 'add', bursts: [{ count }], shape, speed, life, size, rotation: Math.PI, color: light,
          behaviors: path().concat([c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1], [0.7, 0.9], [1, 0]])), c.colorOverLife(c.fade(0.6))]), order: order + 1 }),
      ];
    };
    return [
      // the pale flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 230, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // a wide ring, then a tighter one a beat later
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 270, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.08, count: 1 }], life: 0.4, size: 180, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      // the souls: a fast outer ring of eight, a slower inner ring of five
      ...souls(8, 330, 20, 1.4, 3),
      ...souls(5, 200, 15, 1.2, 5),
      // cold motes flung out with them
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [16, 20] }], shape: { type: 'circle', radius: 14 },
        speed: [120, 300], life: [0.7, 1.1], size: [3, 6], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 120), c.noise(2, 16), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]]))], order: 7 })),
    ];
  },
};
