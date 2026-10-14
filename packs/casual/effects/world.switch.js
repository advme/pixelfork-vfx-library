/** A lever or switch flips: a quick click flash, a ring snapping out, a glint at the pivot and a few sparkles. */
export default {
  name: 'world.switch',
  category: 'world',
  whenToUse: 'A lever, wall switch, crank or big button in the level is flipped or pressed (opening a gate, starting a machine, lighting a puzzle path); play it on the switch, and use world.pressureplate for a plate the player steps on, world.keyhole for a key in a lock or ui.tap for a button on the screen.',
  duration: 0.55, loop: false, tint: '#5dff8a',
  tags: ['switch', 'lever', 'button', 'activate', 'toggle', 'puzzle', 'platformer', 'mechanism'],
  build(c) {
    const col = c.color('#5dff8a');
    const light = c.lighten(col, 0.6);
    return [
      // the click: a short bright flash
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.16, size: 110, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.7]])), c.colorOverLife(c.fade(0.2))], order: 0 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.35, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.15], [1, 1]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      // tiny click sparks snapping out
      c.sys(c.vol({ tex: 'glow', blend: 'add', bursts: [{ count: [6, 8] }], shape: { type: 'circle', radius: 6 },
        speed: [260, 420], life: [0.14, 0.24], size: [3, 5], color: ['#ffffff', light], stretch: { speed: 0.02, length: 1.5 },
        behaviors: [c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.4))], order: 2 })),
      // a 4-point glint at the pivot
      c.sys({ tex: 'spark', blend: 'add', bursts: [{ count: 1 }], life: 0.3, size: 80, rotation: 0.4, color: '#ffffff',
        behaviors: [c.spin(3), c.sizeOverLife(c.curve([[0, 0.2], [0.25, 1], [1, 0]]))], order: 3 }),
      c.sys(c.vol({ tex: 'star', blend: 'add', bursts: [{ time: 0.03, count: [5, 7] }], shape: { type: 'circle', radius: 10 },
        speed: [120, 220], life: [0.35, 0.5], size: [9, 14], rotation: [0, 6.28], color: light,
        behaviors: [c.speedOverLife(c.decel(0.15)), c.spin(-5, 5), c.sizeOverLife(c.pop(0.15, 0.6))], order: 4 })),
    ];
  },
};
