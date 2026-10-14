/** Glowing mushroom spores: soft bioluminescent specks float up from the ground and pulse in the dark, a mushroom puffs out a little cloud of them now and then. Loops until stopped. */
export default {
  name: 'env.spores',
  category: 'env',
  whenToUse: 'A dark, magical place full of fungi (a glowing mushroom forest, a cave grotto, a swamp at night, an alien jungle, an enchanted wood); play it once without a position (rising from the bottom of the screen in 2D, from the ground around the camera in 3D) and use env.fireflies for wandering fireflies, env.embers for fire embers or env.dust for plain dust.',
  duration: 6, loop: true, anchor: 'bottom', tint: '#7cffc4',
  tags: ['spores', 'mushroom', 'glow', 'cave', 'forest', 'bioluminescent', 'night', 'magic'],
  build(c) {
    const col = c.color('#7cffc4');
    const hot = c.lighten(col, 0.5);
    const alt = c.mix(col, '#a98bff', 0.55);
    const pulse = () => c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.35, 0.65], [0.55, 1], [0.75, 0.7], [0.9, 1], [1, 0]]));
    // spores rise slowly and wander (a fresh list for every system)
    const rise = (up, wobble) => [c.force(0, up), c.limitSpeed(up * 1.4, 1), c.noise(0.45, wobble)];
    const spore = (rate, size, colour, life, up, wobble, last, order) => ({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate,
      speed: 0, life, size, color: colour, behaviors: rise(up, wobble).concat([last]), order });
    const floor = (rate, size, a) => ({ tex: 'glow', blend: 'add', loop: true, prewarm: true, duration: 6, rate,
      speed: 0, life: [5, 7], size, color: col,
      behaviors: [c.noise(0.2, 20), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.35], [a, 0.65], [0, 1]]))], order: 0 });
    // a mushroom puffs: a little cloud of spores shoots up and spreads (in 3D it stays where it was released)
    const puff = (at, t0) => c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, duration: 6, world: c.is3d, bursts: [{ time: t0, count: [9, 12] }],
      shape: { type: 'cone', radius: 6, angle: 0.8 }, dir: Math.PI / 2, offset: at, speed: [40, 95], life: [2.4, 3.4], size: [4, 8], color: [hot, col],
      behaviors: [c.speedOverLife(c.decel(0.12)), c.force(0, 12), c.noise(0.6, 16), c.sizeOverLife(c.curve([[0, 0.4], [0.1, 1], [0.7, 0.8], [1, 0]]))], order: 4 }));
    if (c.is3d) {
      return [
        c.sys(c.env3d(floor(1.5, [360, 520], 0.1), { w: 1200, y: 8 })),
        c.sys(c.env3d(spore(7, [16, 24], [col, alt], [6, 8], 18, 40, c.colorOverLife(c.fadeInOut(0.15, 0.75)), 1), { w: 1100, y: 10 })),
        c.sys(c.env3d(spore(10, [6, 10], hot, [6, 8], 22, 32, pulse(), 2), { w: 1100, y: 10 })),
        c.sys(c.env3d(spore(16, [2.5, 4], [col, alt], [3, 5], 26, 24, c.colorOverLife(c.fadeInOut(0.2, 0.8)), 3), { w: 1100, y: 40 })),
        puff([-220, 0, -140], 1.2),
        puff([240, 0, 160], 4.1),
      ];
    }
    const w = c.view.w, h = c.view.h;
    const air = { type: 'rect', w, h: h * 0.85, thickness: 1 };
    return [
      c.sys(Object.assign(floor(1, [170, 260], 0.2), { shape: { type: 'rect', w: w + 40, h: 0 } })),
      c.sys(Object.assign(spore(4, [16, 26], [col, alt], [5, 7], 16, 34, c.colorOverLife(c.fadeInOut(0.15, 0.75)), 1), { shape: air, offset: [0, h * 0.42] })),
      c.sys(Object.assign(spore(6, [6, 11], hot, [5, 7], 20, 30, pulse(), 2), { shape: air, offset: [0, h * 0.42] })),
      c.sys(Object.assign(spore(10, [2.5, 4], [col, alt], [3, 5], 26, 22, c.colorOverLife(c.fadeInOut(0.2, 0.8)), 3), { shape: air, offset: [0, h * 0.42] })),
      puff([-w * 0.28, 6], 1.2),
      puff([w * 0.3, 6], 4.1),
    ];
  },
};
