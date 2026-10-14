/** Battlefield haze: big faint grey smoke banks roll slowly across the scene, with thinner wisps and drifting soot in front. Loops until stopped. */
export default {
  name: 'env.smoke',
  category: 'env',
  whenToUse: 'Smoke hanging in the air over a whole scene: a battlefield or war zone, a town after a battle, a siege, a forest burning in the distance, a smoky tavern or forge hall. Play it once without a position for the whole screen (2D) or the area around the camera (3D); it drifts left to right (dir 180 reverses; in 3D pass direction). For low spooky fog use env.fog; for falling ash use env.ash; for one thing smoking use state.smoke or weapon.smoke.',
  duration: 8, loop: true, anchor: 'center', tint: '#8e9096',
  tags: ['smoke', 'haze', 'battlefield', 'war', 'battle', 'siege', 'fire', 'ambient', 'weather'],
  build(c) {
    const col = c.color('#8e9096');
    const dir = c.dir === undefined ? 0 : c.dir;
    const side = Math.cos(dir) >= 0 ? 1 : -1;
    const blow = c.is3d ? c.heading(0) : null;
    // a fresh list per layer: behaviours cannot be shared between systems
    const drift = (wind, lift, max, wobble) => [c.is3d ? c.wind(blow, wind) : c.force(side * wind, 0), c.force(0, lift), c.limitSpeed(max, 1), c.noise(0.3, wobble)];
    const haze = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.3], [a, 0.7], [0, 1]]));
    // 2D: born all over the screen, shifted upwind so the drift keeps every edge filled
    const area = (p, y, wide) => (c.is3d
      ? c.sys(c.env3d(p, { w: 1500, y }))
      : c.sys(Object.assign({ shape: { type: 'rect', w: c.view.w + wide, h: c.view.h, thickness: 1 }, offset: [-side * wide * 0.4, 0] }, p)));
    const k = c.is3d ? 2.6 : 1;
    return [
      // the big smoke banks
      area({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 1.3 * k, speed: 0, life: [8, 11], size: c.is3d ? [320, 520] : [180, 300], rotation: [0, 6.28], color: [col, c.darken(col, 0.2)],
        behaviors: drift(30, 4, 36, 18).concat([c.spin(-0.12, 0.12), haze(0.2)]), order: 0 }, 50, 420),
      // thinner wisps, closer and a little faster
      area({ tex: 'puff', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 2.4 * k, speed: 0, life: [5, 7], size: c.is3d ? [140, 240] : [80, 140], rotation: [0, 6.28], color: c.lighten(col, 0.15),
        behaviors: drift(45, 6, 55, 22).concat([c.spin(-0.25, 0.25), c.sizeOverLife(c.curve([[0, 0.7], [1, 1.3]])), haze(0.26)]), order: 1 }, 110, 380),
      // soot and ash drifting through
      area({ tex: 'square', blend: 'normal', loop: true, prewarm: true, duration: 8, rate: 5 * k, speed: 0, life: [5, 7], size: [3, 5], rotation: [0, 6.28], color: ['#3a3836', '#5a5651'],
        behaviors: drift(55, 3, 60, 30).concat([c.spin(-2, 2), c.colorOverLife(c.fadeInOut(0.1, 0.8))]), order: 2 }, 60, 380),
    ];
  },
};
