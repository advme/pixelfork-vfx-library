/** A pot on the boil: fat bubbles swell and pop across the surface, little bubbles bob up and burst, ripples spread where they pop, droplets jump and soft steam puffs curl up. Loops until stopped. */
export default {
  name: 'world.boil',
  category: 'world',
  whenToUse: 'A pot of soup, stew, pasta water or a kettle is boiling on the stove in a cooking or restaurant game: water coming to the boil, soup simmering while the order cooks. Play it on the liquid\'s surface, leave it running while it boils and tint it to the soup colour (it is clear water by default). For a witch\'s brew or potion use world.cauldron; for food frying in a pan use world.cooking; for a jet of steam from a vent use world.steam.',
  duration: 1, loop: true, tint: '#9ee6ff',
  tags: ['boil', 'boiling', 'pot', 'soup', 'bubbles', 'kettle', 'cooking', 'kitchen'],
  build(c) {
    const col = c.color('#9ee6ff');
    const light = c.lighten(col, 0.55);
    // across the surface: a row in 2D, a disc lying on the liquid in 3D
    const area = () => (c.is3d ? { type: 'circle', radius: 38 } : { type: 'rect', w: 84, h: 0 });
    // ripples lie on the liquid: flat in 3D (not snapped down to the floor), an ellipse seen from the side in 2D
    const ripple = (p) => (c.is3d ? c.sys(c.flat(c.ground(Object.assign({ tex: 'ring' }, p)), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // ripples spreading where bubbles burst
      ripple({ blend: 'normal', loop: true, rate: 7, shape: area(), speed: 0, life: [0.35, 0.5], size: [20, 30], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0, 1]]))], order: 0 }),
      // soft steam curling up off the pot
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 5, shape: area(),
        speed: 0, life: [1.0, 1.4], size: [16, 24], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.force(0, 90), c.limitSpeed(60, 1), c.noise(1.2, 16), c.spin(-1.2, 1.2), c.sizeOverLife(c.curve([[0, 0.4], [1, 2.1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.6, 0.2], [0.35, 0.6], [0, 1]]))], order: 1 })),
      // fat bubbles swelling on the surface, then popping
      c.sys(c.ground({ tex: 'disc', blend: 'normal', loop: true, rate: 14, shape: area(),
        speed: 0, life: [0.4, 0.65], size: [9, 17], color: [light, col],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [0.85, 1], [0.92, 1.3], [1, 0]]))], order: 2 })),
      // little bubbles bobbing up out of the boil and bursting
      c.sys(c.ground({ tex: 'ring', blend: 'normal', loop: true, rate: 12, shape: area(),
        speed: 0, life: [0.35, 0.5], size: [5, 9], color: ['#ffffff', light],
        behaviors: [c.force(0, 110), c.limitSpeed(50, 1), c.noise(2, 6), c.sizeOverLife(c.curve([[0, 0.3], [0.8, 1], [0.9, 1.3], [1, 0]]))], order: 3 })),
      // droplets jumping out where the bubbles burst
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, rate: 8, shape: { type: 'cone', radius: 34, angle: 0.5 }, dir: Math.PI / 2,
        speed: [90, 160], life: [0.25, 0.36], size: [3, 5], color: [col, light],
        behaviors: [c.gravity(1000), c.colorOverLife(c.fade(0.6))], order: 4 }, 'up')),
    ];
  },
};
