/** XP pours into a bar: a quick flash at its left end launches a stream of blue sparkles and little stars that fly along its width and twinkle as they settle, the bar glows softly and a few plus signs float up off it. */
export default {
  name: 'ui.xp',
  category: 'ui',
  whenToUse: 'XP or experience is added to an XP or level bar in the HUD or on a results screen: XP for a kill, a quest step or a finished match, a bonus XP reward, battle-pass points. Play with { el } on the XP bar (without one pass width and height, the bar size in px); the sparkles fly along its width. For the bar reaching full use ui.fill; for the level-up itself use reward.levelup; for XP orbs picked up in play use pickup.xp; for energy or stamina refilling use ui.energy.',
  duration: 0.8, loop: false, tint: '#4fa3ff',
  tags: ['ui', 'xp', 'experience', 'bar', 'progress', 'level', 'sparkle', 'gain'],
  build(c) {
    const col = c.color('#4fa3ff');
    const light = c.lighten(col, 0.6);
    const w = Math.max(40, Math.min(420, c.target.w)), h = Math.max(10, Math.min(60, c.target.h));
    const left = [-w / 2, 0];
    // a sparkle launched at speed v, slowing to a fifth of it, travels 0.6 * v * life: the fastest just reach the right end
    const life = 0.5, top = w / (0.6 * life);
    // the vertical spread is kept inside the bar whatever its shape: at the far end a sparkle is at most
    // radius + width x angle = 0.12 h + 0.3 h off the middle line (a floor on the angle pushed them out of thin bars)
    const spread = Math.min(0.3, (h * 0.3) / w);
    const fly = { type: 'cone', radius: h * 0.12, angle: spread };
    const n = Math.round(Math.max(10, Math.min(30, w / 7)));
    const sp = Math.max(10, Math.min(18, h * 0.6));
    return [
      // the bar glows softly along its length while the sparkles fly
      c.sys({ tex: 'glow', blend: 'add', rate: Math.max(8, Math.min(30, w / 6)), duration: 0.35, shape: { type: 'rect', w: w * 0.9, h: 0 },
        speed: 0, life: [0.35, 0.45], size: [h * 1.8, h * 2.4], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.3, 0.35], [0.25, 0.65], [0, 1]]))], order: 0 }),
      // the launch flash at the left end
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: h * 2.6, color: light, offset: left,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the stream of sparkles flying along the bar, landing spread out over its whole width
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2, cycle: Math.round(n / 2), interval: 0.025 }], shape: fly, dir: 0, offset: left,
        speed: [top * 0.15, top], life, size: [sp * 0.7, sp * 1.2], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.3], [0.12, 1], [0.55, 0.75], [0.75, 1], [1, 0]]))], order: 2 }),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ time: 0.03, count: 3 }, { time: 0.12, count: 3 }], shape: fly, dir: 0, offset: left,
        speed: [top * 0.3, top * 0.95], life, size: [sp * 0.8, sp * 1.1], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [0.7, 1], [1, 0]]))], order: 3 }),
      // little plus signs floating up off the bar as the XP lands
      c.sys({ tex: 'plus', blend: 'add', bursts: [{ time: 0.18, count: 2 }, { time: 0.3, count: 2 }], shape: { type: 'rect', w: w * 0.7, h: 0 }, offset: [0, h * 0.3],
        speed: 0, life: [0.4, 0.5], size: [sp * 0.9, sp * 1.3], color: light,
        behaviors: [c.force(0, 160), c.limitSpeed(60, 1), c.sizeOverLife(c.pop(0.2, 0.6)), c.colorOverLife(c.fade(0.5))], order: 4 }),
    ];
  },
};
