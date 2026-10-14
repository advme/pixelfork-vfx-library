/** A level starts: a tall band of golden light sweeps across the whole screen from left to right, dropping sparkles and little stars behind it. */
export default {
  name: 'ui.levelstart',
  category: 'ui',
  whenToUse: 'A level, stage, round or wave begins: play it once with no position as the level appears, and a band of light sweeps across the whole screen. For a screen change that hides a swap of screens use ui.transition; for the GO! after a 3-2-1 countdown use ui.go; for a shine across one button use ui.shine; for finishing a level use reward.clear.',
  duration: 1.2, loop: false, anchor: 'center', tint: '#ffd23f',
  tags: ['ui', 'level start', 'begin', 'stage', 'round', 'sweep', 'light', 'sparkle'],
  build(c) {
    const col = c.color('#ffd23f');
    const light = c.lighten(col, 0.75);
    const W = c.view.w, H = c.view.h, m = Math.min(W, H);
    const band = m * 0.7;
    // everything starts just off the left edge and crosses at one speed in 0.85 s
    const x0 = -W / 2 - band / 2;
    const v = (W + band) / 0.85;
    // A cone with angle 0 aimed right fires every particle straight right. Born evenly round the rim of its wide disc
    // (an odd count, so no two share a height), they stand in an even column over the screen's height: one tall moving band.
    // The disc stands across the screen, so it also reaches toward and away from the camera by its radius: kept near
    // 0.6 of the height, or on tall screens (an iPad in portrait) the glows nearest the camera pass it and the band breaks up
    const sweep = { shape: { type: 'cone', angle: 0, radius: H * 0.62, thickness: 0, even: true }, dir: 0, offset: [x0, 0] };
    // the sparkles and stars are scattered through the disc instead
    const scatter = { shape: { type: 'cone', angle: 0, radius: H * 0.52 }, dir: 0, offset: [x0, 0] };
    // sparkles ride the band, then stop at a random point of their life and stay behind
    const dropOff = () => c.speedOverLife(c.curve([[0, 1], [0.55, 1], [0.7, 0.03], [1, 0]]));
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    return [
      // the wide soft band
      c.sys(Object.assign({ tex: 'glow', blend: 'add', bursts: [{ time: 0.05, count: 15 }], speed: v, life: 0.85,
        size: [band * 0.9, band * 1.1], color: col,
        behaviors: [c.colorOverLife(solid([[0, 0], [0.26, 0.12], [0.26, 0.85], [0, 1]]))], order: 0 }, sweep)),
      // its bright core
      c.sys(Object.assign({ tex: 'glow', blend: 'add', bursts: [{ time: 0.05, count: 29 }], speed: v, life: 0.85,
        size: [band * 0.42, band * 0.5], color: light,
        behaviors: [c.colorOverLife(solid([[0, 0], [0.38, 0.1], [0.38, 0.85], [0, 1]]))], order: 1 }, sweep)),
      // sparkles left behind (a little slower or faster than the band, so they do not ride it in one stiff line)
      c.sys(Object.assign({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: 30 }], speed: [v * 0.9, v * 1.03], life: [0.35, 1.1],
        size: [10, 22], rotation: [0, 6.28], color: [c.lighten(col, 0.4), '#ffffff'],
        behaviors: [dropOff(), c.spin(-4, 4), c.sizeOverLife(c.curve([[0, 0.5], [0.55, 1], [0.72, 1.3], [1, 0]]))], order: 2 }, scatter)),
      // little stars left behind
      c.sys(Object.assign({ tex: 'star', blend: 'add', bursts: [{ time: 0.05, count: 10 }], speed: [v * 0.9, v * 1.03], life: [0.45, 1.05],
        size: [12, 18], rotation: [0, 6.28], color: light,
        behaviors: [dropOff(), c.spin(-3, 3), c.sizeOverLife(c.curve([[0, 0.4], [0.55, 1], [0.75, 1.2], [1, 0]]))], order: 3 }, scatter)),
    ];
  },
};
