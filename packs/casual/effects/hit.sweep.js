/** A low sweep: a bright swoosh arc whips round at ankle height, a ring flashes on the floor and dust and grit roll out both ways. */
export default {
  name: 'hit.sweep',
  category: 'hit',
  whenToUse: 'A low sweeping kick, a leg sweep, a tail swipe or a spinning low attack along the floor that trips enemies; play it on the ground at the attacker\'s feet (dir: 0 sweeps to the right, 180 to the left), and for a hard slam straight down use hit.heavy (for sweeping with a broom, move.sweep).',
  duration: 0.55, loop: false, anchor: 'feet', tint: '#ffffff',
  tags: ['sweep', 'leg sweep', 'tail swipe', 'low kick', 'trip', 'spin', 'fighting', 'martial arts'],
  build(c) {
    const col = c.color('#ffffff');
    const dust = '#e3d4bc';
    const dir = c.dir === undefined ? 0 : c.dir;
    const side = Math.cos(dir) < 0 ? -1 : 1;
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const puffLife = () => [c.speedOverLife(c.decel(0.05)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.2]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))];
    const segLife = () => [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.3)), c.sizeOverLife(c.curve([[0, 0.8], [0.3, 1], [1, 0.3]]))];
    let sweep;
    if (c.is3d) {
      // 3D: the arc itself, laid down point by point on the floor while it whips round the FRONT of the feet
      // (the side facing a default camera): it starts on the sweep's far side and orbits toward `side`.
      // A negative radius starts it on the left (-x) for a sweep to the right; positive starts it on the right.
      const arcR = -62 * side;
      sweep = [
        c.sys(c.ground({ tex: 'glow', blend: 'add', bursts: [{ count: 1, cycle: 14, interval: 0.012 }], shape: { type: 'circle', radius: arcR, thickness: 0, arc: 0.01 }, offset: [0, 12],
          speed: 0, life: 0.22, size: 30, color: col,
          behaviors: [c.orbit(16 * side), c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 3 })),
        c.sys(c.ground({ tex: 'disc', blend: 'add', bursts: [{ count: 1, cycle: 14, interval: 0.012 }], shape: { type: 'circle', radius: arcR, thickness: 0, arc: 0.01 }, offset: [0, 12],
          speed: 0, life: 0.2, size: 9, color: '#ffffff',
          behaviors: [c.orbit(16 * side), c.sizeOverLife(c.curve([[0, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.2))], order: 4 })),
        // speed lines skimming outward over the floor from the sweep's circle (streaks trail back, so they start
        // out on the circle instead of at the feet, where their tails would cross the centre)
        c.sys(c.ground({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 58, thickness: 0 }, offset: [0, 8],
          speed: [500, 800], life: [0.13, 0.2], size: [5, 8], color: col, stretch: { speed: 0.007, length: 1.5 },
          behaviors: [c.speedOverLife(c.decel(0.25)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 2 })),
        c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 16, thickness: 0 }, offset: [0, 12],
          speed: [200, 360], life: [0.4, 0.55], size: [30, 46], rotation: [0, 6.28], color: [dust, c.darken(dust, 0.12)], behaviors: puffLife(), order: 1 })),
      ];
    } else {
      // 2D: a smile-shaped swoosh along the front of the sweep's circle (a flat ellipse round the feet),
      // drawn segment by segment in the sweep's direction, thickest in the middle
      sweep = [];
      for (let i = 0; i < 9; i++) {
        const th = Math.PI + 0.3 + (i / 8) * (Math.PI - 0.6);
        const a = Math.atan2(20 * Math.cos(th), -95 * Math.sin(th) * side);
        const size = 10 + 10 * Math.sin(Math.PI * (i + 0.5) / 9);
        // streaks trail back from their particle: each starts half a segment ahead so it sits on the curve
        const ahead = size * 2;
        sweep.push(c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: i * 0.012, count: 2 }], shape: { type: 'cone', radius: 1, angle: 0.01 }, dir: a,
          offset: [95 * Math.cos(th) * side + Math.cos(a) * ahead, 16 + 20 * Math.sin(th) + Math.sin(a) * ahead],
          speed: [260, 300], life: 0.16, size, color: col, stretch: { speed: 0.004, length: 3 }, behaviors: segLife(), order: 3 }));
      }
      // dust rolling out along the ground to both sides
      [0.12, Math.PI - 0.12].forEach((d) => sweep.push(c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'cone', radius: 6, angle: 0.2 }, dir: d, offset: [0, 8],
        speed: [200, 380], life: [0.4, 0.55], size: [32, 48], rotation: [0, 6.28], color: [dust, c.darken(dust, 0.12)], behaviors: puffLife(), order: 1 })));
    }
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 120, offset: [0, 12], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 0 }),
      // the sweep's circle round the feet: an ellipse in 2D, a ring on the floor in 3D
      ring({ blend: 'add', bursts: [{ time: 0.04, count: 1 }], life: 0.3, size: 230, offset: c.is3d ? undefined : [0, 14], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.4, 0.95], [1, 1.05]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.4], [0, 1]]))], order: 2 }),
      ...sweep,
      // grit kicked up (an explicit dir: a cone without one would follow the game's sweep dir sideways)
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 30, angle: 0.8 }, dir: Math.PI / 2,
        speed: [200, 360], life: [0.25, 0.35], size: [4, 6], color: c.darken(dust, 0.4),
        behaviors: [c.gravity(1300), c.colorOverLife(c.fade(0.6))], order: 2 })),
    ];
  },
};
