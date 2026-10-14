/** A note hit on the beat: a white flash and coloured glow, a ring, music notes bursting out and arcing down, white streaks and twinkles. */
export default {
  name: 'hit.note',
  category: 'hit',
  whenToUse: 'A note, tile or beat is hit on time in a rhythm, piano-tile or music game: a lane key pressed on the beat, a drum pad hit, a music tile tapped. Play it on the note and tint it with the lane colour; add reward.perfect, reward.great or reward.good for the rating.',
  duration: 0.55, loop: false, tint: '#ff5fa8',
  tags: ['note', 'rhythm', 'beat', 'music', 'tile', 'piano', 'drum', 'hit'],
  build(c) {
    const col = c.color('#ff5fa8');
    const light = c.lighten(col, 0.55);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.28, size: 170, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // music notes bursting out and arcing down
      c.sys(c.vol({ tex: 'note', blend: 'normal', bursts: [{ count: [6, 7] }], shape: { type: 'circle', radius: 10 },
        speed: [180, 300], life: [0.45, 0.58], size: [18, 26], rotation: [-0.4, 0.4], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.gravity(300), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.1], [0.3, 1], [0.8, 1], [1, 0]]))], order: 3 })),
      // white streaks
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 10, thickness: 0 },
        speed: [300, 480], life: [0.18, 0.26], size: [4, 5], color: '#ffffff', stretch: { speed: 0.015, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4))], order: 2 })),
      // twinkles hanging round the hit
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.04, count: [3, 4] }], shape: { type: 'circle', radius: 34 },
        speed: [20, 50], life: [0.3, 0.4], size: [10, 14], rotation: [0, 6.28], color: light,
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 110, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
    ];
  },
};
