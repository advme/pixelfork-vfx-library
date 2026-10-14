/** A beat indicator: once a second a ring around the button jumps bright, a second ring pulses out, a glow thumps behind and a few dots fly off. Loops until stopped. */
export default {
  name: 'ui.beat',
  category: 'ui',
  whenToUse: 'A beat indicator that pulses once a second: the hit zone or beat bar of a rhythm game, a button to tap in time, a metronome, a heartbeat-timed prompt. Play with { el, follow: true } on the button or the beat bar; stop it when the music stops. For a plain attention glow use ui.glow.',
  duration: 1, loop: true, tint: '#4de8ff',
  tags: ['ui', 'beat', 'pulse', 'rhythm', 'metronome', 'tempo', 'music', 'button'],
  build(c) {
    const col = c.color('#4de8ff');
    const light = c.lighten(col, 0.6);
    // a circle that clears the target's corners; the ring texture's band sits at about 0.39 of its size
    // (kept between 30 and 150 px so a tiny or hidden element still gets a ring and a full-width bar no giant circle)
    const r = Math.max(30, Math.min(150, Math.hypot(c.target.w, c.target.h) / 2 + 10));
    const size = r / 0.39;
    const alpha = (a) => c.colorOverLife(c.grad([['#ffffff', 0], ['#ffffff', 1]], a));
    return [
      // a glow that thumps behind the target on the beat
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1, size: r * 2.6, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.08], [0.2, 0.96], [1, 0.96]])), alpha([[0.55, 0], [0.18, 0.3], [0.12, 1]])], order: 0 }),
      // the indicator ring: jumps bright on the beat and dims until the next one
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 1, size, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.12], [0.15, 1], [1, 1]])), alpha([[1, 0], [0.5, 0.35], [0.4, 1]])], order: 1 }),
      // the pulse rolling out
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1, bursts: [{ count: 1 }], life: 0.55, size, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 1.45]])), alpha([[0.9, 0], [0, 1]])], order: 2 }),
      // dots flying off the ring
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 10 }], shape: { type: 'circle', radius: r, thickness: 0, even: true },
        speed: [70, 110], life: [0.3, 0.4], size: [5, 7], color: light,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.4))], order: 3 }),
    ];
  },
};
