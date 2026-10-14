/** A glitchy blink: a dark afterimage of the body stutters in and out with a purple echo, glitch blocks jitter, purple sparks crackle and a ring snaps shut. */
export default {
  name: 'move.blink',
  category: 'move',
  whenToUse: 'A quick, glitchy short-range blink that stutters in and out: a phase blink, a ghost or spirit flickering to a new spot, a hacker or glitch power, a sci-fi phase shift, a dark hop behind an enemy. Play it at both the start and the end point. For a ninja vanishing in a cloud of dark smoke use move.shadowstep; for a bright magical warp use move.teleport; for a dash with speed streaks use move.dash.',
  duration: 0.4, loop: false, tint: '#9b4dff',
  tags: ['blink', 'phase', 'glitch', 'flicker', 'teleport', 'vanish', 'ghost', 'dark'],
  build(c) {
    const col = c.color('#9b4dff');
    const light = c.lighten(col, 0.55);
    // a body-sized box around the point (the character is about 85 px tall)
    const body = { type: 'rect', w: 34, h: 70, thickness: 1 };
    // the stutter: on, off, on, off, on, gone (a fresh one per system)
    const flicker = (a) => c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]],
      [[a, 0], [a, 0.14], [a * 0.1, 0.2], [a * 0.9, 0.3], [a * 0.15, 0.4], [a * 0.75, 0.52], [a * 0.3, 0.7], [0, 1]]));
    return [
      // a quick flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      // the dark afterimage of the body, stuttering
      c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [7, 9] }], shape: body,
        speed: 0, life: [0.34, 0.4], size: [26, 40], rotation: [0, 6.28], color: [c.darken(col, 0.72), c.darken(col, 0.88)],
        behaviors: [c.force(0, 30), c.sizeOverLife(c.curve([[0, 0.8], [1, 1.15]])), flicker(0.9)], order: 1 }),
      // its purple echo, a beat later and knocked sideways
      c.sys({ tex: 'puff', blend: 'add', bursts: [{ time: 0.04, count: [5, 6] }], shape: body, offset: [-9, 3],
        speed: 0, life: [0.26, 0.32], size: [24, 36], rotation: [0, 6.28], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [1, 1.1]])), flicker(0.55)], order: 2 }),
      // glitch blocks popping on and off around the body
      c.sys({ tex: 'pixel', blend: 'normal', bursts: [{ count: [6, 8] }, { time: 0.08, count: [5, 7] }, { time: 0.16, count: [3, 5] }], shape: { type: 'rect', w: 56, h: 84, thickness: 1 },
        speed: 0, life: [0.08, 0.16], size: [6, 13], color: [light, '#ffffff'],
        behaviors: [c.noise(18, 5)], order: 4 }),
      // purple sparks crackling out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [10, 12] }], shape: { type: 'circle', radius: 14 },
        speed: [220, 420], life: [0.18, 0.3], size: [4, 7], color: [light, col], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.2)), c.colorOverLife(c.fade(0.4)), c.sizeOverLife(c.shrink())], order: 3 })),
      // a ring snapping shut
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.24, size: 130, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1], [1, 0.1]])), c.colorOverLife(c.fade(0.4))], order: 2 }),
    ];
  },
};
