/** Invincibility: rainbow stars stream off the character while a glow cycles through the colours. Loops until stopped. */
export default {
  name: 'state.rainbow',
  category: 'state',
  whenToUse: 'The player is invincible or super-powered for a short time: a star power-up, a fever or rush mode, a rainbow road, a hyper state. Follow the character; stop it when the power ends. For a calm magical sparkle use state.sparkle.',
  duration: 1, loop: true,
  tags: ['invincible', 'star', 'rainbow', 'powerup', 'fever', 'super', 'platformer', 'status'],
  build(c) {
    const colours = ['#ff4f6b', '#ffb02e', '#ffe14d', '#4dff9a', '#47b6ff', '#b45cff'];
    const stars = colours.map((col) => c.sys(c.vol({ tex: 'star', blend: 'add', loop: true, world: true, rate: 5, shape: { type: 'circle', radius: 34 },
      speed: [20, 70], life: [0.5, 0.75], size: [10, 16], rotation: [0, 6.28], color: col,
      behaviors: [c.gravity(160), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.7, 0.8], [1, 0]]))], order: 2 })));
    return stars.concat([
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 130, color: '#ffffff',
        behaviors: [c.colorOverLife(c.grad(colours.map((col, i) => [col, i / (colours.length - 1)]), [[0.5, 0], [0.5, 1]]))], order: 0 }),
    ]);
  },
};
