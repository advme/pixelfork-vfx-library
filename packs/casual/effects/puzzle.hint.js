/** A hint: the tile glows softly and twinkles, inviting a tap. Loops until stopped. */
export default {
  name: 'puzzle.hint',
  category: 'puzzle',
  whenToUse: 'Show the player what to do next: a hint on a tile, the next move in a tutorial, an idle nudge after a few seconds, a clickable item in a hidden-object game. Play it on the tile (el: the tile) and stop it when the player acts.',
  duration: 1.2, loop: true, tint: '#fff39a',
  tags: ['hint', 'tutorial', 'help', 'suggest', 'idle', 'tap here', 'puzzle', 'glow'],
  build(c) {
    const col = c.color('#fff39a');
    const w = Math.max(40, Math.min(c.target.w, 140)), h = Math.max(40, Math.min(c.target.h, 140));
    const s = c.target.w === 120 && c.target.h === 48 ? 64 : Math.max(w, h);
    return [
      c.sys({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: s * 1.8, color: col,
        behaviors: [c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.25, 0], [0.7, 0.5], [0.25, 1]]))], order: 0 }),
      c.sys({ tex: 'spark', blend: 'add', loop: true, rate: 5, shape: { type: 'rect', w: s, h: s, thickness: 1 },
        speed: 0, life: [0.5, 0.8], size: [10, 18], rotation: [0, 0.8], color: '#ffffff',
        behaviors: [c.sizeOverLife(c.pop(0.3, 0.5))], order: 1 }),
    ];
  },
};
