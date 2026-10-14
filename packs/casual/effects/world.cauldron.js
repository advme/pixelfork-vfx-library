/** A bubbling cauldron: fat potion bubbles swell and pop on a glowing surface, droplets jump, coloured steam curls up and magic glints rise. Loops until stopped. */
export default {
  name: 'world.cauldron',
  category: 'world',
  whenToUse: 'A witch\'s cauldron or potion pot bubbling: brewing a potion, an alchemy or crafting station, a magic soup, a bubbling vat of slime in a lab. Play it on the liquid\'s surface and leave it running; tint it to the potion colour. For lava or molten metal use world.lava; for food frying in a pan use world.cooking.',
  duration: 1.2, loop: true, tint: '#79e04b',
  tags: ['cauldron', 'potion', 'brew', 'witch', 'alchemy', 'bubbling', 'magic', 'crafting'],
  build(c) {
    const col = c.color('#79e04b');
    const light = c.lighten(col, 0.5);
    // across the surface: a row in 2D, a disc lying on the liquid in 3D
    const area = () => (c.is3d ? { type: 'circle', radius: 42 } : { type: 'rect', w: 92, h: 0 });
    return [
      // the glowing surface (3D: lies at the liquid's height, not snapped down to the floor). It lives 0.06 s longer
      // than a cycle and fades in and out over exactly that overlap, so the old and new glow cross-fade without a blink
      c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.26, size: 160, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.05], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.4, 0.048], [0.55, 0.5], [0.4, 0.952], [0, 1]]))], order: 0 }, { snap: false })),
      // coloured steam curling up
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 5, shape: area(),
        speed: 0, life: [1.2, 1.6], size: [18, 28], rotation: [0, 6.28], color: c.lighten(col, 0.55),
        behaviors: [c.force(0, 80), c.limitSpeed(60, 1), c.noise(1, 16), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.4], [1, 2.2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0.35, 0.6], [0, 1]]))], order: 1 })),
      // fat bubbles: swell, then pop
      c.sys(c.ground({ tex: 'disc', blend: 'normal', loop: true, rate: 10, shape: area(),
        speed: 0, life: [0.5, 0.8], size: [10, 20], color: [light, col],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [0.85, 1], [0.92, 1.3], [1, 0]]))], order: 2 })),
      // droplets jumping out where bubbles pop
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, rate: 7, shape: { type: 'cone', radius: 38, angle: 0.5 }, dir: Math.PI / 2,
        speed: [90, 170], life: [0.25, 0.38], size: [3, 6], color: [col, light],
        behaviors: [c.gravity(1000), c.colorOverLife(c.fade(0.6))], order: 3 }, 'up')),
      // magic glints rising out of the brew
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 5, shape: area(),
        speed: 0, life: [0.8, 1.2], size: [7, 12], rotation: [0, 1], color: [light, '#ffffff'],
        behaviors: [c.force(0, 120), c.limitSpeed(80, 1), c.noise(1.5, 10), c.spin(1.5), c.sizeOverLife(c.pop(0.25, 0.6))], order: 4 })),
    ];
  },
};
