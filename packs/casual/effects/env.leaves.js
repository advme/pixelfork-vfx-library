/** Leaves tumbling down across the screen. Loops until stopped. */
export default {
  name: 'env.leaves',
  category: 'env',
  whenToUse: 'An autumn or forest level, a windy park, a garden. Tint pink for cherry blossom petals. Covers the whole screen from the top.',
  duration: 6, loop: true, anchor: 'top', tint: '#e0913a',
  tags: ['leaves', 'autumn', 'forest', 'wind', 'petals', 'ambient', 'garden'],
  build(c) {
    const col = c.color('#e0913a');
    if (c.is3d) {
      const y = 460;
      const fall = (rate, size, speed, tone) => c.sys(c.env3d({ tex: 'leaf', blend: 'normal', loop: true, prewarm: true, duration: 6, rate,
        speed: 0, life: [(y / speed) * 0.9, y / speed], size, rotation: [0, 6.28], color: tone,
        behaviors: [c.gravity(300), c.limitSpeed(speed, 1.5), c.force(-40, 0), c.noise(1.2, 40), c.spin(-4, 4), c.colorOverLife(c.fadeInOut(0.05, 0.92))] }, { w: 1300, y }));
      return [fall(12, [12, 22], 110, [col, c.darken(col, 0.3)]), fall(9, [7, 12], 75, c.lighten(col, 0.25))];
    }
    const w = c.view.w + 120;
    return [
      c.sys({ tex: 'leaf', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 7, shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [40, 40],
        speed: [10, 40], life: [5, 8], size: [12, 22], rotation: [0, 6.28], color: [col, c.darken(col, 0.3)],
        behaviors: [c.gravity(300), c.limitSpeed(110, 1.5), c.force(-40, 0), c.noise(1.2, 40), c.spin(-4, 4), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: 1 }),
      c.sys({ tex: 'leaf', blend: 'normal', loop: true, prewarm: true, duration: 6, rate: 5, shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [40, 40],
        speed: [10, 30], life: [6, 9], size: [7, 12], rotation: [0, 6.28], color: c.lighten(col, 0.25),
        behaviors: [c.gravity(200), c.limitSpeed(70, 1.5), c.force(-30, 0), c.noise(1, 30), c.spin(-3, 3), c.colorOverLife(c.fadeInOut(0.05, 0.9))], order: 0 }),
    ];
  },
};
