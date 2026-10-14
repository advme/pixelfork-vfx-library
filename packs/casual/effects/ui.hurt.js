/** The player is hurt: a red glow flashes in from all four screen edges with short red streaks darting in, then fades; the middle of the screen stays clear. */
export default {
  name: 'ui.hurt',
  category: 'ui',
  whenToUse: 'The player takes damage: hit by an enemy, a trap, a bullet, a fall or a bad item; play it on every hit the player character takes. Play it once with no position: it reddens the edges of the whole screen and leaves the middle clear. For a full white screen flash use ui.flash; for the hit on the character itself use hit.impact; for a heart icon lost in the HUD use ui.lifelost; for a lasting low-health warning use ui.lowhp.',
  duration: 0.5, loop: false, anchor: 'center', tint: '#ff2a3d',
  tags: ['ui', 'hurt', 'damage', 'vignette', 'red', 'screen', 'pain', 'hit'],
  build(c) {
    const col = c.color('#ff2a3d');
    const W = c.view.w, H = c.view.h, m = Math.min(W, H), k = m / 400;
    // how many glows of a size it takes to go round the screen edge, overlapping
    const around = (size, gap) => Math.max(12, Math.min(40, Math.round((2 * (W + H)) / (size * gap))));
    // the screen's own edge, glows spaced evenly along it
    const edge = { type: 'rect', w: W, h: H, even: true };
    const wash = m * 0.8, rim = m * 0.42;
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    return [
      // the red wash: big soft glows sitting on the edge; only their inner halves show, so the middle stays clear
      c.sys({ tex: 'glow', blend: 'normal', bursts: [{ count: around(wash, 0.4) }], shape: edge,
        life: 0.5, size: wash, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.14, 1], [1, 0.85]])), c.colorOverLife(solid([[0, 0], [0.56, 0.08], [0.36, 0.45], [0, 1]]))], order: 0 }),
      // a hot rim right at the edge, the flash itself (it glows on dark games)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: around(rim, 0.45) }], shape: edge,
        life: 0.3, size: rim, color: c.lighten(col, 0.3),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.2, 1], [1, 0.9]])), c.colorOverLife(solid([[0.55, 0], [0, 1]]))], order: 1 }),
      // short streaks darting in from the edges: a whole-screen rect with a NEGATIVE speed sends each one toward the middle.
      // Light pink, so they read over the red wash (in the wash's own red they vanished into it)
      c.sys({ tex: 'glow', blend: 'normal', bursts: [{ count: 18 }], shape: { type: 'rect', w: W, h: H },
        speed: [-520 * k, -340 * k], life: [0.2, 0.28], size: [6, 9], color: [c.lighten(col, 0.5), c.lighten(col, 0.72)], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.1)), c.colorOverLife(c.fade(0.4))], order: 2 }),
    ];
  },
};
