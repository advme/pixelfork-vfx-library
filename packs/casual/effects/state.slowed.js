/** Slowed: heavy blue drips swell, hang and ooze off the body into a sluggish puddle while slow-motion motes sink around it. Loops until stopped. */
export default {
  name: 'state.slowed',
  category: 'state',
  whenToUse: 'A character is slowed down for a while: a slow spell, sticky tar or glue, deep mud or snow, a snare, a heavy-weight debuff. Follow the body; stop it when the slow wears off. For frozen in ice use state.frozen, for dripping wet use state.wet, and for the one-off cast of a slow or time spell use magic.time.',
  duration: 2, loop: true, tint: '#4a7dff',
  tags: ['slow', 'slowed', 'snare', 'tar', 'sluggish', 'heavy', 'debuff', 'status'],
  build(c) {
    const col = c.color('#4a7dff');
    const light = c.lighten(col, 0.45);
    const dark = c.darken(col, 0.3);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const breathe = () => c.sizeOverLife(c.curve([[0, 0.93], [0.5, 1.05], [1, 0.93]]));
    return [
      // a heavy blue haze that breathes slowly
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: 140, color: col,
        behaviors: [breathe(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.22, 0], [0.38, 0.5], [0.22, 1]]))], order: 0 }),
      // the sluggish puddle at the feet the drips fall into
      ring({ blend: 'add', loop: true, cut: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: 96, offset: [0, -42], color: col,
        behaviors: [breathe(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.55, 0], [0.9, 0.5], [0.55, 1]]))], order: 1 }),
      // slow-motion motes sinking around the body
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 16, shape: { type: 'circle', radius: 42 }, offset: [0, 16],
        speed: [2, 8], life: [1.4, 2.0], size: [5, 9], color: [light, col],
        behaviors: [c.gravity(30), c.limitSpeed(22, 1), c.noise(0.6, 4), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 2 })),
      // heavy drips: they swell and hang, then ooze down slowly
      c.sys({ tex: 'drop', blend: 'normal', loop: true, rate: 4.5, shape: { type: 'rect', w: 54, h: 26, thickness: 1 }, offset: [0, 13],
        speed: 0, life: [0.95, 1.15], size: [13, 19], color: [col, dark],
        behaviors: [c.gravity(300), c.limitSpeed([[0, 3], [0.35, 3], [0.45, 100], [1, 100]], 1),
          c.sizeOverLife(c.curve([[0, 0.2], [0.35, 1], [0.85, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.75))], order: 3 }),
    ];
  },
};
