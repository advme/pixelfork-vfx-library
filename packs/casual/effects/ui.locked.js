/** A polite no: the locked item dims for a moment, a dull grey ring thunks once, soft grey puffs huff out to both sides and a few dust specks drop away. */
export default {
  name: 'ui.locked',
  category: 'ui',
  whenToUse: 'The player taps something that is still locked or not available yet: a locked level or world, a greyed-out shop item or skin, an item they cannot afford, a door that needs a key, a feature behind a level gate. Play with { el } on it; a soft grey puff says no without scolding. For a wrong answer or an invalid move use puzzle.wrong; for a gentle try-again in a kids game use ui.wrongtry; for the moment it unlocks use ui.unlock.',
  duration: 0.6, loop: false, tint: '#a3abbf',
  tags: ['ui', 'locked', 'unavailable', 'denied', 'no', 'disabled', 'puff', 'grey'],
  build(c) {
    const col = c.color('#a3abbf');
    const pale = c.lighten(col, 0.3);
    const dark = c.darken(col, 0.3);
    const plain = Math.abs(c.target.w - c.target.h * 2.5) < 1e-6 * c.target.w;
    const s = plain ? 80 : Math.max(36, Math.min(200, Math.max(c.target.w, c.target.h)));
    // the two side puffs: a short huff to the left and to the right, like a shake of the head. They stay in the picture
    // plane in 3D too (left and right as the camera sees it), so a game's direction never sends both one way
    const huff = (way, x) => c.sys({ tex: 'puff', blend: 'normal', bursts: [{ count: [3, 4] }], shape: { type: 'cone', radius: s * 0.08, angle: 0.6 }, dir: way,
      offset: [x, -s * 0.08], speed: [70, 150], life: [0.4, 0.55], size: [s * 0.32, s * 0.48], rotation: [0, 6.28], color: [col, pale],
      behaviors: [c.speedOverLife(c.decel(0.08)), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.4], [0.35, 1], [1, 1.1]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.85, 0], [0.6, 0.5], [0, 1]]))], order: 2 });
    return [
      // the dim: a soft grey shade behind the item, quickly in and out
      c.sys({ tex: 'glow', blend: 'normal', bursts: [{ count: 1 }], life: 0.4, size: s * 1.7, color: dark,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.8], [0.25, 1], [1, 0.95]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [0.3, 0.2], [0, 1]]))], order: 0 }),
      // one dull ring that bumps out a little and settles: no bright flash
      c.sys({ tex: 'ring', blend: 'normal', bursts: [{ count: 1 }], life: 0.38, size: s * 1.4, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.85], [0.25, 1.06], [0.5, 1], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.75, 0], [0.5, 0.4], [0, 1]]))], order: 1 }),
      huff(Math.PI, -s * 0.22), huff(0, s * 0.22),
      // dust specks dropping away
      c.sys(c.vol({ tex: 'disc', blend: 'normal', bursts: [{ count: [8, 10] }], shape: { type: 'circle', radius: s * 0.25 },
        speed: [60, 150], life: [0.4, 0.58], size: [3, 6], color: [col, dark],
        behaviors: [c.gravity(520), c.speedOverLife(c.decel(0.3)), c.colorOverLife(c.fade(0.5))], order: 3 })),
    ];
  },
};
