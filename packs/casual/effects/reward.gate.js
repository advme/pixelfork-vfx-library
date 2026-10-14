/** Running through a bonus gate: the whole gate flashes white into a bright shimmering sheet of its colour, its frame lights up, streaks of light and plus signs rise through it and sparkles float up and away. */
export default {
  name: 'reward.gate',
  category: 'reward',
  whenToUse: 'The player or the crowd runs through a good +multiplier or bonus gate in a crowd-runner, count-masters or runner game (x2, +10, a power-up arch): play it at the centre of the gate as it is passed, size it to the gate and tint it the gate colour (blue for a plus gate). For crossing a finish line use reward.finish; for a checkpoint use reward.checkpoint; for a speed boost pad on the floor use world.boostpad.',
  duration: 0.95, loop: false, tint: '#3dbaff',
  tags: ['gate', 'multiplier', 'crowd', 'runner', 'bonus', 'plus', 'shimmer', 'reward'],
  build(c) {
    const col = c.color('#3dbaff');
    const light = c.lighten(col, 0.55);
    // the gate is a 150 x 180 sheet standing upright, facing the camera in both worlds.
    // A filled rect crowds its particles toward the middle, so the sheet is built from three even columns.
    const column = (x) => c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'rect', w: 0, h: 170 }, offset: [x, 0],
      speed: 0, life: [0.3, 0.45], size: [56, 70], color: '#ffffff',
      behaviors: [c.sizeOverLife(c.curve([[0, 0.7], [0.3, 1], [1, 0.85]])),
        c.colorOverLife(c.grad([['#fff', 0], [col, 0.3], [col, 1]], [[0.15, 0], [0.5, 0.12], [0.3, 0.5], [0, 1]]))], order: 0 });
    return [
      column(-50), column(0), column(50),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 220, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0, 1]]))], order: 1 }),
      // the frame lighting up
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 28 }], shape: { type: 'rect', w: 150, h: 180 }, speed: 0, life: [0.3, 0.4], size: [22, 30], color: light,
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.7)), c.colorOverLife(c.fade(0.4))], order: 2 }),
      // streaks of light shooting up through the gate from low down
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 7 }, { time: 0.06, count: 6 }, { time: 0.12, count: 5 }], shape: { type: 'rect', w: 140, h: 0 }, offset: [0, -70],
        speed: 0, life: [0.3, 0.4], size: [6, 9], color: [light, '#ffffff'], stretch: { speed: 0.012, length: 1 },
        behaviors: [c.force(0, 2000), c.colorOverLife(c.fadeInOut(0.15, 0.5))], order: 3 }),
      // plus signs floating up
      c.sys({ tex: 'plus', blend: 'normal', bursts: [{ time: 0.04, count: [6, 8] }], shape: { type: 'rect', w: 120, h: 0 }, offset: [0, -30],
        speed: 0, life: [0.6, 0.85], size: [14, 22], color: [light, '#ffffff'],
        behaviors: [c.force(0, 300), c.noise(1.5, 10), c.sizeOverLife(c.pop(0.15, 0.7))], order: 4 }),
      // sparkles floating up and away
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [14, 16] }], shape: { type: 'rect', w: 150, h: 180, thickness: 0.7 },
        speed: 0, life: [0.6, 0.9], size: [8, 14], color: [light, '#ffffff'],
        behaviors: [c.force(0, 200), c.noise(2, 20), c.sizeOverLife(c.pop(0.2, 0.6))], order: 5 }),
    ];
  },
};
