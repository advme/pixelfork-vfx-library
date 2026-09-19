/** A fiery burst with flames licking upward and embers. */
export default {
  name: 'explosion.fireball',
  category: 'explosion',
  whenToUse: 'A fire spell lands, a fuel can ignites, a dragon breath hits, a torch bursts. Fire without the smoke of an explosion.',
  duration: 1.0,
  loop: false,
  tint: '#ff7a1f',
  tags: ['fire', 'fireball', 'flame', 'burn', 'ignite', 'dragon'],
  build(c) {
    const col = c.color('#ff7a1f');
    const fire = c.grad([[c.lighten(col, 0.85), 0], [c.lighten(col, 0.3), 0.3], [col, 0.6], [c.darken(col, 0.5), 1]], [[1, 0], [1, 0.6], [0, 1]]);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 170, color: c.lighten(col, 0.7),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 12 },
        speed: [80, 200], life: [0.35, 0.55], size: [40, 70], rotation: [0, 6.28],
        behaviors: [c.colorOverLife(fire), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.15]])), c.speedOverLife(c.decel(0.1))], order: 2 })),
      // flames rising
      c.sys(c.vol({ tex: 'flame', blend: 'add', bursts: [{ count: [8, 11] }], shape: { type: 'cone', radius: 24, angle: 0.35 },
        speed: [120, 260], life: [0.4, 0.7], size: [30, 54], color: [c.lighten(col, 0.4), col],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.force(0, 200), c.noise(2, 8), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 4 })),
      // embers
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [16, 22] }], shape: { type: 'circle', radius: 14 },
        speed: [150, 400], life: [0.5, 0.9], size: [4, 8], color: [c.lighten(col, 0.6), col],
        behaviors: [c.force(0, 250), c.noise(3, 10), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 5 })),
    ];
  },
};
