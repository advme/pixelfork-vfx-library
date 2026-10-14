/** A slot line wins: the payline flashes, light streaks race outward, a ring pops, coins spray up and tumble down and glints twinkle along the line. */
export default {
  name: 'reward.slotwin',
  category: 'reward',
  whenToUse: 'A line wins on a slot or fruit machine (a payline hit, three matching symbols, a normal slot payout): play it at the centre of the winning line, or with { el } on the line so the flash fits it; for the huge jackpot use reward.jackpot, for a prize wheel stopping use reward.wheel.',
  duration: 1.35, loop: false, tint: '#ffd23a',
  tags: ['slots', 'slot machine', 'payline', 'win', 'casino', 'coins', 'payout', 'reward'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the winning line's length: the element it was played on, else a payline of 260 px. With no element the
    // target is the default 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const w = plain ? 260 : Math.max(80, Math.min(420, c.target.w));
    // the payline: a rect line takes speed 0 (rect emitters push sideways)
    const line = (p) => c.sys(Object.assign({ blend: 'add', shape: { type: 'rect', w, h: 0 }, speed: 0 }, p));
    const flash = () => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.75, 0.35], [0, 1]]));
    return [
      // a warm glow behind the win
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the payline flashing: a row of soft lights, then a white-hot core along it
      line({ tex: 'glow', bursts: [{ count: Math.round(w / 9) }], life: [0.3, 0.4], size: [30, 40], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.3]])), flash()], order: 1 }),
      line({ tex: 'glow', bursts: [{ count: Math.round(w / 8) }], life: [0.2, 0.28], size: [10, 14], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.2]])), flash()], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 230, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // light streaks racing outward, a second wave just behind the first
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [16, 18] }, { time: 0.18, count: [8, 10] }], shape: { type: 'circle', radius: 20 },
        speed: [420, 700], life: [0.3, 0.42], size: [5, 7], color: [light, '#ffffff'], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 3 })),
      // coins spraying up and tumbling down
      c.sys(c.spray({ tex: 'coin', blend: 'normal', bursts: [{ count: [10, 12] }, { time: 0.12, count: [5, 6] }, { time: 0.24, count: [3, 4] }],
        shape: { type: 'cone', radius: 12, angle: 0.5 },
        speed: [460, 720], life: [0.95, 1.1], size: [16, 22], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1500), c.spin(-6, 6), c.colorOverLife(c.fade(0.85))], order: 4 }, 'up')),
      // glints twinkling along the line as it flashes
      line({ tex: 'spark', bursts: [{ time: 0.05, count: [5, 6] }, { time: 0.3, count: [3, 4] }], life: [0.35, 0.5], size: [14, 22], rotation: [0, 0.8], color: '#fff6c8',
        behaviors: [c.force(0, 60), c.spin(-2, 2), c.sizeOverLife(c.pop(0.25, 0.5))], order: 5 }),
    ];
  },
};
