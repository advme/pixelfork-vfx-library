/** An egg hatches: a warm flash and ring, the top of the shell bursts into tumbling shards and crumbs, sparkles pop and little hearts and stars float up. */
export default {
  name: 'move.hatch',
  category: 'move',
  whenToUse: 'An egg hatches or cracks open: a pet, chick, dino or dragon is born, a monster egg in a collection game, a surprise egg revealing its prize, a cocoon bursting. Play it at the egg\'s centre as the creature appears. Tint it with the shell colour. For a chest or gift box opening use reward.chest; for collecting an egg use gather.egg.',
  duration: 1.05, loop: false, tint: '#ffeec4',
  tags: ['hatch', 'egg', 'birth', 'pet', 'baby', 'shell', 'cute', 'reveal'],
  build(c) {
    const col = c.color('#ffeec4');
    const shell = c.mix(col, '#e2ad6e', 0.35);
    const float = (tex, colour, spin) => c.sys({ tex, blend: 'normal', bursts: [{ time: 0.06, count: 3 }], shape: { type: 'cone', radius: 14, angle: 0.75 }, dir: Math.PI / 2, offset: [0, 12],
      speed: [90, 160], life: [0.8, 1.0], size: [14, 20], rotation: [-0.3, 0.3], color: colour,
      behaviors: [c.speedOverLife(c.decel(0.25)), c.spin(-spin, spin), c.sizeOverLife(c.curve([[0, 0], [0.15, 1.2], [0.3, 1], [0.8, 1], [1, 0]]))], order: 5 });
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], offset: [0, 8], life: 0.2, size: 130, color: '#fff3c0',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.8]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], offset: [0, 8], life: 0.32, size: 140, color: '#ffe08a',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // the top half of the shell flies off in pieces
      c.sys(c.chunks(c.vol({ tex: 'shard', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: 14, arc: Math.PI }, offset: [0, 10],
        speed: [180, 340], life: [0.6, 0.8], size: [12, 18], rotation: [0, 6.28], color: [col, shell],
        behaviors: [c.gravity(1100), c.spin(-8, 8), c.colorOverLife(c.fade(0.75))], order: 3 }), 'shard')),
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 14] }], shape: { type: 'circle', radius: 12, arc: Math.PI }, offset: [0, 10],
        speed: [150, 300], life: [0.4, 0.6], size: [3, 6], color: [col, shell],
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.6))], order: 2 })),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ time: 0.04, count: [7, 9] }], shape: { type: 'circle', radius: 34 }, offset: [0, 8],
        speed: [30, 80], life: [0.4, 0.6], size: [10, 16], color: '#fff6c8',
        behaviors: [c.sizeOverLife(c.pop(0.25, 0.5))], order: 4 })),
      float('heart', ['#ff6fa5', '#ff9cc4'], 0.6),
      float('star', ['#ffd23a', '#ffe680'], 2),
    ];
  },
};
