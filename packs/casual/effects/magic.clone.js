/** Clones appear: a flash on the hero, two light streaks split off to the sides, and a puff of smoke, a ring and sparkles where each copy pops in. */
export default {
  name: 'magic.clone',
  category: 'magic',
  whenToUse: 'A hero makes copies of itself: a shadow clone, a decoy or mirror image, an illusion skill, a hologram double in a MOBA or ninja game. Play it once on the hero; the two puffs appear about 60 px to each side, where the copies pop in. For one character vanishing or appearing use move.teleport; for summoning a creature use magic.summon.',
  duration: 0.7, loop: false, tint: '#b07cff',
  tags: ['clone', 'decoy', 'copy', 'mirror image', 'illusion', 'ninja', 'shadow clone', 'moba'],
  build(c) {
    const col = c.color('#b07cff');
    const light = c.lighten(col, 0.6);
    const X = 60;
    // a flat line exactly 2X wide, fired evenly with 2 particles: one at each end (-X and +X)
    const pair = { type: 'rect', w: X * 2, h: 0, even: true };
    const side = (x) => [
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.03, count: [6, 7] }], shape: { type: 'circle', radius: 16 }, offset: [x, 0],
        speed: [40, 140], life: [0.45, 0.65], size: [32, 48], rotation: [0, 6.28], color: [c.mix('#ffffff', col, 0.2), c.mix('#e9e4f2', col, 0.35)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 50), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.25]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.6, 0.5], [0, 1]]))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.08, count: [4, 5] }], shape: { type: 'circle', radius: 34 }, offset: [x, 0],
        speed: [20, 60], life: [0.4, 0.6], size: [10, 16], color: [light, '#ffffff'],
        behaviors: [c.force(0, 140), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 }),
    ];
    // a quick streak shooting from the hero toward one side
    const split = (d) => c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 2 }], shape: { type: 'cone', radius: 6, angle: 0.08 }, dir: d,
      speed: [480, 560], life: 0.12, size: [6, 8], color: '#ffffff', stretch: { speed: 0.012, length: 2 },
      behaviors: [c.colorOverLife(c.fade(0.5))], order: 3 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 140, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      split(0), split(Math.PI),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.04, count: 2 }], shape: pair, speed: 0, life: 0.2, size: 100, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.04, count: 2 }], shape: pair, speed: 0, life: 0.3, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      ...side(-X), ...side(X),
    ];
  },
};
