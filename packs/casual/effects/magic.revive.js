/** A revive: a beam of holy light comes down, feathers drift, and sparkles rise from a ring at the feet. */
export default {
  name: 'magic.revive',
  category: 'magic',
  whenToUse: 'A character comes back to life or is fully restored: a resurrection, a revive item, a second chance, a respawn with blessing, an angel\'s blessing. Play it at the character\'s feet. For ordinary healing use magic.heal.',
  duration: 1.5, loop: false, anchor: 'feet', tint: '#fff1a8',
  tags: ['revive', 'resurrect', 'respawn', 'holy', 'angel', 'second chance', 'blessing', 'spell'],
  build(c) {
    const col = c.color('#fff1a8');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // the beam of light coming down (streaks trail back up, so they start low)
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: 3, cycle: 10, interval: 0.06 }], shape: { type: 'cone', radius: 26, angle: 0.02 }, offset: [0, 40],
        speed: [500, 700], life: [0.3, 0.4], size: [40, 56], color: col, stretch: { speed: 0.01, length: 2 },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.7, 0.2], [0, 1]]))], order: 1 }, 'down')),
      ring({ blend: 'add', bursts: [{ count: 1 }, { time: 0.3, count: 1 }], life: 0.8, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1.2]])), c.colorOverLife(c.fade(0.3))], order: 0 }),
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 24, duration: 0.9, shape: c.is3d ? { type: 'circle', radius: 50 } : { type: 'rect', w: 110, h: 0 },
        speed: 0, life: [0.6, 0.9], size: [10, 16], color: '#ffffff',
        behaviors: [c.force(0, 320), c.limitSpeed(220, 1), c.sizeOverLife(c.pop(0.2, 0.6))], order: 3 })),
      // feathers drifting down
      c.sys({ tex: 'leaf', blend: 'normal', bursts: [{ time: 0.15, count: [6, 8] }], shape: { type: 'rect', w: 160, h: 40, thickness: 1 }, offset: [0, 220],
        speed: 0, life: [1.0, 1.3], size: [12, 18], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.gravity(160), c.limitSpeed(90, 1), c.noise(1.5, 40), c.spin(-3, 3), c.colorOverLife(c.fade(0.7))], order: 2 }),
    ];
  },
};
