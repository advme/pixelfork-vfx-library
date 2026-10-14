/** The player is healed: a soft green glow rises from the bottom of the screen, with plus signs and sparkles drifting up through it. */
export default {
  name: 'ui.healed',
  category: 'ui',
  whenToUse: 'The player is healed, shown on the whole screen: a health potion drunk, a med kit used, health refilled at a checkpoint, a campfire or between waves. Play it once with no position: it rises from the bottom of the whole screen. For the heal effect on the character itself use magic.heal; for health ticking up over time use state.regen.',
  duration: 0.8, loop: false, anchor: 'center', tint: '#4dff7a',
  tags: ['ui', 'heal', 'healed', 'health', 'potion', 'restore', 'green', 'screen'],
  build(c) {
    const col = c.color('#4dff7a');
    const light = c.lighten(col, 0.55);
    const W = c.view.w, H = c.view.h, m = Math.min(W, H), k = m / 400;
    const low = -H / 2;
    // the bottom edge of the screen
    const bottom = { type: 'rect', w: W, h: 0 };
    // Plus signs and sparkles start spread across the whole width near the bottom and float straight up at mixed
    // speeds, so they fill the lower part of the screen. A cone with angle 0 fires every particle straight up from
    // a wide disc; a filled rect bunched them all in the middle (its fill pulls toward the centre)
    const rise = { shape: { type: 'cone', angle: 0, radius: W * 0.47 }, dir: Math.PI / 2, offset: [0, low + H * 0.05] };
    const lift = [H * 0.08, H * 0.42];
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    return [
      // the green wash along the bottom edge, rising and fading
      c.sys({ tex: 'glow', blend: 'normal', bursts: [{ count: 14 }], shape: bottom, offset: [0, low],
        life: 0.8, size: [m * 0.75, m * 1.0], color: col,
        behaviors: [c.force(0, 160 * k), c.sizeOverLife(c.curve([[0, 0.55], [0.3, 1], [1, 1.1]])), c.colorOverLife(solid([[0, 0], [0.42, 0.2], [0.32, 0.55], [0, 1]]))], order: 0 }),
      // a lighter glow on top of it, bright on dark games (faint: overlapping, stronger ones burned to white blotches)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 10 }], shape: bottom, offset: [0, low],
        life: 0.65, size: [m * 0.4, m * 0.6], color: light,
        behaviors: [c.force(0, 280 * k), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 1.1]])), c.colorOverLife(solid([[0, 0], [0.3, 0.2], [0, 1]]))], order: 1 }),
      // plus signs drifting up
      c.sys(Object.assign({ tex: 'plus', blend: 'normal', bursts: [{ count: 8 }, { time: 0.08, count: 7 }, { time: 0.16, count: 6 }],
        speed: lift, life: [0.5, 0.62], size: [16, 28], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.35)), c.noise(2, 14), c.sizeOverLife(c.pop(0.2, 0.7)), c.colorOverLife(c.fade(0.7))], order: 2 }, rise)),
      // white-green sparkles twinkling among them
      c.sys(Object.assign({ tex: 'spark', blend: 'add', bursts: [{ count: 10 }, { time: 0.12, count: 6 }],
        speed: lift, life: [0.35, 0.55], size: [10, 18], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.spin(-3, 3), c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }, rise)),
    ];
  },
};
