/** Too spicy! Little flames flicker on top of the head, steam whistles out of the ears in quick alternating jets, a red-hot flush throbs and hot sparks fly up. Loops until stopped. */
export default {
  name: 'state.spicy',
  category: 'state',
  whenToUse: 'A character has just eaten something very spicy in a cooking, food or eating game: a hot chilli or pepper, a fiery curry, a spicy-food challenge, a customer who got too much hot sauce, a dragon-breath gag. Follow the head and stop it when they cool down; tint it green for wasabi. For heat from the sun, a desert or a fever use state.overheat; for being cross use state.angry; for really being on fire use state.burning.',
  duration: 1, loop: true, anchor: 'head', tint: '#ff4a1f',
  tags: ['spicy', 'hot', 'chilli', 'pepper', 'steam', 'flames', 'food', 'mood'],
  build(c) {
    const col = c.color('#ff4a1f');
    const hot = c.mix(col, '#ffe14a', 0.6);
    // one whistle = a quick jet of three puffs; three a second from each ear, the ears taking turns
    const huff = (t) => ({ time: t, count: 1, cycle: 3, interval: 0.035 });
    const ear = (side, times) => c.sys({ tex: 'puff', blend: 'normal', loop: true, bursts: times.map(huff),
      shape: { type: 'cone', radius: 3, angle: 0.2 }, dir: side > 0 ? Math.PI * 0.22 : Math.PI * 0.78, offset: [side * 22, -20],
      speed: [200, 280], life: [0.38, 0.48], size: [11, 15], rotation: [0, 6.28], color: ['#ffffff', c.lighten(col, 0.85)],
      behaviors: [c.speedOverLife(c.decel(0.08)), c.force(0, 70), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1.3], [1, 2.2]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.95, 0], [0.8, 0.5], [0, 1]]))], order: 2 });
    // across the top of the head: a row in 2D, a small disc lying on the head in 3D
    const crown = () => (c.is3d ? { type: 'circle', radius: 12 } : { type: 'rect', w: 34, h: 0 });
    return [
      // the red-hot flush over the head, throbbing twice a second. It lives 0.1 s past each cycle and fades in and out
      // over that overlap, so the old and the new glow cross-fade instead of flashing at the hand-over
      c.sys({ tex: 'glow', blend: 'add', loop: true, bursts: [{ count: 1 }], life: 1.1, offset: [0, -24], size: 115, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.25, 1.06], [0.5, 0.92], [0.75, 1.06], [1, 0.9]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.2, 0.09], [0.38, 0.27], [0.22, 0.5], [0.38, 0.73], [0.2, 0.91], [0, 1]]))], order: 0 }),
      ear(1, [0, 0.333, 0.667]),
      ear(-1, [0.167, 0.5, 0.833]),
      // little flames flickering on top of the head
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 20, shape: crown(), offset: [0, -4],
        speed: 0, life: [0.3, 0.45], size: [15, 24], color: [hot, col],
        behaviors: [c.force(0, 220), c.limitSpeed(120, 1), c.noise(4, 6), c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 3 })),
      // hot sparks flying up off the flames
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 8, shape: crown(), offset: [0, 2],
        speed: 0, life: [0.4, 0.6], size: [3, 5], color: hot,
        behaviors: [c.force(0, 260), c.limitSpeed(170, 1), c.noise(4, 12), c.colorOverLife(c.fade(0.5))], order: 4 })),
    ];
  },
};
