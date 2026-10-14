/** A wrong move: a red X pops on the spot with a quick red flash. */
export default {
  name: 'puzzle.wrong',
  category: 'puzzle',
  whenToUse: 'The player makes a wrong or invalid move: a wrong answer in a quiz or logic puzzle, a swap that makes no match, a locked tile tapped, a mistake in a sorting or word game. Play it on the tile or answer; keep the sound short too.',
  duration: 0.5, loop: false, tint: '#ff3b4a',
  tags: ['wrong', 'error', 'mistake', 'invalid', 'no', 'quiz', 'puzzle', 'fail'],
  build(c) {
    const col = c.color('#ff3b4a');
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.28, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // a cross is the plus sign turned 45 degrees: it pops in with a wobble and fades
      c.sys({ tex: 'plus', blend: 'normal', bursts: [{ count: 1 }], life: 0.45, size: 56, rotation: Math.PI / 4, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [0.18, 1.2], [0.3, 0.95], [0.42, 1.05], [0.8, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.6))], order: 2 }),
      c.sys({ tex: 'plus', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 62, rotation: Math.PI / 4, color: c.lighten(col, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1.25], [1, 1.1]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
    ];
  },
};
