/** Manga focus lines: thin dark ink streaks shoot in from every screen edge toward the middle and stop short of it, over a dark rim, with a few white lines between them. */
export default {
  name: 'ui.focuslines',
  category: 'ui',
  whenToUse: 'A dramatic manga moment over the whole screen: a critical or finishing hit, a special move starting, a boss appearing, a big surprise or reveal. Play it once with no position; it frames the middle of the screen. For a white screen flash use ui.flash; for the hit itself use hit.crit; for outward lines while moving fast use ui.speedlines.',
  duration: 0.6, loop: false, anchor: 'center', tint: '#1a1626',
  tags: ['ui', 'focus lines', 'manga', 'anime', 'dramatic', 'critical', 'impact', 'reveal'],
  build(c) {
    const col = c.color('#1a1626');
    const W = c.view.w, H = c.view.h, m = Math.min(W, H), k = m / 400;
    const around = (size, gap) => Math.max(12, Math.min(40, Math.round((2 * (W + H)) / (size * gap))));
    // A frame a little outside the screen. A whole-screen rect with a NEGATIVE speed sends each particle straight
    // toward its centre; the streak trails back to the edge, so every line runs from the border inward
    const frame = { type: 'rect', w: W * 1.08, h: H * 1.06 };
    // shoot in, then stop dead: lines end at different depths, the middle stays clear
    const stop = () => c.speedOverLife(c.curve([[0, 1], [0.22, 0.12], [1, 0]]));
    const hold = () => c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0.4]]));
    return [
      // a dark rim framing the moment
      c.sys({ tex: 'glow', blend: 'normal', bursts: [{ count: around(m * 0.55, 0.42) }], shape: { type: 'rect', w: W, h: H, even: true },
        life: 0.6, size: m * 0.55, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.15, 1], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.1], [0.32, 0.55], [0, 1]]))], order: 0 }),
      // the ink lines, in two quick waves
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 56 }, { time: 0.04, count: 24 }], shape: frame,
        speed: [-1700 * k, -800 * k], life: [0.45, 0.55], size: [3.5, 7], color: col, stretch: { speed: 0.03, length: 3 },
        behaviors: [stop(), hold(), c.colorOverLife(c.fade(0.55))], order: 1 }),
      // thinner white lines between them, so they read on dark games too
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ time: 0.02, count: 22 }], shape: frame,
        speed: [-1400 * k, -700 * k], life: [0.38, 0.48], size: [2.5, 4.5], color: '#ffffff', stretch: { speed: 0.03, length: 3 },
        behaviors: [stop(), hold(), c.colorOverLife(c.fade(0.5))], order: 2 }),
    ];
  },
};
