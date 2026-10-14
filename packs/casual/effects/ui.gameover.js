/** Game over: the screen dims, a dark smoky vignette closes in from every edge and grey ash drifts down over it all. */
export default {
  name: 'ui.gameover',
  category: 'ui',
  whenToUse: 'The player loses: game over, out of lives, time up, defeat, mission failed. Play it once with no position as the game-over screen appears: the edges of the whole screen darken with smoke and ash drifts down. For a character being knocked out use hit.ko; for a win use ui.victory.',
  duration: 1.5, loop: false, anchor: 'center', tint: '#1c1626',
  tags: ['ui', 'game over', 'lose', 'defeat', 'death', 'vignette', 'smoke', 'ash'],
  build(c) {
    const col = c.color('#1c1626');
    const W = c.view.w, H = c.view.h, m = Math.min(W, H), k = m / 400, big = Math.max(W, H);
    const around = (size, gap) => Math.max(12, Math.min(40, Math.round((2 * (W + H)) / (size * gap))));
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    const wash = m * 0.9;
    return [
      // the whole screen dims a little
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], life: 1.5, size: big * 2.4, color: col,
        behaviors: [c.colorOverLife(solid([[0, 0], [0.3, 0.35], [0.3, 0.8], [0, 1]]))], order: 0 }),
      // the dark vignette closing in from the edges
      c.sys({ tex: 'glow', blend: 'normal', bursts: [{ count: around(wash, 0.4) }], shape: { type: 'rect', w: W, h: H, even: true },
        life: 1.5, size: wash, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.6, 1.25], [1, 1.3]])), c.colorOverLife(solid([[0, 0], [0.85, 0.35], [0.85, 0.8], [0, 1]]))], order: 1 }),
      // smoke billowing in: a whole-screen rect with a NEGATIVE speed sends each puff toward the middle.
      // Half see-through, so on light games they read as smoke rather than dark ink blots
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: 14 }, { time: 0.15, count: 10 }, { time: 0.3, count: 8 }], shape: { type: 'rect', w: W, h: H },
        speed: [-70 * k, -30 * k], life: [1, 1.2], size: [m * 0.22, m * 0.34], rotation: [0, 6.28], color: [col, c.lighten(col, 0.15)],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.spin(-0.6, 0.6), c.sizeOverLife(c.grow(0.5)), c.colorOverLife(solid([[0, 0], [0.52, 0.25], [0.45, 0.7], [0, 1]]))], order: 2 }),
      // grey ash drifting down over the whole screen
      c.sys({ tex: 'square', blend: 'normal', bursts: [{ count: 22 }], rate: 26, duration: 0.55, shape: { type: 'rect', w: W, h: H, thickness: 0.9 },
        life: [0.8, 0.95], size: [4, 8], rotation: [0, 6.28], color: ['#9a9aa3', '#e2e2e8'],
        behaviors: [c.gravity(120), c.limitSpeed(70, 1), c.noise(1.5, 18), c.spin(-3, 3), c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 3 }),
    ];
  },
};
