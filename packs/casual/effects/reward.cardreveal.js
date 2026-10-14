/** A card reveal: a white flash, a bright diagonal shine sweeping across the card, and stars bursting out from behind its edges. */
export default {
  name: 'reward.cardreveal',
  category: 'reward',
  whenToUse: 'A card, item or character is flipped over or revealed: a card pack opening, a gacha result card turning, a new item shown on a reward screen, a scratch card uncovered. Play it on the card (in 2D pass { el } so the shine fits the card); tint by rarity. For an everyday card flip in a card, memory or solitaire game use ui.cardflip; for a passing glint on a button use ui.shine; for the rarity burst add reward.rare or reward.legendary.',
  duration: 0.9, loop: false, tint: '#ffd23a',
  tags: ['card', 'reveal', 'flip', 'gacha', 'pack', 'shine', 'collectible', 'reward'],
  build(c) {
    const col = c.color('#ffd23a');
    const light = c.lighten(col, 0.6);
    // the card: the element it was played on, or (no element, or in 3D) a card of 110 x 150. With no element the
    // runtime reports its 120 x 48 default divided by size, so that 2.5 : 1 shape means "no card given"
    const plain = Math.abs(c.target.w / c.target.h - 2.5) < 0.001;
    const w = plain ? 110 : Math.max(40, c.target.w), h = plain ? 150 : Math.max(40, c.target.h);
    const big = Math.max(w, h);
    // the shine travels up-right at angle a, crossing the card centre half-way through its life
    const a = 0.35, t0 = 0.08, life = 0.42;
    const half = w / 2 + 30;
    const speed = (2 * half) / Math.cos(a) / life;
    // a stretch length under 1 squashes the glow along its motion into a tall band across it
    const shine = (p) => c.sys(Object.assign({ blend: 'add', bursts: [{ time: t0, count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: a,
      offset: [-half, -half * Math.tan(a)], speed, life }, p));
    return [
      // rays turning behind the card
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.9, size: big * 2.2, rotation: [0, 0.8], color: col,
        behaviors: [c.spin(0.8, 1), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.15], [0.5, 0.6], [0, 1]]))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: big * 1.8, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // stars bursting out from behind the card's edges
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.03, count: [12, 16] }], shape: { type: 'circle', radius: w * 0.45, thickness: 0 },
        speed: [180, 380], life: [0.5, 0.8], size: [12, 20], rotation: [0, 6.28], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.12)), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.55))], order: 1 })),
      // the flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: big * 1.3, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.15))], order: 5 }),
      // the sweeping shine: a soft tinted band, a bright white core and a glint riding along
      shine({ tex: 'glow', size: h * 1.15, color: light, stretch: { speed: 0, length: 0.32 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 3 }),
      shine({ tex: 'glow', size: h, color: '#ffffff', stretch: { speed: 0, length: 0.12 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 4 }),
      shine({ tex: 'spark', size: 60, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(4), c.sizeOverLife(c.curve([[0, 0.3], [0.5, 1], [1, 0.3]])), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 5 }),
    ];
  },
};
