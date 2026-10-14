/** Burnt food: thick dark smoke curls up off it in slow billows, thin grey wisps twist through it, a dull red smoulder glows underneath and a few dim embers drift up. Loops until stopped. */
export default {
  name: 'state.burnt',
  category: 'state',
  whenToUse: 'Food is burnt or a dish is ruined in a cooking or restaurant game: a steak left on the grill too long, a charred cake out of the oven, toast that went black, a failed recipe smoking on the plate. Play it on the food and stop it when the dish is thrown away or replaced. For flames use state.burning; for a damaged machine or car smoking use state.smoke; for food frying normally use world.cooking.',
  duration: 1, loop: true, tint: '#3d3532',
  tags: ['burnt', 'burned', 'charred', 'smoke', 'ruined', 'fail', 'cooking', 'food'],
  build(c) {
    const col = c.color('#3d3532');
    const wisp = c.lighten(col, 0.3);
    // across the food: a row in 2D, a disc lying on the dish in 3D
    const area = () => (c.is3d ? { type: 'circle', radius: 22 } : { type: 'rect', w: 50, h: 0 });
    return [
      // a dull red smoulder under the char, breathing slowly. It lives 0.1 s past each cycle and fades in and out over
      // that overlap, so the old and the new glow cross-fade instead of blinking brighter once a second
      c.sys({ tex: 'glow', blend: 'add', loop: true, bursts: [{ count: 1 }], life: 1.1, size: 80, color: '#b8401c',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.12, 0.09], [0.24, 0.5], [0.12, 0.91], [0, 1]]))], order: 0 }),
      // thick dark smoke billowing up and curling (it stays behind if the dish is carried)
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 7, shape: area(),
        speed: 0, life: [1.3, 1.8], size: [20, 30], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.force(0, 90), c.limitSpeed(65, 1), c.noise(1.1, 20), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.4], [1, 2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.85, 0.15], [0.55, 0.6], [0, 1]]))], order: 1 })),
      // thin grey wisps twisting up faster through the billows
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 5, shape: area(),
        speed: 0, life: [1.0, 1.3], size: [10, 15], rotation: [0, 6.28], color: wisp,
        behaviors: [c.force(0, 130), c.limitSpeed(95, 1), c.noise(2.2, 28), c.spin(-2.5, 2.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 1.8]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0.3, 0.6], [0, 1]]))], order: 2 })),
      // black soot flecks lifted by the smoke
      c.sys(c.ground({ tex: 'square', blend: 'normal', loop: true, rate: 4, shape: area(),
        speed: 0, life: [0.8, 1.1], size: [3, 5], rotation: [0, 6.28], color: ['#1e1a19', '#2e2826'],
        behaviors: [c.force(0, 100), c.limitSpeed(70, 1), c.noise(2, 16), c.spin(-6, 6), c.colorOverLife(c.fadeInOut(0.15, 0.6))], order: 3 })),
      // a few dim embers glowing up out of the char
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 3, shape: area(),
        speed: 0, life: [0.6, 0.9], size: [4, 6], color: ['#d9622b', '#a8401a'],
        behaviors: [c.force(0, 120), c.limitSpeed(60, 1), c.noise(2.5, 10), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fadeInOut(0.1, 0.5))], order: 4 })),
    ];
  },
};
