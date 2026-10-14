/** A fire hit: a burst of flame on impact, embers flying out and a puff of smoke. */
export default {
  name: 'hit.fire',
  category: 'hit',
  whenToUse: 'A fire attack lands: a flaming sword, a fire punch, a fire arrow hit, a burn damage tick, touching lava. Play it on the target. For a fireball exploding use explosion.fireball; for staying on fire use state.burning.',
  duration: 0.65, loop: false, tint: '#ff7a1f',
  tags: ['fire', 'burn', 'flame', 'hot', 'ember', 'scorch', 'hit'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 140, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys(c.vol({ tex: 'flame', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 12 },
        speed: [80, 200], life: [0.3, 0.45], size: [26, 40], rotation: [-0.4, 0.4], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 220), c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 2 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [12, 16] }], shape: { type: 'circle', radius: 8, thickness: 0 },
        speed: [200, 450], life: [0.3, 0.55], size: [3, 6], color: [light, '#ffd27a'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(400), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 3 })),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.1, count: [3, 4] }], shape: { type: 'circle', radius: 12 },
        speed: [20, 60], life: [0.45, 0.6], size: [24, 36], rotation: [0, 6.28], color: '#4a4a4a',
        behaviors: [c.force(0, 90), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.5, 0.3], [0, 1]]))], order: 1 })),
    ];
  },
};
