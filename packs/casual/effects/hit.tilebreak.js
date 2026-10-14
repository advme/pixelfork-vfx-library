/** A floor tile cracks and gives way: a sharp crack flash and crack-star, the tile breaks into flat pieces that drop away tumbling, small shards and grit, glints on the falling glass and a puff of dust. */
export default {
  name: 'hit.tilebreak',
  category: 'hit',
  whenToUse: 'A floor tile, glass step, ice panel or thin platform tile breaks and drops away under a runner or player: a wrong step on a glass bridge, a falling-tile floor in a runner or party game, a tile that only holds once. Play it at the tile\'s centre and tint it the tile colour (light blue glass, white ice, any tile colour). For a whole platform crumbling slowly use world.crumble; for a window or bottle use hit.glass; for a gem tile in a puzzle use puzzle.shatter.',
  duration: 0.75, loop: false, tint: '#8fdcff',
  tags: ['tile', 'floor', 'glass', 'break', 'fall', 'runner', 'bridge', 'hit'],
  build(c) {
    const col = c.color('#8fdcff');
    const light = c.lighten(col, 0.55);
    const deep = c.darken(col, 0.25);
    const dust = '#e6e2da';
    // the tile's footprint: a line across the screen in 2D, a square lying on the ground plane in 3D
    // (a filled rect crowds its particles toward the middle, so 3D fills only the outer part of it)
    const slab = c.is3d ? { type: 'rect', w: 90, h: 90, thickness: 0.6 } : { type: 'rect', w: 84, h: 0 };
    // flat pieces of the tile dropping away; two weights, so they part as they fall instead of dropping as one row
    const pieces = (g, bursts) => c.sys(c.chunks(c.ground({ tex: 'square', blend: 'normal', bursts, shape: slab,
      speed: 0, life: [0.55, 0.7], size: [14, 22], rotation: [0, 6.28], color: [col, light],
      behaviors: [c.gravity(g), c.spin(-5, 5), c.colorOverLife(c.fade(0.8))], order: 2 }), 'plank'));
    return [
      // a puff of dust where it broke
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: c.is3d ? { type: 'circle', radius: 40 } : { type: 'rect', w: 90, h: 0 },
        speed: 0, life: [0.4, 0.55], size: [22, 34], rotation: [0, 6.28], color: dust,
        behaviors: [c.force(0, 50), c.spin(-1.5, 1.5), c.sizeOverLife(c.grow(0.5)), c.colorOverLife(c.fadeInOut(0.1, 0.45))], order: 0 })),
      pieces(1700, [{ count: [4, 5] }]),
      pieces(1100, [{ count: [2, 3] }, { time: 0.04, count: [2, 3] }]),
      // small shards popping out of the crack
      c.sys(c.chunks({ tex: 'shard', blend: 'normal', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 20 },
        speed: [120, 300], life: [0.4, 0.6], size: [6, 10], rotation: [0, 6.28], color: [deep, col],
        behaviors: [c.gravity(1300), c.spin(-12, 12), c.colorOverLife(c.fade(0.75))], order: 3 }, 'shard')),
      // grit falling with the pieces
      c.sys(c.ground({ tex: 'disc', blend: 'normal', bursts: [{ count: [7, 9] }], shape: slab,
        speed: 0, life: [0.4, 0.6], size: [3, 5], color: deep,
        behaviors: [c.gravity(1100), c.colorOverLife(c.fade(0.7))], order: 1 })),
      // glints twinkling on the falling pieces (on the tile's footprint in 3D too, not on an upright square)
      c.sys(c.ground({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: [5, 6] }], shape: slab,
        speed: 0, life: [0.4, 0.6], size: [10, 16], color: '#ffffff',
        behaviors: [c.gravity(1200), c.sizeOverLife(c.curve([[0, 0], [0.2, 1], [0.4, 0.2], [0.6, 1], [0.8, 0.2], [1, 0]]))], order: 4 })),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.14, size: 120, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [0.3, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 5 }),
      // the crack-star
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 2 }], life: 0.16, size: 100, rotation: [0, 1.6], color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.3))], order: 5 }),
    ];
  },
};
