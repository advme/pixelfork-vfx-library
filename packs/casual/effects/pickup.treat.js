/** A treat: a chomp of crumbs sprays out, one big heart bounces up from the pet, a happy sparkle pops and a warm ring flashes. */
export default {
  name: 'pickup.treat',
  category: 'pickup',
  whenToUse: 'A pet is given a treat as a reward: a dog biscuit for a trick, a fish for a cat, a carrot for a bunny, a snack in a pet-care, pet-training or virtual-pet game. Play it at the pet\'s mouth; tint it to the treat colour. For a character eating a meal or collecting food use pickup.food.',
  duration: 0.65, loop: false, tint: '#e8a24a',
  tags: ['treat', 'pet', 'snack', 'biscuit', 'reward', 'feed', 'dog', 'cat'],
  build(c) {
    const col = c.color('#e8a24a');
    const light = c.lighten(col, 0.5);
    const heart = '#ff5c8a';
    return [
      // a warm flash and a quick ring: the "yum"
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // crumbs of the treat, chomped out and tumbling down
      c.sys(c.vol({ tex: 'square', blend: 'normal', bursts: [{ count: [7, 8] }, { time: 0.08, count: [5, 6] }], shape: { type: 'circle', radius: 8 },
        speed: [140, 280], life: [0.4, 0.55], size: [4, 8], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.speedOverLife(c.decel(0.4)), c.gravity(1100), c.spin(-8, 8), c.colorOverLife(c.fade(0.7))], order: 2 })),
      // one big heart bouncing up out of the pet (camera-facing in 3D, so it shows in front of the pet's body)
      c.sys({ tex: 'heart', blend: 'normal', bursts: [{ time: 0.04, count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir: Math.PI / 2,
        speed: 150, life: 0.6, size: 30, color: heart,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.curve([[0, 0], [0.15, 1.3], [0.25, 0.9], [0.35, 1.05], [0.75, 1], [1, 0]])), c.colorOverLife(c.fade(0.75))], order: 4 }),
      // a couple of little hearts fanning out beside it
      c.sys({ tex: 'heart', blend: 'normal', bursts: [{ time: 0.1, count: [2, 3] }], shape: { type: 'cone', radius: 10, angle: 0.75 }, dir: Math.PI / 2,
        speed: [120, 180], life: [0.42, 0.5], size: [13, 17], rotation: [-0.4, 0.4], color: [heart, c.lighten(heart, 0.3)],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.2, 0.7)), c.colorOverLife(c.fade(0.7))], order: 4 }),
      // the happy sparkle pop around it
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.04, count: [5, 6] }], shape: { type: 'circle', radius: 12, thickness: 0, even: true },
        speed: [90, 160], life: [0.3, 0.42], size: [10, 15], color: '#fff6c8',
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 })),
    ];
  },
};
