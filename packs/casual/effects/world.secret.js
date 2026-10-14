/** A secret found: a bright flash, slowly turning rays, three chime rings ringing out one after another and a burst of sparkles that twinkle on. */
export default {
  name: 'world.secret',
  category: 'world',
  whenToUse: 'A secret is discovered in the level (a hidden room, a fake wall, a secret passage or a hidden collectible revealed in a platformer, dungeon or adventure game); play it where the secret appears, and use ui.unlock for something unlocked on a menu screen or world.dooropen for an ordinary door opening.',
  duration: 1.2, loop: false, tint: '#c98bff',
  tags: ['secret', 'hidden', 'reveal', 'discover', 'passage', 'mystery', 'platformer', 'adventure'],
  build(c) {
    const col = c.color('#c98bff');
    const light = c.lighten(col, 0.6);
    const rays = (rot, px) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 1.1, size: px, rotation: rot, color: col,
      behaviors: [c.spin(0.6), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 0.9]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.15], [0.55, 0.7], [0, 1]]))], order: 1 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 240, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // slowly turning rays: two 4-point rays 45 degrees apart make an even 8-ray burst
      rays(0.3, 300), rays(0.3 + Math.PI / 4, 250),
      // the chime: three rings ringing out one after another
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.15, count: 1 }, { time: 0.3, count: 1 }], life: 0.6, size: 230, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 2 }),
      // twinkles appearing all over the spot
      c.sys(c.vol({ tex: 'spark', blend: 'add', rate: 30, duration: 0.65, shape: { type: 'circle', radius: 85 },
        speed: [0, 20], life: [0.35, 0.55], size: [10, 18], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 })),
      // the sparkle burst
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 20 },
        speed: [180, 340], life: [0.7, 0.95], size: [11, 18], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.6))], order: 4 })),
    ];
  },
};
