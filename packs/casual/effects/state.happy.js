/** Happy: little hearts pop up over the character with a sparkle. */
export default {
  name: 'state.happy',
  category: 'state',
  whenToUse: 'A quick happy reaction: a pet is petted or fed, a character likes a gift, a villager is pleased, a correct choice in a dating or care game. Play it at the head. For a lasting in-love state use state.love.',
  duration: 0.9, loop: false, tint: '#ff5c8a',
  tags: ['happy', 'joy', 'love', 'pet', 'cute', 'pleased', 'hearts', 'emotion', 'status'],
  build(c) {
    const col = c.color('#ff5c8a');
    return [
      c.sys({ tex: 'heart', blend: 'normal', bursts: [{ count: 3 }, { time: 0.12, count: 2 }], shape: { type: 'cone', radius: 18, angle: 0.6 },
        speed: [90, 150], life: [0.6, 0.75], size: [16, 24], rotation: [-0.3, 0.3], color: [col, c.lighten(col, 0.3)],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.curve([[0, 0], [0.15, 1.2], [0.3, 1], [0.8, 1], [1, 0]]))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 30 },
        speed: [20, 50], life: [0.4, 0.55], size: [10, 15], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 }),
    ];
  },
};
