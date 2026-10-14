/** An achievement unlocks: a golden glow swells behind the badge, slow rays turn, rings roll out, stars burst and sparkles circle it. */
export default {
  name: 'ui.achievement',
  category: 'ui',
  whenToUse: 'An achievement or badge unlocks in the UI: a quest completed, a milestone reached, a daily goal met, an achievement pop-up appearing. Play it with { el } on the badge icon; it fits the badge size. For a cup or trophy won in a tournament use reward.trophy; for a rank or league promotion use reward.rankup; for a level, skin or feature unlocking use ui.unlock.',
  duration: 1.25, loop: false, tint: '#ffc93c',
  tags: ['ui', 'achievement', 'trophy', 'medal', 'badge', 'unlock', 'milestone', 'quest'],
  build(c) {
    const col = c.color('#ffc93c');
    const light = c.lighten(col, 0.6);
    // the badge's size; with no element given (or in 3D) a 110 px badge. Without an element the target is the
    // default 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const s = plain ? 110 : Math.max(50, Math.min(220, Math.max(c.target.w, c.target.h)));
    const rays = (r) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 1.25, size: s * 3.2, rotation: r, color: col,
      behaviors: [c.spin(0.6), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.55, 0.15], [0.45, 0.7], [0, 1]]))], order: 1 });
    return [
      // the golden glow behind the badge
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 1.25, size: s * 2.4, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [1, 0.85]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.1], [0.5, 0.7], [0, 1]]))], order: 0 }),
      // slow-turning rays: two four-point glints a half-step apart make eight even rays
      rays(0), rays(Math.PI / 4),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.15, count: 1 }], life: 0.5, size: s * 2.4, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: s * 1.6, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 3 }),
      // sparkles circling the badge
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.1, count: 6 }], shape: { type: 'circle', radius: s * 0.62, thickness: 0, even: true },
        speed: 0, life: 1.1, size: [12, 16], color: light,
        behaviors: [c.orbit(2.6), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.5, 0.7], [0.75, 1], [1, 0]]))], order: 4 }),
      // twinkles appearing around the rim and drifting up
      c.sys({ tex: 'spark', blend: 'add', rate: 22, duration: 0.8, shape: { type: 'circle', radius: s * 0.8, thickness: 0.35 },
        speed: [10, 30], life: [0.35, 0.5], size: [7, 12], color: '#ffffff',
        behaviors: [c.force(0, 50), c.sizeOverLife(c.pop(0.3, 0.5))], order: 4 }),
      // stars bursting out
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: [10, 12] }], shape: { type: 'circle', radius: s * 0.3 },
        speed: [160, 300], life: [0.7, 1.0], size: [10, 18], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(250), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.75, 1], [1, 0]]))], order: 5 })),
    ];
  },
};
