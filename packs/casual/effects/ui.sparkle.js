/** Three bright sparkles chase each other round and round a button over a twinkling halo, for a special offer. Loops until stopped. */
export default {
  name: 'ui.sparkle',
  category: 'ui',
  whenToUse: 'A special offer, sale, bundle or premium item in a shop or menu: sparkles circle around its button or card. Play with { el, follow: true } and stop it when it is bought or closed. For marking an unseen item use ui.new; for a pulsing glow behind a call-to-action use ui.glow; for a sparkle on an object in the game world use state.sparkle.',
  duration: 1, loop: true, tint: '#ffd23f',
  tags: ['ui', 'sparkle', 'offer', 'sale', 'premium', 'orbit', 'shop', 'special'],
  build(c) {
    const col = c.color('#ffd23f');
    const light = c.lighten(col, 0.6);
    const r = Math.max(28, Math.min(150, Math.hypot(c.target.w, c.target.h) * 0.43 + 6));
    // three heads a third of a turn apart; in one 1 s cycle they travel a third of a turn, so the heads born now sit
    // exactly on the ones born a cycle ago, and the two cross-fade (alpha 0 -> 1 -> 0 over two cycles): a seamless,
    // endless chase. The spin is a quarter turn per cycle for the same reason (the spark has four points).
    const turn = (Math.PI * 2) / 3;
    const head = (tex, size, colour, peak, order) => c.sys({ tex, blend: 'add', loop: true, prewarm: true, cut: true, duration: 1,
      bursts: [{ count: 3 }], shape: { type: 'circle', radius: r, thickness: 0, even: true }, speed: 0, life: 2, size, color: colour,
      behaviors: [c.orbit(turn), c.spin(Math.PI / 2), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [peak, 0.5], [0, 1]]))], order });
    return [
      // the halo: fine twinkles drifting round more slowly
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 18, shape: { type: 'circle', radius: r, thickness: 0.2 },
        speed: 0, life: [0.4, 0.7], size: [6, 12], rotation: [0, 0.8], color: ['#ffffff', col],
        behaviors: [c.orbit(turn * 0.5), c.sizeOverLife(c.curve([[0, 0], [0.4, 1], [1, 0]]))], order: 0 }),
      head('glow', 42, col, 0.6, 1),
      head('spark', 30, light, 1, 2),
    ];
  },
};
