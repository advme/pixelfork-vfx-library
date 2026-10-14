/** A slam dunk: the hoop flashes with a ring of light, the ball swishes down through it, stars pop and confetti bits fly. */
export default {
  name: 'hit.dunk',
  category: 'hit',
  whenToUse: 'A ball goes through a hoop or ring: a basketball slam dunk or swish, a scoring shot in a hoop, ring-toss or ball-in-a-cup game, a paper ball into the bin. Play it at the centre of the hoop at the moment the ball drops through. For a big goal-scoring celebration on top use reward.goal.',
  duration: 0.65, loop: false, tint: '#ff8a2a',
  tags: ['dunk', 'basketball', 'hoop', 'swish', 'basket', 'score', 'sports', 'hit'],
  build(c) {
    const col = c.color('#ff8a2a');
    const light = c.lighten(col, 0.55);
    // the hoop: an ellipse seen from the side in 2D, a ring lying level in the air in 3D (not snapped to the floor)
    const hoop = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // confetti bits fired up out of the hoop (3D: c.ground turns the half-sphere to open upward)
    const bits = (colours) => c.sys(c.ground(c.vol({ tex: 'square', blend: 'normal', bursts: [{ time: 0.04, count: [9, 11] }], shape: { type: 'circle', radius: 14, arc: Math.PI },
      speed: [260, 460], life: [0.5, 0.62], size: [6, 9], rotation: [0, 6.28], color: colours,
      behaviors: [c.gravity(1000), c.speedOverLife(c.decel(0.4)), c.spin(-12, 12), c.colorOverLife(c.fade(0.7))], order: 3 })));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      hoop({ blend: 'add', bursts: [{ count: 1 }, { time: 0.08, count: 1 }], life: 0.35, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.45], [1, 1.15]])), c.colorOverLife(c.fade(0.25))], order: 1 }),
      // the swish: streaks dropping down through the net (lowered so their tails, about 50-100 px long, start at the rim)
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [4, 5] }], dir: -Math.PI / 2, offset: [0, -55], shape: { type: 'cone', radius: 14, angle: 0.06 },
        speed: [450, 650], life: [0.12, 0.18], size: [5, 7], color: '#ffffff', stretch: { speed: 0.02, length: 1 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 2 }, 'down')),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 12 },
        speed: [220, 380], life: [0.4, 0.6], size: [12, 18], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.gravity(600), c.speedOverLife(c.decel(0.3)), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.6], [0.15, 1], [0.75, 1], [1, 0]]))], order: 4 })),
      bits([c.rgb('#ff4f6b'), c.rgb('#ffd23a')]),
      bits([c.rgb('#47b6ff'), c.rgb('#4dff9a')]),
    ];
  },
};
