/** Marked: a red target ring with four chevrons snapping inward at it hovers over the head and pulses. Loops until stopped. */
export default {
  name: 'state.marked',
  category: 'state',
  whenToUse: 'A character or enemy is marked as a target: a hunter\'s mark, a lock-on before a missile hits, a bounty or "defeat this one" marker, an enemy that will take extra damage, the next target of a boss. Play it over the head with follow; stop it when the mark ends. For the moment the mark is placed use magic.mark; for a selection ring at a unit\'s feet use state.selected.',
  duration: 0.8, loop: true, anchor: 'head', tint: '#ff3b3b',
  tags: ['mark', 'marked', 'target', 'lock on', 'crosshair', 'bounty', 'hunter', 'status'],
  build(c) {
    const col = c.color('#ff3b3b');
    // the reticle's centre, high enough that the lowest chevron clears the top of the head
    const cy = 24;
    // one chevron at angle a around the ring, turned to point at the centre; each beat it snaps in from further out
    const chevron = (a) => c.sys({ tex: 'arrow', blend: 'normal', loop: true, cut: true, duration: 0.8, bursts: [{ count: 1 }],
      shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir: a + Math.PI, offset: [Math.cos(a) * 41, cy + Math.sin(a) * 41],
      speed: 110, life: 0.8, size: 18, rotation: a + Math.PI / 2, color: col,
      behaviors: [c.speedOverLife(c.curve([[0, 1], [0.25, 0], [1, 0]])), c.sizeOverLife(c.curve([[0, 1.35], [0.25, 1], [1, 1]]))], order: 3 });
    return [
      // a red glow behind the reticle
      c.sys({ tex: 'glow', blend: 'add', loop: true, cut: true, duration: 0.8, bursts: [{ count: 1 }], life: 0.8, size: 84, offset: [0, cy], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.15], [0.25, 0.95], [1, 1]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.35, 0.5], [0.45, 1]]))], order: 0 }),
      // the solid ring, so it reads on light and dark backgrounds
      c.sys({ tex: 'ring', blend: 'normal', loop: true, cut: true, duration: 0.8, bursts: [{ count: 1 }], life: 0.8, size: 48, offset: [0, cy], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 1.2], [0.25, 1], [1, 1]]))], order: 1 }),
    ].concat([0, 1, 2, 3].map((k) => chevron((k * Math.PI) / 2)));
  },
};
