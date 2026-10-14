/** A bass drop: a deep purple glow thumps twice, heavy low rings roll out across the floor, light dots bounce up off the ground and streaks shoot out. */
export default {
  name: 'explosion.bass',
  category: 'explosion',
  whenToUse: 'A bass drop or a heavy blast of sound: the drop in a music or rhythm game, a subwoofer or speaker blast, a DJ\'s power move, a beat that shakes the dance floor, a sound-based attack. Play it at the centre (it rolls out along the floor in 3D). For a pure energy blast use explosion.shockwave.',
  duration: 0.85, loop: false, tint: '#9b4dff',
  tags: ['bass', 'drop', 'subwoofer', 'speaker', 'music', 'rhythm', 'sound wave', 'explosion'],
  build(c) {
    const col = c.color('#9b4dff');
    const light = c.lighten(col, 0.55);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const out = () => c.sizeOverLife(c.curve([[0, 0.08], [0.3, 0.7], [1, 1]]));
    const drop = [{ count: 1 }, { time: 0.26, count: 1 }];
    return [
      // the deep purple glow, thumping twice
      c.sys({ tex: 'glow', blend: 'add', bursts: drop, life: 0.5, size: 320, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#ffffff', 0], ['#ffffff', 1]], [[0.7, 0], [0.45, 0.3], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 150, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      // heavy low rings rolling out along the floor, one per thump
      ring({ blend: 'add', bursts: drop, life: 0.6, size: 480, color: col,
        behaviors: [out(), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 300, color: light,
        behaviors: [out(), c.colorOverLife(c.fade(0.1))], order: 2 }),
      // light dots bouncing up off the ground with each thump
      c.sys(c.spray({ tex: 'disc', blend: 'add', bursts: [{ count: [12, 14] }, { time: 0.26, count: [8, 10] }], shape: { type: 'cone', radius: 60, angle: 0.35 }, dir: Math.PI / 2,
        speed: [220, 420], life: [0.45, 0.6], size: [7, 12], color: [col, light],
        behaviors: [c.gravity(1400), c.sizeOverLife(c.curve([[0, 0.4], [0.15, 1], [0.8, 1], [1, 0]])), c.colorOverLife(c.fade(0.7))], order: 3 }, 'up')),
      // streaks shooting out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [14, 16] }], shape: { type: 'circle', radius: 12, thickness: 0 },
        speed: [420, 650], life: [0.22, 0.32], size: [4, 6], color: [light, '#ffffff'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.25)), c.colorOverLife(c.fade(0.4))], order: 4 })),
    ];
  },
};
