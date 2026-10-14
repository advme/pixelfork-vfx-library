/** A building on fire: a wide wall of big flames roaring up, hot cores, embers swirling high and a thick column of black smoke rolling up and drifting. Loops until stopped. */
export default {
  name: 'world.burning',
  category: 'world',
  whenToUse: 'A building, house, tent, hut, barn, wooden tower, ship or siege engine is on fire: a raided village, a burning castle or camp in a strategy game, a house fire for firefighters. Play it at the base of the building and leave it running; size 1 fits a tent or hut, size 2 a house. For a small campfire or brazier use world.campfire; for a burning character or object use state.burning; for chimney smoke use world.chimney.',
  duration: 2, loop: true, anchor: 'feet', tint: '#ff7a1f',
  tags: ['fire', 'burning', 'building', 'house fire', 'village', 'siege', 'smoke', 'flames', 'raid'],
  build(c) {
    const col = c.color('#ff7a1f');
    const light = c.lighten(col, 0.55);
    // pale yellow white-hot cores; with a tint they follow it (a blue magic fire gets pale blue cores)
    const core = c.tint ? c.lighten(col, 0.65) : c.rgb('#fff0b8');
    // the fire covers a footprint about 130 px wide: a disc on the ground in 3D, a low box in 2D
    const base = c.is3d ? { type: 'circle', radius: 58 } : { type: 'rect', w: 130, h: 30, thickness: 1 };
    // in 2D the box sits on the anchor line instead of straddling it, so no flame starts below the building's base
    const lift = c.is3d ? [0, 0] : [0, 14];
    const smoke = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [a, 0.15], [a * 0.75, 0.6], [0, 1]]));
    return [
      // the warm glow of the blaze, flickering
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 0.6, bursts: [{ count: 1 }], life: 0.6, size: 260, offset: [0, 60], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.92], [0.4, 1.05], [1, 0.92]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.32, 0], [0.45, 0.4], [0.32, 1]]))], order: 0 }),
      // the column of black smoke rolling up over the fire
      c.sys({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 6, shape: { type: 'circle', radius: 30 }, offset: [0, 130],
        speed: [10, 30], life: [1.8, 2.4], size: [55, 85], rotation: [0, 6.28], color: ['#3d3936', '#262322'],
        behaviors: [c.force(18, 75), c.limitSpeed(80, 1), c.noise(0.6, 18), c.spin(-0.5, 0.5), c.sizeOverLife(c.curve([[0, 0.45], [1, 2.2]])), smoke(0.85)], order: 1 }),
      // dark puffs boiling off the flame tips
      c.sys(c.ground({ tex: 'puff', blend: 'normal', loop: true, rate: 7, shape: base, offset: [0, 85],
        speed: 0, life: [1.2, 1.6], size: [34, 52], rotation: [0, 6.28], color: ['#4a4440', '#2e2a28'],
        behaviors: [c.force(10, 110), c.limitSpeed(95, 1), c.noise(0.9, 12), c.spin(-0.8, 0.8), c.sizeOverLife(c.curve([[0, 0.4], [1, 1.6]])), smoke(0.8)], order: 1 })),
      // the big flames
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 42, shape: base, offset: lift,
        speed: 0, life: [0.55, 0.8], size: [42, 72], rotation: [-0.2, 0.2], color: [light, col],
        behaviors: [c.force(0, 340), c.limitSpeed(230, 1), c.noise(2.5, 14), c.sizeOverLife(c.curve([[0, 0.45], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.45))], order: 2 })),
      // hot yellow cores low in the fire
      c.sys(c.ground({ tex: 'flame', blend: 'add', loop: true, rate: 24, shape: base, offset: lift,
        speed: 0, life: [0.35, 0.5], size: [26, 42], color: core,
        behaviors: [c.force(0, 300), c.limitSpeed(190, 1), c.noise(3, 8), c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.4))], order: 3 })),
      // embers swirling high
      c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, world: true, rate: 14, shape: base, offset: [0, 30],
        speed: 0, life: [1.2, 2.0], size: [3, 6], color: [light, '#ffd27a'],
        behaviors: [c.force(12, 220), c.limitSpeed(150, 1), c.noise(2, 30), c.sizeOverLife(c.curve([[0, 1], [0.7, 0.8], [1, 0]])), c.colorOverLife(c.fade(0.6))], order: 4 })),
    ];
  },
};
