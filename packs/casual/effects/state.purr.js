/** Purring: soft purr ripples pulse around the head while small hearts and gentle sparkles float up slowly. Loops until stopped. */
export default {
  name: 'state.purr',
  category: 'state',
  whenToUse: 'A pet is calm and content: a cat purring on a lap, a dog being stroked, a hamster cuddled, a pet resting happily after care in a pet or virtual-pet game. Follow the head; stop it when the petting ends. For a lovestruck or charmed character use state.love; for a quick happy pop use state.happy.',
  duration: 1.2, loop: true, anchor: 'head', tint: '#ff7eb6',
  tags: ['purr', 'content', 'pet', 'cat', 'cuddle', 'calm', 'hearts', 'cozy', 'status'],
  build(c) {
    const col = c.color('#ff7eb6');
    const light = c.lighten(col, 0.45);
    return [
      // a warm glow behind the head, breathing slowly
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], offset: [0, -12], life: 1.2, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.14, 0], [0.26, 0.5], [0.14, 1]]))], order: 0 }),
      // the purr itself: two soft ripples a cycle, rumbling out from the head
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.2, bursts: [{ time: 0, count: 1 }, { time: 0.6, count: 1 }], offset: [0, -12], life: 0.55, size: 96, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.45, 0.2], [0, 1]]))], order: 1 }),
      // small hearts drifting up, swaying
      c.sys(c.ground({ tex: 'heart', blend: 'normal', loop: true, world: true, rate: 2, shape: { type: 'circle', radius: 18 }, offset: [0, 6],
        speed: 0, life: [1.6, 2], size: [10, 15], rotation: [-0.3, 0.3], color: [col, light],
        behaviors: [c.force(0, 70), c.limitSpeed(36, 1), c.noise(1.2, 9), c.spin(-0.5, 0.5),
          c.sizeOverLife(c.curve([[0, 0], [0.15, 1.15], [0.25, 1], [0.8, 1], [1, 0]])), c.colorOverLife(c.fade(0.75))], order: 2 })),
      // gentle sparkles twinkling around the head
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 4, shape: { type: 'circle', radius: 30 }, offset: [0, -6],
        speed: 0, life: [0.6, 0.9], size: [7, 11], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 40), c.limitSpeed(25, 1), c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }),
    ];
  },
};
