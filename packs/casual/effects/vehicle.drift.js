/** A power drift: thick white tyre-smoke clouds left hanging behind, and hot sparks and glints flying off the wheel. Loops until stopped. */
export default {
  name: 'vehicle.drift',
  category: 'vehicle',
  whenToUse: 'A car or kart is drifting sideways through a corner in a racing game. Follow a rear wheel (play one per wheel for both); in 2D set dir (degrees, default backward = left) and in 3D pass direction backward from the wheel. Stop it when the drift ends. Tint sets the spark colour (blue, orange, purple for kart drift-boost levels). For a short brake or a character sliding use move.skid; for the boost after the drift use vehicle.nitro.',
  duration: 1, loop: true, tint: '#ffa531',
  tags: ['drift', 'racing', 'kart', 'tyre smoke', 'sparks', 'car', 'corner', 'vehicle'],
  build(c) {
    const col = c.color('#ffa531');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? Math.PI : c.dir;
    const smoke = '#f1f1f1';
    // 2D: start the sparks just behind the wheel, so their tails do not reach forward into the car
    const out = c.is3d ? undefined : [Math.cos(dir) * 12, Math.sin(dir) * 12];
    return [
      // big billowing smoke clouds that stay behind in the world
      c.sys(c.vol({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 22, shape: { type: 'circle', radius: 10 },
        speed: [20, 60], life: [0.8, 1.15], size: [28, 44], rotation: [0, 6.28], color: [smoke, '#d9d9de'],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 55), c.noise(1.2, 12), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.35], [0.35, 1], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      // a denser, darker core right at the tyre
      c.sys(c.vol({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 10, shape: { type: 'circle', radius: 6 },
        speed: [10, 40], life: [0.45, 0.65], size: [18, 26], rotation: [0, 6.28], color: '#bdbdc4',
        behaviors: [c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 0 })),
      // hot sparks flying off backward (they grow as they fly, so a new spark's tail stays short)
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 24, dir, offset: out, shape: { type: 'cone', radius: 6, angle: 0.45 },
        speed: [220, 420], life: [0.16, 0.3], size: [3, 6], color: [col, light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(1100), c.sizeOverLife(c.grow(0.3)), c.colorOverLife(c.fade(0.5))], order: 3 })),
      // glints flickering right at the wheel
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 12, shape: { type: 'circle', radius: 10 },
        life: [0.1, 0.16], size: [12, 22], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 }),
      // the hot glow at the tyre, flickering
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.2, bursts: [{ count: 1 }], life: 0.2, size: 50, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [0.5, 1.1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.9, 0.5], [0.6, 1]]))], order: 2 }),
    ];
  },
};
