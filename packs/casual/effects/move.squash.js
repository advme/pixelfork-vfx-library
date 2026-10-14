/** A jelly blob lands and squashes: a glossy splat spreads flat at its feet, a jelly ring and a bright ring ripple out over the floor, wobbly droplets bounce out to the sides and a few shine glints. */
export default {
  name: 'move.squash',
  category: 'move',
  whenToUse: 'A jelly, slime, blob or squishy bouncy character lands from a jump and squashes flat (jelly runners, blob jumpers, squishy platformers): play it at the feet on touchdown and tint it the character\'s colour. For a slime enemy squashed or goo thrown use hit.splat; for an ordinary heavy landing use move.land; for a trampoline or spring use move.bounce.',
  duration: 0.5, loop: false, anchor: 'feet', tint: '#ff6fae',
  tags: ['squash', 'jelly', 'slime', 'blob', 'land', 'squishy', 'bounce', 'move'],
  build(c) {
    const col = c.color('#ff6fae');
    const light = c.lighten(col, 0.45);
    const deep = c.darken(col, 0.15);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      // the splat spreading under it: one flat blob in 3D, a squashed row of blobs along the floor in 2D
      c.sys(c.flat({ tex: 'disc', blend: 'normal', bursts: [{ count: c.is3d ? 1 : 7 }], shape: c.is3d ? { type: 'point' } : { type: 'rect', w: 70, h: 0 },
        speed: 0, life: 0.45, size: c.is3d ? 90 : [18, 26], color: deep,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.15, 1.1], [0.35, 0.9], [1, 0.6]])), c.colorOverLife(c.fade(0.5))], order: 0 })),
      ring({ blend: 'normal', bursts: [{ count: 1 }], life: 0.35, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      ring({ blend: 'add', bursts: [{ time: 0.04, count: 1 }], life: 0.4, size: 200, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.25], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      // wobbly droplets bouncing out to the sides: a wide cone opening upward (a half-circle would also fly flat along the floor)
      c.sys(c.spray({ tex: 'disc', blend: 'normal', bursts: [{ count: [10, 12] }], dir: Math.PI / 2, shape: { type: 'cone', radius: 10, angle: 1.15 },
        speed: [180, 360], life: [0.35, 0.5], size: [6, 11], color: [col, light],
        behaviors: [c.gravity(1300), c.sizeOverLife(c.curve([[0, 0.6], [0.15, 1.15], [0.3, 0.9], [0.8, 1], [1, 0]]))], order: 3 }, 'up')),
      // shine glints on the jelly
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ time: 0.03, count: 3 }], shape: { type: 'circle', radius: 30, arc: Math.PI }, offset: [0, 10],
        speed: 0, life: 0.25, size: [10, 16], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.6))], order: 4 }),
    ];
  },
};
