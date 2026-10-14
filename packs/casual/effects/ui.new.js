/** Twinkles keep popping all along a button's edge, with tiny glints and now and then a big star sparkle, marking it as new. Loops until stopped. */
export default {
  name: 'ui.new',
  category: 'ui',
  whenToUse: 'Mark a button, item or card as new or not yet seen: a new skin or item in the shop, a freshly unlocked level or mode, an unread tab, a just-added feature. Play with { el, follow: true } on it and stop it when the player opens it. For a pulsing glow behind a call-to-action use ui.glow; for sparkles circling a special offer use ui.sparkle; for the moment something unlocks use ui.unlock.',
  duration: 1, loop: true, tint: '#ffe66b',
  tags: ['ui', 'new', 'unseen', 'highlight', 'twinkle', 'fresh', 'shop', 'badge'],
  build(c) {
    const col = c.color('#ffe66b');
    const light = c.lighten(col, 0.6);
    // a little outside the element's edge
    const w = c.target.w + 10, h = c.target.h + 10;
    const edge = (t) => ({ type: 'rect', w, h, thickness: t });
    const rate = Math.max(6, Math.min(18, (w + h) / 18));
    return [
      // tiny glints floating up off the edge (a rect emitter takes speed 0; a gentle force moves them)
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: rate * 1.4, shape: edge(0.1),
        speed: 0, life: [0.5, 0.8], size: [5, 8], color: light,
        behaviors: [c.force(0, 40), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate, shape: edge(0.06),
        speed: 0, life: [0.45, 0.7], size: [13, 22], rotation: [0, 0.8], color: ['#ffffff', col],
        behaviors: [c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0], [0.35, 1], [1, 0]]))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 1.6, shape: edge(0),
        speed: 0, life: 0.7, size: [26, 36], rotation: [0, 0.8], color: light,
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0], [0.3, 1.1], [0.45, 0.9], [1, 0]]))], order: 2 }),
    ];
  },
};
