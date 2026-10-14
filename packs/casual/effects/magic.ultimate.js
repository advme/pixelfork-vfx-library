/** An ultimate going off: a huge white-gold flash, god rays and light beams bursting out, three rings and a ground wave rolling out, then sparks and stars raining down. */
export default {
  name: 'magic.ultimate',
  category: 'magic',
  whenToUse: 'A hero\'s ultimate ability goes off: the big ult in a MOBA or hero shooter, a super move, a limit break, a final smash, a screen-wide special. Play it on the hero (or where the ult lands). Bigger and longer than any hit; for an explosion with fire and smoke use explosion.big or explosion.nuke, for a level-up use reward.levelup.',
  duration: 1.55, loop: false, tint: '#ffcf3a',
  tags: ['ultimate', 'ult', 'super', 'limit break', 'special', 'epic', 'moba', 'ability'],
  build(c) {
    const col = c.color('#ffcf3a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 1.2, size: 320, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.45, 0.3], [0, 1]]))], order: 0 }),
      // god rays turning slowly behind everything
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 1.1, size: 440, rotation: [0, 0.8], color: col,
        behaviors: [c.spin(0.5), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 1.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.8, 0.12], [0.6, 0.6], [0, 1]]))], order: 1 }),
      ring({ blend: 'add', bursts: [{ time: 0.05, count: 1 }], life: 0.7, size: 560, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.25))], order: 1 }),
      // three rings one after another
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.15, count: 1 }, { time: 0.3, count: 1 }], life: 0.6, size: 440, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // beams of light shooting out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: 14 }], shape: { type: 'circle', radius: 20, thickness: 0, even: true },
        speed: 900, life: 0.4, size: 24, color: light, stretch: { speed: 0.004, length: 3 },
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0.6], [0.2, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 3 })),
      // sparks and stars thrown up, falling back
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [40, 46] }], shape: { type: 'circle', radius: 30 },
        speed: [300, 650], life: [1.0, 1.4], size: [5, 8], color: [light, '#ffffff'], stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.gravity(700), c.colorOverLife(c.fade(0.6))], order: 4 })),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [12, 14] }], shape: { type: 'circle', radius: 20 },
        speed: [250, 480], life: [1.1, 1.4], size: [12, 18], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.gravity(600), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.1, 1], [0.8, 1], [1, 0]]))], order: 5 })),
      // a rain of sparkles from above
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.2, count: 3, cycle: 14, interval: 0.03 }], shape: { type: 'rect', w: 340, h: 0 }, offset: [0, 230],
        speed: 0, life: [0.8, 1.0], size: [10, 16], color: [light, '#ffffff'],
        behaviors: [c.gravity(500), c.limitSpeed(320, 1), c.sizeOverLife(c.pop(0.15, 0.7))], order: 5 }),
      // the huge flash on top
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 400, color: '#fff8e0',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 6 }),
    ];
  },
};
