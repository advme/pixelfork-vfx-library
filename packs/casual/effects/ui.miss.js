/** A missed beat: a soft grey puff with a grey cross on it that tilts, sinks and fades while a ring shrinks inward, like a balloon going flat. */
export default {
  name: 'ui.miss',
  category: 'ui',
  whenToUse: 'A missed note or beat in a rhythm game, a tap that came too late, a timing window lost in a tapping or timing game. Play it on the note lane or the tap spot; it deflates gently instead of scolding. For a wrong answer or an invalid move use puzzle.wrong.',
  duration: 0.6, loop: false, tint: '#9aa3b5',
  tags: ['miss', 'missed', 'rhythm', 'beat', 'timing', 'fail', 'ui', 'music'],
  build(c) {
    const col = c.color('#9aa3b5');
    return [
      // a soft grey puff that sags and deflates
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 10 },
        speed: [30, 60], life: [0.5, 0.62], size: [26, 36], rotation: [0, 6.28], color: c.lighten(col, 0.35),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(120), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.4]])),
          c.colorOverLife(c.grad([['#ffffff', 0], ['#ffffff', 1]], [[0.75, 0], [0.55, 0.5], [0, 1]]))], order: 0 })),
      // a ring shrinking inward: the beat going flat
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.4, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.45]])), c.colorOverLife(c.grad([['#ffffff', 0], ['#ffffff', 1]], [[0, 0], [0.7, 0.15], [0, 1]]))], order: 1 }),
      // the cross (a plus turned 45 degrees) pops in, then tilts and sinks
      c.sys({ tex: 'plus', blend: 'normal', bursts: [{ count: 1 }], life: 0.62, size: 44, rotation: Math.PI / 4, color: c.darken(col, 0.3),
        behaviors: [c.gravity(180), c.spin(-0.5), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.12], [0.28, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.45))], order: 2 }),
      // a few grey drops falling away
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 14 },
        speed: [40, 90], life: [0.4, 0.55], size: [5, 8], color: col,
        behaviors: [c.gravity(500), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.5))], order: 3 })),
    ];
  },
};
