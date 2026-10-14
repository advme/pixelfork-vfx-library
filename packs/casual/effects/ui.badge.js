/** A badge is earned: it flashes gold, a starburst of eight rays and a ring of stars bursts from behind it, a white shine sweeps across its face and a few twinkles linger. */
export default {
  name: 'ui.badge',
  category: 'ui',
  whenToUse: 'A badge, medal, emblem or title is earned and appears on the player profile, a collection page or a badge wall: a medal pinned on, a profile badge added, a season emblem or a club crest awarded. Play with { el } on the badge; the shine fits its size. For the big achievement-unlocked pop-up use ui.achievement; for a trophy or cup won use reward.trophy; for a sticker in a kids game use reward.sticker; for a passing shine on a button use ui.shine.',
  duration: 0.95, loop: false, tint: '#ffc93c',
  tags: ['ui', 'badge', 'medal', 'emblem', 'profile', 'earned', 'shine', 'starburst'],
  build(c) {
    const col = c.color('#ffc93c');
    const light = c.lighten(col, 0.6);
    // the badge's size; with no element given (or in 3D) a 90 px badge. Without an element the target is the default
    // 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const s = plain ? 90 : Math.max(40, Math.min(200, Math.max(c.target.w, c.target.h)));
    // the shine: a band slanted like / crossing from the upper left to the lower right in 0.32 s. It starts once the
    // burst has passed its peak: at the peak the glare of the glow and the rays swallowed it
    const sweep = 0.32, at = 0.26, way = -0.55, reach = s * 0.75;
    const from = [-Math.cos(way) * reach, -Math.sin(way) * reach];
    // the band is a glow squashed along its motion. A stretch speed of exactly 0 is replaced by three.quarks with 0.001 per
    // world unit, which made the band about twice as long in 2D (a fat blob, not a band); a tiny real speed keeps it the same
    // in both worlds. It trails back from its particle, so the riding glint starts half a band behind to sit in its middle
    const band = s * 1.25, squash = 0.3, bandSpeed = 0.0001, run = (reach * 2) / sweep;
    const half = (band * (squash + run * bandSpeed)) / 2;
    const glintFrom = [from[0] - Math.cos(way) * half, from[1] - Math.sin(way) * half];
    const ray = (rot) => c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: s * 2.6, rotation: rot, color: light,
      behaviors: [c.spin(1.2), c.sizeOverLife(c.curve([[0, 0.2], [0.2, 1], [1, 0.65]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.85, 0.12], [0.35, 0.55], [0, 1]]))], order: 1 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: s * 2.2, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.18, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.75, 0.12], [0, 1]]))], order: 0 }),
      // the starburst: two four-point glints a half-step apart make eight rays
      ray(0), ray(Math.PI / 4),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: s * 2.2, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [9, 11] }], shape: { type: 'circle', radius: s * 0.3 },
        speed: [170, 300], life: [0.45, 0.65], size: [11, 18], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.gravity(220), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1], [0.7, 1], [1, 0]]))], order: 3 })),
      // the shine band (a glow squashed along its motion) and a glint riding its middle
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: at, count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: way, offset: from,
        speed: run, life: sweep, size: band, color: '#ffffff',
        stretch: { speed: bandSpeed, length: squash },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.9, 0.3], [0.9, 0.65], [0, 1]]))], order: 4 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: at, count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: way, offset: glintFrom,
        speed: run, life: sweep, size: s * 0.55, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(4), c.sizeOverLife(c.curve([[0, 0.3], [0.5, 1], [1, 0.3]])), c.colorOverLife(c.fadeInOut(0.15, 0.8))], order: 5 }),
      // twinkles left behind on the badge as the shine crosses it
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: at + 0.02, count: 1, cycle: 8, interval: 0.04 }], shape: { type: 'circle', radius: s * 0.6, thickness: 0.45 },
        speed: [5, 20], life: [0.3, 0.4], size: [7, 12], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 5 }),
    ];
  },
};
