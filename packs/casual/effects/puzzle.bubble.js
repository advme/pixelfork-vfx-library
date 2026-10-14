/** A bubble pops: its rim snaps outward and vanishes, glints fly off and tiny droplets scatter. */
export default {
  name: 'puzzle.bubble',
  category: 'puzzle',
  whenToUse: 'A bubble pops: a bubble shooter match, a balloon popped, a soap bubble tapped, a slime ball burst, a pop-it toy. Play it on each bubble; tint it with the bubble\'s colour. Cheap enough for many at once.',
  duration: 0.45, loop: false, tint: '#5cd6ff',
  tags: ['bubble', 'pop', 'balloon', 'bubble shooter', 'soap', 'puzzle', 'burst'],
  build(c) {
    const col = c.color('#5cd6ff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 70, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [1, 1.5]])), c.colorOverLife(c.fade(0.1))], order: 2 }),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 26, thickness: 0, even: true },
        speed: [120, 220], life: [0.25, 0.4], size: [4, 7], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(500), c.sizeOverLife(c.shrink())], order: 1 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [3, 4] }], shape: { type: 'circle', radius: 20 },
        speed: [60, 140], life: [0.2, 0.3], size: [10, 14], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.4))], order: 3 })),
      c.sys(c.vol({ tex: 'ring', blend: 'add', bursts: [{ count: [2, 3] }], shape: { type: 'circle', radius: 14 },
        speed: [40, 90], life: [0.3, 0.42], size: [8, 12], color: light,
        behaviors: [c.force(0, 120), c.sizeOverLife(c.curve([[0, 0.4], [0.8, 1], [1, 0]]))], order: 0 })),
    ];
  },
};
