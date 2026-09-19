/** A gem pickup: crystal shards and a cool blue flash. */
export default {
  name: 'pickup.gem',
  category: 'pickup',
  whenToUse: 'A gem, diamond, crystal or premium currency is collected. Tint it to the gem colour (purple, green, red).',
  duration: 0.7,
  loop: false,
  tint: '#4fd1ff',
  tags: ['gem', 'diamond', 'crystal', 'premium', 'collect', 'shard'],
  build(c) {
    const col = c.color('#4fd1ff');
    const light = c.lighten(col, 0.7);
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.25, size: 90, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.35, size: 110, color: light, rotation: [0, 1.5],
        behaviors: [c.spin(1.5), c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      // shards
      c.sys({ tex: 'shard', blend: 'add', bursts: [{ count: [7, 10] }], shape: { type: 'circle', radius: 6 },
        speed: [150, 320], life: [0.4, 0.6], size: [12, 22], rotation: [0, 6.28], color: [light, col],
        behaviors: [c.spin(-6, 6), c.gravity(500), c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.curve([[0, 1], [0.7, 1], [1, 0]]))], order: 3 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: [8, 12] }], shape: { type: 'circle', radius: 8 },
        speed: [60, 200], life: [0.3, 0.5], size: [5, 9], color: light,
        behaviors: [c.force(0, 150), c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 3 }),
    ];
  },
};
