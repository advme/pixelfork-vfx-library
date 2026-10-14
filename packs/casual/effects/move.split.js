/** A cell splits in two: a pinch flash and ring, two glowing halves popping apart along a line, and droplets flung out. */
export default {
  name: 'move.split',
  category: 'move',
  whenToUse: 'A cell, slime or blob splits in two: splitting in agar.io-style games, a slime enemy dividing, a clone or mitosis moment; play it where the split happens and aim it along the split line (dir in degrees in 2D, default left-right; direction: [x, y, z] in 3D), tinted with the cell\'s colour. For a ball splitting into several use pickup.multiball; for a character cloning by magic use magic.clone.',
  duration: 0.42, loop: false, tint: '#4fb8ff',
  tags: ['split', 'divide', 'cell', 'agar', 'io', 'slime', 'clone', 'mitosis'],
  build(c) {
    const dir = c.dir === undefined ? 0 : c.dir;
    const col = c.color('#4fb8ff');
    const light = c.lighten(col, 0.55);
    // fast apart, then they ease to a stop
    const apart = () => c.speedOverLife(c.curve([[0, 1], [0.35, 0.15], [1, 0]]));
    // one half: every part shares the same straight path. Both halves use the same cone; the back half has a
    // negative speed, so it flies the other way, also in 3D when the game gives a direction
    const half = (sign, p) => c.sys(c.spray(Object.assign({ bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0.5, angle: 0.001 }, dir,
      speed: sign * 480, life: 0.42 }, p)));
    const halves = (sign) => [
      half(sign, { tex: 'glow', blend: 'add', size: 70, color: col,
        behaviors: [apart(), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1.1], [0.4, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.4))], order: 2 }),
      half(sign, { tex: 'ring', blend: 'add', size: 46, color: light,
        behaviors: [apart(), c.sizeOverLife(c.curve([[0, 0.6], [0.2, 1.2], [0.5, 1], [1, 1.1]])), c.colorOverLife(c.fade(0.35))], order: 3 }),
      half(sign, { tex: 'glow', blend: 'add', size: 34, color: '#ffffff',
        behaviors: [apart(), c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.15))], order: 4 }),
    ];
    // droplets flung forward or back along the split
    const drops = (sign) => c.sys(c.spray({ tex: 'disc', blend: 'add', bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 4, angle: 0.55 }, dir,
      speed: sign > 0 ? [180, 340] : [-340, -180], life: [0.26, 0.38], size: [7, 12], color: [col, light],
      behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.shrink())], order: 5 }));
    return [
      // the pinch where it splits
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 100, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      ...halves(1),
      ...halves(-1),
      drops(1),
      drops(-1),
      // a few droplets squeezed out all round the pinch
      c.sys(c.vol({ tex: 'disc', blend: 'add', bursts: [{ count: [4, 6] }], shape: { type: 'circle', radius: 6 },
        speed: [80, 160], life: [0.22, 0.32], size: [6, 9], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.shrink())], order: 5 })),
    ];
  },
};
