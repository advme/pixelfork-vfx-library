/** A countdown tick: a soft flash behind the number, two rings pulsing out and a little circle of sparkles. */
export default {
  name: 'ui.countdown',
  category: 'ui',
  whenToUse: 'A countdown tick before a round or race starts: play it once on each 3, 2, 1 number, or on each of the last seconds of a timer running out. Play with { el } on the number. For the final GO! use ui.go.',
  duration: 0.9, loop: false, tint: '#ffd23f',
  tags: ['ui', 'countdown', 'timer', '3 2 1', 'tick', 'ready', 'start', 'race'],
  build(c) {
    const col = c.color('#ffd23f');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 150, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the pulse: a coloured ring, then a white one just behind it
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.65, size: 220, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.35], [0.4, 0.85], [1, 1]])), c.colorOverLife(c.fade(0.25))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.12, count: 1 }], life: 0.75, size: 170, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.4, 0.8], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // little dots flicked out
      c.sys({ tex: 'disc', blend: 'add', bursts: [{ count: 10 }], shape: { type: 'circle', radius: 30, thickness: 0 },
        speed: [180, 280], life: [0.35, 0.5], size: [5, 8], color: col,
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.shrink())], order: 2 }),
      // a circle of sparkles round the number
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 46, thickness: 0, even: true },
        speed: [70, 110], life: [0.55, 0.8], size: [10, 16], color: [light, '#ffffff'],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.pop(0.2, 0.55))], order: 3 }),
    ];
  },
};
