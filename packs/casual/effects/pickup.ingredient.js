/** Plop! An ingredient lands in the bowl: a quick flash, two coloured splash rings spread on the surface, a little crown of drops and diced bits jumps out and a couple of glints twinkle. */
export default {
  name: 'pickup.ingredient',
  category: 'pickup',
  whenToUse: 'An ingredient is dropped or added into a bowl, pot or pan in a cooking or restaurant game: a tomato tossed into the soup, an egg cracked into the batter, a spice added to the mix, one recipe step done. Play it on the surface where it lands and tint it to the mixture colour. For a character eating food use pickup.food; for something big falling into water use move.splash.',
  duration: 0.5, loop: false, tint: '#ffad42',
  tags: ['ingredient', 'add', 'drop', 'bowl', 'pot', 'recipe', 'cooking', 'plop'],
  build(c) {
    const col = c.color('#ffad42');
    const light = c.lighten(col, 0.5);
    const deep = c.darken(col, 0.2);
    // rings lie on the mixture: flat in 3D (not snapped down to the floor), an ellipse seen from the side in 2D
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 70, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // two splash rings spreading on the surface
      ring({ blend: 'normal', bursts: [{ count: 1 }, { time: 0.08, count: 1 }], life: 0.4, size: [80, 95], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.6, 0.5], [0, 1]]))], order: 1 }),
      // a little crown of drops
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 13] }], shape: { type: 'cone', radius: 10, angle: 0.6 }, dir: Math.PI / 2,
        speed: [180, 320], life: [0.32, 0.45], size: [5, 9], color: [col, light], stretch: { speed: 0.004, length: 1.3 },
        behaviors: [c.gravity(1400), c.sizeOverLife(c.curve([[0, 1], [0.8, 0.9], [1, 0]]))], order: 3 }, 'up')),
      // diced bits of the mix jumping out and tumbling back in
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [4, 6] }], shape: { type: 'cone', radius: 8, angle: 0.7 }, dir: Math.PI / 2,
        speed: [160, 280], life: [0.38, 0.5], size: [6, 9], rotation: [0, 6.28], color: [col, deep],
        behaviors: [c.gravity(1300), c.spin(-10, 10), c.colorOverLife(c.fade(0.8))], order: 2 }, 'up'), 'box')),
      // a couple of fresh glints
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [2, 3] }], shape: { type: 'circle', radius: 24 },
        speed: [20, 50], life: [0.3, 0.4], size: [10, 15], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 80), c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 }),
    ];
  },
};
