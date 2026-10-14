/** A target mark: a big ring snaps down onto the target, four chevrons slide in and point at it, with a flash and a ping. */
export default {
  name: 'magic.mark',
  category: 'magic',
  whenToUse: 'The moment an ability marks or locks onto an enemy: a hunter\'s mark landing, a sniper or missile lock-on, a focus-fire call, a bounty or death mark applied, an enemy tagged in a hero shooter. Play it once on the enemy (follow it if it moves). For a mark that stays over the head until it ends use state.marked; for a ring under a selected unit use state.selected.',
  duration: 0.75, loop: false, tint: '#ff3355',
  tags: ['mark', 'target', 'lock on', 'crosshair', 'focus', 'hunter', 'bounty', 'moba'],
  build(c) {
    const col = c.color('#ff3355');
    const light = c.lighten(col, 0.5);
    // a chevron starting at angle a, 112 px out, sliding in to about 68 px and pointing at the centre
    // (the chevron points up in its picture, so a + PI/2 turns it to point inward)
    const chevron = (a) => c.sys({ tex: 'arrow', blend: 'add', bursts: [{ count: 1 }], shape: { type: 'cone', radius: 0.1, angle: 0.001 }, dir: a + Math.PI,
      offset: [Math.cos(a) * 112, Math.sin(a) * 112], speed: 500, life: 0.7, size: 28, rotation: a + Math.PI / 2, color: light,
      behaviors: [c.speedOverLife(c.curve([[0, 1], [0.2, 0.05], [1, 0]])), c.sizeOverLife(c.curve([[0, 0.5], [0.15, 1.25], [0.25, 1], [0.8, 1], [1, 0]])),
        c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.1], [1, 0.75], [0, 1]]))], order: 3 });
    return [
      // the ring dropping from big onto the target
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ count: 1 }], life: 0.75, size: 120, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 2.2], [0.16, 0.9], [0.24, 1.05], [0.3, 1], [1, 1]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0, 0], [1, 0.1], [1, 0.7], [0, 1]]))], order: 2 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.11, count: 1 }], life: 0.6, size: 56, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0], [0.15, 1.2], [0.25, 1], [1, 1]])), c.colorOverLife(c.fade(0.65))], order: 2 }),
      chevron(0), chevron(Math.PI / 2), chevron(Math.PI), chevron(-Math.PI / 2),
      // the moment it locks on: a flash, a ping going out and a few sparks
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.11, count: 1 }], life: 0.2, size: 120, color: light,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.5], [0.3, 1], [1, 0.6]])), c.colorOverLife(c.fade(0.2))], order: 1 }),
      c.sys({ tex: 'ring', blend: 'add', bursts: [{ time: 0.11, count: 1 }], life: 0.35, size: 210, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.55], [1, 1]])), c.colorOverLife(c.fade(0.1))], order: 0 }),
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ time: 0.11, count: 10 }], shape: { type: 'circle', radius: 48, thickness: 0, even: true },
        speed: [80, 160], life: [0.25, 0.35], size: [4, 6], color: '#ffffff',
        behaviors: [c.speedOverLife(c.decel(0.2)), c.sizeOverLife(c.shrink())], order: 4 }),
    ];
  },
};
