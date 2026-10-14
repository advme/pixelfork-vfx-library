/** A loading spinner: a comet of six chunky dots chases round and round the middle of the target, clockwise, over a soft glow, with tiny glints flicking off the lead dot. Loops until stopped. */
export default {
  name: 'ui.loading',
  category: 'ui',
  whenToUse: 'Something is loading or the game is waiting: a loading screen, connecting to the server, a match being found, an ad or a purchase being processed, a level being prepared. Play with { el, follow: true } on the panel or button (the spinner sits at its centre and fits its size) and stop it when loading is done; it vanishes at once. For a character or AI opponent that is thinking use state.thinking; for a bar that fills up use ui.fill.',
  duration: 1, loop: true, tint: '#5ad1ff',
  tags: ['ui', 'loading', 'spinner', 'wait', 'busy', 'connecting', 'progress', 'dots'],
  build(c) {
    const col = c.color('#5ad1ff');
    const light = c.lighten(col, 0.55);
    // the spinner radius: a 26 px spinner with no element given, else it fits the element's shorter side.
    // Without an element the target is the default 120 x 48 box divided by the effect size: told apart by its 2.5 : 1 shape
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const r = plain ? 26 : Math.max(14, Math.min(64, Math.min(c.target.w, c.target.h) * 0.34));
    const d = Math.max(7, Math.min(26, r * 0.46));
    // one clockwise turn per 1 s cycle. Every dot is born at the same spot (angle 0, the right) and orbits at the same speed,
    // dot k a little later than the lead, so the six ride round as one rigid comet. A cycle later each dot is back where it
    // was born, just as its replacement appears there: it lives a hair longer than the cycle and fades in that last moment,
    // so the hand-over never blinks
    const turn = 1, spin = -(Math.PI * 2) / turn, gap = 0.6, hold = turn + 0.05;
    const ring = { type: 'circle', radius: r, thickness: 0, even: true };
    const solid = (stops) => c.grad([['#fff', 0], ['#fff', 1]], stops);
    // the dots stay opaque (two opaque dots stacked during a hand-over look like one) and the tail tapers by size and colour
    const tail = c.darken(col, 0.18);
    const dot = (k) => {
      const t = k / 5;
      return c.sys({ tex: 'disc', blend: 'normal', loop: true, prewarm: true, cut: true, duration: turn,
        bursts: [{ time: (k * gap) / Math.abs(spin), count: 1 }], shape: ring,
        speed: 0, life: hold, size: d * (1 - t * 0.55), color: t < 0.5 ? c.mix(light, col, t * 2) : c.mix(col, tail, t * 2 - 1),
        behaviors: [c.orbit(spin), c.colorOverLife(solid([[1, 0], [1, turn / hold], [0, 1]]))], order: 2 });
    };
    return [
      // the soft glow behind: two copies a cycle apart cross-fade, so it holds steady with no seam
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, cut: true, duration: turn, bursts: [{ count: 1 }],
        life: turn * 2, size: r * 4, color: col,
        behaviors: [c.colorOverLife(solid([[0, 0], [0.3, 0.5], [0, 1]]))], order: 0 }),
      // a faint track the dots run on
      c.sys({ tex: 'ring', blend: 'add', loop: true, prewarm: true, cut: true, duration: turn, bursts: [{ count: 1 }],
        life: turn * 2, size: r * 2.6, color: col,
        behaviors: [c.colorOverLife(solid([[0, 0], [0.22, 0.5], [0, 1]]))], order: 1 }),
      dot(0), dot(1), dot(2), dot(3), dot(4), dot(5),
      // a bright halo riding on the lead dot (cross-faded like the glow)
      c.sys({ tex: 'glow', blend: 'add', loop: true, prewarm: true, cut: true, duration: turn, bursts: [{ count: 1 }], shape: ring,
        speed: 0, life: turn * 2, size: d * 2.8, color: light,
        behaviors: [c.orbit(spin), c.colorOverLife(solid([[0, 0], [0.7, 0.5], [0, 1]]))], order: 3 }),
      // glints dropped right behind the lead dot: with `even`, a rate emitter's spawn point sweeps round the circle at `arc`
      // radians per second, which is exactly the lead dot's own speed, so they appear on it and drift outward as it moves on
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: turn, rate: 7, shape: { type: 'circle', radius: r, thickness: 0, arc: spin, even: true },
        speed: [15, 40], life: [0.28, 0.38], size: [6, 10], rotation: [0, 0.8], color: ['#ffffff', light],
        behaviors: [c.speedOverLife(c.decel(0.3)), c.sizeOverLife(c.pop(0.25, 0.4))], order: 4 }),
    ];
  },
};
