/** Dandelion fluff and pollen: soft white seed puffs float slowly sideways and up on a warm breeze, with golden pollen specks and the odd sunlit glint. Loops until stopped. */
export default {
  name: 'env.pollen',
  category: 'env',
  whenToUse: 'A calm sunny meadow or field: a summer or spring level, a farm, a picnic, a peaceful garden or a cosy outdoor menu background, with dandelion fluff and pollen floating slowly sideways and up. Play it once without a position for the whole screen (2D) or the area around the camera (3D); it drifts right (dir 180 drifts left). For falling blossom petals use env.petals; for indoor dust motes use env.dust; for lights at night use env.fireflies.',
  duration: 8, loop: true, anchor: 'center', tint: '#ffffff',
  tags: ['pollen', 'dandelion', 'meadow', 'summer', 'spring', 'field', 'fluff', 'calm', 'ambient'],
  build(c) {
    const col = c.color('#ffffff');
    const gold = c.mix(col, '#ffd23a', 0.65);
    const dir = c.dir === undefined ? 0 : c.dir;
    const side = Math.cos(dir) >= 0 ? 1 : -1;
    const blow = c.is3d ? c.heading(0) : null;
    // the breeze: a fresh list per layer, because behaviours cannot be shared between systems
    const breeze = (wind, lift, wobble) => [c.is3d ? c.wind(blow, wind) : c.force(side * wind, 0), c.force(0, lift), c.limitSpeed(wind + lift, 1), c.noise(0.5, wobble)];
    // 2D: born all over the screen, shifted upwind so the drift keeps every edge filled.
    // Area emitters are rects, so every layer starts at speed 0 and the breeze moves it.
    const area = (p, y) => (c.is3d
      ? c.sys(c.env3d(p, { w: 1100, y }))
      : c.sys(Object.assign({ shape: { type: 'rect', w: c.view.w + 260, h: c.view.h + 80, thickness: 1 }, offset: [-side * 110, -40] }, p)));
    const k = c.is3d ? 2.4 : 1;
    const soft = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.15], [a, 0.8], [0, 1]]));
    return [
      // far, small fluff
      area({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 3 * k, speed: 0, life: [6, 9], size: [4, 7], color: col,
        behaviors: breeze(18, 7, 18).concat([soft(0.6)]), order: 0 }, 50),
      // golden pollen specks
      area({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 6 * k, speed: 0, life: [4, 6], size: [3, 5], color: [gold, c.lighten(gold, 0.4)],
        behaviors: breeze(22, 12, 30).concat([soft(0.85)]), order: 1 }, 30),
      // the dandelion seeds: soft fluffy puffs turning slowly
      area({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 2.2 * k, speed: 0, life: [6, 9], size: [11, 17], rotation: [0, 6.28], color: col,
        behaviors: breeze(26, 10, 26).concat([c.spin(-0.8, 0.8), soft(0.95)]), order: 2 }, 70),
      // a seed catching the sun now and then
      area({ tex: 'spark', blend: 'add', loop: true, prewarm: true, duration: 8, rate: 1.4 * k, speed: 0, life: [0.8, 1.2], size: [8, 14], rotation: [0, 1], color: '#fffbe6',
        behaviors: [c.spin(-1, 1), c.sizeOverLife(c.pop(0.4, 0.5))], order: 3 }, 60),
    ];
  },
};
