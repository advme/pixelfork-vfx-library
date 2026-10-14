/** A sale tag that keeps catching the eye: a bright shine sweeps across it every 1.6 s and ends in a star glint at its corner, while sparkles pop all round its edge over a soft pink-red glow. Loops until stopped. */
export default {
  name: 'ui.sale',
  category: 'ui',
  whenToUse: 'A sale, discount or limited-time price tag in a shop or menu: a -50% sticker, a SALE ribbon, a crossed-out price, a hot-deal or bundle label. Play with { el, follow: true } on the tag (the shine and sparkles fit its size) and stop it when the sale ends or the shop closes. For sparkles circling a whole offer card or premium item use ui.sparkle; for one passing shine use ui.shine; for marking an unseen item use ui.new.',
  duration: 1.6, loop: true, tint: '#ff4f7a',
  tags: ['ui', 'sale', 'discount', 'deal', 'offer', 'price', 'shop', 'shine'],
  build(c) {
    const col = c.color('#ff4f7a');
    const light = c.lighten(col, 0.55);
    const w = Math.max(30, Math.min(360, c.target.w)), h = Math.max(16, Math.min(160, c.target.h));
    const cycle = 1.6, at = 0.15, sweep = 0.45;
    const spark = Math.max(9, Math.min(22, h * 0.35));
    const edge = (t) => ({ type: 'rect', w: w + 8, h: h + 8, thickness: t });
    return [
      // the glow: soft glows fading in and out at random along the tag, so it shimmers gently and never shows a seam.
      // Many faint ones rather than a few bright ones: with only 6 or 7 alive they bunched up and lit one end of the tag
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, cut: true, duration: cycle, rate: Math.max(6, Math.min(16, w / 10)), shape: { type: 'rect', w: w * 0.7, h: 0 },
        speed: 0, life: [1, 1.4], size: [h * 2.1, h * 2.6], color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.13, 0.4], [0.13, 0.6], [0, 1]]))], order: 0 }),
      // the shine: a tall glow squashed along its motion crossing the tag left to right, and a glint riding on it
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: cycle, bursts: [{ time: at, count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: 0, offset: [-w / 2 - 12, 0],
        speed: (w + 24) / sweep, life: sweep, size: h * 1.1, color: '#ffffff',
        stretch: { speed: 0, length: 0.4 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: cycle, bursts: [{ time: at, count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: 0, offset: [-w / 2 - 12, h * 0.22],
        speed: (w + 24) / sweep, life: sweep, size: h * 0.7, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(4), c.sizeOverLife(c.curve([[0, 0.3], [0.5, 1], [1, 0.3]])), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 2 }),
      // the star glint at the top-right corner as the shine leaves ("ting!")
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: cycle, bursts: [{ time: at + sweep - 0.03, count: 1 }], offset: [w / 2 - 2, h / 2 - 2],
        life: 0.5, size: Math.max(22, Math.min(56, h * 0.95)), rotation: 0.2, color: '#ffffff',
        behaviors: [c.spin(2.5), c.sizeOverLife(c.curve([[0, 0], [0.25, 1.1], [0.4, 0.9], [1, 0]]))], order: 3 }),
      // sparkles popping all round the edge at random, white and pink
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: cycle, rate: Math.max(6, Math.min(16, (w + h) / 14)), shape: edge(0.08),
        speed: 0, life: [0.4, 0.6], size: [spark * 0.7, spark * 1.2], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0], [0.35, 1], [1, 0]]))], order: 3 }),
      // and tiny glints drifting up off it
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: cycle, rate: Math.max(4, Math.min(10, w / 16)), shape: edge(0.1),
        speed: 0, life: [0.5, 0.8], size: [4, 7], color: light,
        behaviors: [c.force(0, 40), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 2 }),
    ];
  },
};
