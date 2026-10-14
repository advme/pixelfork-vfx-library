/** A wet shake: water flings off in quick left-right-left-right pulses, streaky droplets fly out all round, drips fall and a fine mist glints. */
export default {
  name: 'move.shake',
  category: 'move',
  whenToUse: 'A wet animal shakes itself dry: a dog out of a bath or a lake, a duck fluffing off water, a pet caught in the rain, a character shaking off water or snow. Play it on the body; tint it brown for mud or white for snow. For staying wet over time use state.wet; for jumping into water use move.splash.',
  duration: 0.8, loop: false, tint: '#5cc8ff',
  tags: ['shake', 'wet', 'dry off', 'dog', 'pet', 'water', 'droplets', 'bath'],
  build(c) {
    const col = c.color('#5cc8ff');
    const light = c.lighten(col, 0.5);
    // streaky droplets flung off the coat: one pulse to each side in turn (in 3D every pulse goes all round)
    const fling = (dir, times) => c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: times.map((time) => ({ time, count: [7, 9] })),
      shape: c.is3d ? { type: 'circle', radius: 14 } : { type: 'cone', radius: 14, angle: 0.95 }, dir: c.is3d ? undefined : dir,
      speed: [220, 380], life: [0.35, 0.5], size: [6, 9], color: [col, light], stretch: { speed: 0.005, length: 1 },
      behaviors: [c.speedOverLife(c.decel(0.35)), c.gravity(900), c.colorOverLife(c.fade(0.7))], order: 2 }));
    return [
      // a fine mist puffing off the coat
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }, { time: 0.15, count: [3, 4] }], shape: { type: 'circle', radius: 18 },
        speed: [60, 130], life: [0.4, 0.55], size: [24, 36], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0.4, 0.4], [0, 1]]))], order: 0 })),
      fling(Math.PI + 0.1, [0, 0.2]),
      fling(-0.1, [0.1, 0.3]),
      // round droplets thrown highest, arcing down
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [3, 4] }, { time: 0.1, count: [3, 4] }, { time: 0.2, count: [2, 3] }], shape: { type: 'circle', radius: 16, arc: Math.PI },
        speed: [200, 320], life: [0.45, 0.6], size: [7, 10], color: light,
        behaviors: [c.gravity(1200), c.sizeOverLife(c.curve([[0, 0.6], [0.2, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.75))], order: 3 })),
      // drips falling off the belly
      c.sys(c.spray({ tex: 'drop', blend: 'normal', bursts: [{ time: 0.05, count: [3, 4] }, { time: 0.25, count: [2, 3] }], shape: { type: 'cone', radius: 20, angle: 0.15 }, dir: -Math.PI / 2, offset: [0, -14],
        speed: [30, 80], life: [0.35, 0.45], size: [9, 12], color: col,
        behaviors: [c.gravity(1400), c.colorOverLife(c.fade(0.8))], order: 1 }, 'down')),
      // glints in the spray
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.04, count: [3, 4] }, { time: 0.2, count: [2, 3] }], shape: { type: 'circle', radius: 34 },
        speed: [40, 100], life: [0.22, 0.32], size: [10, 15], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
    ];
  },
};
