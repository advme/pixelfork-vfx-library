/** A pearl collected: a soft white-pink flash, a big white glint that turns, a pearly ring, little stars bursting out and iridescent glints floating up. */
export default {
  name: 'pickup.pearl',
  category: 'pickup',
  whenToUse: 'The player collects a pearl or a sea treasure: a pearl taken from an opened clam or oyster, a shell, a moon pearl or a mermaid\'s gem in an ocean, beach or underwater game; play it where the pearl was. For a gem or premium currency use pickup.gem; for a coin use pickup.coin; for any other small item use pickup.sparkle.',
  duration: 0.6, loop: false, tint: '#ffb8dd',
  tags: ['pearl', 'clam', 'oyster', 'shell', 'collect', 'sea', 'treasure', 'mermaid'],
  build(c) {
    const col = c.color('#ffb8dd');
    const light = c.lighten(col, 0.6);
    // a lilac sheen next to the pink, so it reads as mother-of-pearl
    const lilac = c.mix(col, '#b9c8ff', 0.5);
    return [
      // soft white-pink flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.28, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.25))], order: 0 }),
      // a pearly ring
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.38, size: 140, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // iridescent glints floating up
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 12 },
        speed: [50, 160], life: [0.35, 0.58], size: [5, 9], color: [light, lilac],
        behaviors: [c.force(0, 160), c.speedOverLife(c.decel(0.25)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 2 })),
      // the pearl's shine: a big white glint that turns, then a second one crossing it
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }, { time: 0.06, count: 1 }], life: 0.4, size: [100, 130], rotation: [0, 1.5], color: '#ffffff',
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0.2], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 3 }),
      // little stars bursting out
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 10 },
        speed: [140, 280], life: [0.35, 0.55], size: [9, 15], rotation: [0, 6.28], color: ['#ffffff', col],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-5, 5), c.sizeOverLife(c.curve([[0, 1], [0.6, 1], [1, 0]]))], order: 4 })),
    ];
  },
};
