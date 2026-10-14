/** A ground-slam ability: a flash at the feet, two rings of energy racing out along the ground with glowing waves riding them, sparks and a ring of dust. */
export default {
  name: 'magic.shockwave',
  category: 'magic',
  whenToUse: 'A hero\'s ground-slam ability: a shockwave stomp, an area knock-back skill, a seismic slam in a MOBA or action RPG, a boss\'s pulse that hits everything around it. Play it on the ground at the caster\'s feet. For a physical hammer or body slam with flying rocks use hit.heavy; for an energy blast in mid-air use explosion.shockwave.',
  duration: 0.65, loop: false, anchor: 'feet', tint: '#ff9a3c',
  tags: ['shockwave', 'ground slam', 'stomp', 'area', 'knockback', 'pulse', 'moba', 'ability'],
  build(c) {
    const col = c.color('#ff9a3c');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // glowing waves riding the ring: 3D a full circle just above the ground (lifted so the floor does not swallow half of
    // each glow); 2D sliding left and right along it
    const waves = (p) => (c.is3d
      ? [c.sys(c.ground(Object.assign({ shape: { type: 'circle', radius: 20, thickness: 0, even: true }, bursts: [{ count: 16 }], offset: [0, 12] }, p())))]
      : [0, Math.PI].map((d) => c.sys(Object.assign({ dir: d, shape: { type: 'cone', radius: 4, angle: 0.05 }, bursts: [{ count: 3 }], offset: [0, 6] }, p()))));
    return [
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.18, size: 210, color: '#fff3dc',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.25, 1], [1, 0.4]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.55, size: 340, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      ring({ blend: 'add', bursts: [{ time: 0.08, count: 1 }], life: 0.45, size: 260, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.1], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 2 }),
      ...waves(() => ({ tex: 'glow', blend: 'add', speed: [460, 540], life: [0.4, 0.45], size: [26, 36], color: col,
        behaviors: [c.speedOverLife(c.decel(0.05)), c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.3))], order: 2 })),
      // sparks: 3D skimming out over the ground, 2D fanning up and falling back; born 28 px out and short at first,
      // so a streak's tail does not poke down through the floor
      c.sys(c.ground({ tex: 'glow', blend: 'add', bursts: [{ count: [18, 20] }],
        shape: c.is3d ? { type: 'circle', radius: 28, thickness: 0 } : { type: 'circle', radius: 28, thickness: 0, arc: Math.PI }, offset: c.is3d ? [0, 6] : undefined,
        speed: [320, 560], life: [0.35, 0.5], size: [4, 7], color: [light, '#ffffff'], stretch: { speed: 0.012, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.is3d ? c.force(0, 200) : c.gravity(900), c.sizeOverLife(c.curve([[0, 0.35], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.5))], order: 3 })),
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [11, 12] }],
        shape: c.is3d ? { type: 'circle', radius: 20, thickness: 0, even: true } : { type: 'circle', radius: 20, thickness: 0, arc: Math.PI, even: true }, offset: c.is3d ? [0, 16] : undefined,
        speed: [220, 320], life: [0.5, 0.7], size: [34, 52], rotation: [0, 6.28], color: '#d9cdb8',
        behaviors: [c.speedOverLife(c.decel(0.1)), c.force(0, 30), c.spin(-1, 1), c.sizeOverLife(c.curve([[0, 0.5], [0.4, 1], [1, 1.3]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.5, 0.5], [0, 1]]))], order: 0 })),
    ];
  },
};
