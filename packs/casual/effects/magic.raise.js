/** Undead rising: the ground bursts open with dark smoke and flying clods of dirt, green ghost flames roar up and spirit wisps climb away. */
export default {
  name: 'magic.raise',
  category: 'magic',
  whenToUse: 'The undead rise out of the ground: a zombie or skeleton climbs out of a grave, a necromancer raises minions, a ghost enemy spawns from the earth, a horror boss emerges. Play it on the ground at the feet of whatever rises. For a holy comeback use magic.revive; for a summoning circle use magic.summon; for a mole, worm or monster bursting out of plain dirt with no magic use move.emerge.',
  duration: 1.2, loop: false, anchor: 'feet', tint: '#5dff8a',
  tags: ['undead', 'zombie', 'skeleton', 'necromancer', 'raise', 'grave', 'spawn', 'horror'],
  build(c) {
    const col = c.color('#5dff8a');
    const light = c.lighten(col, 0.6);
    const ring = (p) => (c.is3d ? c.sys(c.flat(Object.assign({ tex: 'ring' }, p))) : c.sys(Object.assign({ tex: 'ellipse' }, p)));
    // the patch of ground it bursts from: a disc in 3D, a row along the ground in 2D
    const patch = (w, r) => (c.is3d ? { type: 'circle', radius: r } : { type: 'rect', w, h: 0 });
    return [
      // a sickly glow over the spot
      c.sys({ tex: 'glow', blend: 'add', bursts: [{ count: 1 }], life: 0.7, size: 170, offset: [0, 26], color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0.6]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.7, 0], [0.45, 0.4], [0, 1]]))], order: 0 }),
      // the ground ring
      ring({ blend: 'add', bursts: [{ count: 1 }], life: 0.6, size: 200, color: col,
        behaviors: [c.sizeOverLife(c.curve([[0, 0.2], [1, 1]])), c.colorOverLife(c.fade(0.3))], order: 1 }),
      // dark smoke bursting out of the earth
      c.sys(c.ground({ tex: 'puff', blend: 'normal', bursts: [{ count: [10, 12] }], shape: patch(100, 26),
        speed: c.is3d ? [60, 140] : 0, life: [0.8, 1.1], size: [34, 56], rotation: [0, 6.28], color: [c.darken(col, 0.82), c.darken(col, 0.92)],
        behaviors: [c.speedOverLife(c.decel(0.2)), c.force(0, 110), c.limitSpeed(140, 1), c.noise(1.5, 12), c.spin(-1.5, 1.5),
          c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 1.2]])), c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.9, 0], [0.7, 0.5], [0, 1]]))], order: 2 })),
      // green ghost flames roaring up
      c.sys(c.ground({ tex: 'flame', blend: 'add', rate: 44, duration: 0.55, shape: patch(70, 22),
        speed: 0, life: [0.45, 0.7], size: [30, 52], color: [c.lighten(col, 0.25), col],
        behaviors: [c.force(0, 600), c.limitSpeed(320, 1), c.noise(3, 10), c.sizeOverLife(c.curve([[0, 0.4], [0.3, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 3 })),
      // spirit wisps climbing away
      c.sys(c.ground({ tex: 'glow', blend: 'add', bursts: [{ time: 0.1, count: [8, 10] }], shape: patch(60, 20),
        speed: 0, life: [0.8, 1.1], size: [10, 18], color: [light, '#ffffff'],
        behaviors: [c.force(0, 320), c.limitSpeed(210, 1), c.noise(2.5, 22), c.sizeOverLife(c.curve([[0, 0.3], [0.2, 1], [1, 0]])), c.colorOverLife(c.fade(0.5))], order: 4 })),
      // clods of dirt thrown up; they fade as they land, so in 2D they do not fall on through the ground line
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', bursts: [{ count: [10, 12] }], shape: { type: 'cone', radius: 24, angle: 0.55 }, dir: Math.PI / 2,
        speed: [320, 440], life: [0.45, 0.6], size: [7, 12], rotation: [0, 6.28], color: ['#6b4a2e', '#4a3220'],
        behaviors: [c.gravity(1300), c.spin(-10, 10), c.colorOverLife(c.fade(0.55))], order: 5 }, 'up'), 'box')),
    ];
  },
};
