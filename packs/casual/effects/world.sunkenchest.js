/** A sunken treasure chest: a warm gold glow breathing behind it, gold glints and a star twinkle on the box, and bubbles leaking from the lid with gold motes drifting up among them. Loops until stopped. */
export default {
  name: 'world.sunkenchest',
  category: 'world',
  whenToUse: 'A sunken treasure chest, a shipwreck\'s loot or a pirate hoard waiting on the sea floor in an underwater, diving or pirate game: play it on the chest and leave it running, then stop it and play reward.chest when it is opened. For a treasure chest on land use world.chestidle; for bubbles alone use world.bubblecolumn; for loot that must be seen from afar use world.lootbeam.',
  duration: 1.6, loop: true, tint: '#ffcf4a',
  tags: ['chest', 'treasure', 'sunken', 'shipwreck', 'pirate', 'underwater', 'gold', 'bubbles'],
  build(c) {
    const col = c.color('#ffcf4a');
    const light = c.lighten(col, 0.6);
    const water = '#cdf4ff';
    // the chest is about 90 x 60 px; its lid top is about 24 px above the centre
    const lid = c.is3d ? { type: 'circle', radius: 24 } : { type: 'rect', w: 60, h: 0 };
    // a bubble swells as it rises and pops at the end
    const bubble = () => c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1], [0.85, 1.1], [0.93, 1.35], [1, 0]]));
    return [
      // a warm glow breathing behind the chest
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 1.6, bursts: [{ count: 1 }], life: 1.6, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.5, 1.06], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.22, 0], [0.4, 0.5], [0.22, 1]]))], order: 0 }),
      // gold motes drifting up out of the lid
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, rate: 5, shape: lid, offset: [0, 22],
        speed: 0, life: [1.2, 1.7], size: [3, 6], color: [col, light],
        behaviors: [c.force(0, 80), c.limitSpeed(36, 1), c.noise(1.2, 12), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]))], order: 1 })),
      // gold glints twinkling on the box
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 5, shape: { type: 'rect', w: 90, h: 60, thickness: 1 },
        speed: 0, life: [0.45, 0.7], size: [10, 18], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.spin(0.8), c.sizeOverLife(c.pop(0.4, 0.4))], order: 2 }),
      // bubbles leaking from the lid seam and wobbling up, now and then a little gulp of them
      c.sys(c.ground({ tex: 'ring', blend: 'normal', loop: true, world: true, duration: 1.6, rate: 4, bursts: [{ time: 0.5, count: [2, 4], probability: 0.6 }], shape: lid, offset: [0, 24],
        speed: 0, life: [1.4, 2], size: [6, 13], color: water,
        behaviors: [c.force(0, 260), c.limitSpeed(70, 1), c.noise(1.8, 14), bubble(), c.colorOverLife(c.fadeInOut(0.06, 0.9))], order: 3 })),
      // now and then a bigger star twinkle on a corner
      c.sys({ tex: 'star', blend: 'add', loop: true, rate: 1.2, shape: { type: 'rect', w: 80, h: 56, thickness: 0 },
        speed: 0, life: 0.7, size: [16, 22], rotation: [0, 6.28], color: light,
        behaviors: [c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [0.6, 0.9], [1, 0]]))], order: 4 }),
    ];
  },
};
