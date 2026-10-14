/** Surprised: a flash, a ring of short shock lines popping out around the head and a big bouncy "!" above it. */
export default {
  name: 'state.surprise',
  category: 'state',
  whenToUse: 'A quick shocked or surprised reaction: an enemy spots the player, a pet is startled, a character gets a sudden fright or an unexpected gift, a jump scare, an alert in a stealth game. Play it at the head. For a lasting scare or panic use state.fear.',
  duration: 0.7, loop: false, anchor: 'head', tint: '#ffd23a',
  tags: ['surprise', 'shock', 'alert', 'startled', 'exclamation', 'scared', 'emotion', 'reaction'],
  build(c) {
    const col = c.color('#ffd23a');
    // the "!" is red by default; a tint recolours it a shade deeper than the lines
    const mark = c.tint ? c.darken(col, 0.15) : c.rgb('#ff4b3a');
    // shock lines: start just outside the head, shoot out and snap short. Evenly spread from 0 rad, so
    // 7 going round from 0 and 2 going back from 0 give a fan from -36 to 216 degrees: none down over
    // the body, none straight up through the "!" (the two at 0 coincide)
    const step = Math.PI / 5;
    const lines = (count, arc) => c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count }], shape: { type: 'circle', radius: 36, thickness: 0, arc, even: true }, offset: [0, -14],
      speed: 300, life: 0.3, size: 5, color: col, stretch: { speed: 0.008, length: 2 },
      behaviors: [c.speedOverLife(c.decel(0.05)), c.sizeOverLife(c.curve([[0, 0], [0.15, 1], [0.6, 1], [1, 0]]))], order: 2 });
    const pop = () => c.sizeOverLife(c.curve([[0, 0], [0.12, 1.35], [0.22, 0.95], [0.3, 1.05], [0.8, 1], [1, 0]]));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], offset: [0, -14], life: 0.16, size: 100, color: c.lighten(col, 0.6),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], offset: [0, -14], life: 0.28, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      lines(7, 7 * step),
      lines(2, -2 * step),
      // the "!": a teardrop turned upside down, and its dot
      c.sys({ tex: 'drop', blend: 'normal', bursts: [{ count: 1 }], offset: [0, 42], life: 0.7, size: 38, rotation: Math.PI, color: mark,
        behaviors: [pop()], order: 3 }),
      c.sys({ tex: 'disc', blend: 'normal', bursts: [{ count: 1 }], offset: [0, 14], life: 0.7, size: 13, color: mark,
        behaviors: [pop()], order: 3 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: 3 }], shape: { type: 'circle', radius: 36, thickness: 0 }, offset: [0, 40],
        speed: [20, 50], life: [0.3, 0.4], size: [9, 13], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 }),
    ];
  },
};
