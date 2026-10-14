/** A ninja smoke bomb: a sharp pop, a ring and a few sparks, then a thick grey cloud bursts out, hangs for a moment and thins away in wisps. */
export default {
  name: 'explosion.smokebomb',
  category: 'explosion',
  whenToUse: 'A ninja or thief vanishes or appears in a burst of thick smoke: a smoke bomb thrown to escape, a magician\'s disappearing trick, a character poofing away behind a cloud. Play it on the character and hide or move them while the cloud is thick. For a small quick poof use explosion.puff; for a dark shadow-step blink use move.shadowstep; for a lasting smoke screen use weapon.smoke.',
  duration: 1.4, loop: false, tint: '#c4cad3',
  tags: ['smoke', 'smoke bomb', 'ninja', 'vanish', 'escape', 'cloud', 'poof', 'disappear'],
  build(c) {
    const col = c.color('#c4cad3');
    const light = c.lighten(col, 0.5);
    const dark = c.darken(col, 0.25);
    // thick from the first frame, holds, then thins out
    const thick = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [1, 0.06], [1, 0.55], [0, 1]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 150, color: '#fff8e0',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      // the cloud bursting out
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [14, 16] }, { time: 0.05, count: [6, 8] }], shape: { type: 'circle', radius: 16 },
        speed: [120, 240], life: [1.05, 1.3], size: [56, 90], rotation: [0, 6.28], color: [col, dark],
        behaviors: [c.speedOverLife(c.decel(0.04)), c.force(0, 18), c.noise(0.8, 10), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.35], [0.2, 1], [1, 1.45]])), thick()], order: 2 })),
      // a dense, lighter core so the middle is never see-through; camera-facing in 3D, so it sits in front of the character it hides
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 20 },
        speed: [30, 90], life: [1.0, 1.25], size: [80, 120], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 22), c.spin(-0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 1.3]])), thick()], order: 3 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 230, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 4 }),
      // a few sparks from the bomb
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [7, 9] }], shape: { type: 'circle', radius: 6, thickness: 0 },
        speed: [260, 480], life: [0.22, 0.38], size: [4, 7], color: ['#fff3b0', '#ffb347'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(700), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 5 })),
      // wisps curling up out of the cloud as it thins
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.35, count: [5, 6] }], shape: { type: 'circle', radius: 50, arc: Math.PI },
        speed: [20, 50], life: [0.8, 1.0], size: [34, 50], rotation: [0, 6.28], color: light,
        behaviors: [c.force(0, 70), c.limitSpeed(90, 1), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.3]])), c.colorOverLife(c.fadeInOut(0.2, 0.5))], order: 3 })),
    ];
  },
};
