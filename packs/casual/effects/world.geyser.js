/** A geyser or sea blowhole: every couple of seconds the vent gurgles, then a tall jet of water with a white core shoots up, droplets rain back down, foam churns and a ring spreads at the base and mist billows round the column. Loops until stopped. */
export default {
  name: 'world.geyser',
  category: 'world',
  whenToUse: 'A geyser, a blowhole in the rocks by the sea or a hot spring that erupts again and again: a jet of water bursts up every couple of seconds and falls back in mist, on a beach, a volcanic field, a whale-spout spot or a puzzle that times a jump to the jet; play it at the vent and leave it running. For a steady jet use world.fountain; for steam alone use world.steam; for one big splash use explosion.water.',
  duration: 2.4, loop: true, anchor: 'feet', tint: '#8fd8ff',
  tags: ['geyser', 'blowhole', 'water', 'jet', 'eruption', 'hot spring', 'mist', 'beach'],
  build(c) {
    const col = c.color('#8fd8ff');
    const light = c.lighten(col, 0.6);
    const L = 2.4, up = Math.PI / 2;
    const alpha = (keys) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], keys));
    // rings on the water, which may sit above the ground
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const base = c.is3d ? { type: 'circle', radius: 34 } : { type: 'rect', w: 80, h: 0 };
    // the eruption: a burst every 0.05 s for the first 0.6 s of each cycle
    const jet = (count) => [{ time: 0, count, cycle: 12, interval: 0.05 }];
    return [
      // the ring spreading at the base as it blows
      ring({ blend: 'add', loop: true, duration: L, bursts: [{ count: 1 }, { time: 0.3, count: 1 }], life: 0.8, size: 180, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), alpha([[0.7, 0], [0, 1]])], order: 0 }),
      // mist billowing up round the column while it erupts, and a wisp of steam between eruptions
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, duration: L, rate: 1.5, bursts: [{ time: 0.05, count: [3, 4] }, { time: 0.3, count: [3, 4] }], shape: { type: 'cone', radius: 20, angle: 0.25 }, dir: up,
        speed: [60, 200], life: [1.2, 1.6], size: [40, 64], rotation: [0, 6.28], color: '#f2fbff',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.noise(0.6, 14), c.spin(-0.6, 0.6), c.sizeOverLife(c.curve([[0, 0.45], [1, 1.7]])), alpha([[0, 0], [0.5, 0.12], [0.3, 0.5], [0, 1]])], order: 1 }, 'up')),
      // the vent gurgling just before it blows
      c.sys(c.spray({ tex: 'drop', blend: 'normal', loop: true, duration: L, bursts: [{ time: 1.85, count: [2, 3] }, { time: 2.05, count: [2, 3] }, { time: 2.22, count: [3, 4] }], shape: { type: 'cone', radius: 10, angle: 0.35 }, dir: up,
        speed: [140, 260], life: [0.3, 0.45], size: [7, 11], color: [col, light],
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.7))], order: 2 }, 'up')),
      // foam churning at the base during the eruption
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, duration: L, bursts: [{ time: 0, count: 2, cycle: 6, interval: 0.1 }], shape: base,
        speed: c.is3d ? [10, 30] : 0, life: [0.4, 0.6], size: [22, 34], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.force(0, 60), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), alpha([[0.9, 0], [0.7, 0.5], [0, 1]])], order: 2 })),
      // the jet: a column of water thrown high
      c.sys(c.spray({ tex: 'drop', blend: 'normal', loop: true, world: true, duration: L, bursts: jet([3, 4]), shape: { type: 'cone', radius: 8, angle: 0.08 }, dir: up,
        speed: [600, 780], life: [0.95, 1.15], size: [10, 16], color: [col, light],
        behaviors: [c.gravity(1100), c.sizeOverLife(c.curve([[0, 0.6], [0.2, 1], [1, 0.75]])), c.colorOverLife(c.fade(0.75))], order: 3 }, 'up')),
      // its white core; a streak trails back from its particle, so it starts 80 px up the column and its tail ends at the vent
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, duration: L, bursts: jet(2), shape: { type: 'cone', radius: 4, angle: 0.04 }, dir: up, offset: [0, 80],
        speed: [540, 680], life: [0.36, 0.46], size: [9, 13], color: '#ffffff', stretch: { speed: 0.008, length: 1.5 },
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.5))], order: 4 }, 'up')),
      // droplets thrown wider that rain back down
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, world: true, duration: L, bursts: [{ time: 0.05, count: 2, cycle: 8, interval: 0.07 }], shape: { type: 'cone', radius: 12, angle: 0.4 }, dir: up,
        speed: [380, 560], life: [0.6, 0.82], size: [5, 8], color: '#ffffff',
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.7))], order: 5 }, 'up')),
    ];
  },
};
