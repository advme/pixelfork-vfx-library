/** A touch ripple where the player tapped the screen. */
export default {
  name: 'ui.tap',
  category: 'ui',
  whenToUse: 'Feedback for a tap on the game itself: placing, selecting, moving to a point. Play with { event }.',
  duration: 0.4, loop: false, tint: '#ffffff',
  tags: ['ui', 'tap', 'ripple', 'touch', 'select', 'point'],
  build(c) {
    const col = c.color('#ffffff');
    return [
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }, { time: 0.1, count: 1 }], life: 0.35, size: 70, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.2, size: 40, color: col,
        behaviors: [c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.2))], order: 0 }),
    ];
  },
};
