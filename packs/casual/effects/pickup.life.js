/** A 1-UP: a big green heart pops up and floats away with a glow behind it, a ring flashes, sparkles burst and plus signs rise. */
export default {
  name: 'pickup.life',
  category: 'pickup',
  whenToUse: 'An extra life is collected: a 1-UP, a green mushroom, an extra-try heart, one more life added to the lives counter. Play it where the item was. For a health refill, a love moment or a pet use pickup.heart; for a healing spell use magic.heal.',
  duration: 0.7, loop: false, tint: '#45e06a',
  tags: ['life', '1up', 'extra life', 'heart', 'lives', 'retry', 'platformer', 'pickup'],
  build(c) {
    const col = c.color('#45e06a');
    const light = c.lighten(col, 0.55);
    // the heart and its glow fly the same path: one straight-up launch, slowing down. They stay
    // camera-facing (no c.spray) so in 3D they are drawn in front of the character, not inside it
    const heart = (p) => c.sys(Object.assign({ tex: 'heart', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, speed: 150, life: 0.7 }, p));
    const popUp = () => c.sizeOverLife(c.curve([[0, 0], [0.15, 1.35], [0.3, 1], [0.75, 1], [1, 0]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the glow behind the heart
      heart({ blend: 'add', size: 78, color: light,
        behaviors: [c.speedOverLife(c.decel(0.25)), popUp(), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.5, 0.6], [0, 1]]))], order: 2 }),
      // the green heart
      heart({ blend: 'normal', size: 58, color: col,
        behaviors: [c.speedOverLife(c.decel(0.25)), popUp(), c.colorOverLife(c.fade(0.75))], order: 3 }),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 10, thickness: 0, even: true },
        speed: [150, 230], life: [0.35, 0.5], size: [10, 15], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.pop(0.15, 0.5))], order: 4 })),
      // little plus signs rising. Camera-facing like the heart: they are slow and start near the centre,
      // so in 3D a world-space burst would spend most of its life inside the character
      c.sys({ tex: 'plus', blend: 'add', bursts: [{ count: [4, 5] }], shape: { type: 'circle', radius: 20 },
        speed: [40, 90], life: [0.5, 0.65], size: [12, 18], color: light,
        behaviors: [c.force(0, 200), c.limitSpeed(180, 1), c.sizeOverLife(c.pop(0.2, 0.6))], order: 4 }),
    ];
  },
};
