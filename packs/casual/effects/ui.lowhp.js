/** Low health: a red vignette round the screen edges that beats like a heart (lub-dub, pause), with faint red motes drifting in. Loops until stopped. */
export default {
  name: 'ui.lowhp',
  category: 'ui',
  whenToUse: 'The player is on low health or close to dying: start it when health drops under about a quarter and stop it when they heal or die. Play it once with no position: it beats at the edges of the whole screen. For a single hit use ui.hurt.',
  duration: 1.2, loop: true, anchor: 'center', tint: '#ff1f3a',
  tags: ['ui', 'low health', 'danger', 'heartbeat', 'vignette', 'warning', 'red', 'critical'],
  build(c) {
    const col = c.color('#ff1f3a');
    const W = c.view.w, H = c.view.h, m = Math.min(W, H);
    const around = (size, gap) => Math.max(12, Math.min(40, Math.round((2 * (W + H)) / (size * gap))));
    const edge = { type: 'rect', w: W, h: H, even: true };
    const beat = 1.2, wash = m * 0.78, rim = m * 0.42;
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    return [
      // the vignette: one set of edge glows per beat, living a touch longer than the beat so there is never a gap.
      // lub at 0.09 s, dub at 0.32 s, then it rests at a faint red until the next beat.
      // Each set fades IN from 0 while the last one fades out, so the overlap does not stack into a blink
      c.sys({ tex: 'glow', blend: 'normal', loop: true, duration: beat, bursts: [{ count: around(wash, 0.4) }], shape: edge,
        life: beat + 0.08, size: wash, color: col,
        behaviors: [
          c.sizeOverLife(c.curve([[0, 0.85], [0.07, 1], [0.16, 0.88], [0.25, 0.96], [0.5, 0.85], [1, 0.85]])),
          c.colorOverLife(solid([[0, 0], [0.4, 0.07], [0.22, 0.16], [0.33, 0.25], [0.18, 0.5], [0.18, 0.93], [0, 1]])),
        ], order: 0 }),
      // a hot rim lighting up on each beat (it glows on dark games)
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: beat, bursts: [{ count: around(rim, 0.45) }, { time: 0.22, count: around(rim, 0.45) }], shape: edge,
        life: 0.4, size: rim, color: c.lighten(col, 0.25),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.7], [0.2, 1], [1, 0.85]])), c.colorOverLife(solid([[0, 0], [0.28, 0.15], [0, 1]]))], order: 1 }),
      // faint red motes drifting in: a whole-screen rect with a NEGATIVE speed sends each one toward the middle
      c.sys({ tex: 'glow', blend: 'normal', loop: true, duration: beat, rate: 9, shape: { type: 'rect', w: W, h: H },
        speed: [-40, -15], life: [1.2, 1.8], size: [5, 10], color: col,
        behaviors: [c.noise(1.5, 12), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 2 }),
    ];
  },
};
