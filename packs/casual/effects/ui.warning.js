/** A warning alarm on a button: twice a second its rim blinks hot orange and a red-orange ring pulses outward over a throbbing glow, with hot sparks flicking off the edge. Loops until stopped. */
export default {
  name: 'ui.warning',
  category: 'ui',
  whenToUse: 'A button or icon warns that something needs the player now: an alert or danger button, a base or village under attack, storage full, low fuel or low battery, a broken machine, a lost connection, a red alert on the map. Play with { el, follow: true } on the button or icon and stop it when the player deals with it. For a timer running out use ui.hurry; for low health on the whole screen use ui.lowhp; for a new message or gift waiting use ui.notify; for a friendly call to tap use ui.glow.',
  duration: 0.5, loop: true, tint: '#ff4a1c',
  tags: ['ui', 'warning', 'alert', 'alarm', 'danger', 'error', 'attention', 'red'],
  build(c) {
    const col = c.color('#ff4a1c');
    // the hot blink colour: amber by default, a lighter shade of the tint when one is given
    const hot = c.tint ? c.lighten(col, 0.45) : c.rgb('#ffb12e');
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const s = plain ? 72 : Math.max(36, Math.min(150, Math.max(c.target.w, c.target.h)));
    // one cycle is one beat. Every burst sits at the start of the cycle: a burst later in the cycle would still fire
    // after stop() whenever its system had a particle alive (the pulse ring always has one), so the alarm would ring once more
    const beat = 0.5;
    return [
      // the glow throbs on each beat and ends each cycle as bright as it starts, so it never shows a seam; cut, so it does
      // not hang on after the player deals with it
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: beat, bursts: [{ count: 1 }], life: beat, size: s * 2.2, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.9], [0.16, 1.06], [1, 0.9]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.28, 0], [0.62, 0.16], [0.28, 1]]))], order: 0 }),
      // the rim blinks: a ring snaps onto the edge, white-hot to amber to red, and dims before the next beat
      c.sys({ tex: 'ring', blend: 'add', loop: true, cut: true, duration: beat, bursts: [{ count: 1 }], life: 0.42, size: s * 1.32, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 1.14], [0.15, 0.98], [0.3, 1], [1, 1]])),
          c.colorOverLife(c.grad([['#ffffff', 0], [hot, 0.25], [col, 1]], [[1, 0], [0.75, 0.35], [0, 1]]))], order: 1 }),
      // the alarm ring pulsing outward; it lives longer than a beat, so a new one leaves before the last has faded
      c.sys({ tex: 'ring', blend: 'add', loop: true, duration: beat, bursts: [{ count: 1 }], life: 0.6, size: s * 2.4, color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [1, 1]])), c.colorOverLife(c.grad([[hot, 0], [col, 0.4], [col, 1]], [[0, 0], [1, 0.05], [0.7, 0.4], [0, 1]]))], order: 1 }),
      // hot embers thrown off the rim on each beat
      c.sys(c.vol({ tex: 'glow', blend: 'add', loop: true, duration: beat, bursts: [{ count: 4 }], shape: { type: 'circle', radius: s * 0.5, thickness: 0 },
        speed: [90, 150], life: [0.25, 0.35], size: [4, 7], color: [hot, col],
        behaviors: [c.speedOverLife(c.decel(0.15)), c.sizeOverLife(c.shrink())], order: 2 })),
      // sparks flicking on the edge at random moments, so it does not feel mechanical
      c.sys({ tex: 'spark', blend: 'add', loop: true, duration: beat, rate: 6, shape: { type: 'circle', radius: s * 0.56, thickness: 0 },
        speed: [30, 70], life: [0.22, 0.32], size: [8, 13], rotation: [0, 0.8], color: ['#ffffff', hot],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.pop(0.25, 0.45))], order: 3 }),
    ];
  },
};
