/** Earth spikes: rock spikes burst up out of the ground, with dust and flying gravel, then sink back. */
export default {
  name: 'magic.earth',
  category: 'magic',
  whenToUse: 'An earth or rock spell: stone spikes erupting, a quake attack, ground rising, a golem stomp, a trap of spikes. Play it on the ground where it erupts.',
  duration: 1.1, loop: false, anchor: 'feet', tint: '#9c7a5a',
  tags: ['earth', 'rock', 'spikes', 'stone', 'quake', 'ground', 'golem', 'spell'],
  build(c) {
    const col = c.color('#9c7a5a');
    // 3D: solid upright spikes in a ring; 2D: spike sprites in a row along the ground
    const spikes = Object.assign({ tex: 'shard', blend: 'normal', bursts: [{ count: 7 }], speed: 0, life: [0.85, 1.0], size: [36, 54], color: [col, c.darken(col, 0.25)], order: 2,
      shape: c.is3d ? { type: 'circle', radius: 56, thickness: 0, even: true } : { type: 'rect', w: 170, h: 0 }, offset: c.is3d ? undefined : [0, 18],
      behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.1, 1.15], [0.18, 1], [0.75, 1], [1, 0]]))] }, c.is3d ? { render: 'mesh', geo: 'shard', upright: true } : {});
    return [
      c.sys(c.ground(spikes)),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [10, 12] }], shape: c.is3d ? { type: 'circle', radius: 56, thickness: 0 } : { type: 'rect', w: 180, h: 0 },
        speed: [30, 90], life: [0.6, 0.8], size: [30, 46], rotation: [0, 6.28], color: c.lighten(col, 0.4),
        behaviors: [c.force(0, 60), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.5, 0.5], [0, 1]]))], order: 1 })),
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'cone', radius: 40, angle: 0.6 },
        speed: [250, 480], life: [0.5, 0.75], size: [6, 11], rotation: [0, 6.28], color: [col, c.darken(col, 0.35)],
        behaviors: [c.gravity(1600), c.spin(-10, 10), c.colorOverLife(c.fade(0.7))], order: 3 }, 'up'), 'box')),
    ];
  },
};
