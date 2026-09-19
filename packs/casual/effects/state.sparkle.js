/** Gentle golden glints: an item that is special, interactive or ready. Loops until stopped. */
export default {
  name: 'state.sparkle',
  category: 'state',
  whenToUse: 'Something wants attention: a collectible on the map, a ready reward, a new item, a rare enemy, a clickable object. Follow it; stop when it is taken.',
  duration: 1, loop: true, tint: '#ffe58a',
  tags: ['sparkle', 'glint', 'shiny', 'attention', 'rare', 'ready', 'idle'],
  build(c) {
    const col = c.color('#ffe58a');
    const light = c.lighten(col, 0.7);
    return [
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 6, shape: { type: 'circle', radius: 30 },
        speed: 0, life: [0.5, 0.8], size: [8, 18], rotation: [0, 1], color: [light, col],
        behaviors: [c.spin(1), c.sizeOverLife(c.curve([[0, 0], [0.4, 1], [1, 0]]))], order: 1 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 5, shape: { type: 'circle', radius: 26 },
        speed: [5, 15], life: [0.6, 1.0], size: [4, 8], color: light,
        behaviors: [c.force(0, 40), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 0 })),
    ];
  },
};
