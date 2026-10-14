/** A laser hits a surface: a white-hot burn spot that cools to red, molten sparks and droplets spraying off, a little scorch ring and a wisp of smoke. */
export default {
  name: 'hit.laser',
  category: 'hit',
  whenToUse: 'A laser, blaster bolt, plasma shot or energy beam hits a wall, the ground, a hull or an enemy (sci-fi and space shooters, tower defence lasers, cutting beams): play it where it hits with dir in 2D (degrees, default 90 = up, the way the sparks fly off the surface) or direction in 3D, tinted the colour of the laser; for plain bullets use hit.bullet, for a hit on a force field use hit.shieldzap.',
  duration: 0.65, loop: false, tint: '#ff3b6b',
  tags: ['laser', 'blaster', 'burn', 'molten', 'sparks', 'sci-fi', 'hit', 'energy'],
  build(c) {
    const col = c.color('#ff3b6b');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? Math.PI / 2 : c.dir;
    return [
      // the flash and a scorch ring
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 76, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // the burn spot: white-hot, through the laser's colour, cooling to a dull red
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: 54, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 1.2], [0.2, 1], [1, 0.5]])), c.colorOverLife(c.grad([['#ffffff', 0], [light, 0.2], [col, 0.5], ['#c8321a', 1]], [[1, 0], [1, 0.5], [0, 1]]))], order: 3 }),
      // molten sparks spraying off the surface, falling
      c.sys(c.spray({ tex: 'glow', blend: 'add', dir, bursts: [{ count: [14, 18] }], shape: { type: 'cone', radius: 4, angle: 0.75 },
        speed: [180, 480], life: [0.25, 0.5], size: [3, 6], color: ['#ffffff', '#ffc45a'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.4)), c.colorOverLife(c.grad([['#ffffff', 0], ['#ffd27a', 0.4], ['#ff7a2a', 1]], [[1, 0], [1, 0.5], [0, 1]]))], order: 4 })),
      // a few fat molten droplets arcing off
      c.sys(c.spray({ tex: 'disc', blend: 'add', dir, bursts: [{ count: [3, 5] }], shape: { type: 'cone', radius: 4, angle: 0.6 },
        speed: [120, 260], life: [0.4, 0.55], size: [5, 8], color: '#ffd27a',
        behaviors: [c.gravity(1100), c.sizeOverLife(c.shrink()), c.colorOverLife(c.grad([['#ffffff', 0], ['#ffb03a', 0.4], ['#ff5a1f', 1]], [[1, 0], [1, 0.6], [0, 1]]))], order: 4 })),
      // a wisp of smoke curling up
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.06, count: [2, 3] }], shape: { type: 'circle', radius: 8, arc: Math.PI },
        speed: [15, 40], life: [0.5, 0.58], size: [18, 28], rotation: [0, 6.28], color: '#5a5a5a',
        behaviors: [c.force(0, 110), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.5]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.3], [0, 1]]))], order: 0 })),
    ];
  },
};
