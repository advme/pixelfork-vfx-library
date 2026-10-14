/** A spring or bounce pad fires: rings squash out, speed lines shoot up and sparkles burst. */
export default {
  name: 'move.bounce',
  category: 'move',
  whenToUse: 'A trampoline, spring, jump pad, mushroom or bouncy surface launches the character up. Play it on the pad at the moment of the bounce.',
  duration: 0.5, loop: false, anchor: 'feet', tint: '#5cd6ff',
  tags: ['bounce', 'spring', 'trampoline', 'jump pad', 'launch', 'platformer', 'boost', 'move'],
  build(c) {
    const col = c.color('#5cd6ff');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'add', bursts: [{ count: 1 }, { time: 0.08, count: 1 }], life: 0.3, size: 150, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [1, 1.1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // speed lines shooting up (they trail back, so they start a little up)
      c.sys(c.spray({ tex: 'glow', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'cone', radius: 28, angle: 0.06 }, offset: [0, 40],
        speed: [500, 750], life: [0.15, 0.22], size: [6, 9], color: '#ffffff', stretch: { speed: 0.02, length: 1 },
        behaviors: [c.colorOverLife(c.fade(0.4))], order: 3 }, 'up')),
      c.sys(c.vol({ tex: 'spark', blend: 'add', bursts: [{ count: [5, 6] }], shape: { type: 'circle', radius: 20, arc: Math.PI },
        speed: [120, 220], life: [0.3, 0.4], size: [10, 15], color: c.lighten(col, 0.6),
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.2, 0.5))], order: 2 })),
    ];
  },
};
