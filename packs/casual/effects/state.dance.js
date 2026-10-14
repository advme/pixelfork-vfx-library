/** Dancing: a glowing dance-floor ring under the feet flashes on every beat and sends out a ripple, light dots hop off it and sparkles rise. Loops until stopped (120 beats a minute). */
export default {
  name: 'state.dance',
  category: 'state',
  whenToUse: 'A character is dancing: a dance battle or dance game, a victory dance, a party guest on the dance floor, a pet wiggling to music. Play it at the character\'s feet with follow; stop it when the dance ends. For fever or in-the-groove mode over the head use state.groove.',
  duration: 1, loop: true, anchor: 'feet', tint: '#ff4fd8',
  tags: ['dance', 'dancing', 'dance floor', 'disco', 'party', 'rhythm', 'music', 'status'],
  build(c) {
    const col = c.color('#ff4fd8');
    const light = c.lighten(col, 0.55);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    const beat = [{ count: 1 }, { time: 0.5, count: 1 }];
    const alpha = (a) => c.colorOverLife(c.grad([['#ffffff', 0], ['#ffffff', 1]], a));
    const base = c.is3d ? { type: 'circle', radius: 46, thickness: 0 } : { type: 'rect', w: 100, h: 0 };
    return [
      // the dance-floor ring: bright on the beat, dimmer between beats
      ring({ blend: 'add', loop: true, duration: 1, bursts: beat, life: 0.5, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.12, 1.06], [1, 0.98]])), alpha([[1, 0], [0.55, 0.6], [0.45, 1]])], order: 0 }),
      // a ripple sent out on every beat
      ring({ blend: 'add', loop: true, duration: 1, bursts: beat, life: 0.45, size: 190, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.6], [1, 1]])), alpha([[0.8, 0], [0, 1]])], order: 1 }),
      // 3D: a pool of light on the floor; 2D: an inner ring breathing against the outer one
      c.is3d
        ? c.sys(c.flat({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: beat, life: 0.5, size: 140, color: col,
          behaviors: [alpha([[0.5, 0], [0.2, 1]])], order: 0 }))
        : ring({ blend: 'add', loop: true, duration: 1, bursts: beat, life: 0.5, size: 78, color: light,
          behaviors: [c.sizeOverLife(c.curve([[0, 1.08], [0.15, 0.94], [1, 1]])), alpha([[0.9, 0], [0.35, 1]])], order: 1 }),
      // light dots hopping off the floor on every beat
      c.sys(c.spray({ tex: 'glow', blend: 'add', loop: true, duration: 1, bursts: [{ count: 4 }, { time: 0.5, count: 4 }], shape: { type: 'cone', radius: 46, angle: 0.15 }, dir: Math.PI / 2,
        speed: [140, 200], life: [0.4, 0.5], size: [6, 9], color: [col, '#ffffff'],
        behaviors: [c.gravity(800), c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.3]])), c.colorOverLife(c.fade(0.6))], order: 2 }, 'up')),
      // sparkles rising off the ring
      c.sys(c.ground({ tex: 'spark', blend: 'add', loop: true, rate: 9, shape: base,
        speed: 0, life: [0.6, 0.9], size: [9, 14], rotation: [0, 6.28], color: [light, '#ffffff'],
        behaviors: [c.force(0, 120), c.limitSpeed(70, 1), c.sizeOverLife(c.pop(0.2, 0.55))], order: 3 })),
    ];
  },
};
