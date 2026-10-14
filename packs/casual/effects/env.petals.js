/** Cherry blossoms: pink petals drift down and sway on a gentle breeze. Loops until stopped. */
export default {
  name: 'env.petals',
  category: 'env',
  whenToUse: 'Spring, romance or peace: cherry blossom season, a Japanese or anime setting, a wedding, a love scene, a calm garden, a happy ending. Play it once without a position for the whole screen (2D) or the area around the camera (3D); stop it when the scene changes.',
  duration: 6, loop: true, anchor: 'top', tint: '#ffb3d1',
  tags: ['petals', 'cherry blossom', 'sakura', 'spring', 'romance', 'anime', 'japan', 'flowers', 'calm'],
  build(c) {
    const col = c.color('#ffb3d1');
    const sway = (g, wind, drift) => [c.gravity(g), c.limitSpeed(70, 1.5), c.force(wind, 0), c.noise(1, drift), c.spin(-3, 3)];
    if (c.is3d) {
      const y = 460;
      const fall = (rate, size, tone) => c.sys(c.env3d({ tex: 'petal', blend: 'normal', loop: true, prewarm: true, duration: 6, rate,
        speed: 0, life: [(y / 70) * 0.9, y / 70], size, rotation: [0, 6.28], color: tone,
        behaviors: sway(160, -30, 40).concat([c.colorOverLife(c.fadeInOut(0.05, 0.92))]) }, { w: 1300, y }));
      return [fall(26, [14, 20], [col, c.lighten(col, 0.4)]), fall(16, [10, 14], c.lighten(col, 0.25))];
    }
    const w = c.view.w + 120;
    const line = (rate, size, tone, order) => c.sys({ tex: 'petal', blend: 'normal', loop: true, prewarm: true, duration: 6, rate, shape: { type: 'rect', w, h: 0 }, offset: [60, 30],
      speed: 0, life: [6, 9], size, rotation: [0, 6.28], color: tone,
      behaviors: sway(140, -30, 36).concat([c.colorOverLife(c.fadeInOut(0.05, 0.9))]), order });
    return [line(7, [11, 16], [col, c.lighten(col, 0.4)], 1), line(6, [6, 10], c.lighten(col, 0.25), 0)];
  },
};
