/** In love or happy: little hearts float up now and then. Loops until stopped. */
export default {
  name: 'state.love',
  category: 'state',
  whenToUse: 'A pet is happy, a character is in love or charmed, a customer is satisfied, a plant is thriving. Follow the head; stop when the mood ends.',
  duration: 1, loop: true, tint: '#ff5c8a',
  tags: ['love', 'happy', 'hearts', 'charm', 'pet', 'mood', 'status'],
  build(c) {
    const col = c.color('#ff5c8a');
    const light = c.lighten(col, 0.5);
    return [
      c.sys(c.ground({ tex: 'heart', blend: 'normal', loop: true, rate: 3, shape: { type: 'circle', radius: 16 },
        speed: 0, life: [1.0, 1.4], size: [12, 20], color: [light, col],
        behaviors: [c.force(0, 120), c.limitSpeed(80, 1), c.noise(1.5, 10), c.spin(-1, 1), c.sizeOverLife(c.pop(0.15, 0.7)), c.colorOverLife(c.fade(0.7))], order: 1 })),
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: { type: 'circle', radius: 22 },
        speed: 0, life: [0.5, 0.8], size: [5, 10], color: light,
        behaviors: [c.force(0, 90), c.sizeOverLife(c.pop(0.2, 0.5))], order: 2 }),
    ];
  },
};
