/** A glowing trail that follows something moving. Loops until stopped. */
export default {
  name: 'move.trail',
  category: 'move',
  whenToUse: 'A dash, a speeding car, a thrown ball, a flying character or a dragged item. Start it with follow, stop it when the move ends.',
  duration: 1,
  loop: true,
  tint: '#7fd4ff',
  tags: ['trail', 'dash', 'speed', 'follow', 'motion', 'glow'],
  build(c) {
    const col = c.color('#7fd4ff');
    const light = c.lighten(col, 0.6);
    return [
      // 3D: a soft ribbon drawn through the air behind the mover
      c.ribbon({ width: 20, length: 28, color: col, order: -1 }),
      // glowing dots left behind
      c.sys({ tex: 'glow', blend: 'add', rate: 40, loop: true, world: true, shape: { type: 'circle', radius: 5 },
        speed: [5, 25], life: [0.3, 0.5], size: [14, 22], color: [light, col],
        behaviors: [c.sizeOverLife(c.shrink()), c.colorOverLife(c.fade(0.3))] }),
      // occasional sparkles
      c.sys({ tex: 'spark', blend: 'add', rate: 8, loop: true, world: true, shape: { type: 'circle', radius: 8 },
        speed: [10, 40], life: [0.35, 0.6], size: [8, 14], color: light,
        behaviors: [c.force(0, 60), c.sizeOverLife(c.pop(0.2, 0.5))], order: 1 }),
    ];
  },
};
