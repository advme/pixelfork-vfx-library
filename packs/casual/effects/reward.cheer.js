/** A crowd cheers: a warm flash, then confetti, hearts and stars thrown up from a wide line below, with bright streamers and sparkles rising. */
export default {
  name: 'reward.cheer',
  category: 'reward',
  whenToUse: 'A crowd or audience cheers: fans go wild after a great play, a stage show or dance ends, a talent or rhythm game scores big, a streamer gets hyped, a parade passes. Play it below the moment (the bottom of the screen in 2D, at the crowd or the front of the stage in 3D); things are thrown up from a wide line. For a burst from one point use reward.birthday; for a confetti cannon use reward.confetti.',
  duration: 1.3, loop: false, anchor: 'bottom', tint: null,
  tags: ['cheer', 'crowd', 'audience', 'fans', 'applause', 'stage', 'concert', 'celebration'],
  build(c) {
    const confetti = c.tint
      ? [c.tint, c.lighten(c.tint, 0.5), c.darken(c.tint, 0.25)]
      : ['#ff4d6d', '#ffd23f', '#3dd6ff'];
    const pink = c.tint || c.rgb('#ff5c9a');
    const gold = c.tint ? c.lighten(c.tint, 0.6) : c.rgb('#ffd23f');
    // a wide cone: its base is a 300 px line in 2D (a disc around the spot in 3D), so everything is thrown from many hands at once
    const crowd = { type: 'cone', radius: 150, angle: 0.35 };
    const toss = (p) => c.sys(c.spray(Object.assign({ shape: crowd }, p), 'up'));
    const flutter = () => [c.gravity(1300), c.limitSpeed([[0, 1400], [0.55, 1400], [0.7, 200], [1, 200]], 1.5), c.noise(2.5, 22), c.spin(-9, 9), c.colorOverLife(c.fade(0.8))];
    return [
      // the roar: a wide warm glow at the crowd
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 340, color: c.lighten(gold, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.4, 0.3], [0, 1]]))], order: 0 }),
      ...confetti.map((colour) => toss({ tex: 'square', blend: 'normal', bursts: [{ count: [11, 13] }],
        speed: [550, 950], life: [1.0, 1.25], size: [9, 14], rotation: [0, 6.28], color: colour,
        behaviors: flutter(), order: 2 })),
      toss({ tex: 'heart', blend: 'normal', bursts: [{ time: 0.03, count: [6, 8] }],
        speed: [500, 850], life: [0.95, 1.2], size: [18, 26], rotation: [-0.3, 0.3], color: [pink, c.lighten(pink, 0.3)],
        behaviors: [c.gravity(1100), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.5], [0.1, 1], [0.8, 1], [1, 0]]))], order: 3 }),
      toss({ tex: 'star', blend: 'add', bursts: [{ time: 0.03, count: [7, 9] }],
        speed: [550, 950], life: [0.9, 1.15], size: [14, 22], rotation: [0, 6.28], color: [gold, '#ffffff'],
        behaviors: [c.gravity(1200), c.spin(-6, 6), c.sizeOverLife(c.curve([[0, 0.5], [0.1, 1], [0.8, 1], [1, 0]]))], order: 4 }),
      // streamers of light flung up first
      toss({ tex: 'glow', blend: 'add', bursts: [{ count: 10 }],
        speed: [700, 1000], life: [0.35, 0.5], size: [5, 7], color: [c.lighten(gold, 0.5), '#ffffff'], stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 5 }),
      // sparkles rising off the crowd
      c.sys(c.ground({ tex: 'spark', blend: 'add', rate: 28, duration: 0.6, shape: c.is3d ? { type: 'circle', radius: 150 } : { type: 'rect', w: 300, h: 0 },
        speed: 0, life: [0.45, 0.7], size: [10, 16], color: '#ffffff',
        behaviors: [c.force(0, 400), c.limitSpeed(220, 1), c.sizeOverLife(c.pop(0.25, 0.5))], order: 6 })),
    ];
  },
};
