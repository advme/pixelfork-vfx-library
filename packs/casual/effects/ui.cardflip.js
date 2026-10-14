/** A card turns over: a warm glow, a bright leaning shine sweeping across the card, sparkles popping on its edges and a few stars. */
export default {
  name: 'ui.cardflip',
  category: 'ui',
  whenToUse: 'A card is flipped face up or turned over during play in a memory-match, solitaire or card game, or a hidden tile is turned; light enough for every flip. Play it with { el } on the card as it turns. For a prize, gacha or card-pack reveal on a reward screen use reward.cardreveal; for a card being dealt use ui.carddeal.',
  duration: 0.65, loop: false, tint: '#ffe27a',
  tags: ['ui', 'card', 'flip', 'reveal', 'memory', 'solitaire', 'shine', 'turn over'],
  build(c) {
    const col = c.color('#ffe27a');
    const light = c.lighten(col, 0.7);
    // the card's size; with no element given (or in 3D) a playing card of 90 x 126. Without an element the
    // target is the default 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const w = plain ? 90 : Math.max(30, c.target.w);
    const h = plain ? 126 : Math.max(30, c.target.h);
    // the shine travels a little downhill, so its band leans like a glint on glossy card
    const a = -0.3;
    // it runs from the card's left edge to its right edge and fades at both ends, so it never shines on empty table
    const reach = w * 0.35;
    // a stretched sprite trails BACK from its particle, so the particle leads by about half the band's length
    // to keep the band itself centred on the card
    const lead = h * 0.2;
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.42, size: Math.max(w, h) * 1.6, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.4, 0.4], [0, 1]]))], order: 0 }),
      // the shine: a tall soft band crossing the card (a stretched glow squashed along its motion)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.04, count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: a,
        offset: [Math.cos(a) * (lead - reach), Math.sin(a) * (lead - reach)],
        speed: (2 * reach) / 0.3, life: 0.3, size: h * 0.9, color: '#ffffff', stretch: { speed: 0, length: 0.4 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.25, 0.7))], order: 2 }),
      // sparkles popping on the card's edges as the shine passes
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.08, count: 4 }, { time: 0.2, count: 4 }], shape: { type: 'rect', w, h },
        speed: 0, life: [0.3, 0.45], size: [12, 20], rotation: [0, 0.8], color: light,
        behaviors: [c.spin(-2, 2), c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }),
      c.sys({ tex: 'star', blend: 'add', bursts: [{ time: 0.1, count: [4, 5] }], shape: { type: 'circle', radius: Math.min(w, h) * 0.3 },
        speed: [120, 220], life: [0.35, 0.5], size: [9, 14], rotation: [0, 6.28], color: col,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(400), c.spin(-5, 5), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 }),
    ];
  },
};
