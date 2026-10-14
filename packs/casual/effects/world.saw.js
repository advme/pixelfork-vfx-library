/** Sawing wood: a steady spray of sawdust streaks and fine dust thrown one way, little wood chips tumbling out and a soft dust cloud. Loops until stopped. */
export default {
  name: 'world.saw',
  category: 'world',
  whenToUse: 'A saw, chainsaw, sawmill, wood lathe or sanding machine cuts wood, or a carpenter or crafting bench is working: play it where the blade meets the wood, in 2D with dir (degrees, default 17 = right and a little up) and in 3D with direction for where the dust flies, tint it for darker wood and stop it when cutting stops (for an axe chop use gather.wood, for drilling rock gather.drill).',
  duration: 1, loop: true, tint: '#e8b96a',
  tags: ['saw', 'sawdust', 'wood', 'chainsaw', 'sawmill', 'carpentry', 'crafting', 'lumber'],
  build(c) {
    const col = c.color('#e8b96a');
    const dir = c.dir === undefined ? 0.3 : c.dir;
    return [
      // fast sawdust streaks
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, world: true, rate: 46, dir, shape: { type: 'cone', radius: 3, angle: 0.22 },
        speed: [260, 440], life: [0.3, 0.5], size: [3, 5], color: [col, c.lighten(col, 0.35)], stretch: { speed: 0.004, length: 1.4 },
        behaviors: [c.gravity(900), c.speedOverLife(c.decel(0.5)), c.colorOverLife(c.fade(0.6))], order: 3 })),
      // fine dust drifting down
      c.sys(c.spray({ tex: 'disc', blend: 'normal', loop: true, world: true, rate: 30, dir, shape: { type: 'cone', radius: 4, angle: 0.4 },
        speed: [120, 260], life: [0.4, 0.7], size: [2, 3.5], color: c.lighten(col, 0.25),
        behaviors: [c.gravity(500), c.speedOverLife(c.decel(0.3)), c.noise(2, 10), c.colorOverLife(c.fade(0.6))], order: 2 })),
      // wood chips
      c.sys(c.chunks(c.spray({ tex: 'square', blend: 'normal', loop: true, world: true, rate: 7, dir, shape: { type: 'cone', radius: 3, angle: 0.4 },
        speed: [200, 360], life: [0.5, 0.7], size: [5, 9], rotation: [0, 6.28], color: [col, c.darken(col, 0.25)],
        behaviors: [c.gravity(1300), c.spin(-12, 12), c.colorOverLife(c.fade(0.75))], order: 4 }), 'plank')),
      // a soft dust cloud
      c.sys(c.spray({ tex: 'puff', blend: 'normal', loop: true, world: true, rate: 9, dir, shape: { type: 'cone', radius: 6, angle: 0.5 },
        speed: [40, 110], life: [0.6, 0.9], size: [16, 26], rotation: [0, 6.28], color: c.lighten(col, 0.45),
        behaviors: [c.speedOverLife(c.decel(0.15)), c.force(0, 20), c.spin(-1.5, 1.5), c.sizeOverLife(c.curve([[0, 0.5], [1, 2]])),
          c.colorOverLife(c.grad([['#fff', 0], ['#fff', 1]], [[0.6, 0], [0.35, 0.5], [0, 1]]))], order: 1 })),
    ];
  },
};
