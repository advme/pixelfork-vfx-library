/** A heavy block thuds down: a dull flash at its base, dust squirting out from under both sides and rolling along the floor, a flat dust ring and small chips hopping up. */
export default {
  name: 'hit.blockland',
  category: 'hit',
  whenToUse: 'A heavy block, slab, crate or brick is dropped and lands on a stack, a tower or the floor in a stacking, tower-building or block-dropping game: play it at the bottom of the landed block, size it to the block width and tint it for the dust (sand, snow, grey stone). For a perfectly aligned drop add reward.perfectstack; for a character landing use move.land; for a crate breaking use hit.block.',
  duration: 0.55, loop: false, anchor: 'feet', tint: '#efe2cc',
  tags: ['block', 'land', 'drop', 'thud', 'stack', 'tower', 'dust', 'hit'],
  build(c) {
    const col = c.color('#efe2cc');
    const chip = c.darken(col, 0.35);
    // flat at the block's base; snap: false keeps it there in 3D when the block lands on a stack above the floor
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p), { snap: false })) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const dustLife = () => [c.speedOverLife(c.decel(0.05)), c.force(0, 40), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.4], [0.4, 1], [1, 1.2]])),
      c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.65, 0.5], [0, 1]]))];
    // 2D: dust squirting out from under both edges of the block; 3D: a ring of puffs from under its footprint, rolling out over the floor
    const side = (d, x) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: { type: 'cone', radius: 4, angle: 0.2 }, dir: d, offset: [x, 6],
      speed: [200, 380], life: [0.4, 0.55], size: [28, 44], rotation: [0, 6.28], color: [col, c.darken(col, 0.12)], behaviors: dustLife(), order: 2 });
    const puffs = c.is3d
      ? [c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [14, 16] }], shape: { type: 'circle', radius: 50, thickness: 0 },
          speed: [180, 340], life: [0.4, 0.55], size: [28, 44], rotation: [0, 6.28], color: [col, c.darken(col, 0.12)], behaviors: dustLife(), order: 2 }))]
      : [side(0.1, 50), side(Math.PI - 0.1, -50)];
    return [
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.4, size: 220, color: c.lighten(col, 0.5),
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // dust puffing up all along the bottom edge
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [5, 6] }], shape: c.is3d ? { type: 'circle', radius: 45 } : { type: 'rect', w: 100, h: 0 },
        speed: 0, life: [0.35, 0.5], size: [26, 38], rotation: [0, 6.28], color: col,
        behaviors: [c.force(0, 70), c.spin(-1.5, 1.5), c.sizeOverLife(c.grow(0.5)), c.colorOverLife(c.fadeInOut(0.1, 0.4))], order: 1 })),
      ...puffs,
      // small chips hopping up beside the block
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [8, 10] }], dir: Math.PI / 2, shape: { type: 'cone', radius: 50, angle: 0.9 },
        speed: [180, 360], life: [0.35, 0.5], size: [4, 7], rotation: [0, 6.28], color: [chip, c.darken(col, 0.5)],
        behaviors: [c.gravity(1500), c.spin(-10, 10), c.colorOverLife(c.fade(0.75))], order: 3 }, 'up'), 'box')),
      // the dull thud
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.12, size: 140, color: c.lighten(col, 0.6),
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.5, 0], [0, 1]]))], order: 4 }),
    ];
  },
};
