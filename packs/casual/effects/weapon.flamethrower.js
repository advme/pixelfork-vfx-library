/** A flamethrower: a roaring cone of fire pouring forward, licking out wider as it goes, with smoke. Loops until stopped. */
export default {
  name: 'weapon.flamethrower',
  category: 'weapon',
  whenToUse: 'A continuous stream of fire: a flamethrower, a dragon\'s breath, a fire hose of magic, a burning jet from a pipe. Play it at the nozzle or mouth; in 2D set dir (degrees), in 3D pass direction and keep it aimed with handle.aim(v). Stop it when the fire stops.',
  duration: 1, loop: true, tint: '#ff7a1f',
  tags: ['flamethrower', 'fire', 'breath', 'dragon', 'stream', 'burn', 'flame', 'weapon'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    return [
      c.sys(c.spray({ tex: 'flame', blend: 'add', loop: true, world: true, rate: 60, dir, shape: { type: 'cone', radius: 4, angle: 0.18 },
        speed: [420, 560], life: [0.35, 0.5], size: [16, 26], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.35)), c.force(0, 120), c.noise(3, 12), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1.6], [1, 2.4]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.8, 0.5], [0, 1]]))], order: 2 })),
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, rate: 40, dir, shape: { type: 'cone', radius: 2, angle: 0.08 },
        speed: [450, 560], life: [0.08, 0.14], size: [16, 22], color: '#fff2c4',
        behaviors: [c.sizeOverLife(c.shrink())], order: 3 })),
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 10, dir, shape: { type: 'cone', radius: 6, angle: 0.25 },
        speed: [260, 360], life: [0.8, 1.1], size: [24, 36], rotation: [0, 6.28], color: '#3d3d3d',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 70), c.sizeOverLife(c.curve([[0, 0.5], [1, 2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0, 0.3], [0.45, 0.5], [0, 1]]))], order: 1 })),
    ];
  },
};
