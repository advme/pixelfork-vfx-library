/** A shield bubble: a pulsing ring with glints running around it. Loops until stopped. */
export default {
  name: 'state.shield',
  category: 'state',
  whenToUse: 'A character has an active shield, barrier, invincibility or bubble. Follow the character; stop when it breaks. Combine with magic.shield for the pop-on and hit.impact for hits.',
  duration: 1, loop: true, tint: '#6fc3ff',
  tags: ['shield', 'bubble', 'barrier', 'invincible', 'status', 'protect'],
  build(c) {
    const col = c.color('#6fc3ff');
    const light = c.lighten(col, 0.7);
    return [
      // 3D: a ring on the floor under the bubble
      c.is3d ? c.sys(c.flat({ tex: 'ring', blend: 'add', loop: true, duration: 1.4, bursts: [{ count: 1 }], life: 1.4, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.9, 0.5], [0.5, 1]]))], order: 0 })) : null,
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.4, bursts: [{ count: 1 }], life: 1.4, size: c.is3d ? 104 : 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.96], [0.5, 1.02], [1, 0.96]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [1, 0.5], [0.7, 1]]))], order: 1 }),
      c.sys({ tex: 'disc', blend: 'add', loop: true, bursts: [{ count: 1 }], life: 1, size: c.is3d ? 96 : 130, color: c.darken(col, 0.75),
        behaviors: [], order: 0 }),
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 3 }], shape: { type: 'circle', radius: c.is3d ? 50 : 65, thickness: 0, even: true },
        speed: 0, life: 1, size: [10, 14], color: light,
        behaviors: [c.orbit(c.TAU), c.sizeOverLife(c.curve([[0, 0.8], [0.5, 1.2], [1, 0.8]]))], order: 2 })),
    ];
  },
};
