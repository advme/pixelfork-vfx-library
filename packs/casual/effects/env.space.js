/** Flying through space: star streaks rush past at three speeds (near ones long and fast, far ones small dots) through a haze of faint drifting dust. Loops until stopped. */
export default {
  name: 'env.space',
  category: 'env',
  whenToUse: 'A space level where the ship keeps flying forward (space shooters, side-scrolling or vertical shmups, an asteroid run, a space race, a rocket menu screen): play it once without a position; the stars rush right to left by default, in 2D set dir (degrees, -90 = top to bottom for a vertical shooter); for a still, twinkling starry sky use env.stars, and add move.warp for a jump to hyperspace.',
  duration: 3, loop: true, anchor: 'center', tint: '#ffffff',
  tags: ['space', 'stars', 'starfield', 'flying', 'shmup', 'speed', 'sci-fi', 'ambient'],
  build(c) {
    const col = c.color('#ffffff');
    const blue = c.mix(col, '#9cc8ff', 0.45);
    // the way the stars move (the ship flies the other way)
    const dir = c.dir === undefined ? Math.PI : c.dir;
    const dx = Math.cos(dir), dy = Math.sin(dir);
    // stars are born all over the screen (3D: on a sheet facing the camera, raised so little of it is under the floor)
    // and pushed along `dir` up to their top speed
    const k = c.is3d ? 1.6 : 1;
    const lift = c.is3d ? [0, 200] : undefined;
    const area = c.is3d ? { type: 'rect', w: 1000, h: 620, thickness: 1 } : { type: 'rect', w: c.view.w * 1.15, h: c.view.h * 1.05, thickness: 1 };
    const layer = (p) => c.sys(Object.assign({ blend: 'add', loop: true, prewarm: true, duration: 3, shape: area, offset: lift, speed: 0 }, p));
    return [
      // near: long fast streaks
      layer({ tex: 'glow', rate: c.is3d ? 22 : 16, life: [0.4, 0.55], size: [5 * k, 7 * k], color: col, stretch: { speed: 0.012, length: 2 },
        behaviors: [c.force(dx * 7000, dy * 7000), c.limitSpeed(1500, 1), c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 3 }),
      // middle: shorter streaks
      layer({ tex: 'glow', rate: c.is3d ? 42 : 30, life: [0.7, 1.0], size: [3 * k, 4.5 * k], color: [col, blue], stretch: { speed: 0.012, length: 2 },
        behaviors: [c.force(dx * 3000, dy * 3000), c.limitSpeed(720, 1), c.colorOverLife(c.fadeInOut(0.15, 0.7))], order: 2 }),
      // far: small dots sliding by
      layer({ tex: 'glow', rate: c.is3d ? 36 : 24, life: [1.4, 2.0], size: [2 * k, 3.5 * k], color: [col, blue],
        behaviors: [c.force(dx * 900, dy * 900), c.limitSpeed(240, 1), c.colorOverLife(c.fadeInOut(0.2, 0.7))], order: 1 }),
      // faint dust drifting slowly with a little wobble
      layer({ tex: 'glow', rate: c.is3d ? 18 : 12, life: [2.4, 3.2], size: [4 * k, 8 * k], color: blue,
        behaviors: [c.force(dx * 300, dy * 300), c.limitSpeed(120, 1), c.noise(0.6, 14), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.3, 0.3], [0.3, 0.7], [0, 1]]))], order: 0 }),
    ];
  },
};
