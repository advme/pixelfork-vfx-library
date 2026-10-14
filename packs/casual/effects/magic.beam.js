/** An energy beam: power gathers at the hands, then a thick bright beam blasts forward for half a second. */
export default {
  name: 'magic.beam',
  category: 'magic',
  whenToUse: 'A charged beam attack: a kamehameha, a laser cannon, a mana beam, a dragon\'s ray, a mech\'s energy blast. Play it at the hands or barrel; in 2D set dir (degrees, 0 = right), in 3D pass direction. It charges for 0.25 s, fires for 0.5 s.',
  duration: 1.0, loop: false, tint: '#5cd6ff',
  tags: ['beam', 'laser', 'charge', 'blast', 'energy', 'kamehameha', 'ray', 'spell'],
  build(c) {
    const col = c.color('#5cd6ff');
    const light = c.lighten(col, 0.6);
    const dir = c.dir === undefined ? 0 : c.dir;
    // a burst every 25 ms from 0.25 s to 0.75 s: a continuous stream
    const stream = (count) => [{ time: 0.25, count, cycle: 20, interval: 0.025 }];
    const beam = (p) => c.sys(c.spray(Object.assign({ tex: 'glow', blend: 'add', dir, shape: { type: 'cone', radius: 2, angle: 0.01 } }, p)));
    return [
      // charge: power gathers
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.8, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.3, 1], [0.9, 1.1], [1, 0]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [1, 0.3], [1, 0.9], [0, 1]]))], order: 1 }),
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 18] }], shape: { type: 'circle', radius: 70, thickness: 0 },
        speed: [-300, -260], life: [0.22, 0.25], size: [5, 8], color: light, stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.8, 1], [1, 0]]))], order: 2 })),
      // the beam
      beam({ bursts: stream(2), speed: 1800, life: 0.24, size: [44, 54], color: col, stretch: { speed: 0.004, length: 2 },
        behaviors: [c.colorOverLife(c.fade(0.7))], order: 3 }),
      beam({ bursts: stream(2), speed: 1800, life: 0.24, size: [16, 20], color: '#ffffff', stretch: { speed: 0.004, length: 4 },
        behaviors: [c.colorOverLife(c.fade(0.7))], order: 4 }),
      beam({ bursts: stream(1), shape: { type: 'cone', radius: 6, angle: 0.08 }, speed: [500, 900], life: [0.2, 0.35], size: [3, 6], color: light,
        stretch: { speed: 0.01, length: 1.5 }, behaviors: [c.colorOverLife(c.fade(0.5))], order: 5 }),
    ];
  },
};
