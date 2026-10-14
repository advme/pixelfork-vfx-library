/** Something gets built: a ring of dust bursts along the ground, planks and hammer sparks fly, sparkles rise when it is done. */
export default {
  name: 'world.build',
  category: 'world',
  whenToUse: 'A building, wall, tower, furniture or block is placed or finishes construction: base building, city builders, sandbox and voxel games, tower defense placement, an upgrade completing. Play it at the base of the new thing; size it to the building (size 2 for a house).',
  duration: 1.0, loop: false, anchor: 'feet', tint: '#d9b27c',
  tags: ['build', 'construct', 'place', 'building', 'base', 'sandbox', 'tower', 'upgrade', 'craft'],
  build(c) {
    const col = c.color('#d9b27c');
    return [
      // dust ring rolling out along the ground
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [12, 14] }], shape: c.is3d ? { type: 'circle', radius: 30, thickness: 0, even: true } : { type: 'circle', radius: 30, thickness: 0, arc: Math.PI, even: true },
        speed: [140, 200], life: [0.55, 0.75], size: [34, 52], rotation: [0, 6.28], color: c.lighten(col, 0.45),
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 20), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 20, angle: 0.7 },
        speed: [260, 460], life: [0.55, 0.8], size: [7, 12], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 2 }, 'up'), 'plank')),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 12] }, { time: 0.12, count: [5, 7] }], shape: { type: 'circle', radius: 20, thickness: 0 },
        speed: [250, 500], life: [0.2, 0.35], size: [3, 6], color: ['#ffffff', '#ffc75a'],
        stretch: { speed: 0.02, length: 1.5 }, behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // done: sparkles float up
      c.sys(c.ground({ tex: 'star', blend: 'add', bursts: [{ time: 0.25, count: [8, 10] }], shape: { type: 'circle', radius: 40 },
        speed: 0, life: [0.55, 0.75], size: [10, 16], rotation: [0, 6.28], color: '#fff3c4',
        behaviors: [c.force(0, 260), c.limitSpeed(180, 1), c.spin(-3, 3), c.sizeOverLife(c.pop(0.2, 0.55))], order: 4 })),
    ];
  },
};
