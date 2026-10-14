/** Northern lights: soft green curtains of light with a violet fringe hang across the top of the sky, slowly waving and shimmering. Loops until stopped. */
export default {
  name: 'env.aurora',
  category: 'env',
  whenToUse: 'A magical or arctic night sky with the northern lights (a snowy village at night, a polar level, a calm camp under the stars, a dreamy menu or ending); play it once without a position and it hangs across the top of the screen (in 3D above the spot the camera looks at), pair it with env.stars or env.snow, and use env.spirits for drifting ghost lights instead.',
  duration: 8, loop: true, anchor: 'top', tint: '#46f2a0',
  tags: ['aurora', 'northern lights', 'night', 'sky', 'arctic', 'winter', 'magic', 'calm'],
  build(c) {
    const col = c.color('#46f2a0');
    const teal = c.mix(col, '#3fd2ff', 0.45);
    const violet = c.mix(col, '#b45cff', 0.8);
    // the sky band: across the top of the screen in 2D; in 3D a sheet facing the camera, above the spot it looks at
    const W = c.is3d ? 1500 : c.view.w + 160;
    const top = c.is3d ? 300 : -c.view.h * 0.07;
    const k = c.is3d ? 1.25 : 1;
    const band = (h) => ({ type: 'rect', w: W, h, thickness: 1 });
    const glowA = (a, inT, outT) => c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, inT], [a, outT], [0, 1]]);
    // curtain rays: particles creep slowly UP, so each stretched glow hangs DOWN from its particle like a curtain fold
    const rays = (rate, size, length, y, h, colour, a, order) => c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate,
      shape: band(h), offset: [0, y], speed: 0, life: [4, 6], size, color: colour, stretch: { speed: 0, length },
      behaviors: [c.force(0, 20), c.limitSpeed(6, 1), c.noise(0.22, 30 * k), c.colorOverLife(glowA(a, 0.3, 0.62))], order });
    return [
      // the soft wash of light behind the curtains
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 1.2, shape: band(90), offset: [0, top - 110],
        speed: 0, life: [6, 8], size: [220 * k, 320 * k], color: [col, teal],
        behaviors: [c.noise(0.15, 40 * k), c.colorOverLife(glowA(0.13, 0.3, 0.7))], order: 0 }),
      rays(7, [26 * k, 42 * k], 5, top - 24, 50, [col, teal], 0.3, 1),
      // the violet fringe along the top edge
      rays(4, [20 * k, 32 * k], 3.2, top + 10, 36, violet, 0.26, 2),
      // shimmering glints in the light
      c.sys({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 3, shape: band(150), offset: [0, top - 90],
        speed: 0, life: [0.8, 1.6], size: [6 * k, 12 * k], rotation: [0, 0.8], color: c.lighten(col, 0.6),
        behaviors: [c.noise(0.3, 10), c.sizeOverLife(c.curve([[0, 0], [0.25, 1], [0.45, 0.4], [0.65, 1], [1, 0]]))], order: 3 }),
    ];
  },
};
