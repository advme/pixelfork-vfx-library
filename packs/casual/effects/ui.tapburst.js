/** A juicy clicker tap: a small pop ring, and gold coins and stars spraying up from the finger and tumbling down. */
export default {
  name: 'ui.tapburst',
  category: 'ui',
  whenToUse: 'Each tap on the big clickable thing in an idle or clicker game (the cookie, the coin, the ore, the monster), so every click pays out with coins and stars spraying up. Cheap enough for many taps a second; play it with { event }. For a plain tap ripple use ui.tap; for one coin collected use pickup.coin.',
  duration: 0.55, loop: false, tint: '#ffcf3f',
  tags: ['ui', 'tap', 'click', 'idle', 'clicker', 'coins', 'stars', 'juicy'],
  build(c) {
    const col = c.color('#ffcf3f');
    const light = c.lighten(col, 0.6);
    const up = Math.PI / 2;
    return [
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 70, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 50, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.3))], order: 1 }),
      // tiny bright dots popping around the finger
      c.sys({ tex: 'disc', blend: 'add', bursts: [{ count: 5 }], shape: { type: 'circle', radius: 8, thickness: 0, even: true },
        speed: [140, 200], life: [0.18, 0.25], size: [4, 6], color: light,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.shrink())], order: 2 }),
      // coins spraying up and falling back
      c.sys(c.spray({ tex: 'coin', blend: 'normal', bursts: [{ count: [4, 5] }], dir: up, shape: { type: 'cone', radius: 6, angle: 0.5 },
        speed: [280, 420], life: [0.45, 0.58], size: [13, 17], rotation: [0, 6.28], color: col,
        behaviors: [c.gravity(1300), c.spin(-8, 8), c.sizeOverLife(c.curve([[0, 0.5], [0.12, 1], [0.8, 1], [1, 0]]))], order: 3 }, 'up')),
      c.sys(c.spray({ tex: 'star', blend: 'add', bursts: [{ count: [3, 4] }], dir: up, shape: { type: 'cone', radius: 6, angle: 0.7 },
        speed: [200, 340], life: [0.35, 0.5], size: [11, 15], rotation: [0, 6.28], color: light,
        behaviors: [c.gravity(900), c.spin(-6, 6), c.sizeOverLife(c.pop(0.15, 0.6))], order: 4 }, 'up')),
    ];
  },
};
