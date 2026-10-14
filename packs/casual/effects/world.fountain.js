/** A fountain: a jet of water arcs up and splashes back down, with mist at the base. Loops until stopped. */
export default {
  name: 'world.fountain',
  category: 'world',
  whenToUse: 'A water fountain in a town square or garden, a geyser, a broken water pipe, a whale\'s spout, a magic spring. Play it at the nozzle and leave it running.',
  duration: 1, loop: true, anchor: 'feet', tint: '#7fc8ff',
  tags: ['fountain', 'water', 'geyser', 'spring', 'park', 'town', 'pipe', 'splash'],
  build(c) {
    const col = c.color('#7fc8ff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys(c.spray({ tex: 'drop', blend: 'normal', loop: true, world: true, rate: 46, shape: { type: 'cone', radius: 6, angle: 0.16 },
        speed: [380, 460], life: [0.75, 0.85], size: [8, 13], color: [col, light],
        behaviors: [c.gravity(1150), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.85))], order: 2 }, 'up')),
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, rate: 30, shape: { type: 'cone', radius: 3, angle: 0.05 },
        speed: [420, 470], life: [0.3, 0.38], size: [8, 12], color: '#ffffff', stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.gravity(1150), c.colorOverLife(c.fade(0.6))], order: 3 }, 'up')),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 10, shape: c.is3d ? { type: 'circle', radius: 60 } : { type: 'rect', w: 130, h: 0 },
        speed: [5, 20], life: [0.6, 0.9], size: [20, 32], rotation: [0, 6.28], color: '#f2fbff',
        behaviors: [c.force(0, 40), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.4]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0, 1]]))], order: 1 })),
    ];
  },
};
