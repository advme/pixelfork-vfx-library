/** Invulnerable: a white glow and a bright rim blink on and off around the body while sparkles twinkle. Loops until stopped. */
export default {
  name: 'state.invulnerable',
  category: 'state',
  whenToUse: 'A character is briefly invincible after taking a hit or respawning (mercy invincibility, i-frames, spawn protection) and blinks white. Follow the body for the one to three seconds it lasts, then stop it. For a star-power invincibility mode use state.rainbow; for a visible shield bubble use state.shield.',
  duration: 0.24, loop: true, tint: '#eaf6ff',
  tags: ['invulnerable', 'invincible', 'i-frames', 'blink', 'respawn', 'mercy', 'protected', 'status'],
  build(c) {
    const col = c.color('#eaf6ff');
    const light = c.lighten(col, 0.6);
    // on for the first half of every 0.24 s cycle, off for the second half
    const blink = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[a, 0], [a, 0.75], [0, 1]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.24, bursts: [{ count: 1 }], life: 0.12, size: 150, color: col,
        behaviors: [blink(0.5)], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 0.24, bursts: [{ count: 1 }], life: 0.12, size: 124, color: light,
        behaviors: [blink(0.5)], order: 1 }),
      // sparkles twinkling on the body
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 10, shape: { type: 'circle', radius: 38 },
        speed: 0, life: [0.3, 0.5], size: [12, 20], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0]]))], order: 2 })),
      // fine glints lifting off
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 12, shape: { type: 'circle', radius: 32 },
        speed: [10, 30], life: [0.5, 0.8], size: [3, 6], color: light,
        behaviors: [c.force(0, 60), c.colorOverLife(c.fade(0.4))], order: 3 })),
    ];
  },
};
