/** A railgun shot: a long straight beam appears at once with a white-hot core that fades fast, rings and sparkles swirl along it, a sharp muzzle flash. */
export default {
  name: 'weapon.railgun',
  category: 'weapon',
  whenToUse: 'A railgun, sniper beam, gauss rifle or charged hitscan shot fires and instantly reaches far (sci-fi shooters, space games, mech battles): play it at the barrel with dir in 2D (degrees, 0 = right, 90 = up) or direction in 3D; for a bolt that travels use weapon.laser, for a long beam held for half a second use magic.beam.',
  duration: 0.5, loop: false, tint: '#4fb8ff',
  tags: ['railgun', 'beam', 'sniper', 'hitscan', 'gauss', 'sci-fi', 'energy', 'weapon'],
  build(c) {
    const col = c.color('#4fb8ff');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    // The beam: one particle at the muzzle drifting slowly BACKWARD. A stretched sprite trails back from its
    // particle, so it reaches FORWARD from the muzzle, about size x length px long (520 px), from the first frame.
    const beam = (p) => c.sys(c.spray(Object.assign({ blend: 'add', dir, shape: { type: 'cone', radius: 0.1, angle: 0.001 }, speed: -20, bursts: [{ count: 1 }] }, p)));
    // Rings and sparkles: fired out along the beam at random speeds and braked hard, so in about 0.1 s they
    // settle spread along its whole length (travel = speed x life x 0.1).
    const along = (p) => c.sys(c.spray(Object.assign({ blend: 'add', dir, speed: [300, 10400], life: 0.5 }, p)));
    const brake = () => c.speedOverLife(c.curve([[0, 1], [0.2, 0], [1, 0]]));
    return [
      // the beam: a soft glow round a solid bar of colour and a white-hot core that is gone in 0.2 s
      // (a stretched disc is an even bar with tapered ends; a stretched glow is a soft spindle)
      beam({ tex: 'glow', life: 0.4, size: 60, color: col, stretch: { speed: 0.02, length: 8.6 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.35, 0.3], [0, 1]]))], order: 1 }),
      beam({ tex: 'disc', life: 0.3, size: 16, color: col, stretch: { speed: 0.02, length: 33 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.7, 0.4], [0, 1]]))], order: 2 }),
      beam({ tex: 'disc', life: 0.2, size: 7, color: '#ffffff', stretch: { speed: 0.02, length: 75 },
        behaviors: [c.colorOverLife(c.fade(0.3))], order: 3 }),
      // rings along the beam (seen side-on in 2D, so they cross it)
      along({ tex: c.is3d ? 'ring' : 'ellipse', bursts: [{ count: [9, 11] }], shape: { type: 'cone', radius: 0.1, angle: 0.001 },
        size: c.is3d ? [22, 30] : [36, 46], rotation: c.is3d ? 0 : dir + Math.PI / 2, color: light,
        behaviors: [brake(), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 1.5]])), c.colorOverLife(c.fade(0.25))], order: 4 }),
      // sparkles spiralling around the beam
      along({ tex: 'glow', bursts: [{ count: [20, 24] }], shape: { type: 'cone', radius: 20, thickness: 0, angle: 0.001 },
        size: [5, 9], color: ['#ffffff', light],
        behaviors: [brake(), c.orbit(11), c.sizeOverLife(c.curve([[0, 0.6], [0.25, 1], [1, 0]]))], order: 5 }),
      // muzzle flash and a few sparks kicked sideways
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.25, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.3))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 90, rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.shrink())], order: 6 }),
      c.sys(c.spray({ tex: 'glow', blend: 'add', world: true, dir, bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 3, angle: 0.75 },
        speed: [200, 450], life: [0.12, 0.25], size: [3, 5], color: light, stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 6 })),
    ];
  },
};
