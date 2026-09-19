/** A glint sweeping across a button or card, left to right. */
export default {
  name: 'ui.shine',
  category: 'ui',
  whenToUse: 'Draw attention to a button, card or banner with a passing shine: Play, Claim, a new offer. Play with { el }; the sweep fits the element width.',
  duration: 0.7, loop: false, tint: '#ffffff',
  tags: ['ui', 'shine', 'glint', 'sweep', 'highlight', 'attention'],
  build(c) {
    const col = c.color('#ffffff');
    const w = c.target.w, h = c.target.h;
    const speed = (w + 40) / 0.5;
    return [
      // the sweep: a tall stretched glow crossing the element
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: 0, offset: [-w / 2 - 20, 0],
        speed, life: 0.5, size: h * 0.9, color: col,
        stretch: { speed: 0, length: 0.5 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 1 }),
      // a sparkle riding at the front
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: 0, offset: [-w / 2 - 20, -h * 0.25],
        speed, life: 0.5, size: h * 0.7, color: col, rotation: 0.3,
        behaviors: [c.spin(3), c.sizeOverLife(c.curve([[0, 0.3], [0.5, 1], [1, 0.3]])), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 2 }),
    ];
  },
};
