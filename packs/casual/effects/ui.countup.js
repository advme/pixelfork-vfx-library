/** Sparkles popping around a number while it counts up. Loops until stopped. */
export default {
  name: 'ui.countup',
  category: 'ui',
  whenToUse: 'A score, coin total or XP bar is counting up on a result screen. Play with { el, follow: true } on the counter; stop when the count finishes.',
  duration: 1, loop: true, tint: '#ffd23f',
  tags: ['ui', 'count', 'score', 'counter', 'sparkle', 'result'],
  build(c) {
    const col = c.color('#ffd23f');
    const light = c.lighten(col, 0.6);
    const w = c.target.w, h = c.target.h;
    return [
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 18, shape: { type: 'rect', w: w + 20, h: h + 16, thickness: 0.3 },
        speed: [20, 60], life: [0.35, 0.55], size: [8, 16], color: [light, col],
        behaviors: [c.force(0, 80), c.sizeOverLife(c.pop(0.2, 0.5))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 10, shape: { type: 'rect', w: w + 10, h: h + 10, thickness: 0.3 },
        speed: [30, 90], life: [0.3, 0.5], size: [4, 8], color: light,
        behaviors: [c.gravity(300), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 0 }),
    ];
  },
};
