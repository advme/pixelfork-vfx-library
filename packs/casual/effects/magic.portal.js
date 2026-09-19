/** A swirling portal: orbiting lights around a pulsing ring. Loops until stopped. */
export default {
  name: 'magic.portal',
  category: 'magic',
  whenToUse: 'A portal, warp gate, level exit, summoning circle or teleporter that stays open. Stop it when it closes.',
  duration: 1,
  loop: true,
  tint: '#b56bff',
  tags: ['portal', 'warp', 'gate', 'swirl', 'vortex', 'exit'],
  build(c) {
    const col = c.color('#b56bff');
    const light = c.lighten(col, 0.6);
    return [
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1], [1, 0.9]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.8, 0], [1, 0.5], [0.8, 1]]))], order: 1 }),
      c.sys({ tex: 'glow', blend: 'add', loop: true, bursts: [{ count: 1 }], life: 1, size: 120, color: c.darken(col, 0.4),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.5, 1.05], [1, 0.9]]))], order: 0 }),
      // orbiting lights spiralling inward
      c.sys({ tex: 'glow', blend: 'add', loop: true, rate: 40, shape: { type: 'circle', radius: 75, thickness: 0 },
        speed: -60, life: [0.9, 1.2], size: [10, 18], color: [light, col],
        behaviors: [c.orbit(4), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.5))], order: 2 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 10, shape: { type: 'circle', radius: 60 },
        speed: [10, 30], life: [0.5, 0.9], size: [6, 12], color: light,
        behaviors: [c.orbit(3), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 }),
    ];
  },
};
