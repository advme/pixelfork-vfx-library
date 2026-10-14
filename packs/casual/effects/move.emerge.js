/** Bursting out of the ground: a column of dirt blasts upward, rocks and clods fly and fall back, dust rolls out along the floor and a dust ring spreads. */
export default {
  name: 'move.emerge',
  category: 'move',
  whenToUse: 'A monster, zombie, worm, mole or plant bursts up out of the ground: an enemy spawning from below, a sprout shooting up, a buried treasure or boss surfacing, the end of a move.dig tunnel. Play it on the ground at the spot. For a gentle pop-in use move.spawn; for an earth spell use magic.earth; for undead rising with ghost flames use magic.raise. Tint it for sand or snow.',
  duration: 0.9, loop: false, anchor: 'feet', tint: '#8a6a48',
  tags: ['emerge', 'burrow', 'rise', 'dirt', 'ground', 'zombie', 'sprout', 'spawn'],
  build(c) {
    const col = c.color('#8a6a48');
    const dust = c.lighten(col, 0.45);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const rolling = () => [c.speedOverLife(c.decel(0.05)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.25]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))];
    const side = (dir) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 7] }], shape: { type: 'cone', radius: 6, angle: 0.25 }, dir,
      speed: [180, 360], life: [0.45, 0.65], size: [24, 40], rotation: [0, 6.28], color: [dust, c.lighten(col, 0.3)], behaviors: rolling(), order: 1 });
    // dust rolling out along the floor: one ring of puffs in 3D, a puff cloud to each side in 2D
    const floorDust = c.is3d
      ? [c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [12, 15] }], shape: { type: 'circle', radius: 10, thickness: 0 },
          speed: [180, 340], life: [0.45, 0.65], size: [24, 40], rotation: [0, 6.28], color: [dust, c.lighten(col, 0.3)], behaviors: rolling(), order: 1 }))]
      : [side(0.12), side(Math.PI - 0.12)];
    return [
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.45, size: 170, color: dust,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 0 }),
      ...floorDust,
      // the dirt column blasting up out of the hole
      c.sys(c.spray({ tex: 'puff', blend: 'normal', bursts: [{ count: [8, 10] }, { time: 0.06, count: [3, 4] }], shape: { type: 'cone', radius: 14, angle: 0.35 }, dir: Math.PI / 2,
        speed: [160, 340], life: [0.6, 0.85], size: [28, 46], rotation: [0, 6.28], color: [c.lighten(col, 0.2), col],
        behaviors: [c.speedOverLife(c.decel(0.08)), c.gravity(120), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.85, 0.5], [0, 1]]))], order: 2 }, 'up')),
      // rocks and clods
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [10, 13] }], shape: { type: 'cone', radius: 12, angle: 0.55 }, dir: Math.PI / 2,
        speed: [320, 580], life: [0.55, 0.8], size: [8, 15], rotation: [0, 6.28], color: [col, c.darken(col, 0.35)],
        behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 3 }, 'up'), 'box')),
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [16, 22] }], shape: { type: 'cone', radius: 10, angle: 0.5 }, dir: Math.PI / 2,
        speed: [350, 680], life: [0.4, 0.65], size: [2, 5], color: c.darken(col, 0.2),
        behaviors: [c.gravity(1700), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
    ];
  },
};
