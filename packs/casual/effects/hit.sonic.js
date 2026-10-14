/** A sonic boom: a white flash, several sharp rings snapping out one after another, air streaks and a ring of vapour. */
export default {
  name: 'hit.sonic',
  category: 'hit',
  whenToUse: 'A shockwave punch, sonic boom, air blast, shout or roar attack, sound-wave cannon or super-speed impact that pushes the air out in rings; play it at the point of impact, and for a heavy blow on the ground use hit.heavy instead.',
  duration: 0.4, loop: false, tint: '#9fe6ff',
  tags: ['sonic', 'shockwave', 'boom', 'air blast', 'sound wave', 'roar', 'punch', 'impact'],
  build(c) {
    const col = c.color('#9fe6ff');
    const light = c.lighten(col, 0.7);
    const rings = () => [c.sizeOverLife(c.curve([[0, 0.08], [0.4, 0.75], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [0.5, 0.45], [0, 1]]))];
    return [
      // a ring of vapour pushed out by the blast
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: 10 }], shape: { type: 'circle', radius: 20, thickness: 0, even: true },
        speed: [320, 400], life: [0.26, 0.34], size: [22, 30], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.08)), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.4, 0], [0.25, 0.5], [0, 1]]))], order: 0 }),
      // concentric rings, white and coloured in turn, each snapping out fast
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.08, count: 1 }], life: 0.26, size: 210, color: '#ffffff', behaviors: rings(), order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.04, count: 1 }, { time: 0.12, count: 1 }], life: 0.24, size: 165, color: col, behaviors: rings(), order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 140, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 130, rotation: 0.4, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      // air streaks rushing out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 16, thickness: 0 },
        speed: [800, 1200], life: [0.12, 0.18], size: [4, 6], color: [light, '#ffffff'],
        stretch: { speed: 0.012, length: 2 },
        behaviors: [c.speedOverLife(c.decel(0.25)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 4 })),
    ];
  },
};
