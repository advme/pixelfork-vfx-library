/** A screen-wide blast: white-out flash, a giant shockwave and a smoke ring. */
export default {
  name: 'explosion.nuke',
  also: 'ui.flash',
  category: 'explosion',
  whenToUse: 'A bomb power-up clears the board, a super attack wipes every enemy, the final boss dies. Covers the whole screen; play once.',
  duration: 2.0, loop: false, anchor: 'center', tint: null,
  tags: ['nuke', 'screen clear', 'bomb', 'wipe', 'super', 'flash'],
  build(c) {
    const big = Math.max(c.view.w, c.view.h);
    const fire = c.tint
      ? c.grad([[c.lighten(c.tint, 0.8), 0], [c.tint, 0.4], [c.darken(c.tint, 0.6), 1]], [[1, 0], [1, 0.5], [0, 1]])
      : c.grad([['#fff8d8', 0], ['#ffc23a', 0.35], ['#ff6a1f', 0.7], ['#3a1c12', 1]], [[1, 0], [1, 0.5], [0, 1]]);
    const smoke = c.grad([['#9a9a9a', 0], ['#4a4a4a', 1]], [[0, 0], [0.8, 0.15], [0.5, 0.6], [0, 1]]);
    if (c.is3d) {
      // 3D: a gigantic blast in the world (the white-out is the `ui.flash` companion on the screen)
      return [
        c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.15, count: 1 }], life: 1.0, size: 2600, color: '#ffd28a',
          behaviors: [c.sizeOverLife(c.curve([[0, 0.04], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 5 })),
        c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 1100, color: '#fff3c4',
          behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 6 }),
        c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [30, 38] }], shape: { type: 'circle', radius: 70 },
          speed: [220, 620], life: [0.7, 1.0], size: [150, 260], rotation: [0, 6.28],
          behaviors: [c.colorOverLife(fire), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.2]])), c.speedOverLife(c.decel(0.15)), c.spin(-1, 1)], order: 3 })),
        c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.2, count: [28, 36] }], shape: { type: 'circle', radius: 140 },
          speed: [90, 280], life: [1.4, 2.0], size: [200, 340], rotation: [0, 6.28],
          behaviors: [c.colorOverLife(smoke), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.5]])), c.speedOverLife(c.decel(0.2)), c.force(0, 90), c.spin(-1, 1)], order: 2 })),
        c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [70, 90] }], shape: { type: 'circle', radius: 40, thickness: 0 },
          speed: [700, 1700], life: [0.5, 1.0], size: [9, 15], color: ['#fff2a8', c.tint ? c.tint : '#ffb330'], stretch: { speed: 0.02, length: 1.5 },
          behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 4 })),
        c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: [24, 30] }], shape: { type: 'circle', radius: 30 },
          speed: [500, 1100], life: [1.0, 1.5], size: [14, 26], rotation: [0, 6.28], color: ['#5a3a2a', '#2e1d15'],
          behaviors: [c.gravity(1500), c.colorOverLife(c.fade(0.8))], order: 4 })),
      ];
    }
    return [
      // white-out
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 0.6, size: big * 2.2, color: '#ffffff',
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [1, 0.12], [0, 1]]))], order: 6 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.15, count: 1 }], life: 0.9, size: big * 2, color: '#ffd28a',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.05], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: [22, 28] }], shape: { type: 'circle', radius: 60 },
        speed: [200, 600], life: [0.6, 0.9], size: [120, 200], rotation: [0, 6.28],
        behaviors: [c.colorOverLife(fire), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.2]])), c.speedOverLife(c.decel(0.15)), c.spin(-1, 1)], order: 3 }),
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ time: 0.2, count: [22, 28] }], shape: { type: 'circle', radius: 120, thickness: 0.4 },
        speed: [80, 260], life: [1.2, 1.8], size: [140, 240], rotation: [0, 6.28],
        behaviors: [c.colorOverLife(smoke), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.5]])), c.speedOverLife(c.decel(0.2)), c.force(0, 60), c.spin(-1, 1)], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [50, 70] }], shape: { type: 'circle', radius: 40, thickness: 0 },
        speed: [600, 1600], life: [0.5, 1.0], size: [8, 14], color: ['#fff2a8', c.tint ? c.tint : '#ffb330'],
        stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5)), c.sizeOverLife(c.shrink())], order: 4 }),
    ];
  },
};
