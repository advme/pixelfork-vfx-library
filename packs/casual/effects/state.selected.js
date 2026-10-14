/** A selection ring under a unit: a ring that breathes, with lights running around it. Loops until deselected. */
export default {
  name: 'state.selected',
  category: 'state',
  whenToUse: 'A unit, hero, building or target is selected or targeted: RTS and tactics selection, the active character in a turn-based fight, a locked-on enemy, a placed tower. Play it at the unit\'s feet and stop it on deselect. Tint green for own units, red for enemies.',
  duration: 1.2, loop: true, anchor: 'feet', tint: '#4dff9a',
  tags: ['select', 'selection', 'target', 'lock on', 'rts', 'tactics', 'turn based', 'unit', 'status'],
  build(c) {
    const col = c.color('#4dff9a');
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    return [
      ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 110, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.96], [0.5, 1.04], [1, 0.96]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [1, 0.5], [0.7, 1]]))], order: 0 }),
      // 3D: lights running around the ring on the floor; 2D: a second, inner ring breathing against the first
      c.is3d
        ? c.sys(c.ground({ tex: 'glow', blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 4 }], shape: { type: 'circle', radius: 50, thickness: 0, even: true },
          speed: 0, life: 1.2, size: [10, 12], color: c.lighten(col, 0.6), behaviors: [c.orbit(Math.PI)], order: 1 }))
        : ring({ blend: 'add', loop: true, duration: 1.2, bursts: [{ count: 1 }], life: 1.2, size: 80, color: c.lighten(col, 0.5),
          behaviors: [c.sizeOverLife(c.curve([[0, 1.04], [0.5, 0.94], [1, 1.04]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.5, 0.5], [0.9, 1]]))], order: 1 }),
    ];
  },
};
