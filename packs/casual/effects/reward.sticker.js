/** A sticker earned: a big star sticker with a white die-cut border stamps down with a squash, a flash and ring burst from the landing, confetti dots pop out and a glint shines across it. */
export default {
  name: 'reward.sticker',
  category: 'reward',
  whenToUse: 'A sticker, stamp or badge is earned in a kids or learning game: a gold star for a finished worksheet or lesson, a good-job stamp, a sticker book page filled, a daily streak sticker. Play it where the sticker appears. For a score milestone or perfect round use reward.starburst; for the 1-3 rating stars on a results screen use ui.star.',
  duration: 1.05, loop: false, tint: '#ffd23a',
  tags: ['sticker', 'stamp', 'badge', 'gold star', 'kids', 'learning', 'good job', 'reward'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the stamp: drops in big, squashes flat on landing (t = 0.08), bounces and settles; border and face share it so they move as one
    const stamp = () => c.sizeOverLife(c.curve([[0, 1.7], [0.08, 0.86], [0.14, 1.08], [0.2, 0.97], [0.26, 1], [0.84, 1], [1, 0]]));
    const land = 0.08;
    return [
      // the flash where it lands
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: land, count: 1 }], life: 0.3, size: 170, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.7]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.4, 0.4], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: land, count: 1 }], life: 0.38, size: 210, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.35], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the sticker: a white border star behind the coloured face
      c.sys({ tex: 'star', blend: 'normal', bursts: [{ count: 1 }], life: 1.05, size: 108, rotation: -0.18, color: '#ffffff',
        behaviors: [stamp(), c.colorOverLife(c.fade(0.85))], order: 3 }),
      c.sys({ tex: 'star', blend: 'normal', bursts: [{ count: 1 }], life: 1.05, size: 88, rotation: -0.18, color: col,
        behaviors: [stamp(), c.colorOverLife(c.fade(0.85))], order: 4 }),
      // the glint sweeping onto the sticker once it has settled
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.34, count: 1 }], offset: [18, 16], life: 0.42, size: 54, rotation: 0.2, color: '#ffffff',
        behaviors: [c.spin(2.5), c.sizeOverLife(c.pop(0.3, 0.45)), c.colorOverLife(c.fade(0.6))], order: 5 }),
      // confetti dots, two cheerful colour runs
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ time: land, count: [8, 10] }], shape: { type: 'circle', radius: 30 },
        speed: [220, 380], life: [0.6, 0.85], size: [7, 11], color: ['#ff4d6d', '#c77dff'],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(650), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 2 })),
      c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ time: land, count: [7, 9] }], shape: { type: 'circle', radius: 30 },
        speed: [200, 360], life: [0.6, 0.85], size: [6, 9], rotation: [0, 6.28], color: ['#3dd6ff', '#7cff6b'],
        behaviors: [c.speedOverLife(c.decel(0.25)), c.gravity(650), c.spin(-8, 8), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 2 })),
    ];
  },
};
