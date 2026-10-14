/** A whole row clears: a bright beam flashes across it, sparkles rise and bits drop away. */
export default {
  name: 'puzzle.line',
  category: 'puzzle',
  whenToUse: 'A full row or column is cleared: a line clear in a block puzzle or tetris-like, a striped candy, a row bonus. Play it on the row with el: the row element, or at its centre with width: the row length in px. For a column set dir: 90.',
  duration: 0.65, loop: false, tint: '#5cd6ff',
  tags: ['line', 'row', 'clear', 'column', 'tetris', 'block', 'puzzle', 'stripe'],
  build(c) {
    const col = c.color('#5cd6ff');
    const light = c.lighten(col, 0.6);
    // the row length: the element or width it was played on; 360 when nothing was given
    const w = c.target.w === 120 && c.target.h === 48 ? 360 : Math.max(c.target.w, 60);
    const vertical = c.dir !== undefined && Math.abs(Math.sin(c.dir)) > 0.7;
    // a rect emitter lies in the screen plane: w along x for a row, h along y for a column
    const line = (p) => c.sys(Object.assign({ shape: vertical ? { type: 'rect', w: 0, h: w } : { type: 'rect', w, h: 0 }, speed: 0 }, p));
    return [
      line({ tex: 'glow', blend: 'add', bursts: [{ count: Math.round(w / 5) }], life: 0.3, size: [34, 46], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.25, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.3))], order: 0 }),
      line({ tex: 'glow', blend: 'add', bursts: [{ count: Math.round(w / 4) }], life: 0.22, size: [10, 14], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.2, 1], [1, 0.2]])), c.colorOverLife(c.fade(0.3))], order: 2 }),
      line({ tex: 'spark', blend: 'add', bursts: [{ time: 0.05, count: Math.round(w / 22) }], life: [0.4, 0.6], size: [10, 18], rotation: [0, 1.5], color: light,
        behaviors: [c.force(0, 160), c.noise(2, 12), c.sizeOverLife(c.pop(0.2, 0.5))], order: 3 }),
      line({ tex: 'square', blend: 'normal', bursts: [{ time: 0.08, count: Math.round(w / 26) }], life: [0.4, 0.6], size: [6, 10], rotation: [0, 6.28], color: [col, light],
        behaviors: [c.gravity(900), c.noise(1.5, 30), c.spin(-6, 6), c.colorOverLife(c.fade(0.6))], order: 1 }),
    ];
  },
};
