/** A daily-streak flame on an icon: a small chunky flame flickers over it with a white-hot core, a warm glow breathes behind and embers drift up. Loops until stopped. */
export default {
  name: 'ui.streak',
  category: 'ui',
  whenToUse: 'A daily, login or play streak is alive: a small flame keeps burning on the streak icon or counter in a menu or HUD (a 7-day streak, a lesson streak, a streak kept up). Play with { el, follow: true } on the icon and stop it when the streak is lost or the screen closes. For the burst when the streak goes up or a hot streak in play use reward.streak; for a character or object on fire use state.burning; for a torch or candle in the level use world.torch.',
  duration: 1, loop: true, tint: '#ff7a1f',
  tags: ['ui', 'streak', 'daily', 'flame', 'fire', 'login', 'icon', 'hud'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.5);
    const hot = c.lighten(col, 0.82);
    // the icon's size; with no element given (or in 3D) a 56 px icon. Without an element the target is the default
    // 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const s = plain ? 56 : Math.max(28, Math.min(120, Math.max(c.target.w, c.target.h)));
    const k = s / 56;
    // the flame's base sits in the lower part of the icon so the flame stands over its middle
    const base = [0, -s * 0.22];
    return [
      // the warm glow breathes twice a second and ends each cycle as it starts, so it never shows a seam
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.5, bursts: [{ count: 1 }], life: 0.5, size: s * 1.9, offset: [0, s * 0.05], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.06], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.32, 0], [0.48, 0.5], [0.32, 1]]))], order: 0 }),
      // the flame body: chunky tongues licking up and flickering
      c.sys({ tex: 'flame', blend: 'add', loop: true, rate: 20, shape: { type: 'circle', radius: s * 0.12 }, offset: base,
        speed: [5 * k, 20 * k], life: [0.35, 0.5], size: [s * 0.45, s * 0.66], rotation: [-0.15, 0.15], color: [light, col],
        behaviors: [c.force(0, 230 * k), c.limitSpeed(150 * k, 1), c.noise(4, 6 * k), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.45))], order: 1 }),
      // the white-hot core low in the flame
      c.sys({ tex: 'flame', blend: 'add', loop: true, rate: 14, shape: { type: 'circle', radius: s * 0.06 }, offset: base,
        speed: [2 * k, 10 * k], life: [0.25, 0.35], size: [s * 0.26, s * 0.36], color: hot,
        behaviors: [c.force(0, 200 * k), c.limitSpeed(120 * k, 1), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 2 }),
      // embers drifting up off the tip
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 5, shape: { type: 'circle', radius: s * 0.15 }, offset: [0, s * 0.05],
        speed: [20 * k, 45 * k], life: [0.7, 1.1], size: [3, 5], color: [hot, light],
        behaviors: [c.force(0, 110 * k), c.limitSpeed(90 * k, 1), c.noise(2, 18 * k), c.colorOverLife(c.fade(0.5))], order: 3 }),
      // a small twinkle now and then near the flame, so the streak feels alive
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 1.5, shape: { type: 'circle', radius: s * 0.42, thickness: 0.3 }, offset: [0, s * 0.08],
        speed: 0, life: 0.4, size: [s * 0.18, s * 0.26], rotation: [0, 0.8], color: hot,
        behaviors: [c.spin(2), c.sizeOverLife(c.pop(0.3, 0.45))], order: 4 }),
    ];
  },
};
