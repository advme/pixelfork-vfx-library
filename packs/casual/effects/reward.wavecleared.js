/** Wave cleared: a golden flash and two rings bursting out, stars flung wide, a flight of chevrons sweeping up one after another and sparkles rising behind them. */
export default {
  name: 'reward.wavecleared',
  category: 'reward',
  whenToUse: 'An enemy wave is beaten in tower defense, wave survival or horde games: the last enemy of a wave dies, the wave or round counter goes up, a wave bonus is paid out before the next wave. Play it once at the centre of the screen or on the wave counter (1.4 s). For the whole level or map won use reward.clear or ui.victory, for a checkpoint reached use reward.checkpoint, and for a rank or league promotion use reward.rankup.',
  duration: 1.4, loop: false, tint: '#ffcc33',
  tags: ['wave', 'wave cleared', 'tower defense', 'round', 'survival', 'horde', 'victory', 'reward'],
  build(c) {
    const col = c.color('#ffcc33');
    const light = c.lighten(col, 0.6);
    const up = Math.PI / 2;
    // a column of chevrons flying up one after another: each pops in, rises fast, eases off and fades out near the top
    // (left facing the camera in 3D, so the formation reads the same from any side)
    const chevrons = (times, x, y, size) => c.sys({ tex: 'arrow', blend: 'add', bursts: times.map((t) => ({ time: t, count: 1 })), dir: up,
      shape: { type: 'cone', radius: 0.1, angle: 0.001 }, offset: [x, y], speed: 300, life: 0.8, size, color: c.lighten(col, 0.3),
      behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 0], [0.1, 1.2], [0.2, 1], [1, 0.85]])), c.colorOverLife(c.fade(0.55))], order: 5 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 280, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // golden rays turning slowly behind it all
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 1.1, size: 300, rotation: [0, 0.8], color: col,
        behaviors: [c.spin(0.5, 0.7), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.65, 0.12], [0.5, 0.6], [0, 1]]))], order: 1 }),
      // the golden ring burst, twice
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: 320, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.12, count: 1 }], life: 0.5, size: 240, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // stars flung out of the burst
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [14, 16] }], shape: { type: 'circle', radius: 24 },
        speed: [220, 420], life: [0.6, 0.85], size: [12, 20], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(250), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.75, 1], [1, 0]]))], order: 4 })),
      // the flight of chevrons: a big one up the middle, smaller ones on each side just after
      chevrons([0.08, 0.24, 0.4], 0, -30, 70),
      chevrons([0.16, 0.32], -70, -50, 46),
      chevrons([0.16, 0.32], 70, -50, 46),
      // sparkles rising behind the chevrons
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 50, duration: 0.6, shape: c.is3d ? { type: 'circle', radius: 90 } : { type: 'rect', w: 220, h: 0 }, offset: [0, -60],
        speed: 0, life: [0.65, 0.85], size: [8, 15], color: [light, '#ffffff'],
        behaviors: [c.force(0, 420), c.limitSpeed(260, 1), c.sizeOverLife(c.pop(0.2, 0.55))], order: 3 })),
    ];
  },
};
