/** A magical transformation: a flash, then thick candy-coloured smoke swallows the character while stars and sparkles burst out of it. */
export default {
  name: 'magic.transform',
  category: 'magic',
  whenToUse: 'A character or object magically changes form: a polymorph into a frog, a shapeshift or werewolf turn, a costume or skin change, a monster evolving, a magic makeover; play it on the body and swap the model about 0.15 s in, while the smoke hides it (for a plain vanish use explosion.puff, for a teleport use move.teleport).',
  duration: 1.0, loop: false, tint: null,
  tags: ['transform', 'polymorph', 'shapeshift', 'morph', 'costume', 'evolve', 'smoke', 'magic'],
  build(c) {
    // its own candy palette; a tint turns everything into shades of that colour
    const t = c.tint;
    const smokeA = t ? [c.lighten(t, 0.55), c.lighten(t, 0.3)] : ['#ff9be6', '#c58bff'];
    const smokeB = t ? [c.lighten(t, 0.75), t] : ['#8fe3ff', '#fff08a'];
    const core = t ? c.lighten(t, 0.85) : '#fff1fb';
    const stars = t ? [c.lighten(t, 0.35), '#ffffff'] : ['#ffd23a', '#ff6fb0'];
    const glint = t ? c.lighten(t, 0.6) : c.rgb('#ffe9fb');
    // `flat` keeps a cloud facing the camera: in 3D the runtime then pulls it in front of the character, so it really hides it
    const smoke = (p, flat) => c.sys((flat ? (q) => q : c.vol)(Object.assign({ tex: 'puff', blend: 'normal', shape: { type: 'circle', radius: 18 }, rotation: [0, 6.28],
      behaviors: [c.speedOverLife(c.decel(0.08)), c.spin(-2, 2), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 1.15]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[1, 0], [1, 0.55], [0, 1]]))] }, p)));
    return [
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.4, size: 230, color: smokeA[1],
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 0 }),
      smoke({ bursts: [{ count: [7, 8] }], speed: [70, 170], life: [0.75, 0.95], size: [50, 76], color: smokeA, order: 1 }),
      smoke({ bursts: [{ count: [6, 7] }], speed: [60, 160], life: [0.7, 0.9], size: [46, 70], color: smokeB, order: 2 }),
      // a dense cloud in the middle that hides the swap
      smoke({ bursts: [{ count: [6, 7] }], shape: { type: 'circle', radius: 24 }, speed: [5, 25], life: [0.65, 0.8], size: [80, 108], color: core, order: 3 }, true),
      // the flash, over everything for a blink
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.22, size: 210, color: glint,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0.5]])), c.colorOverLife(c.fade(0.2))], order: 4 }),
      // cartoon stars bursting out
      c.sys(c.vol({ tex: 'star', blend: 'normal', bursts: [{ time: 0.04, count: [7, 9] }], shape: { type: 'circle', radius: 20 },
        speed: [240, 380], life: [0.55, 0.8], size: [14, 22], rotation: [0, 6.28], color: stars,
        behaviors: [c.speedOverLife(c.decel(0.08)), c.spin(-6, 6), c.sizeOverLife(c.pop(0.12, 0.65))], order: 5 })),
      // sparkles: one wave out, a second twinkling inside the smoke
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: 8 }, { time: 0.18, count: [6, 8] }], shape: { type: 'circle', radius: 40 },
        speed: [40, 200], life: [0.4, 0.75], size: [8, 16], rotation: [0, 0.8], color: ['#ffffff', glint],
        behaviors: [c.speedOverLife(c.decel(0.1)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 6 })),
    ];
  },
};
