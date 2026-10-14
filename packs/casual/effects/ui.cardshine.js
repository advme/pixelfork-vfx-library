/** A holographic card shimmers: a leaning rainbow band led by a white glare sweeps across it every cycle, glints ride along with it and pastel twinkles sparkle over its face. Loops until stopped. */
export default {
  name: 'ui.cardshine',
  category: 'ui',
  whenToUse: 'A rare, foil or holographic card is on show and should keep shimmering (in a hand, a collection or album, a deck builder, a card-pack result screen): play it with { el, follow: true } on the card and stop it when the card is put away; for the one-off moment a card is revealed use reward.cardreveal, for a single passing glint on a button use ui.shine, for sparkles circling a shop offer use ui.sparkle.',
  duration: 1.8, loop: true, tint: null,
  tags: ['ui', 'card', 'holo', 'holographic', 'foil', 'rare', 'rainbow', 'shine'],
  build(c) {
    // the card's size; with no element given (or in 3D) a playing card of 90 x 126. Without an element the
    // target is the default 120 x 48 box divided by the effect size, so it is told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const w = plain ? 90 : Math.max(30, c.target.w);
    const h = plain ? 126 : Math.max(30, c.target.h);
    // the rainbow stripes, front to back (a tint makes it a one-colour foil instead)
    const stripes = c.tint
      ? [c.lighten(c.tint, 0.65), c.lighten(c.tint, 0.2), c.tint, c.lighten(c.tint, 0.4), c.darken(c.tint, 0.1)]
      : ['#ff6fae', '#ffd45c', '#6dffb0', '#5cc8ff', '#b98bff'];
    const pastel = c.tint ? [c.lighten(c.tint, 0.5), c.lighten(c.tint, 0.8)] : ['#ff9fd0', '#8fe9ff'];
    // one cycle: a sweep, then a pause where only the twinkles play
    const T = 1.8, t0 = 0.1, life = 0.7;
    // the band travels a little downhill, so it leans like light on a tilted card
    const a = -0.35;
    // it runs from the card's left part to its right part and fades at both ends, so it never shines on the table
    const reach = w * 0.42;
    const speed = (2 * reach) / life;
    const size = h * 1.05;
    // the stripes march in a tight row along the travel; the group is centred on its path
    const gap = Math.max(4, Math.min(w, h) * 0.07);
    const n = stripes.length + 1;
    // a stretched sprite trails BACK from its particle, so each particle leads by half its band's length.
    // stretch.speed is a hair above 0 on purpose: at exactly 0 three.quarks swaps in 0.001 x the speed in
    // screen px, which in 2D made every stripe 2-3 times thicker than `len` and smeared the band into one blob
    const stripe = (colour, k, len, peak, order) => {
      const s = -reach + (size * len) / 2 + ((n - 1) / 2 - k) * gap;
      return c.sys({ tex: 'glow', blend: 'add', loop: true, duration: T, bursts: [{ time: t0, count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: a,
        offset: [Math.cos(a) * s, Math.sin(a) * s], speed, life, size, color: colour, stretch: { speed: 1e-6, length: len },
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [peak, 0.25], [peak, 0.7], [0, 1]]))], order });
    };
    // the card's face, a little inside its edge (a rect emitter takes speed 0)
    const face = { type: 'rect', w: w * 0.85, h: h * 0.85, thickness: 1 };
    const rate = Math.max(5, Math.min(16, (w * h) / 1200));
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: T, rate: rate * 0.8, shape: face, speed: 0, life: [0.4, 0.7], size: [5, 9], color: pastel,
        behaviors: [c.colorOverLife(c.fadeInOut(0.3, 0.6))], order: 0 }),
      ...stripes.map((colour, i) => stripe(colour, i + 1, 0.12, 0.5, 1)),
      // the white glare leading the rainbow
      stripe('#ffffff', 0, 0.16, 0.75, 2),
      // glints riding along with the band (a cone's base lies across its travel, so they start spread along the band)
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: T, bursts: [{ time: t0 + 0.04, count: 4 }], shape: { type: 'cone', radius: h * 0.4, angle: 0 }, dir: a,
        offset: [-Math.cos(a) * reach, -Math.sin(a) * reach], speed, life: [0.45, 0.6], size: [10, 18], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.4], [0.65, 1], [1, 0]]))], order: 3 }),
      // twinkles popping all over the face between sweeps
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: T, rate, shape: face, speed: 0, life: [0.35, 0.6], size: [8, 14], rotation: [0, 0.8], color: ['#ffffff', pastel[1]],
        behaviors: [c.spin(-1.5, 1.5), c.sizeOverLife(c.pop(0.35, 0.5))], order: 4 }),
    ];
  },
};
