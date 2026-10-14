/** A scratch card is scratched: silver flakes flick up off it and tumble down, with fine silver crumbs, a faint puff of dust and white glints. */
export default {
  name: 'ui.scratch',
  category: 'ui',
  whenToUse: 'The player scratches a scratch card, lottery ticket or scratch-off panel: play it with { event } at the finger a few times a second while it scratches, or with { el } on a cell or panel as it is cleared, and tint it for gold or coloured coatings; for the prize revealed underneath use reward.cardreveal (or reward.jackpot for a big win).',
  duration: 0.55, loop: false, tint: '#c3cad6',
  tags: ['ui', 'scratch', 'scratch card', 'lottery', 'ticket', 'flakes', 'silver', 'casino'],
  build(c) {
    const col = c.color('#c3cad6');
    const light = c.lighten(col, 0.55);
    // a scratch at the finger (no element, or in 3D) is a small spot; on an element the flakes come off all of it.
    // Without an element the target is the default 120 x 48 box divided by the effect size: its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const half = plain ? 20 : Math.max(10, Math.min(160, c.target.w * 0.45));
    const n = plain ? 8 : Math.max(8, Math.min(18, Math.round(half / 6)));
    // a cone's base lies across its aim, so an upward cone starts its flakes along a line as wide as the scratch
    const across = { type: 'cone', radius: half, angle: 0.7 };
    return [
      c.sys(c.vol({ tex: 'puff', blend: 'normal', bursts: [{ count: plain ? 2 : 3 }], shape: { type: 'circle', radius: half * 0.5 },
        speed: [20, 50], life: [0.3, 0.4], size: [16, 24], rotation: [0, 6.28], color: light,
        behaviors: [c.force(0, 40), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.35, 0.5], [0, 1]]))], order: 0 })),
      // the flakes: chunky silver bits flicked up, spinning and dropping (solid tumbling shards in 3D)
      c.sys(c.chunks({ tex: 'square', blend: 'normal', bursts: [{ count: n }, { time: 0.06, count: Math.round(n / 2) }], shape: across, dir: Math.PI / 2,
        speed: [140, 300], life: [0.4, 0.5], size: [6, 11], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1100), c.spin(-12, 12), c.colorOverLife(c.fade(0.75))], order: 1 }, 'shard')),
      // fine crumbs, darker, so the coating reads as scratched off
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: n }], shape: across, dir: Math.PI / 2,
        speed: [160, 320], life: [0.3, 0.42], size: [2.5, 4], color: c.darken(col, 0.25),
        behaviors: [c.gravity(1200), c.colorOverLife(c.fade(0.6))], order: 2 })),
      // metallic glints catching the light
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: plain ? 2 : 3 }, { time: 0.08, count: [1, 2] }], shape: { type: 'circle', radius: half * 0.7 },
        speed: [20, 60], life: [0.2, 0.3], size: [10, 16], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 })),
    ];
  },
};
