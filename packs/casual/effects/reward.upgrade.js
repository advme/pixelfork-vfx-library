/** An upgrade success: a golden flash and ring, bold chevrons shooting up through the item one after another, sparkles bursting out. */
export default {
  name: 'reward.upgrade',
  category: 'reward',
  whenToUse: 'An item, weapon, building or card is upgraded, crafted or forged successfully: +1 on gear, a craft completes, an upgrade button pays off in an idle game. Play it on the item. For the character levelling up use reward.levelup; for a stat buff in battle use magic.buff; for two items merging use puzzle.merge; for a failed attempt use hit.upgradefail.',
  duration: 1.0, loop: false, tint: '#ffc93c',
  tags: ['upgrade', 'craft', 'forge', 'success', 'level', 'item', 'arrow', 'idle'],
  build(c) {
    const col = c.color('#ffc93c');
    const light = c.lighten(col, 0.6);
    // one chevron: born below the item, shoots up through it and slows, popping in and fading out
    const chevron = (t, size) => c.sys({ tex: 'arrow', blend: 'add', bursts: [{ time: t, count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: Math.PI / 2, offset: [0, -45],
      speed: 280, life: 0.55, size, color: light,
      behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.2], [0.3, 1], [1, 0.9]])), c.colorOverLife(c.fade(0.55))], order: 4 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.5, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.15, size: 110, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      // the golden ring
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.05, count: 1 }], life: 0.45, size: 240, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.25))], order: 1 }),
      chevron(0, 72), chevron(0.11, 60), chevron(0.22, 48),
      // sparkles bursting out and lifting
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [12, 16] }], shape: { type: 'circle', radius: 16 },
        speed: [140, 300], life: [0.5, 0.75], size: [10, 17], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.force(0, 120), c.sizeOverLife(c.pop(0.15, 0.55))], order: 3 })),
      // glitter streaming up for a moment
      c.sys(c.vol({ tex: 'glow', blend: 'add', rate: 30, duration: 0.4, shape: { type: 'circle', radius: 40 },
        speed: [10, 40], life: [0.4, 0.6], size: [4, 7], color: light,
        behaviors: [c.force(0, 260), c.limitSpeed(200, 1), c.colorOverLife(c.fade(0.5))], order: 2 })),
    ];
  },
};
