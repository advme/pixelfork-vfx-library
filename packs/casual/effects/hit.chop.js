/** A knife chop on a cutting board: a quick white slice flashes down through the food, chunky diced bits hop up and tumble, a little juice sprays and a thunk ring spreads on the board. */
export default {
  name: 'hit.chop',
  category: 'hit',
  whenToUse: 'A knife chops or slices food on a cutting board in a cooking or restaurant game: dicing a carrot, slicing a tomato or an onion, cutting fruit, one tap of a chopping mini-game. Play it on the food at the moment the blade lands, once per chop, and tint it to the food colour. For an axe chopping a tree use gather.wood; for a sword slash in a fight use hit.slash.',
  duration: 0.5, loop: false, tint: '#ff7b2e',
  tags: ['chop', 'knife', 'slice', 'cut', 'dice', 'cooking', 'kitchen', 'vegetable'],
  build(c) {
    const col = c.color('#ff7b2e');
    const light = c.lighten(col, 0.45);
    const juice = c.lighten(col, 0.2);
    // the ring lies on the board: flat in 3D, the same ring seen from the side (an ellipse) in 2D. The board sits on a
    // counter above the game's floor, so in 3D it stays at the height it was played at instead of snapping down to the floor
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // the thunk of the blade on the board
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.3, size: 120, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [0, 1]]))], order: 0 }),
      // a quick bright flash where the blade bites
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 80, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the slice: white streaks flashing straight down through the food (they start above it and trail back up)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 3 }], shape: { type: 'cone', radius: 2, angle: 0.02 }, dir: -Math.PI / 2, offset: [0, 34],
        speed: [880, 960], life: 0.1, size: [10, 13], color: '#ffffff', stretch: { speed: 0.006, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 54, rotation: 0.2, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.3, 1], [1, 0]]))], order: 5 }),
      // chunky diced bits hopping up off the board and tumbling (solid little cubes in 3D)
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [7, 9] }], shape: { type: 'cone', radius: 10, angle: 0.6 }, dir: Math.PI / 2,
        speed: [220, 380], life: [0.4, 0.52], size: [9, 14], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(1400), c.spin(-10, 10), c.colorOverLife(c.fade(0.65))], order: 3 }, 'up'), 'box')),
      // a little spray of juice
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 14] }], shape: { type: 'cone', radius: 6, angle: 1.0 }, dir: Math.PI / 2,
        speed: [240, 460], life: [0.3, 0.42], size: [3, 6], color: [juice, light], stretch: { speed: 0.006, length: 1.3 },
        behaviors: [c.gravity(1500), c.colorOverLife(c.fade(0.6))], order: 2 }, 'up')),
    ];
  },
};
