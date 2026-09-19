/** A teleport: vertical light streaks, a purple puff and sparkles. */
export default {
  name: 'move.teleport',
  category: 'move',
  whenToUse: 'A character teleports, blinks, warps in or out, or is summoned. Play at both the start and the end point.',
  duration: 0.8,
  loop: false,
  tint: '#b56bff',
  tags: ['teleport', 'warp', 'blink', 'summon', 'vanish', 'appear'],
  build(c) {
    const col = c.color('#b56bff');
    const light = c.lighten(col, 0.6);
    return [
      // streaks shooting up
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 11] }], shape: { type: 'cone', radius: 24, angle: 0.08 },
        speed: [500, 900], life: [0.3, 0.45], size: [8, 14], color: [light, col],
        stretch: { speed: 0.03, length: 3 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 3 }),
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 12 },
        speed: [60, 160], life: [0.4, 0.6], size: [30, 50], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 80), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0.6, 0.5], [0, 1]]))], order: 1 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 130, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys(c.flat({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 })),
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 24 },
        speed: [30, 100], life: [0.4, 0.7], size: [8, 14], color: light,
        behaviors: [c.force(0, 150), c.sizeOverLife(c.pop(0.2, 0.5))], order: 4 })),
    ];
  },
};
