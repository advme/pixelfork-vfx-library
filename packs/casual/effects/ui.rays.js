/** Big golden light rays turning behind a reward: eight long and short rays turning slowly over a soft breathing glow, with twinkles. Loops until stopped. */
export default {
  name: 'ui.rays',
  category: 'ui',
  whenToUse: "Light rays turning behind a reward on a popup: a prize, trophy or chest on a reward screen, a new character or item being shown off, a daily-reward card. Play with { el, layer: 'back' } on the icon so the rays sit behind it; stop when the popup closes. For a chest bursting open use reward.chest; for a soft glow behind a button use ui.glow.",
  duration: 2, loop: true, tint: '#ffd23f',
  tags: ['ui', 'rays', 'sunburst', 'reward', 'prize', 'shine', 'popup', 'spotlight'],
  build(c) {
    const col = c.color('#ffd23f');
    const light = c.lighten(col, 0.55);
    const s = Math.max(50, Math.min(160, Math.max(c.target.w, c.target.h)));
    // one ray sprite per 2 s cycle, living two cycles and fading in then out (the two alive always add up to one).
    // It turns a quarter turn per cycle, so the new sprite lines up exactly with the old one (the spark has four rays):
    // the rays turn forever without a seam. Prewarmed so they show at once; cut so stop() clears them.
    // Both sets turn the same way, a 1/8 turn apart: eight evenly spaced rays, long and short. (Turning opposite
    // ways, they lined up every second and the sunburst collapsed into one four-point twinkle.)
    const rays = (size, turn, rot, colour, peak, order) => c.sys({ tex: 'spark', blend: 'add', loop: true, prewarm: true, cut: true, duration: 2,
      bursts: [{ count: 1 }], life: 4, size, rotation: rot, color: colour,
      behaviors: [c.spin(turn), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [peak, 0.5], [0, 1]]))], order });
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 2, bursts: [{ count: 1 }], life: 2, size: s * 1.9, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.45, 0], [0.65, 0.5], [0.45, 1]]))], order: 0 }),
      rays(s * 2.9, Math.PI / 4, 0, col, 0.6, 1),
      rays(s * 2.2, Math.PI / 4, Math.PI / 4, light, 0.7, 2),
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 5, shape: { type: 'circle', radius: s * 0.75, thickness: 0.6 },
        speed: 0, life: [0.5, 0.8], size: [8, 16], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.4, 1], [1, 0]]))], order: 3 }),
    ];
  },
};
