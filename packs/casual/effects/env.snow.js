/** Gentle snow falling over the whole screen. Loops until stopped. */
export default {
  name: 'env.snow',
  category: 'env',
  whenToUse: 'A winter level, a Christmas event, a cold mountain scene. Start it once when the level begins; it covers the whole screen.',
  duration: 6,
  loop: true,
  anchor: 'top',
  tint: '#ffffff',
  tags: ['snow', 'winter', 'weather', 'ambient', 'christmas', 'cold'],
  build(c) {
    const col = c.color('#ffffff');
    if (c.is3d) {
      // 3D: real snowfall over an area of the world; flakes land on the floor
      const fall = (rate, size, speed, drift, y) => c.sys(c.env3d({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 6, rate,
        speed: 0, life: [(y / speed) * 0.92, y / speed], size, color: col,
        behaviors: [c.gravity(speed * 2.5), c.limitSpeed(speed, 1), c.noise(0.6, drift), c.colorOverLife(c.fadeInOut(0.06, 0.92))] }, { w: 1300, y }));
      return [fall(30, [8, 12], 95, 30, 520), fall(45, [5, 8], 60, 22, 520)];
    }
    const w = c.view.w + 80;
    const line = (rate, size, life, speed, drift, order) =>
      c.sys({ tex: 'glow', blend: 'normal', loop: true, prewarm: true, duration: 6, rate,
        shape: { type: 'rect', w, h: 0 }, dir: -Math.PI / 2, offset: [0, 30],
        speed: 0, life, size, color: col,
        behaviors: [c.gravity(speed * 2.5), c.limitSpeed(speed, 1), c.noise(0.6, drift), c.colorOverLife(c.fadeInOut(0.1, 0.8))], order });
    return [
      line(6, [11, 15], [4.5, 6], 90, 26, 1),   // near, big, fast
      line(14, [6, 9], [6, 8], 55, 18, 0),      // far, small, slow
    ];
  },
};
