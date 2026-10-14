/** Sad: a little grey rain cloud hangs over the character's head and rains on them. Loops until stopped. */
export default {
  name: 'state.sad',
  category: 'state',
  whenToUse: 'A character is sad, gloomy, sulking or unlucky: a pet that is unhappy, a lost game, a bad mood, a funny moment of bad luck. Follow the character\'s head; stop it when they cheer up.',
  duration: 1, loop: true, tint: '#9aa6b8',
  tags: ['sad', 'gloomy', 'rain cloud', 'unhappy', 'cute', 'pet', 'mood', 'emotion', 'status'],
  build(c) {
    const col = c.color('#9aa6b8');
    // the cloud: the same five puffs re-laid every second, so it holds its shape
    const cloud = (n, radius, size, colour, order) => c.sys({ tex: 'puff', blend: 'normal', loop: true, duration: 1, bursts: [{ count: n }], shape: { type: 'circle', radius, thickness: 0, even: true }, offset: [0, 46],
      speed: 0, life: 1.03, size, color: colour, order });
    return [
      cloud(5, 16, 34, col, 2),
      cloud(1, 0.1, 44, c.lighten(col, 0.15), 3),
      c.sys({ tex: 'glow', blend: 'normal', loop: true, rate: 12, shape: { type: 'rect', w: 44, h: 0 }, offset: [0, 34],
        speed: 0, life: [0.3, 0.4], size: [5, 7], color: '#5aa8ff', stretch: { speed: 0.012, length: 2 },
        behaviors: [c.gravity(1600), c.colorOverLife(c.fade(0.7))], order: 1 }),
    ];
  },
};
