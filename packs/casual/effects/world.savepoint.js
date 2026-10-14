/** A save point: a glowing ring on the ground breathing slowly, a soft column of light and motes rising inside it, twinkles drifting up from the ring. Loops until stopped. */
export default {
  name: 'world.savepoint',
  category: 'world',
  whenToUse: 'A save point, rest spot, respawn pad or healing station that stays active in an RPG, platformer or adventure level; play it on the ground at the spot and leave it running, play reward.checkpoint once when the player actually saves or touches it, and use world.beacon for a "go here" objective marker.',
  duration: 2, loop: true, anchor: 'feet', tint: '#6fd6ff',
  tags: ['save', 'save point', 'checkpoint', 'respawn', 'rest', 'rpg', 'platformer', 'glow'],
  build(c) {
    const col = c.color('#6fd6ff');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const breathe = (lo, hi) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[lo, 0], [hi, 0.5], [lo, 1]]));
    const base = c.is3d ? { type: 'circle', radius: 42 } : { type: 'rect', w: 96, h: 0 };
    return [
      // the ring on the ground and its softer inner twin
      ring({ blend: 'add', loop: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.97], [0.5, 1.03], [1, 0.97]])), breathe(0.7, 1)], order: 1 }),
      ring({ blend: 'add', loop: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: 96, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.03], [0.5, 0.95], [1, 1.03]])), breathe(0.55, 0.3)], order: 1 }),
      // a pool of light on the floor (3D) / a soft glow over the spot (2D)
      c.is3d
        ? c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: 140, color: col, behaviors: [breathe(0.3, 0.45)], order: 0 }))
        : c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: 150, offset: [0, 30], color: col, behaviors: [breathe(0.22, 0.35)], order: 0 }),
      // a soft column of light: big faint glows rising and fading
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 8, shape: base,
        speed: 0, life: [1.2, 1.6], size: [26, 40], color: col,
        behaviors: [c.force(0, 120), c.limitSpeed(70, 1), c.sizeOverLife(c.curve([[0, 0.6], [1, 1.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.3, 0.25], [0.2, 0.6], [0, 1]]))], order: 2 })),
      // bright motes floating up inside it
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 10, shape: base,
        speed: 0, life: [1.2, 1.7], size: [3, 6], color: [light, '#ffffff'],
        behaviors: [c.force(0, 90), c.limitSpeed(60, 1), c.noise(1, 14), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]))], order: 3 })),
      // twinkles lifting off the ring, circling it slowly in 3D
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: c.is3d ? { type: 'circle', radius: 62, thickness: 0 } : { type: 'rect', w: 124, h: 0 },
        speed: 0, life: [0.8, 1.1], size: [9, 14], rotation: [0, 0.8], color: light,
        behaviors: (c.is3d ? [c.orbit(1.2)] : []).concat([c.force(0, 60), c.limitSpeed(40, 1), c.sizeOverLife(c.pop(0.25, 0.5))]), order: 4 })),
    ];
  },
};
