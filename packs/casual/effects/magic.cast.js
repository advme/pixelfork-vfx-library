/** Charging a spell: sparkles converge into a pulsing core. Loops until stopped. */
export default {
  name: 'magic.cast',
  category: 'magic',
  whenToUse: 'A character charges or casts a spell, an item is being crafted or upgraded, a machine powers up. Stop it when the spell fires.',
  duration: 1,
  loop: true,
  tint: '#ffb84d',
  tags: ['cast', 'charge', 'channel', 'power up', 'converge', 'crafting'],
  build(c) {
    const col = c.color('#ffb84d');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.8, bursts: [{ count: 1 }], life: 0.8, size: 70, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.5, 1], [1, 0.6]]))], order: 1 }),
      // sparkles flying inward
      c.sys(c.vol({ tex: 'spark', blend: 'add', loop: true, rate: 50, shape: { type: 'circle', radius: 90, thickness: 0.3 },
        speed: [-170, -130], life: [0.5, 0.6], size: [8, 16], color: [light, col],
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.6))], order: 2 })),
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, rate: 30, shape: { type: 'circle', radius: 80, thickness: 0.4 },
        speed: [-140, -100], life: [0.6, 0.7], size: [5, 9], color: light,
        stretch: { speed: 0.01, length: 1.5 },
        behaviors: [c.colorOverLife(c.fade(0.5))], order: 3 })),
      c.sys({ tex: 'ring', blend: 'add', loop: true, rate: 2, life: 0.6, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.2]])), c.colorOverLife(c.fadeInOut(0.2, 0.6))], order: 0 }),
    ];
  },
};
