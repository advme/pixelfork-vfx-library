/** An enemy spawn rift: a dark hole on the ground ringed with red light, rings sucking inward, lights swirling and embers rising. Loops until stopped. */
export default {
  name: 'world.spawnportal',
  category: 'world',
  whenToUse: 'The place enemies come out of in tower defense, wave survival or horde games: an enemy spawn point, a demon rift, a monster gate on the ground. Play it on the ground at the spawn and leave it running; play move.spawn as each enemy appears. For a friendly portal, warp gate or level exit use magic.portal.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#ff2a3a',
  tags: ['spawn', 'rift', 'enemy', 'portal', 'tower defense', 'waves', 'gate', 'demon'],
  build(c) {
    const col = c.color('#ff2a3a');
    const light = c.lighten(col, 0.5);
    const dark = c.darken(col, 0.85);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const breathe = (lo, hi) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[lo, 0], [hi, 0.5], [lo, 1]]));
    // each one lives a little past its cycle and cross-fades into the next, so the dark hole never blinks
    const hole = (p) => Object.assign({ tex: 'glow', blend: 'normal', loop: true, duration: 1.2, life: 1.26, color: dark,
      behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.05], [0.9, 0.95], [0, 1]]))], order: 0 }, p);
    return [
      // the dark hole: one dark disc lying on the floor in 3D; in 2D a flat row of dark glows inside the rim (a single
      // round glow would stand up like a dark ball). even on a flat rect places the 8 at x = -50, -25, 0, 25, 50, the inner three twice
      c.is3d ? c.sys(c.flat(hole({ bursts: [{ count: 1 }], size: 160 })))
        : c.sys(hole({ bursts: [{ count: 8 }], shape: { type: 'rect', w: 100, h: 0, even: true }, speed: 0, size: 40, color: c.darken(col, 0.75) })),
      // a red glow hanging over it
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 150, offset: [0, 25], color: col,
        behaviors: [breathe(0.28, 0.45)], order: 1 }),
      // the rim, breathing
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.97], [0.5, 1.03], [1, 0.97]])), breathe(0.75, 1)], order: 2 }),
      // rings sucked in toward the middle
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }, { time: 0.6, count: 1 }], life: 1.2, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.15]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.85, 0.2], [0.6, 0.75], [0, 1]]))], order: 2 }),
      // 3D: lights swirling down into the hole along the floor
      c.is3d ? c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 30, shape: { type: 'circle', radius: 78, thickness: 0 },
        speed: -45, life: [0.8, 1.1], size: [8, 14], color: [light, col],
        behaviors: [c.orbit(3), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.5))], order: 3 })) : null,
      // crimson flames licking up around the rim
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 16, shape: c.is3d ? { type: 'circle', radius: 68, thickness: 0 } : { type: 'rect', w: 140, h: 0 },
        speed: 0, life: [0.4, 0.6], size: [22, 34], rotation: [-0.15, 0.15], color: [col, c.darken(col, 0.3)],
        behaviors: [c.force(0, 320), c.limitSpeed(150, 1), c.noise(3, 8), c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // embers rising out of the rift
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: c.is3d ? 18 : 26, shape: c.is3d ? { type: 'circle', radius: 55 } : { type: 'rect', w: 120, h: 0 },
        speed: 0, life: [0.7, 1.0], size: [4, 7], color: [light, col], stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.force(0, 420), c.limitSpeed(230, 1), c.noise(2, 12), c.colorOverLife(c.fade(0.5))], order: 4 })),
    ].filter(Boolean);
  },
};
