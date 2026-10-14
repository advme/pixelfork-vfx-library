/** Hacked! A green flash and rings, the element's border lights up in digital squares, a burst of blinking green pixels and data flying up. */
export default {
  name: 'ui.hack',
  category: 'ui',
  whenToUse: 'A hack, code crack or terminal breach succeeds in the UI (a lock picked in a hacking minigame, a password cracked, a firewall broken, a system unlocked, a cyber puzzle solved): play it with { el } on the panel, lock or button; for an ordinary unlock use ui.unlock, for a pixel-art explosion use explosion.pixel.',
  duration: 0.9, loop: false, tint: '#3dff6e',
  tags: ['ui', 'hack', 'hacking', 'cyber', 'digital', 'unlock', 'terminal', 'success'],
  build(c) {
    const col = c.color('#3dff6e');
    const light = c.lighten(col, 0.55);
    const dark = c.darken(col, 0.3);
    // the element's size; with no element given (or in 3D) a 100 px panel. Without an element the target is the
    // default 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const w = plain ? 100 : Math.max(40, Math.min(240, c.target.w));
    const h = plain ? 100 : Math.max(40, Math.min(240, c.target.h));
    const s = Math.max(w, h);
    // the border: one square every ~12 px all the way round (an even burst on a box walks its edge once)
    const border = Math.min(60, Math.round((2 * (w + h) + 40) / 12));
    // digital blink: on, a quick off-flicker, on, gone
    const blink = () => c.sizeOverLife(c.curve([[0, 1], [0.45, 1], [0.5, 0.35], [0.58, 1], [0.8, 1], [1, 0]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: s * 2, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.4, 0.4], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.12, count: 1 }], life: 0.45, size: s * 1.9, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the border lighting up square by square
      c.sys({ tex: 'pixel', blend: 'add', bursts: [{ count: border }], shape: { type: 'rect', w: w + 10, h: h + 10, even: true },
        speed: 0, life: [0.5, 0.65], size: [6, 8], color: [col, light],
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.1, 1], [0.45, 1], [0.5, 0.3], [0.58, 1], [0.8, 1], [1, 0]]))], order: 2 }),
      // a burst of solid green pixels flying out
      c.sys({ tex: 'pixel', blend: 'normal', bursts: [{ count: [18, 24] }], shape: { type: 'circle', radius: Math.min(w, h) * 0.3 },
        speed: [160, 340], life: [0.5, 0.75], size: [7, 12], color: [dark, light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(220), blink()], order: 3 }),
      // data flying up off the element
      c.sys({ tex: 'pixel', blend: 'add', rate: 60, duration: 0.35, shape: { type: 'rect', w: w * 0.9, h: h * 0.6, thickness: 1 },
        speed: 0, life: [0.35, 0.55], size: [3, 6], color: ['#ffffff', col],
        behaviors: [c.force(0, 900), c.limitSpeed(260, 1), blink()], order: 4 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: s * 1.3, rotation: 0.3, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
    ];
  },
};
