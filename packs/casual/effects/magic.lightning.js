/** A lightning strike from above: bolts, a white flash and sparks at the ground. */
export default {
  name: 'magic.lightning',
  category: 'magic',
  whenToUse: 'A lightning spell, a thunder strike, an electric trap or a shock hit. The bolt comes down from above the point.',
  duration: 0.6,
  loop: false,
  tint: '#9fd8ff',
  tags: ['lightning', 'thunder', 'electric', 'shock', 'bolt', 'zap'],
  build(c) {
    const col = c.color('#9fd8ff');
    const light = c.lighten(col, 0.8);
    return [
      // bolts: fast lines coming down from 260px above
      // (a stretched particle maps its texture ALONG the motion, so use a round glow, not the line texture)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 4 }, { time: 0.05, count: 3 }], shape: { type: 'cone', radius: 12, angle: 0.1 }, dir: -Math.PI / 2, offset: [0, 260],
        speed: [1500, 1900], life: [0.16, 0.22], size: [9, 15], color: light,
        stretch: { speed: 0.12, length: 6 },
        behaviors: [c.noise(30, 16), c.colorOverLife(c.fade(0.3))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 2 }], shape: { type: 'cone', radius: 6, angle: 0.05 }, dir: -Math.PI / 2, offset: [0, 260],
        speed: [1500, 1800], life: [0.18, 0.22], size: [22, 30], color: col,
        stretch: { speed: 0.1, length: 4 },
        behaviors: [c.noise(20, 10), c.colorOverLife(c.fade(0.3))], order: 2 }),
      // impact flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.12, count: 1 }], life: 0.22, size: 180, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.12, count: 2 }], life: 0.3, size: 160, color: col, rotation: [0, 1],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ time: 0.12, count: 1 }], life: 0.35, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 })),
      // sparks jumping out at the ground
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.12, count: [14, 20] }], shape: { type: 'cone', radius: 6, angle: 1.2 },
        speed: [300, 700], life: [0.25, 0.45], size: [5, 9], color: [light, col],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.noise(20, 6), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 }),
    ];
  },
};
