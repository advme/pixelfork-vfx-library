/** A spent bullet casing flips out of the gun, tumbling, with a puff of smoke from the port. */
export default {
  name: 'weapon.shell',
  category: 'weapon',
  whenToUse: 'A gun ejects a spent casing after a shot (pair it with weapon.muzzle on every shot of a pistol, rifle or shotgun). Play it at the ejection port on the side of the gun; in 2D set dir (degrees) for the side the casing flies to.',
  duration: 0.9, loop: false, tint: '#d8b04a',
  tags: ['shell', 'casing', 'brass', 'gun', 'shot', 'fps', 'shooter', 'weapon'],
  build(c) {
    const col = c.color('#d8b04a');
    const dir = c.dir === undefined ? Math.PI / 3 : c.dir;
    return [
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: 1 }], dir, shape: { type: 'cone', radius: 1, angle: 0.25 },
        speed: [200, 280], life: [0.7, 0.85], size: [5, 6], rotation: [0, 6.28], color: [col, c.lighten(col, 0.3)],
        behaviors: [c.gravity(1500), c.spin(-18, 18), c.colorOverLife(c.fade(0.85))], order: 2 }), 'plank')),
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [1, 2] }], shape: { type: 'circle', radius: 3 },
        speed: [10, 30], life: [0.3, 0.45], size: [10, 16], rotation: [0, 6.28], color: '#c8c8c8',
        behaviors: [c.force(0, 50), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0, 1]]))], order: 1 }),
    ];
  },
};
