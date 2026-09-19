/** A tiny pop for a button press: a ring and a few dots. */
export default {
  name: 'ui.pop',
  category: 'ui',
  whenToUse: 'A button, card or toggle is tapped. Small and quick; safe to fire on every tap. Play with { el }.',
  duration: 0.35, loop: false, tint: '#ffffff',
  tags: ['ui', 'tap', 'button', 'pop', 'press', 'click'],
  build(c) {
    const col = c.color('#ffffff');
    return [
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 90, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 8 }], shape: { type: 'circle', radius: 20, thickness: 0, even: true },
        speed: [180, 240], life: [0.25, 0.35], size: [6, 9], color: col,
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.3))], order: 1 }),
    ];
  },
};
