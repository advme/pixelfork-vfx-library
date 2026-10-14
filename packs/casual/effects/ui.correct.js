/** Correct: a green glow swells behind the answer, a ring pops in around it with a bounce, a bright ripple rolls out and sparkles twinkle round its edge. */
export default {
  name: 'ui.correct',
  category: 'ui',
  whenToUse: 'A correct answer in a quiz, trivia, spelling, maths or kids learning game: the right card, word, number or picture is chosen. Play it with { el } on the answer; the ring and sparkles fit its size. For a wrong answer use puzzle.wrong (or ui.wrongtry for a gentle try-again); for a reward being claimed use ui.burst.',
  duration: 0.7, loop: false, tint: '#34d45e',
  tags: ['correct', 'right', 'answer', 'quiz', 'yes', 'kids', 'learning', 'success'],
  build(c) {
    const col = c.color('#34d45e');
    const light = c.lighten(col, 0.55);
    const w = Math.max(40, Math.min(c.target.w, 320)), h = Math.max(40, Math.min(c.target.h, 220));
    // a ring radius that clears the answer's corners, at most 240 px across (a very wide answer still gets sparkles along its whole edge);
    // the ring texture's band sits at about 0.39 of its size, so the sprite is r / 0.39
    const r = Math.max(36, Math.min(120, Math.hypot(w, h) / 2 + 8));
    const s = r / 0.39;
    return [
      // a soft green glow swelling behind the answer
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: r * 2.8, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.55, 0.15], [0.4, 0.5], [0, 1]]))], order: 0 }),
      // the ring around the answer: pops in, bounces, holds, fades
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.7, size: s, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [0.14, 1.1], [0.24, 0.96], [0.34, 1.02], [0.75, 1], [1, 1.06]])), c.colorOverLife(c.fade(0.65))], order: 2 }),
      // a bright ripple rolling out from it
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.06, count: 1 }], life: 0.35, size: s * 1.45, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.7], [1, 1]])), c.colorOverLife(c.fade(0.15))], order: 1 }),
      // sparkles twinkling along the answer's edge
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: [5, 6] }, { time: 0.15, count: [4, 5] }], shape: { type: 'rect', w: w + 16, h: h + 16 },
        speed: 0, life: [0.35, 0.5], size: [12, 18], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.force(0, 60), c.sizeOverLife(c.pop(0.25, 0.5))], order: 3 }),
      // a pop of green and white dots
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ time: 0.04, count: [8, 10] }], shape: { type: 'circle', radius: r, thickness: 0, even: true },
        speed: [110, 190], life: [0.4, 0.55], size: [6, 9], color: [col, light],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.gravity(400), c.sizeOverLife(c.curve([[0, 1], [0.6, 1], [1, 0]]))], order: 4 }),
    ];
  },
};
