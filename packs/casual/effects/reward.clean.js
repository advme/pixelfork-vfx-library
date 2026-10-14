/** Squeaky clean: a bright shine sweeps across the object, twinkles pop all over it and a few soap bubbles float up. */
export default {
  name: 'reward.clean',
  category: 'reward',
  whenToUse: 'Something becomes clean, washed or polished: a dish washed, a floor mopped, a car or window cleaned, a stain removed, a room tidied in a cleaning, makeover or pet-care game. Play it on the cleaned thing and size it to the object. For a shine across a button use ui.shine; for an item that keeps sparkling use state.sparkle.',
  duration: 0.95, loop: false, tint: '#8fe9ff',
  tags: ['clean', 'shine', 'polish', 'wash', 'sparkle', 'tidy', 'spotless', 'reward'],
  build(c) {
    const col = c.color('#8fe9ff');
    const light = c.lighten(col, 0.6);
    // the shine sweeps down-right across the object; a stretched glow moving that way draws a slanted band
    const sweep = -0.35;
    const start = [-78, 28];
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.45, size: 160, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0.35, 0.4], [0, 1]]))], order: 0 }),
      // the shine band: 110 px across, about 35 px along its motion. stretch.speed is tiny but not 0, because
      // three.quarks swaps a 0 for 0.001, which at 340 px/s would double the band's length in 2D (and more at bigger sizes)
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: sweep, offset: start,
        speed: 340, life: 0.48, size: 110, color: '#ffffff', stretch: { speed: 0.00001, length: 0.32 },
        behaviors: [c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 1 }),
      // a big glint riding the band
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0, angle: 0 }, dir: sweep, offset: [start[0] + 8, start[1] + 22],
        speed: 340, life: 0.48, size: 38, rotation: 0.3, color: '#ffffff',
        behaviors: [c.spin(3), c.sizeOverLife(c.curve([[0, 0.3], [0.5, 1], [1, 0.3]])), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order: 4 }),
      // twinkles popping all over it
      c.sys({ tex: 'spark', blend: 'add', rate: 34, duration: 0.5, shape: { type: 'rect', w: 120, h: 80, thickness: 1 },
        speed: 0, life: [0.3, 0.45], size: [12, 24], rotation: [0, 0.8], color: [light, '#ffffff'],
        behaviors: [c.spin(2), c.sizeOverLife(c.curve([[0, 0], [0.3, 1.1], [0.5, 0.8], [1, 0]]))], order: 3 }),
      // soap bubbles floating up
      c.sys(c.vol({ tex: 'ring', blend: 'normal', bursts: [{ time: 0.1, count: [4, 6] }], shape: { type: 'circle', radius: 40 },
        speed: [20, 50], life: [0.6, 0.8], size: [8, 16], color: light,
        behaviors: [c.force(0, 90), c.limitSpeed(70, 1), c.noise(1.5, 14), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.9, 1.1], [1, 0]])), c.colorOverLife(c.fade(0.8))], order: 2 })),
    ];
  },
};
