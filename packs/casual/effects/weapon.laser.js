/** A laser shot: a bright bolt with a white-hot core zips away from a muzzle flash. */
export default {
  name: 'weapon.laser',
  category: 'weapon',
  whenToUse: 'A laser, blaster or energy bolt is fired in a shooter or shoot-em-up. Play it at the gun or ship nose; in 2D set dir (degrees: 90 = up for a vertical shooter, 0 = right), in 3D pass direction. It only shows the shot; for the hit use hit.bullet or hit.shieldzap.',
  duration: 0.45, loop: false, tint: '#ff3b6b',
  tags: ['laser', 'blaster', 'shot', 'shmup', 'space', 'energy', 'bolt', 'weapon', 'sci-fi'],
  build(c) {
    const col = c.color('#ff3b6b');
    const dir = c.dir === undefined ? 0 : c.dir;
    // a stretched sprite is about size x (length + speed x stretch.speed) long: here a ~150 px bolt
    const bolt = (p) => c.sys(c.spray(Object.assign({ tex: 'glow', blend: 'add', dir, shape: { type: 'cone', radius: 1, angle: 0.004 } }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.1, size: 64, color: c.lighten(col, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      bolt({ bursts: [{ count: 1 }], speed: 1500, life: 0.36, size: 26, color: col, stretch: { speed: 0.002, length: 3 },
        behaviors: [c.colorOverLife(c.fade(0.85))], order: 2 }),
      bolt({ bursts: [{ count: 1 }], speed: 1500, life: 0.36, size: 10, color: '#ffffff', stretch: { speed: 0.002, length: 12 },
        behaviors: [c.colorOverLife(c.fade(0.85))], order: 3 }),
      bolt({ world: true, bursts: [{ count: [4, 6] }], shape: { type: 'cone', radius: 2, angle: 0.25 }, speed: [150, 360], life: [0.12, 0.22], size: [3, 5], color: col,
        stretch: { speed: 0.02, length: 1.5 }, behaviors: [c.colorOverLife(c.fade(0.4))], order: 4 }),
    ];
  },
};
