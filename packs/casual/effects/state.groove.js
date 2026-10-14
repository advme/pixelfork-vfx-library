/** In the groove: rainbow music notes hop up and bounce back down above the head, a glow cycles through the colours and sparkles twinkle. Loops until stopped. */
export default {
  name: 'state.groove',
  category: 'state',
  whenToUse: 'A character is in the groove: fever or hype mode in a rhythm game, a combo streak that keeps going, a character vibing to music, a dance-off bonus. Follow the head; stop it when the streak breaks. For plain music notes use state.music, for invincibility use state.rainbow.',
  duration: 1.2, loop: true, anchor: 'head', tint: null,
  tags: ['groove', 'fever', 'rhythm', 'music', 'notes', 'streak', 'hype', 'status'],
  build(c) {
    const colours = c.tint ? [c.tint, c.lighten(c.tint, 0.3), c.lighten(c.tint, 0.55)] : ['#ff4f6b', '#ffb02e', '#ffe14d', '#4dff9a', '#47b6ff', '#b45cff'].map(c.rgb);
    const rate = 10 / colours.length;
    // notes hop up and fall back (3D: from a ring around the head)
    const notes = colours.map((col) => c.sys(c.spray({ tex: 'note', blend: 'normal', loop: true, rate, shape: { type: 'cone', radius: 26, angle: 0.5 }, dir: Math.PI / 2, offset: [0, 14],
      speed: [150, 200], life: [0.7, 0.85], size: [16, 22], rotation: [-0.3, 0.3], color: col,
      behaviors: [c.gravity(440), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0], [0.12, 1.1], [0.22, 1], [0.8, 1], [1, 0]]))], order: 2 }, 'up')));
    // the glow cycles through the colours: one glow per colour, each fading in as the one before fades out,
    // so the brightness stays even and the last colour blends back into the first
    const step = 1.2 / colours.length;
    const glows = colours.map((col, i) => c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ time: i * step, count: 1 }], life: step * 2, size: 110, offset: [0, 24], color: col,
      behaviors: [c.colorOverLife(c.grad([['#ffffff', 0], ['#ffffff', 1]], [[0, 0], [0.35, 0.5], [0, 1]]))], order: 0 }));
    return notes.concat(glows, [
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 7, shape: { type: 'circle', radius: 44 }, offset: [0, 24],
        speed: 0, life: [0.35, 0.5], size: [8, 13], rotation: [0, 6.28], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 3 }),
    ]);
  },
};
